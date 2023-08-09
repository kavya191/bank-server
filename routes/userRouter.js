
const express=require('express')

//import logic.js
const logic=require('../controllers/logic')
//import middleware
const jwtMiddleware = require('../middlewares/routerMiddleware')




//create an object for router class in express
const  router=new express.Router()

//register
//objectname.crudmethod('path',controllersfilename.)
router.post('/bankuser/userRegister',logic.register)
//login
router.post('/bankuser/userLogin',logic.login)
//userProfile
router.get('/bankuser/userProfile/:accNo',jwtMiddleware,logic.getprofile)
//userBalance
router.get('/bankuser/userBalance/:accNo',jwtMiddleware,logic.getBalance)
//moneytransfer
router.post('/bankuser/moneyTransfer',jwtMiddleware,logic.getMoney)

//transaction history
router.get('/bankuser/userHistory/:accNo',jwtMiddleware,logic.history)
//delete account
router.delete('/bankuser/userDelete/:accNo',jwtMiddleware,logic.deleteAccount)
//export router
module.exports=router