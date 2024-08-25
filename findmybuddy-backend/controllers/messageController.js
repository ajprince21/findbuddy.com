const Message = require("../models/messages");
const User = require("../models/users");

// Send a message
exports.sendMessage = async (req, res) => {
  const sender_id = req?.user?._id || req?.user?.id;
  const { receiver_id, content } = req.body;
  const newMessage = new Message({ sender_id, receiver_id, content });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get messages
exports.getMessages = async (req, res) => {
  const buddyId = req.params.buddyId;
  const userId = req?.user?._id || req?.user?.id;
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: buddyId },
        { sender_id: buddyId, receiver_id: userId },
      ],
    }).sort({ created_at: 1 });
    const updatedMessageData = messages.map((msg) => ({
      ...msg.toObject(),
      sender: msg.sender_id?.equals(userId) ? "me" : "them",
    }));
    res.json(updatedMessageData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Get user chat list
exports.getChatList = async (req, res) => {
  const userId = req.user.id;

  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 });

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

    // Fetch users' details in a single query
    const contactIds = Array.from(chatMap.keys());
    const users = await User.find({ _id: { $in: contactIds } }).select(
      "username profileImage"
    );

    // Create a mapping from user ID to user object for quick lookup
    const userMap = new Map();
    users.forEach((user) => userMap.set(user._id.toString(), user));

    // Convert map to array and populate user details
    const chatList = Array.from(chatMap.values()).map((chatDetails) => {
      const user = userMap.get(chatDetails.id.toString());
      return {
        id: chatDetails.id,
        name: user ? user.username : "Unknown User",
        lastMessage: chatDetails.lastMessage,
        time: new Date(chatDetails.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unreadCount: chatDetails.unreadCount,
        avatarUrl: user ? user.profileImage : null,
      };
    });

    // Sort the final chat list by timestamp (descending)
    chatList.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(chatList);
  } catch (error) {
    console.error("Error fetching chat list:", error);
    res.status(500).json({ message: "Error fetching chat list", error });
  }
};
