const express = require('express');
const router = express.Router();

//Modellen for en Review
const Review = require('../models/review.models')

//----Multer til upload af filer/billeder
//---------------------------------------
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      //cb(null, file.originalname)
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
})

//-------GET - ALLE-------
router.get('/', async (req, res) => {

  console.log('Review GET ALL')

  try {

    let review = await Review.find()
    return res.status(200).json({ review })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }

})

//-------GET - En specifik ID-------
router.get('/:id', async (req, res) => {

  console.log('Review GET BY ID')

  try {
    let review = await Review.findById(req.params.id)
    return res.status(200).json({ Records: review })
  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------POST --------
router.post('/', upload.single('profileimage'), async (req, res) => {

  console.log('Review POST', req.body)

  try {
    let review = new Review(req.body) //gør en ny Review klar med data fra requests body
    review.profileimage = req.file.filename //Tilføj images filename til den nye review

    await review.save() //Gem Review i db

    return res.status(201).json({ message: "Ny Review er oprettet", created: review })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }
})

//-------PUT--------
router.put('/:id', upload.single('profileimage'), async (req, res) => {

  console.log("Review GET", req.body)

  try {

    //Hvis der kommer en fil med i requestet = billedet skal rettet (og ellers ikke)
    if (req.file) {
      req.body.profileimage = req.file.filename
    }

    let review = await Review.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if (review === null) {
      return res.status(404).json({ message: "Review kunne ikke findes og rettets" })
    }

    return res.status(200).json({ message: "Review er opdateret", updated: review })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------DELETE --------
router.delete('/:id', async (req, res) => {

  console.log('DELETE BY ID')

  try {

    let review = await Review.findByIdAndDelete(req.params.id)

    if (review === null) {
      return res.status(404).json({ message: "Review kunne ikke findes og rettets" })
    }
    return res.status(200).json({ review })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//HUSK !!!
module.exports = router;
