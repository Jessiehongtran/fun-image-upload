require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config')

const app = express()


console.log('process.env.API_KEY', process.env.API_KEY, `${process.env.API_KEY}` )

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
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
        .catch(err => {
            res.json(err.message)
        })
})

app.listen(process.env.PORT || 8080, () => console.log('okk'))

