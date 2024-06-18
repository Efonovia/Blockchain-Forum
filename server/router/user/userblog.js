const userblog = require('express').Router()
const Users = require('../../models/Users.js')
const UserBlogs = require('../../models/userblog.js')
const uniqid = require('uniqid')
const sequelize = require('../../db/db')

const { validateToken } = require('../../token/verifyToken.js')
const { blogValidationUser, blogValidationComment } = require('./validation.js')
const upload = require('./imageValidation.js')
const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const UserBlogLikes = require('../../models/UserBlogLikes.js')
const UserComments = require('../../models/UserComments.js')

// make blog post
userblog.post('/blog-post', validateToken, async (req, res) => {
  // error message check
  const { error } = blogValidationUser(req.body)

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const { user_id, content } = req.body

  const idUnique = uniqid()

  try {
    // find the user associated with the given userId
    const User = await Users.findByPk(user_id)

    // If the user doesn't exist, return an error
    if (!User) {
      return res.status(400).json({ message: 'You are not allowed!!!' })
    }

    // Create a new blog post
    const blog = await UserBlogs.create({
      content,
      images: 'not available',
      ref: idUnique,
      user_id,
    })

    if (blog) {
      // Return the created blog post
      return res.status(200).send('Posted successfully')
    } else {
      return res.status(500).send('Forbidden!')
    }
  } catch (err) {
    // Return an error response
    console.log(err)
    return res
      .status(500)
      .send('I think something might be wrong with your internet connection')
  }
})
// make blog post END

userblog.get('/blog-post', async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const blogs = await UserBlogs.findAll(
      {
        include: [
          {
            model: Users,
            as: 'users',
            attributes: ['username', 'profile_picture', 'verified'],
          },
          {
            model: UserBlogLikes,
            as: 'userbloglikes',
            attributes: ['user_id'],
          },
        ],
        attributes: [
          'id',
          'content',
          'user_id',
          'ref',
          'comments_count',
          'likes_count',
          'createdAt',
        ],
        order: [['likes_count', 'DESC']],
      },
      { transaction },
    )
    await transaction.commit()

    return res.status(200).send(blogs)
  } catch (error) {
    await transaction.rollback()
    console.log(error)
    return res.status(400).send('Error trying to fetch data')
  }
})

userblog.get('/blog-post/:postID/data', async (req, res) => {
  const { postID } = req.params

  console.log("goingggg")
  try {
    const blogs = await UserBlogs.findOne({
      where: { id: postID },
      include: [
        {
          model: UserComments,
          as: 'usercomments',
          attributes: ['user_id', 'blog_id', 'comments', 'createdAt'],
          include: [
            {
              model: Users,
              as: 'users',
              attributes: ['username', 'profile_picture', 'verified', 'id'],
            },
          ],
        },
        {
          model: Users,
          as: 'users',
          attributes: ['username', 'profile_picture', 'verified'],
        },
      ],
      attributes: [
        'id',
        'content',
        'images',
        'user_id',
        'ref',
        'comments_count',
        'likes_count',
        'createdAt',
      ],
    })
    return res.status(200).send(blogs)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Error")
  }
})

userblog.get('/user-post/:user_id/', async (req, res) => {
  const { user_id } = req.params

  try {
    const blogs = await UserBlogs.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: UserComments,
          as: 'usercomments',
          attributes: ['user_id', 'blog_id', 'comments', 'createdAt'],
        },
        {
          model: Users,
          as: 'users',
          attributes: ['username', 'profile_picture', 'verified'],
        },
        {
          model: UserBlogLikes,
          as: 'userbloglikes',
          attributes: ['user_id'],
        },
      ],
      attributes: [
        'id',
        'content',
        'image',
        'user_id',
        'ref',
        'comments_count',
        'likes_count',
        'createdAt',
      ],
    })
    return res.status(200).send(blogs)
  } catch (error) {
    return res.status(400).send(error)
  }
})

// like a apost
userblog.post('/like/:postID', validateToken, async (req, res) => {
  const { postID } = req.params
  const { user_id } = req.body

  const checkUser = await Users.findOne({
    where: { id: user_id },
  })

  if (!checkUser) return res.status(400).send('Not allowed')

  const blogUser = await UserBlogs.findOne({
    where: { id: postID },
  })

  const pointUser = await Users.findOne({
    where: { id: blogUser.user_id },
  })

  // return res.status(400).json(pointUser)

  try {
    const alredyLiked = await UserBlogLikes.findOne({
      where: { user_id: user_id, blog_id: postID },
    })

    if (alredyLiked) {
      return res.status(202).send('Already Liked this post')
    }

    const Like = await UserBlogLikes.create({
      user_id,
      blog_id: postID,
    })
    const likeBlog = await UserBlogs.findOne({ where: { id: postID } })

    await likeBlog.increment('likes_count')
    // await likeBlog.increment("kmp_points", { by: 1 });
    await pointUser.increment('kmp_points')

    res.status(200).json(Like)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

userblog.post('/unlike/:postID', validateToken, async (req, res) => {
  const { postID } = req.params
  const { user_id } = req.body

  const checkUser = await Users.findOne({
    where: { id: user_id },
  })

  if (!checkUser) return res.status(400).send('Not allowed')

  const blogUser = await UserBlogs.findOne({
    where: { id: postID },
  })

  const pointUser = await Users.findOne({
    where: { id: blogUser.user_id },
  })

  try {
    const alredyLiked = await UserBlogLikes.findOne({
      where: { user_id: user_id, blog_id: postID },
    })

    if (!alredyLiked) {
      return res.status(202).send('Already unLiked this post')
    }

    const unLike = await UserBlogLikes.destroy({
      where: { user_id: user_id, blog_id: postID },
    })
    const likeBlog = await UserBlogs.findOne({ where: { id: postID } })

    await likeBlog.decrement('likes_count')
    await pointUser.decrement('kmp_points')

    res.status(200).json(unLike)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

userblog.post('/comment-blog-post', validateToken, async (req, res) => {
  const { user_id, comments, blog_id } = req.body

  // error message check
  const { error } = blogValidationComment(req.body)

  const checkUser = await Users.findOne({
    where: { id: user_id },
  })

  if (!checkUser) return res.status(400).send('Not allowed')

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  try {
    // find the user associated with the given userId
    const User = await Users.findByPk(user_id)

    // If the user doesn't exist, return an error
    if (!User) {
      return res.status(400).json({ message: 'You are not allowed!!!' })
    }

    const commentBlog = await UserComments.create({
      blog_id: blog_id,
      comments: comments,
      user_id: user_id,
    })

    const commentsBlog = await UserBlogs.findOne({ where: { id: blog_id } })

    if (commentBlog && commentsBlog) {
      await commentsBlog.increment('comments_count')
      return res.status(200).send('commented successfully')
    } else {
      return res.status(500).send('Forbidden!')
    }
  } catch (err) {
    // Return an error response
    console.log(err)
    return res.status(500).send("I think something might be wrong with your internet connection");
  }
})

module.exports = userblog
