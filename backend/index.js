import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import catalogApi from './api/catalog.js'
import productsApi from './api/products.js'
import searchApi from './api/search.js'
import authApi from './api/auth.js'
import cartApi from './api/cart.js'
import adminApi from './api/admin.js'
import usersApi from './api/users.js'
import ordersApi from './api/order.js'
import db from './utils/db.js'
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

db.connect()

catalogApi(app)
productsApi(app)
searchApi(app)
authApi(app)
cartApi(app)
adminApi(app)
usersApi(app)
ordersApi(app)


const port = 5000
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
