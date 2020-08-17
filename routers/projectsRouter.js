// Use desstructured imports instead of using projects.blah
const projects = require("../data/helpers/projectModel.js")
const express = require("express");
const router = express.Router()

// ideal is that these routers simply query db and return json; anything else is
// handled and logged by middleware (since it will be thrown by knex)
router.get('/', (req, res) => {
  projects
  .get()
// knex is async/await and all these handlers can use that style here
  .then((projects) => {
    return res.json(projects)
  })
// also no need for catches, just use middleware to catch those
  .catch((error) => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.get('/:projectId', (req, res) => {
  const id = req.params.projectId

  projects
  .get(id)
  .then((project) => {
// if response body is consistent, a middleware can check for nothing in body,
// etc and handle the 404; a little trickier though
    if (!project) return res.status(404).json({ error: "No project found" })

    return res.json(project)
  })
  .catch(error => {
        return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.post('/', (req, res) => {
  const {name, description, completed} = req.body

  projects
  .insert({name, description, completed})
  .then(project => {
    return res.status(201).json(project)
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.put('/:projectId', (req, res) => {
  const id = req.params.projectId
  const changes = req.body

  projects
  .update(id, changes)
  .then(project => {
    if (!project)
      return res.status(404).json({error: 'A project with that id was not found.'})

    return res.json(project)
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.delete('/:projectId', (req, res) => {
  const id = req.params.projectId

  projects
  .remove(id)
  .then(count => {
    if (!count)
        return res.status(404).json({error: 'A project with that id was not found.'})

    return res.status(204).json()
  })
  .catch(error => {
console.log(error)
    res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.get('/:projectId/actions', (req, res) => {
  const projectId = req.params.projectId

  projects
  .get(projectId)
  .then(project => {
    if (!project)
          return res.status(404).json({error: 'A project with that id was not found.'})

    projects
    .getProjectActions(projectId)
    .then(actions => {
      return res.json({projectId, actions})
    })
    .catch(error => {
        return res.status(500).json({error: 'There was an error processing your request'})
    })
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })

})

module.exports = router
