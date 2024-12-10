import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
import pkg from 'jsonwebtoken';
import db from '../utils/db.js'

export default function (server) {
  server.post('/auth/registration', async (query, res) => {
    const newUser = query.body
    db.createUser(newUser).then((result) => {
      console.log('result', result)
      res.status(201).sendWrapped({data: 'ok'})
    }).catch((err) => {
      console.log(err)
      res.status(402).sendWrapped({
        errors: {
          login: 'Такой пользователь уже существует'
        }
      })
    })
  })
  server.post('/auth/auth', async (query, res) => {
    const body = query.body
    db.getUser(body).then((user) => {
      const token = pkg.sign({id: user[0].id}, 'shhhhh');
      res.status(200).sendWrapped({token})
    }).catch((err) => {
      res.status(404).sendWrapped({
        errors: {
          login: 'Несовпадают логин и пароль',
          password: ' ',
        }
      })
    })
  })
  server.get('/auth/user-data', async (query, res) => {
    const user = pkg.verify(query.headers.authorization, 'shhhhh')
    db.getUserById(user.id).then((userData) => {
      delete userData.password
      res.status(200).sendWrapped(userData)
    }).catch((err) => {
      res.status(404).sendWrapped({})
    })
  })
}
