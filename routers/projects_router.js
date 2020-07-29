const projects = require("../data/helpers/projectModel.js");
const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
  projects
  .get()
  .then((projects) => {
    return res.json(projects)
  })
  .catch((error) => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.get('/:project_id', (req, res) => {
  const id = req.params.project_id

  projects
  .get(id)
  .then((project) => {
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

router.put('/:project_id', (req, res) => {
  const id = req.params.project_id
  const changes = req.body

  projects
  .update(id, changes)
  .then(project => {
    if (!project)
      return res.status(404).json({error: 'A project with that id was not found.'})

    return res.json(project)
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.delete('/:project_id', (req, res) => {
  const id = req.params.project_id

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

router.get('/:project_id/actions', (req, res) => {
  const project_id = req.params.project_id

  // confirm project exists
  projects
  .get(project_id)
  .then(project => {
    if (!project)
          return res.status(404).json({error: 'A project with that id was not found.'})

    projects
    .getProjectActions(project_id)
    .then(actions => {
      return res.json({project_id, actions})
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
