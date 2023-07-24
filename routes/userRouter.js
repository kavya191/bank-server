
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

//export router
module.exports=router