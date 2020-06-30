
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config')

const app = express()

require('dotenv').config();

const cloud_name = `${process.env.CLOUD_NAME}`
const api_key = `${process.env.API_KEY}`
const api_secret = `${process.env.API_SECRET}`

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

app.use(cors(
    {
    origin: '*'
    // origin: CLIENT_ORIGIN
    }
))

app.use(formData.parse())

app.post('/image-upload', (req,res) => {
    const values = Object.values(req.files)
    console.log(values)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise
        .all(promises)
        .then(results => res.json(results))
        .catch(err => {
            res.json(err.message)
        })
})

app.listen(process.env.PORT || 8080, () => console.log('okk'))

