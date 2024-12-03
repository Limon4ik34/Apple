import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
const users = './json/users.json'
const carts = './json/carts.json'
const products = './json/products.json'
import db from '../utils/db.js'
import pkg from 'jsonwebtoken';


export default function (server) {
  server.post('/cart', async (query, res) => {
    const body = query.body
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    const reqData = {
      userId: user.id,
      productId: body.id,
      qty: body.qty
    }
    db.changeCart(reqData).then((action) => {
      db.getCart(user.id).then((response) => {
        res.status(200).sendWrapped({ products: response })
      })
    })
  })
  server.get('/cart', async (query, res) => {
    let cartsList = readData(carts)
    let productsList = readData(products)
    const result = []
    console.log(cartsList)
    const body = query.body
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    const currentCart = cartsList.find((item) => {
      return item.userId === user.id
    })
    if (currentCart) {
      currentCart.products.forEach((item) => {
        result.push({...productsList[item.id], qty: item.qty})
      })
      // currentCart = {...cartsList[index]}
      // console.log('currentCart', currentCart)
      // const productIndex = currentCart.products.findIndex((item) => {
      //   return item.id === body.id
      // })
      // if (productIndex >= 0) {
      //   if (body.qty >0) {
      //     currentCart.products[productIndex].qty = body.qty
      //   } else {
      //     currentCart.products.splice(productIndex, 1)
      //   }
      // } else {
      //   currentCart.products.push({
      //     id: body.id,
      //     qty: body.qty
      //   })
      // }
      // cartsList[index] = currentCart
    }
    saveData(carts, cartsList)
    res.status(200).sendWrapped({ products: result })
  })
}
