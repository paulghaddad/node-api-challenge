const projects = require("./data/helpers/projectModel.js");
const actions = require("./data/helpers/actionModel.js");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/projects", (req, res) => {
  projects
  .get()
  .then((projects) => {
    return res.json(projects)
  })
  .catch((error) => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

app.get("/projects/:project_id", (req, res) => {
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

app.post('/projects', (req, res) => {
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

app.put('/projects/:project_id', (req, res) => {
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

app.delete('/projects/:project_id', (req, res) => {
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

app.get('/projects/:project_id/actions', (req, res) => {
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

app.get('/actions', (req, res) => {
  actions.get()
  .then(actions => {
    return res.json(actions)
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})

app.get('/actions/:action_id', (req, res) => {
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

app.post('/actions', (req, res) => {
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

app.put('/actions/:action_id', (req, res) => {
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

app.delete('/actions/:action_id', (req, res) => {
  const action_id = req.params.action_id

  actions
  .remove(action_id)
  .then(count => {
    if (!count)
        return res.status(404).json({error: 'An action with that id was not found.'})

    return res.status(204).json()
  })
  .catch(error => {
    return res.status(500).json({error: 'There was an error processing your request'})
  })
})
