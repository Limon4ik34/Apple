import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import fs from 'fs'
import db from '../utils/db.js'

export default function (server) {
  server.post('/admin/categories', async (query, res) => {
    const body = query.body
    db.createCategory(body).then((cat) => {
      console.log('insertId', cat.insertId)
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      res.status(404).sendWrapped({
        err
      })
    })
  })
  server.patch('/admin/categories/:categoryId', async (query, res) => {
    const body = query.body
    db.updateCategory(body).then(() => {
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.delete('/admin/categories/:categoryId', async (query, res) => {
    db.deleteCategory(query.params.categoryId).then(() => {
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.delete('/admin/products/:id', async (query, res) => {
    db.deleteProduct(query.params.id).then(() => {
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.post('/admin/products', async (query, res) => {
    const body = query.body
    const files = query.files['images[]']
    db.createProduct(body).then((product)=> {
      const productId = product.insertId
      files.forEach(file => {
        const fileName = `${Date.now()}-${file.name}`
        file.mv(`./static/${fileName}`);
        db.saveProductImage({name: fileName, productId})
      })
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.get('/admin/products', async (query, res) => {
    db.getProducts().then((products)=> {
      res.status(201).sendWrapped({products})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.get('/admin/products/:id', async (query, res) => {
    db.getProductById(query.params.id).then((product)=> {
      res.status(201).sendWrapped({product})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
  server.patch('/admin/products/:id', async (query, res) => {
    const body = query.body
    const tempFiles = query.files
    if (tempFiles) {
      const files = tempFiles['images[]']
      const dbData = {
        id: body.id,
        images:[],
      }
      files.forEach(file => {
        const fileName = `${Date.now()}-${file.name}`
        file.mv(`./static/${fileName}`);
        dbData.images.push(fileName)
      })
      db.updateProductImages(dbData)
    }
    db.updateProduct(body).then((product)=> {
      res.status(201).sendWrapped({product})
    }).catch((err) => {
      res.status(402).sendWrapped({
        err
      })
    })
  })
}
