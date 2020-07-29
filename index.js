const actions = require("./data/helpers/actionModel.js");

const express = require("express");
const app = express();
const projects_router = require('./routers/projects_router')
const actions_router = require('./routers/actions_router')


const port = 3000;

app.use(express.json())
app.use('/projects', projects_router)
app.use('/actions', actions_router)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

