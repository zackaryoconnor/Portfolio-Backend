const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Project = require('./projects.js')
const cors = require('cors')
app.use(cors({ 
  origin: '*', 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}))

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.json())

app.post('/portfolio', async (request, response) => {
  const createdProject = await Project.create(request.body)
  response.json(createdProject)
})

app.get('/portfolio', async (request, response) => {
  const foundProjects = await Project.find()
  response.json(foundProjects)
})

app.delete('/portfolio/:projectId', async (request, response) => {
  const deletedProject = await Project.findByIdAndDelete(
    request.params.projectId
  )
  response.json(deletedProject)
})

app.put('/portfolio/:projectId', async (request, response) => {
  const updatedProject = await Project.findByIdAndUpdate(
    request.params.projectId,
    request.body,
    { new: true }
  )
  response.json(updatedProject)
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`)
})
