const Message = require("../models/Message");
const User = require("../models/User");

// Send a message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;
  const newMessage = new Message({ sender, receiver, content });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

// Get messages
exports.getMessages = async (req, res) => {
  const { userId, buddyId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: buddyId },
        { sender: buddyId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Get user chat list
exports.getChatList = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the authenticated request

  try {
    // Find messages where the user is either the sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 }); // Sort messages by the most recent first

    // Create a map to aggregate chats
    const chatMap = new Map();

    messages.forEach((msg) => {
      // Determine the contact ID
      const contactId = msg.sender.equals(userId) ? msg.receiver : msg.sender;

      // If the contact does not exist in the map, create a new entry
      if (!chatMap.has(contactId)) {
        chatMap.set(contactId, {
          id: contactId,
          lastMessage: msg.content,
          timestamp: msg.timestamp, // Get the timestamp of the last message
          unreadCount: 0, // Initialize unread count
        });
      } else {
        // Update the last message and timestamp for existing contacts
        chatMap.get(contactId).lastMessage = msg.content;
        chatMap.get(contactId).timestamp = msg.timestamp; // Update to the latest message timestamp
      }

      // Increment unread count if the message was received and is unread
      if (msg.receiver.equals(userId) && !msg.read) {
        chatMap.get(contactId).unreadCount += 1; // Increase unread count
      }
    });

    // Convert map to array and populate user details
    const chatList = await Promise.all(
      Array.from(chatMap.keys()).map(async (id) => {
        const user = await User.findById(id).select("username profileImage");
        const chatDetails = chatMap.get(id);
        // Return structured chat information
        return {
          id: chatDetails.id,
          name: user.username,
          lastMessage: chatDetails.lastMessage,
          time: new Date(chatDetails.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          unreadCount: chatDetails.unreadCount,
          avatarUrl: user.profileImage,
        };
      })
    );

    // Sort the final chat list by timestamp (descending)
    chatList.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(chatList);
  } catch (error) {
    console.error("Error fetching chat list:", error);
    res.status(500).json({ message: "Error fetching chat list", error });
  }
};
