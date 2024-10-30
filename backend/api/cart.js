import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
const users = './json/users.json'
const carts = './json/carts.json'
const products = './json/products.json'

import pkg from 'jsonwebtoken';


export default function (server) {
  server.post('/cart', async (query, res) => {
    let cartsList = readData(carts)
    let currentCart = {}
    console.log(cartsList)
    const body = query.body
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    const index = cartsList.findIndex((item) => {
      return item.userId === user.id
    })
    if (index >= 0) {
      currentCart = {...cartsList[index]}
      console.log('currentCart', currentCart)
      const productIndex = currentCart.products.findIndex((item) => {
        return item.id === body.id
      })
      if (productIndex >= 0) {
        if (body.qty >0) {
          currentCart.products[productIndex].qty = body.qty
        } else {
          currentCart.products.splice(productIndex, 1)
        }
      } else {
        currentCart.products.push({
          id: body.id,
          qty: body.qty
        })
      }
      cartsList[index] = currentCart
    } else {
      currentCart = {
        userId: user.id,
        products: [
          {
            id: body.id,
            qty: body.qty
          }
        ]
      }
      cartsList.push(currentCart)
    }
    saveData(carts, cartsList)
    res.status(200).sendWrapped({ products: currentCart.products })
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
