const projects = require("./data/helpers/projectModel.js");

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

    res.status(204).json()
  })
  .catch(error => {
console.log(error)
    res.status(500).json({error: 'There was an error processing your request'})
  })
})
