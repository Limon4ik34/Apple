import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import catalogApi from './api/catalog.js'
import productsApi from './api/products.js'
import searchApi from './api/search.js'
import authApi from './api/auth.js'

import 'dotenv/config'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
  createParentPath: true,
}))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('./static'))
express.response.sendWrapped = function (data) {
  return this.send({ data })
}

catalogApi(app)
productsApi(app)
searchApi(app)
authApi(app)


const port = 5000
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
