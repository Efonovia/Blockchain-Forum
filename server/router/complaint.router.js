const complaintRouter = require('express').Router()
const Users = require('../models/Users.js')
const uniqid = require('uniqid')

const { validateToken } = require('../token/verifyToken.js')
const Complaint = require('../models/Complaint.model.js')

// complaintRouter.post('/create', validateToken, async (req, res) => { // ! PUT VALIDATETOKEN BACK FOR ALL CONTROLLERS
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
                dateSent: new Date(),
                seen: false
            }
        ],
      title,
      userId,
    })

    if (complaint) {
      return res.status(201).json({ ok: true, id: complaint.id, message: 'Posted successfully' })
    } else {
      return res.status(500).json({ ok: false, message: 'Forbidden!' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ ok: false, message: 'I think something might be wrong with your internet connection' })
  }
})


complaintRouter.get('/all', async (req, res) => {
  try {
    // Fetch all complaints from the database
    const complaints = await Complaint.findAll();

    const complaintsWithJsonMessages = complaints.map(complaint => {
      const formattedMessages = JSON.parse(complaint.messages)
      return {
        ...complaint.get({ plain: true }),
        messages: formattedMessages,
        unseen: formattedMessages.filter(msg => msg.sender ==="user" && !msg.seen).length
      };
    });

    // Return the complaints
    return res.status(200).json({ ok: true, body: complaintsWithJsonMessages});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


complaintRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch all complaints for the user
    const complaints = await Complaint.findAll({
      where: { userId },
    });

    const complaintsWithJsonMessages = complaints.map(complaint => {
      const formattedMessages = JSON.parse(complaint.messages)
      return {
        ...complaint.get({ plain: true }),
        messages: formattedMessages,
        unseen: formattedMessages.filter(msg => msg.sender ==="admin" && !msg.seen).length
      };
    });

    return res.status(200).json({ ok: true, body: complaintsWithJsonMessages});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


complaintRouter.post('/:complaintId/updateMessages', async (req, res) => {
  const { complaintId } = req.params;
  const { messageIds } = req.body;

  if (!Array.isArray(messageIds) || messageIds.length === 0) {
    return res.status(400).json({ message: 'Message IDs should be a non-empty array' });
  }

  try {
    // Fetch the complaint by ID
    const complaint = await Complaint.findByPk(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the seen property of the messages with the provided IDs
    const updatedMessages = JSON.parse(complaint.messages).map(message => {
      if (messageIds.includes(message.id)) {
        return { ...message, seen: true };
      }
      return message;
    });

    // Save the updated messages back to the complaint
    complaint.messages = updatedMessages;
    await complaint.save();

    return res.status(200).json({ ok: true, message: 'Messages updated successfully', body: complaint });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


complaintRouter.post('/:complaintId/addMessage', async (req, res) => {
  const { complaintId } = req.params;
  const { sender, messageContent } = req.body;

  // Validate input
  if (!messageContent) {
    return res.status(400).json({ message: 'Message content is required' });
  }

  const idUnique = uniqid();

  try {
    // Check if the complaint exists
    const complaint = await Complaint.findByPk(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Add message to the existing messages array
    console.log("...complaint.messages", JSON.parse(complaint.messages))
    let newMessages = JSON.parse(complaint.messages)
    newMessages.push({
      id: idUnique,
      sender,
      messageContent,
      dateSent: new Date(),
      seen: false
    })
    const updatedComplaint = await complaint.update({
      messages: newMessages
    });

    return res.status(200).json({ ok: true, message: 'Message added successfully', body: updatedComplaint });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


module.exports = complaintRouter;