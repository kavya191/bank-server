// 1.import express
//import cheyyunna express store cheyyan express enna variable use cheyyunnu
//declaration type specify cheyyanam
//import cheyyn use cheyyunna imbuilt function - require()
//require() function expect cheyyunna argument id aahnu. 
//install cheyythekkunnath athu library aahno athinte keyname require() methodil argument aayitt kodukkanaqm.
//expect cheyyunna aqgument string aayakond quotesil kodukkanam. keyname package.jsonil indaavummm
const express = require("express")
//import .env file
//.env file index.js aayitt configuration nadakkan config() use cheyyunnu
require('dotenv').config()
// //import cors
//server  frondend integration
//cors- cross orgin resource sharing
const cors = require('cors')
// const rout = require("./routes/userRouter")
// //import db connection+
//stringil path aayitt kodukkuka
require('./db/dbconnection')
// //import router
 const router = require('./routes/userRouter')
//create server using express
//2.server create cheyyn use cheyyunne function - express()
const server = express()

//connect cors with frondend - server  frondend integration

server.use((cors()))
 //to convert all incomming json type data into javascript
server.use(express.json())

 // tell server to use router
server.use(router)


// server.get('/excgetpath/newuser', (req, res) => {
//     res.send("get request response1 ")
// })
// server.get('/excgetpath/lastuser', (req, res) => {
//     res.send("get request response2")
// })
//3.port set
const port = 3004 || process.env.port
//4. running config

server.listen(port, () => {
    console.log(`server started at port number ${port}`);
})
