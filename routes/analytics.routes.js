const express = require('express');
const router = express.Router();

//Modellen for en Analytics
const Analytics = require('../models/analytics.models')

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

  console.log('Analytics GET ALL')

  try {

    let analytics = await Analytics.find()
    return res.status(200).json({ analytics })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }

})

//-------GET - En specifik ID-------
router.get('/:id', async (req, res) => {

  console.log('Analytics GET BY ID')

  try {
    let analytics = await Analytics.findById(req.params.id)
    return res.status(200).json({ Records: analytics })
  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------POST --------
router.post('/', upload.single('profileimage'), async (req, res) => {

  console.log('Analytics POST', req.body)

  try {
    let analytics = new Analytics(req.body) //gør en ny Analytics klar med data fra requests body
    review.profileimage = req.file.filename //Tilføj images filename til den nye Analytics

    await analytics.save() //Gem Analytics i db

    return res.status(201).json({ message: "Ny Review er oprettet", created: analytics })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }
})

//-------PUT--------
router.put('/:id', upload.single('profileimage'), async (req, res) => {

  console.log("AnalyticsGET", req.body)

  try {

    //Hvis der kommer en fil med i requestet = billedet skal rettet (og ellers ikke)
    if (req.file) {
      req.body.profileimage = req.file.filename
    }

    let analytics = await Analytics.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if (review === null) {
      return res.status(404).json({ message: "Analytics kunne ikke findes og rettets" })
    }

    return res.status(200).json({ message: "Analytics er opdateret", updated: review })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------DELETE --------
router.delete('/:id', async (req, res) => {

  console.log('DELETE BY ID')

  try {

    let analytics = await Analytics.findByIdAndDelete(req.params.id)

    if (analytics === null) {
      return res.status(404).json({ message: "Analytics kunne ikke findes og rettets" })
    }
    return res.status(200).json({ analytics })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//HUSK !!!
module.exports = router;
