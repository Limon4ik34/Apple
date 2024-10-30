import {
  getQueryParams,
  readData
} from '../utils/utils.js'

const file = './json/categories.json'
export default function (server) {
  server.get('/search', async (query, res) => {
    const { queryText } = getQueryParams(query.query)
    let data = readData(file)
    let result = []
    for(let key in data){
      const temp = data[key].products;
      if (temp.length){
        temp.forEach(item => {
          console.log(item)
          if(item.title.toLowerCase().trim().includes(queryText.toLowerCase().trim())){
            result.push(item)
          }
        })
      }
    }
    res.sendWrapped({ result })
  })
}
