const mongoose = require('mongoose')

// skema som beskriver en Reviws
const reviewSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Navn er påkrævet']
  },
  email: {
    type: String,
    required: [true, 'Email er påkrævet']
  },
  quote: {
    type: String,
    required: [true, 'Review er påkrævet']
  },
  profileimage: {
    type: String,
    required: [true, 'Foto er påkrævet']
  }
})


module.exports = mongoose.model('Review', reviewSchema, 'reviews')