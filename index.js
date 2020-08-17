const express = require("express");
const app = express();
const apiRouter = require('./routers/apiRouter')


const port = 3000;

// gzip middleware is also popular for un/compression; logging as well;
// sanitization
app.use(express.json())

app.use('/api', apiRouter)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
