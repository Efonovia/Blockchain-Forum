const router = require("express").Router();
const Users = require("../../models/Users.js"); 
const Follow = require("../../models/Follow");
const uniqid = require("uniqid");
const {
  UserRegValidation,
  UserLoginValidation,
  ResetPassValidation,
  passwordValidation, 
  userFullnameValidation, 
  userBioValidation, 
} = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validateToken } = require("../../token/verifyToken.js");
const { verify } = require("jsonwebtoken");
const upload = require("../../rules/imageValidation");
const nodemailer = require("nodemailer");
const sequelize = require("../../db/db");
const { QueryTypes, Sequelize } = require("sequelize");
const uploaded = require("./profileImage.js"); 

dotenv.config();

// USERS
router.post("/register", async (req, res) => {
  // error message check
  const { error } = UserRegValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { username, password, email } = req.body;

  //username duplicate check
  const userCheck = await Users.findOne({
    where: { username },
  });
  if (userCheck) return res.status(405).send("This Username already taken!");

  const idUnique = uniqid();

  console.log("loading...")

  //username duplicate check
  const emailCheck = await Users.findOne({
    where: { email },
  });
  if (emailCheck) return res.status(405).send("This Email already in use");

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // send and save info - database
  const postMe = await Users.create({
    username,
    fullname: "",
    email,
    profile_picture: "",
    user_id: idUnique, 
    bio: "Bio has not been set",
     // following_count: 0,
    // follower_count: 0, 
    suspend:false, 
    verified: false,
    password: hashedPassword,
  })
    .then(async (userInfo) => {

       
     return  res.status(200).send("Successfully Registered. Redirecting...");
    })
    .catch((err) => {
     return  res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

// LOGIN
router.post("/login", async (req, res, next) => {
  // error message check
  const { error } = UserLoginValidation(req.body);

  if (error) {
    return res.status(405).send(error.details[0].message);
  }

  const { email, password } = req.body;

  //Email duplucate check
  const userCheck = await Users.findOne({
    where: { email },
  });
  if (!userCheck) return res.status(404).send("username doesnt exist!");
  if (userCheck.suspend === true) return res.status(405).send("You cannot login right now. Contact support");

  //  check Password
  const passwordCheck = await bcrypt
    .compare(password, userCheck.password)
    .then((result) => {
      if (!result) return res.status(404).send("Invalid Password");

      const giveToken = jwt.sign(
        {
          id: userCheck.id,
          username: userCheck.username,
        },
        process.env.USERS,
        { expiresIn: "1d" }
      );

       res.cookie("user", giveToken, {
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        // sameSite: 'none',
        // httpOnly: true,
        // secured: true
      });


      return res.status(200).json({
          data: "Success. Redirecting...",
          user: email,
          auth: true,
          loggedIn: true,
        });
       
    })
    .catch((e) => {
      console.log(e)
      return res.status(400).send("Error Login user in");
    });

  // next();
});

router.post("/update-password", validateToken, async (req, res) => {
  // error message check
  const { error } = passwordValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { id, password } = req.body;

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // send and update info - database
  const postMe = await Users.update(
    {
      password: hashedPassword,
    },
    { where: { id } }
  )
    .then((userInfo) => {
      res.status(200).send("Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

 

 

////////////////////////////
// reset password Post
router.post("/reset-password", async (req, res) => {
  try {
    // error message check
    const { error } = ResetPassValidation(req.body);

    if (error) {
      return res.status(202).send(error.details[0].message);
    }

    const { email } = req.body;

    //username duplicate check
    const userCheck = await Users.findOne({
      where: { email },
    });

    if (!userCheck)
      return res
        .status(400)
        .send(
          "We will send you the recover process if your email is registered with us"
        );

    const secret_key = `new-@user-pass-${userCheck.password}`; 
    
    // protect the link
    const token = jwt.sign(
      { email: userCheck.email, user_id: userCheck.user_id },
      secret_key,
      { expiresIn: "10m" } 
    );
 
      const encodedToken = token.replace(/\./g, '_');
      const urlEncodedToken = encodeURIComponent(encodedToken);

    // return res.send(`http://localhost:5173/reset-password/${userCheck.user_id}/${urlEncodedToken}`)
    const transporter = nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      port: `${process.env.EMAIL_PORT}`,
      // secure:true,
      auth: {
        user: `${process.env.RESET_USERNAME}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `"KMAnalysis" <${process.env.RESET_USERNAME}>`,
      to: email,
      subject: "Password Reset",
      html: `<p><b>KMANALYSIS Password Reset.</b></p>  <div> Click this  <a href='${process.env.WEBSITE}/reset-password/${userCheck.user_id}/${urlEncodedToken}' style='color:blue;'> Link </a> to reset your password. This link expires in 10 minutes. </div>  
  <div style='display:flex; justify-items:center; background-color:blue; color:white;position:absolute;border-radius:10%; padding:2px; bottom:0em; margin-top:30px; text-align:center'> KM Analysis</div>`,
    };

    // persist request
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      status: "Please check your email to continue the recovery process.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ data: "Unable to send to email", error: err });
  }
});

// reset password Get
router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;



  //username duplicate check
  const userCheck = await Users.findOne({
    where: {user_id: id },
  });
  if (!userCheck) return res.status(500).send("Not authorized");

  const secret_key = `new-@user-pass-${userCheck.password}`;

  try {
    const verify = jwt.verify(token, secret_key);
    res.status(200).send("verified");
  } catch (err) {
    res.status(500).send(err);
  }
});

// reset and update  password Post
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
 

  //username duplicate check
  const userCheck = await Users.findOne({
    where: { user_id : id },
  });
  if (!userCheck) return res.status(500).send("Not authorized");

  const secret_key = `new-@user-pass-${userCheck.password}`;
  
  const verify = jwt.verify(token, secret_key);

  if(!verify) return res.status(400).send('Error verifying')
  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // send and update info - database
  const updatepass = await Users.update(
    {
      password: hashedPassword,
    },
    { where: { user_id: id } }
  )
    .then((userInfo) => {
      res.status(200).send("Updated Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});
//////////////////////////////////////
 
//  get current user
router.get("/me", validateToken, async (req, res) => {
  var token =
    req.cookies.user ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    return res
      .status(400)
      .send("You cannot perform any activities until you are logged In");
  }

  verify(token, process.env.USERS, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      req.decoded = decoded;
      try {

        await Users.findByPk(
          req.decoded.id,
          {
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
              // include: [
              //   [
              //     sequelize.literal(`(
              //       SELECT GROUP_CONCAT(follow.follower_id)
              //       FROM follows AS follow
              //       WHERE follow.following_id = ${req.decoded.id}
              //     )`),
              //     "follower_ids",
              //   ],
              //   [
              //     sequelize.literal(`(
              //       SELECT GROUP_CONCAT(follow.following_id)
              //       FROM follows AS follow
              //       WHERE follow.follower_id = ${req.decoded.id}
              //     )`),
              //     "following_ids",
              //   ],
              // ]
            },


            
          },
          async (err, user) => {
            return (req.currentUser = user);
          }
        )
          .then((data) => res.status(200).json({ data }))
          .catch((err) =>
            {
              console.log(err)
              return res.status(403).send("Unable to fetch your requested data")
         } );
      } catch (err) {
        res.status(400).send(err);
      }
    }
  });
});

// log user out
router.get("/logout", (req, res, next) => {
  if (req.cookies.user) {
    res.clearCookie("user");
    res
      .status(202)
      .json({ auth: false, loggedIn: false, cookie: "No cookies" });
    res.end();
  } else {
    res
      .status(202)
      .json({ auth: false, loggedIn: false, cookie: "You are not logged in" });
    next();
  }

  next();
});

 

// update fullname
router.post("/update-fullname", validateToken, async (req, res) => {
  // error message check
  const { value, error } = userFullnameValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { id, fullname } = req.body;

  // send and update info - database
  const postMe = await Users.update(
    {
      fullname,
    },
    { where: { id } }
  )
    .then((userInfo) => {
      res.status(200).send("Fullname Updated Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});
 
 
// update bio
router.post("/update-bio", validateToken, async (req, res) => {
  // error message check
  const { value, error } = userBioValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { id, bio } = req.body;

  // send and update info - database
  const postMe = await Users.update(
    {
      bio,
    },
    { where: { id } }
  )
    .then((userInfo) => {
      res.status(200).send("Bio  Updated Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

//////////here
// update avatar
router.post("/update-avatar/:username", validateToken, uploaded, async (req, res) => {
  // error message check
 
  const { username } = req.params;

  if (!req.file) {
    return res.status(202).send("Ensure you have selected the right file and that the size is less that 3mb");
  }
  // username check 
  const userCheck = await Users.findOne({ 
    where: { username },
  });
  if (!userCheck) return res.status(202).send("not allowed!");

  // send and update info - database
  await Users.update(
    {
      profile_picture: req.file.path,
    },
    { where: { username } }
  )
    .then((userInfo) => {
      res.status(200).send("Avatar Updated Successfully");
    })
    .catch((err) => {
      return res.status(400).send(err);
      // .send("I think something might be wrong with your internet connection");
    });
});
/////////////////////////////

/////////////////////////////

// get A  user
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const findUser = await Users.findOne({
      where: { username: username },
      attributes: {
        exclude: ["password", "createdAt", "permission", "updatedAt"],
      },
    });

    if (!findUser) {
      return res.status(400).send("No User found");
    }

    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

 
 // follow a user
router.post("/follows/:userId", async (req, res) => {
  const { userId } = req.params;
  const { follower_id } = req.body;

  if (!follower_id) return res.status(400).send('Not allowed')

  const userCheckFollow = await Users.findOne({
    where: { id : userId },
  });
 
  if (!userCheckFollow) return res.status(400).send('Not user allowed')
 

  const userCheck = await Users.findOne({
    where: { id : follower_id },
  });
 
  if (!userCheck) return res.status(400).send('Not allowed')
 
  try {
    const alredyfollower = await Follow.findOne({
      where: { follower_id: follower_id, following_id: userId },
    });

    if (alredyfollower) {
      return res.status(202).send("Already following");
    }

    const follow = await Follow.create({ following_id: userId, follower_id });
    const followingUser = await Users.findOne({ where: { id: userId } });
    const followerUser = await Users.findOne({ where: { id: follower_id } });

    await followingUser.increment("follower_count");
    await followerUser.increment("following_count");


   return res.status(200).json(follow);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// unfollow a user
router.post("/unfollow/:userId", async (req, res) => {
  const { userId } = req.params;
  const { follower_id } = req.body;

  if (!follower_id) return res.status(400).send('Not allowed')
  
  const userCheckFollow = await Users.findOne({
    where: { id : userId },
  });
 
  if (!userCheckFollow) return res.status(400).send('Not user allowed')
 

  const userCheck = await Users.findOne({
    where: { id : follower_id },
  });
 
  if (!userCheck) return res.status(400).send('Not allowed')
 
  try {
    const alredyUnfollower = await Follow.findOne({
      where: { follower_id: follower_id, following_id: userId },
    });

    if (!alredyUnfollower) {
      return res.status(202).send("Already Unfollowed");
    }
 
    const follow = await Follow.destroy({
      where: { following_id: userId, follower_id },
    });
    const followingUser = await Users.findOne({ where: { id: userId } });
    const followerUser = await Users.findOne({ where: { id: follower_id } });

    await followingUser.decrement("follower_count");
    await followerUser.decrement("following_count");
    


    return res.status(200).json(follow);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// get list of followers for a user
router.get("/users/:userId/followers", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Users,
          as: "followers",
          attributes: [
            "username",
            "id",
            "profile_picture",
            "bio", 
            "verified",
            "following_count",
            "follower_count",
            [
              sequelize.literal(`(
                SELECT GROUP_CONCAT(follow.follower_id)
                FROM follows AS follow
                WHERE follow.following_id = ${userId}
              )`),
              "follower_ids",
            ],
          ],
          through: {
            model: Follow,
            attributes: [],
            joinTableAttributes: [],
          },
        },
      ],
    });


    return res.status(200).json(user.followers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// get list of users that a user is following
router.get("/users/:userId/following", async (req, res) => {
  const { userId } = req.params;
    
  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Users,
          as: "following",
          attributes: [
            "id",
            "username",
            "profile_picture",
            "bio",
            "verified",
            "following_count",
            "follower_count",
            [
              sequelize.literal(`(
                SELECT GROUP_CONCAT(follow.follower_id)
                FROM follows AS follow
                WHERE follow.follower_id = ${userId} AND follow.following_id = following.id
              )`),
              "follower_ids",
            ],
          ],
          through: {
            model: Follow,
            attributes: [],
            joinTableAttributes: [],
          },
        },
      ],
    });

    const theFollowing =  user?.following || []

    return res.status(200).json(theFollowing);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
});

 

// get users with isFollowing info
 

router.get("/users", async (req, res) => {
  try {
    const { search } = req.query;

    let whereClause = "";
    let replacements = [];

    if (search) {
      whereClause = `WHERE (users.username LIKE ? OR users.fullname LIKE ?)`;
      replacements = [`%${search}%`, `%${search}%`];
    }

    const users = await Users.sequelize.query(
      `SELECT
          users.id,
          users.user_id,
          users.profile_picture,
          users.username,
          users.fullname,
          users.email,
          users.kmp_points,
          users.bio,
          users.twitter,
          users.instagram,
          users.permission,
          users.verified,
          users.following_count,
          users.follower_count,
          GROUP_CONCAT(follow.following_id) AS following_ids
        FROM
          users
          LEFT JOIN follows AS follow ON users.id = follow.follower_id AND follow.following_id IS NOT NULL
        ${whereClause}
        GROUP BY
          users.id`,
      {
        replacements,
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
 