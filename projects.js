const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    image: String,
    altText: String,
    title: String,
    description: String,
    liveLink: String,
    githubLink: String
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project