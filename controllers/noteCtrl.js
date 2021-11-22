const Notes = require("../models/noteModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const noteCtrl = {
  createNote: async (req, res) => {
    try {
      const { title, content, category } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json({ msg: "Hãy nhập đầy đủ các trường" });
      }

      const newNote = new Notes({
        title,
        content,
        category,
        user: req.user._id,
      });

      await newNote.save();
      res.json({
        msg: "Create Notes",
        newNote: {
          ...newNote._doc,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNotes: async (req, res) => {
    try {
      const features = new APIfeatures(
        Notes.find({
          user: req.user._id,
        }),
        req.query
      ).paginating();
      const notes = await features.query.sort("-createdAt");

      res.json({
        msg: "Success!",
        result: notes.length,
        notes,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNoteById: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) return res.status(400).json({ msg: "Note không tồn tại" });

      res.json({ note });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const note = await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          category,
        }
      );
      res.json({
        msg: "Update Notes",
        newNote: {
          ...note._doc,
          title,
          content,
          category,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      const note = await Notes.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      res.json({
        msg: "Deleted Note.",
        newNote: {
          ...note,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = noteCtrl;
