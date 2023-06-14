const express = require('express');
const router = express.Router();

const formData = require('express-form-data')//Håndter POST/PUT/PATCH hvor data Multioartfom
router.use(formData.parse())

//Modellen for en todo
const Todo = require('../models/todo.models')

//-------GET - ALLE-------
router.get('/', async (req, res) => {

  console.log('Todo GET ALL')

  try {

    let todos = await Todo.find()

    return res.status(200).json({ Records: todos })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }

  res.status(200).json({ message: "Du har kaldt todos GET" })

})

//-------GET - En specifik ID-------
router.get('/:id', async (req, res) => {

  console.log('Todo GET BY ID')

  try {

    let todo = await Todo.findById(req.params.id)
    return res.status(200).json({ Records: todo })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }


  res.status(200).json({ message: "Du har kaldt todos GET ud fra ID " + req.params.id })
})

//-------POST --------
router.post('/', async (req, res) => {

  console.log('Todo POST', req.body)

  try {
    let todo = new Todo(req.body) //gør en ny todo klar med data fra requests body
    await todo.save() //Gem todo i db

    return res.status(201).json({ message: "Ny todo er oprettet", created: todo })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }


  res.status(200).json({ message: "Du har kaldt todos POST" })

})

//-------PUT--------
router.put('/:id', async (req, res) => {

  console.log("Todo GET", req.body)

  try {

    let todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if (todo === null) {
      return res.status(404).json({ message: "Todo kunne ikke findes og rettets" })
    }

    return res.status(200).json({ message: "Todo er opdateret", updated: todo })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }

  res.status(200).json({ message: "Du har kaldt todos PUT" })

})

//-------DELETE --------
router.delete('/:id', async (req, res) => {

  console.log('DELETE BY ID')

  try {

    let todo = await Todo.findByIdAndDelete(req.params.id)

    if (todo === null) {
      return res.status(404).json({ message: "Todo kunne ikke findes og rettets" })
    }
    return res.status(200).json({ todo })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }

  res.status(200).json({ message: "Du har kaldt todos DELETE" })

})

//HUSK !!!
module.exports = router;
