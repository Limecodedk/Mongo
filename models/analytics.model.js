const mongoose = require('mongoose')

// skema som beskriver en Reviws
const analyticsSchema = new mongoose.Schema({

  ip_adress: {
    type: String,
    required: [true, 'ip er påkrævet']
  },
  Country: {
    type: String,
    required: [true, 'Land er påkrævet']
  },
  date: {
    type: String,
    required: [true, 'Dato er påkrævet']
  },

})


module.exports = mongoose.model('Analytics', analyticsSchema, 'analytics')