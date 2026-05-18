import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  duration: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  trailer: {
    type: String,
    required: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Movie', movieSchema);