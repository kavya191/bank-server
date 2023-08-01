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
const login = (req, res) => {
    //destructuring data
    const { accNo, pwd } = req.body
    //check accNo  ,pwd present
    users.findOne({ accNo, pwd }).then(user => {
        if (user) {
            //convert js to json type 
            res.status(200).json(user)
        } else {
            res.status(401).json("inccorect username or password")
        }
    })


}
//logic for getprofile
const getprofile = (req, res) => {
    //access accNo param from url request
    const { accNo } = req.params
    //check accNo present
    users.findOne({ accNo }).then(user => {
        if (user) {
            res.status(200).json({
                accNo: user.accNo,
                uName: user.uName
            })
        } else {
            res.status(401).json("user not found")
        }
    })
}
//logic for accountBalance
const getBalance = (req, res) => {
    //access accNo param from userBAlance url request
    const { accNo } = req.params
    //check accNo present
    users.findOne({ accNo }).then(user => {
        if (user) {
            res.status(200).json({
                accNo: user.accNo,
                uName: user.uName,
                balance: user.balance
            })

        } else {
            res.status(401).json("balance not found")
        }
    })
}
//logic for money Transfer
const getMoney = (req, res) => {
    //acccess all data from body request
    const { fromAccno, toAccno, pwd, amount, date } = req.body
    //convert amount from string to number.
    //number comming from frontend is string type
    let amnt = parseInt(amount)
    //check from user in db
    users.findOne({ accNo: fromAccno, pwd }).then(fromUser => {
        //check from user in db
        if (fromUser) {
            users.findOne({ accNo: toAccno }).then(toUser => {
                //check touser in db
                if (toUser) {
                    //check from user balance
                    if (amnt <= fromUser.balance) {
                        //decrease fromuser balance
                        fromUser.balance -= amnt
                        //transaction details of fromuser
                        fromUser.transactions.push({ type: "DEBIT", amount: amnt, date, user: toUser.uName })
                        //save it in mongodb atlas
                        fromUser.save()

                        //increase touser balance
                        toUser.balance += amnt
                        //transaction details of touser
                        toUser.transactions.push({ type: "CREDIT", amount: amnt, date, user: fromUser.uName })
                        //save t in mongodb atlas
                        toUser.save()

                        res.status(200).json({ message: "transaction success" })
                    } else {
                        res.status(401).json({ message: "insufficent balance" })
                    }


                } else {
                    res.status(401).json({ message: "Invalid credit credentials" })
                }
            })

        } else {
            res.status(401).json({ message: "Invalid debit credentials" })
        }
    })

}
//logic for transaction history
const history = (req, res) => {
    //destructure
    const { accNo } = req.params
    users.findOne({ accNo }).then(user => {
        if (user) {
            res.status(200).json(user.transactions)

        } else {
            res.status(401).json("user not exist")
        }
    })
}
//delete account
const deleteAccount = (req, res) => {
    const { accNo } = req.params
    users.deleteOne({ accNo }).then(user => { //deletecount
        if (user) {
            res.status(200).json("Account Deleted successfully")
        } else {
            res.status(401).json("user not exist")
        }
    }
    )
}

module.exports = {
    register,
    login,
    getprofile,
    getBalance,
    getMoney,
    history,
    deleteAccount
}