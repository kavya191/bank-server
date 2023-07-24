//import models - users
const users = require("../models/modelcollection")
//logic for register
const register = (req, res) => {
    //acess data from body
    //body={acno:123,uname:"anu",psw:"abc123"}
    const accNo = req.body.accNo
    const uName = req.body.uName
    const pwd = req.body.pwd

    //check acno is present in users collection
    users.findOne({ accNo }).then(user => {
        //network through kittunna data aayakond promise vech resolve cheyyam
        if (user) {
            res.status(401).send("user already exist")
        } else {
            //register user - create a new object for user
            var newUser = new users({
                accNo,
                uName,
                pwd,
                balance: 0, // balance initially zero
                transactions: []
            })
            // save the object in collection
            newUser.save()
            //response send to frondend 
            //json() method converts js data into json data type and send
            res.status(200).json(newUser)
        }

    })

}

//logic for login
const login = (req,res)=>{
    //destructuring data
    const {accNo,pwd}=req.body
    //check accNo  ,pwd present
    users.findOne({accNo,pwd}).then(user=>{
        if(user){
            //convert js to json type 
            res.status(200).json(user)
        }else{
            res.status(401).json("inccorect username or password")
        }
    })


}


module.exports = {
    register,login
}