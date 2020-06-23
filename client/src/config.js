export const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://fun-image-upload.herokuapp.com'
    : 'http://localhost:8080'