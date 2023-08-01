
const express=require('express')

//import logic.js
const logic=require('../controllers/logic')
//create an object for router class in express
const  router=new express.Router()

//register
//objectname.crudmethod('path',controllersfilename.)
router.post('/bankuser/userRegister',logic.register)
//login
router.post('/bankuser/userLogin',logic.login)
//userProfile
router.get('/bankuser/userProfile/:accNo',logic.getprofile)
//userBalance
router.get('/bankuser/userBalance/:accNo',logic.getBalance)
//moneytransfer
router.post('/bankuser/moneyTransfer',logic.getMoney)

//transaction history
router.get('/bankuser/userHistory/:accNo',logic.history)
//delete account
router.delete('/bankuser/userDelete/:accNo',logic.deleteAccount)
//export router
module.exports=router