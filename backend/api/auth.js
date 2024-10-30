import {
  getQueryParams,
  saveData,
  readData
} from '../utils/utils.js'
const users = './json/users.json'
import pkg from 'jsonwebtoken';

export default function (server) {
  server.get('/auth/get-token', async (query, res) => {
    const token = pkg.sign({ foo: 'bar' }, 'shhhhh');
    // const { category } = getQueryParams(query.query)
    // let data = readData(file)
    // data = data[category]
    res.sendWrapped({data: {token}})
  })
  server.post('/auth/registration', async (query, res) => {
    let data = readData(users)
    const newUser = query.body
    const oldUser = data.find((item) => {
      return item.login === newUser.login
    })
    if (oldUser) {
      res.status(402).sendWrapped({errors: {
        login: 'Такой пользователь уже существует'
        } })
    } else {
      data.push({...newUser, id: Date.now().toString()})
      saveData(users, data)
      res.status(201).sendWrapped({data: 'ok'})
    }
  })
  server.post('/auth/auth', async (query, res) => {
    let data = readData(users)
    const body = query.body
    const oldUser = data.find((item) => {
      return item.login === body.login
    })
    if (oldUser && (body.password === oldUser.password)) {
      const token = pkg.sign(oldUser, 'shhhhh');
      res.status(200).sendWrapped({ token })
    } else {
      res.status(404).sendWrapped({errors: {
        login: 'Несовпадают логин и пароль',
        password: ' ',
      }})
    }
  })
}
