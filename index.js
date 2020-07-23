/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const projects = require("./data/helpers/projectModel.js");

const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/projects", (req, res) => {
  projects
    .get()
    .then((projects) => {
      return res.json(projects);
    })
    .catch((error) => {
      console.log("error");
    });
});

app.route("/project/:project_id").get((req, res) => {
  projects
    .get(req.params.project_id)
    .then((project) => {
      if (!project) return res.status(404).json({ error: "No project found" });

      return res.json(project);
    })
    .catch((error) => console.log("error"));
});
