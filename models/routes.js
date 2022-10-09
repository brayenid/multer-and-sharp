import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.replace(/\s+/g, '')
    cb(null, file.fieldname + '-' + filename)
  },
})
const upload = multer({
  storage: storage,
}).single('imgTest')

router.post('/', upload, async (req, res) => {
  try {
    const { filename: image } = req.file
    //sharp it
    await sharp(req.file.path).resize(400).jpeg({ quality: 90 }).toFile(path.resolve(req.file.destination, 'resized', image))
    //remove original image
    fs.unlinkSync(req.file.path)
    res.status(201).send({
      message: 'success',
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
