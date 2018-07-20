var express = require('express')
var router = express.Router()

let awsHandler = require('./awsHandler.js')

/* GET home page. */
router.get('/describe', (req, res, next) => {
  awsHandler.describe().then(data => {
    res.json({ data })
  }).catch(err => {
    next(err)
  })
})

router.get('/start', (req, res, next) => {
  awsHandler.start().then(data => {
    // console.log(`/start, router success ${typeof data}`)
    res.json(data)
  }).catch(err => {
    // console.log(`/start, router error, ${JSON.stringify(err)}`)
    next(err)
  })
})

// router.post('/start', (res, req, next) => {
//   awsHandler.start(req.body.duration).then(data => {
//     res.json(data)
//   }).catch(err => {
//     next(err)
//   })
// })

router.get('/stop', (req, res, next) => {
  awsHandler.stop().then(data => {
    // console.log(`/stop, router success ${typeof data}`)
    res.json(data)
  }).catch(err => {
    // console.log(`/stop, router error, ${JSON.stringify(err)}`)
    next(err)
  })
})

module.exports = router
