import {
  getQueryParams,
  readData
} from '../utils/utils.js'

const file = './json/products.json'
export default function (server) {
  server.get('/products', async (query, res) => {
    const { product } = getQueryParams(query.query)
    let data = readData(file)
    data = data[product]
    res.sendWrapped({ ...data })
  })
}
