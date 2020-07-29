const actions = require("../data/helpers/actionModel.js");
const projects = require("../data/helpers/projectModel.js");
const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
  actions.get()
  .then(actions => {
    return res.json(actions)
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.get('/:action_id', (req, res) => {
  const action_id = req.params.action_id

  actions.get(action_id)
  .then(action => {
    if (!action)
        return res.status(404).json({error: 'A action with that id was not found.'})

    return res.json(action)
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.post('/', (req, res) => {
  const action_data = req.body

  projects
  .get(action_data.project_id)
  .then(project => {
    // Ensure the project exists
    if (!project)
        return res.status(404).json({error: 'A project with that id was not found.'})

    // create action
    actions
    .insert(action_data)
    .then(action => {
      return res.json(action)
    })
    .catch(error => {
      return res.status(500).json({error: 'There was an error processing your request'})
    })
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.put('/:action_id', (req, res) => {
  const action_id = req.params.action_id
  const {description, notes, completed} = req.body

  actions
  .get(action_id)
  .then(action => {
    actions
    .update(action_id, {description, notes, completed})
    .then(action => {
      if (!action)
        return res.status(404).json({error: 'An action with that id was not found.'})

      return res.json(action)
    })
    .catch(error => {
      return res.status(500).json({error: 'There was an error processing your request'})
    })
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

router.delete('/:action_id', (req, res) => {
  const action_id = req.params.action_id

  actions
  .remove(action_id)
  .then(count => {
    if (!count)
        return res.status(404).json({error: 'An action with that id was not found.'})

module.exports = router
    return res.status(204).json()
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

module.exports = router
