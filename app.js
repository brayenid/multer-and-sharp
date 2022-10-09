import express from 'express'
import router from './models/routes.js'

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(express.static('upload'))
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
