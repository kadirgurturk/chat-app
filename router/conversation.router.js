const express = require("express")
const router = express.Router()
const conversationController = require("../controllers/conversation.controler")

router.get('/getUsersConversations', conversationController.getUsersConversations)
router.post('/createConversation', conversationController.createConversation)
router.post('/addUserConversation', conversationController.addUserConversation)

module.exports = router