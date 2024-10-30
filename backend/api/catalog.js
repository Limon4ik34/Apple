import {
  getQueryParams,
  readData
} from '../utils/utils.js'

const file = './json/categories.json'
export default function (server) {
  server.get('/catalog', async (query, res) => {
    const { category } = getQueryParams(query.query)
    let data = readData(file)
    data = data[category]
    res.sendWrapped({ ...data })
  })
}
