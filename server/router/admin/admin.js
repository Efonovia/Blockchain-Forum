const administrator = require("express").Router();
const uniqid = require("uniqid");
const {
  AdminRegValidation,
  LoginValidation,
  passwordUpdateValidation,
} = require("./validation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  validateTokenAdmin,
  validateTokenSuperAdmin,
} = require("../../token/verifyToken.js");
const { verify } = require("jsonwebtoken");
const sequelize = require("../../db/db");
const Users = require("../../models/Users.js");
const Admin = require("../../models/admin.js");
const { QueryTypes } = require("sequelize");
const Follow = require("../../models/Follow.js");
const UserBlogLikes = require("../../models/UserBlogLikes.js");
const UserBlogs = require("../../models/userblog.js");
const UserComments = require("../../models/UserComments.js");  
dotenv.config();

let giveToken;
// add admin USERS
administrator.post("/register", validateTokenSuperAdmin, async (req, res) => {
  // error message check
  const { error } = AdminRegValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { username, roles } = req.body;

  //username duplicate check
  const userCheck = await Admin.findOne({
    where: { username },
  });
  if (userCheck) return res.status(202).send("username already exist");

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(username, salt);

  const idUnique = uniqid();
  // send and save info - database
  await Admin.create({
    username,
    roles,
    admin_id: idUnique,
    password: hashedPassword,
  })
    .then((userInfo) => {
     return res.status(200).send("New Admin created Successful");
    })
    .catch((err) => {
     return res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

// LOGIN
administrator.post("/login", async (req, res, next) => {
  // error message check
  const { error } = LoginValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { username, password } = req.body;

  //Email duplucate check
  const userCheck = await Admin.findOne({
    where: { username },
  });
  if (!userCheck) return res.status(202).send("username doesnt exists");

  //  check Password
  await bcrypt
    .compare(password, userCheck.password)
    .then((result) => {
      if (!result) return res.status(202).send("Invalid Password");

      let adminname = "administrator";

      giveToken = jwt.sign(
        {
          id: userCheck.id,
          username: userCheck.username,
        },
        process.env.COOKIE,
        { expiresIn: "1d" }
      );

      if (userCheck.roles === "SuperAdmin") {
        adminname = "SuperAdmin";
        giveToken = jwt.sign(
          {
            id: userCheck.id,
            username: userCheck.username,
          },
          process.env.PERMISIO,
          { expiresIn: "1d" }
        );
      }

      const newCookie = res.cookie(adminname, giveToken, {
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
 
      });

      // const newCookie = res.cookie(adminname, giveToken, {
      //   maxAge: 24 * 60 * 60 * 1000,
      //   path: "/",
      //   sameSite: "none",
      //   httpOnly: false,
      //   secure:true, 
      //   domain: '.kmanalysis.com',
      // });

      if (newCookie) {
      return  res.status(200).json({
          data: "Success. Redirecting...",
          loggedIn: true,
          role: adminname,
          adminId: userCheck.admin_id,
         cookie: req.cookies.SuperAdmin ? req.cookies.SuperAdmin : req.cookies.administrator  
        });
      } else {
        res.clearCookie("administrator");
        res.clearCookie("SuperAdmin");
        res.status(202).json({ auth: false, loggedIn: false });
      }
    })
    .catch((e) => {
    return  res.status(400).send(e);
    });

  next();
});

// LOGIN
administrator.get("/logged", validateTokenAdmin, async (req, res, next) => {
  var token =
    req.cookies.SuperAdmin ||
    req.cookies.administrator ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (!token) {
    return res
      .status(400)
      .send("You cannot perform any activities until you are logged In");
  }
  verify(
    token,
    process.env.COOKIE || process.env.PERMISIO,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.decoded = decoded;
        await Admin.findByPk(req.decoded.id, async (err, user) => {
          return (req.currentUser = user);
        })
          .then((data) => res.status(200).json({ data }))
          .catch((err) =>
            res.status(403).send("Unable to fetch your requested data")
          );
      }
    }
  );
});

// logout
administrator.get("/logout", (req, res, next) => {
  if (req.cookies.administrator) {
    res.clearCookie("administrator");
    res.clearCookie("SuperAdmin");
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

administrator.post("/update-password", validateTokenAdmin, async (req, res) => {
  // error message check
  const { error } = passwordUpdateValidation(req.body);

  if (error) {
    return res.status(202).send(error.details[0].message);
  }

  const { id, password } = req.body;

  // encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // send and update info - database
  const postMe = await Admin.update(
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

// get all admin users
administrator.get("/admin-users", validateTokenSuperAdmin, (req, res) =>
  Admin.findAll({
    attributes: ["id", "admin_id", "username", "roles", "createdAt"],
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(202).send("Unable to fetch your requested data"))
);

// get all users
administrator.get("/users", validateTokenAdmin, async (req, res) => {
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
          users.createdAt, 
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

// get verified users
administrator.get("/verified-users", validateTokenAdmin, (req, res) =>
  Users.findAll({
    where: {
      verified: true,
    },
    attributes: {
      exclude: ["updatedAt", "password"],
    },
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(202).send("Unable to fetch your requested data"))
);

// get suspended users
administrator.get("/suspended-users", validateTokenAdmin, (req, res) =>
  Users.findAll({
    where: {
      suspend: true,
    },
    attributes: {
      exclude: ["updatedAt", "password"],
    },
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(202).send("Unable to fetch your requested data"))
);

// get single user info
administrator.get("/users/:username", validateTokenAdmin, async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send("error");
  }

  try {
    const data = await Users.findAll({
      where: { username },

      attributes: {
        exclude: ["updatedAt", "password"],
      },
    });

    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    return res.status(400).send("Unable to fetch your requested data");
  }
});

// suspend user
administrator.post(
  "/suspension-suspend",
  validateTokenAdmin,
  async (req, res) => {
    const { user_id } = req.body;
    //username duplicate check
    const userCheck = await Users.findOne({
      where: { user_id },
    });

    if (!userCheck) return res.status(400).send("Not allowed");

    // send and update info - database
    await Users.update(
      {
        suspend: true,
      },
      { where: { user_id } }
    )
      .then((userInfo) => {
        res.status(200).send("Suspension Updated Successfully");
      })
      .catch((err) => {
        res
          .status(400)
          .send(
            "I think something might be wrong with your internet connection"
          );
      });
  }
);


 

 

// update suspension --lift
administrator.post(
  "/update-suspension-suspend",
  validateTokenAdmin,
  async (req, res) => {
    const { user_id } = req.body;
    //username duplicate check
    const userCheck = await Users.findOne({
      where: { user_id },
    });

    if (!userCheck) return res.status(400).send("Not allowed");

    // send and update info - database
    const postMe = await Users.update(
      {
        suspend: false,
      },
      { where: { user_id } }
    )
      .then((userInfo) => {
        res.status(200).send("Suspension Updated Successfully");
      })
      .catch((err) => {
        res
          .status(400)
          .send(
            "I think something might be wrong with your internet connection"
          );
      });
  }
);

// verify user
administrator.post("/verify-user", validateTokenAdmin, async (req, res) => {
  const { user_id } = req.body;
  //username duplicate check
  const userCheck = await Users.findOne({
    where: { user_id },
  });

  if (!userCheck) return res.status(400).send("Not allowed");

  // send and update info - database
  const postMe = await Users.update(
    {
      verified: true,
    },
    { where: { user_id } }
  )
    .then((userInfo) => {
      res.status(200).send("Verified  Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

// unverify user
administrator.post("/unverify-user", validateTokenAdmin, async (req, res) => {
  const { user_id } = req.body;
  //username duplicate check
  const userCheck = await Users.findOne({
    where: { user_id },
  });

  if (!userCheck) return res.status(400).send("Not allowed");

  // send and update info - database
  const postMe = await Users.update(
    {
      verified: false,
    },
    { where: { user_id } }
  )
    .then((userInfo) => {
      return res.status(200).send("Unverified Successfully");
    })
    .catch((err) => {
      return res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

// permission user
administrator.post("/allow-user", validateTokenAdmin, async (req, res) => {
  const { user_id } = req.body;
  //username duplicate check
  const userCheck = await Users.findOne({
    where: { user_id },
  });

  if (!userCheck) return res.status(400).send("Not allowed");

  // send and update info - database
  await Users.update(
    {
      permission: true,
    },
    { where: { user_id } }
  )
    .then((userInfo) => {
      res.status(200).send("Allowed  Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});

// permission disallow user
administrator.post("/disallow-user", validateTokenAdmin, async (req, res) => {
  const { user_id } = req.body;

  //username duplicate check
  const userCheck = await Users.findOne({
    where: { user_id },
  });

  if (!userCheck) return res.status(400).send("Not allowed");

  // send and update info - database
  await Users.update(
    {
      permission: false,
    },
    { where: { user_id: user_id } }
  )
    .then((userInfo) => {
      res.status(200).send("Disallowed Successfully");
    })
    .catch((err) => {
      res
        .status(400)
        .send("I think something might be wrong with your internet connection");
    });
});
 

 ///////-----  USERS ------////////////////

// get all posts with ld
administrator.get(
  "/preview-user/:id/",
  async (req, res) =>
    await Users.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => res.status(200).send(data))
      .catch((err) =>
        res.status(400).send("Unable to fetch your requested data")
      )
);

// delete  user with ld
administrator.post("/delete-user", validateTokenAdmin, async (req, res) => {
  const { user_id, admin_id } = req.body;

  const userCheck = await Users.findOne({
    where: { user_id },
  });

  if (!userCheck) return res.status(400).send("Not allowed. Wrong User");

  const users_id = userCheck.id;

  const adminCheck = await Admin.findOne({
    where: { id: admin_id },
  });

  if (!adminCheck) return res.status(400).send("Not found");

  if (adminCheck.roles !== "SuperAdmin")
    return res.status(400).send("Not allowed");

  const transaction = await sequelize.transaction();

  try {
    const deleteData = await Users.destroy({
      where: {
        id: users_id,
      },
      include: [
        {
          model: Follow,
          as: "Following",
          onDelete: "CASCADE",
        },
        {
          model: Follow,
          as: "Followers",
          onDelete: "CASCADE",
        },
        {
          model: UserBlogLikes,
          as: "userbloglikes",
          onDelete: "CASCADE",
        },
        {
          model: UserBlogs,
          as: "userblog",
          onDelete: "CASCADE",
        },
        {
          model: UserComments,
          as: "usercomments",
          onDelete: "CASCADE",
        },
        // Include any other related models here
      ],
    });

    if (deleteData) {
      await transaction.commit();
      return res.status(200).send("Deleted Successfully");
    }
   
  } catch (err) {
    await transaction.rollback();
    return res.status(400).send(err);
  }
});




// delete  adminuser with ld
administrator.post("/delete-admin", validateTokenSuperAdmin, async (req, res) => {
  const { id, role } = req.body;

  

  const adminCheck = await Admin.findOne({
    where: { id },
  });

  if (!adminCheck) return res.status(400).send("Not found");

  if (role !== "SuperAdmin")
    return res.status(400).send("Not allowed");

  const transaction = await sequelize.transaction();

  try {
    const deleteData = await Admin.destroy({
      where: {
        id: id,
      },
    });

    if (deleteData) {
      await transaction.commit();
      return res.status(200).send("Deleted Successfully");
    }
   
  } catch (err) {
    await transaction.rollback();
    return res.status(400).send(err);
  }
});

 
module.exports = administrator;
