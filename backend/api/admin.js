import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import db from '../utils/db.js'

export default function (server) {
  server.post('/admin/categories', async (query, res) => {
    const body = query.body
    db.createCategory(body).then((user) => {
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
}
