const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Get messages
exports.getMessages = async (req, res) => {
    const { userId, buddyId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: buddyId },
                { sender: buddyId, receiver: userId }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};
