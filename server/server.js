require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config')

const app = express()

cloudinary.config({
    cloud_name: 'dfulxq7so',
    api_key: '842388283784946',
    api_secret: 'S29wX1Wd2y5oWt8rK0JWawt9u8o'
})

app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(formData.parse())

app.post('/image-upload', (req,res) => {
    const values = Object.values(req.files)
    console.log(values)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise
        .all(promises)
        .then(results => res.json(results))
})

app.listen(process.env.PORT || 8080, () => console.log('okk'))

