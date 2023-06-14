const mongoose = require('mongoose')

// skema som beskriver en todo
const todoSchema = new mongoose.Schema({

  titel: {
    type: String,
    required: [true, 'Titel er påkrævet']
  },
  beskrivelse: {
    type: String,
    required: [true, 'Beskrivelse']
  },
  afsluttet: {
    type: Boolean,
    defaul: false
  }
})


module.exports = mongoose.model('Todo', todoSchema, 'todos')