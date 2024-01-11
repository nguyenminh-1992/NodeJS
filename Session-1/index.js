const express1 = require('express')
const minh = express1()
const port = 3001

minh.get('/', (req, res) => {
  res.send('Xin chao den voi mon NodeJS!')
})

minh.listen(port, () => {
  console.log(`Da upload xong ${port}`)
})