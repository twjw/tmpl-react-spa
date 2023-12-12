const path = require('path')
const express = require('express')
const multer = require('multer')

// create express app
const app = express()

// create a multer object
const upload = multer()

// handle formdata and json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/text', (req, res) => {
	res.send('hello api')
})

app.get('/api/json', (req, res) => {
	res.send([{ n: 1 }, { n: 2 }, { n: 3 }])
})

app.post('/api/form-data', upload.none(), (req, res) => {
	res.send(req.body.text)
})

app.post('/api/body', (req, res) => {
	res.json(req.body || {})
})

app.get('/api/qs', (req, res) => {
	res.send(`Id is ${req.query.id}, Name is ${req.query.name}`)
})

app.get('/api/pic', (req, res) => {
	res.sendFile(path.resolve(__dirname, './pic/avatar.jpg'))
})

// listen for requests
app.listen(7981, () => {
	console.log('Server is listening on port 7981')
})
