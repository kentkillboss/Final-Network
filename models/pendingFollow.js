const mongoose = require("mongoose");

const pdfollowSchema = new mongoose.Schema(
  {
    senderId: mongoose.Types.ObjectId,
    recipientId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pendingFollow", pdfollowSchema);
