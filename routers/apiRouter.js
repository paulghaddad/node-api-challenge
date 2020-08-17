const express = require("express")
aonst router = express.Router()

const projectsRouter = require('./projectsRouter')
const actionsRouter = require('./actionsRouter')

router.use('/projects', projectsRouter)
router.use('/actions', actionsRouter)

module.exports = router
