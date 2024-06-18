const complaintRouter = require('express').Router()
const Users = require('../models/Users.js')
const uniqid = require('uniqid')

const { validateToken } = require('../token/verifyToken.js')
const Complaint = require('../models/Complaint.model.js')

// complaintRouter.post('/create', validateToken, async (req, res) => { // ! PUT VALIDATETOKEN BACK
complaintRouter.post('/create', async (req, res) => {


  const { userId, title, messageContent } = req.body

  const idUnique = uniqid()

  try {
    const User = await Users.findByPk(userId)

    if (!User) {
      return res.status(400).json({ message: 'You are not allowed!!!' })
    }

    const complaint = await Complaint.create({
      messages: [
            {
                id: idUnique,
                sender: "user",
                messageContent,
                dateSent: new Date()
            }
        ],
      title,
      userId,
    })

    if (complaint) {
      return res.status(200).send('Posted successfully')
    } else {
      return res.status(500).send('Forbidden!')
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .send('I think something might be wrong with your internet connection')
  }
})

module.exports = complaintRouter