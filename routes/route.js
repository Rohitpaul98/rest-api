const express = require("express");
const router = express.Router();
const schemaModel = require("../model/newSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send("<h2>Welcome</h2>"))
router.post("/new", async (req, res) => {
    try {
        const fetch = await schemaModel.findOne({ mail: req.body.mail });
        if (fetch) {
            res.status(400).send("Email Already exists")
        }
        else {

            const data = new schemaModel({
                userRole: req.body.userRole,
                name: req.body.name,
                mail: req.body.mail,
                password: req.body.password,
                city: req.body.city
            })
            const saved = await data.save()
            res.send("registered successfully!!")
        }
    }
    catch (err) {
        console.log("error--->>>", err)
    }
}
)
router.post("/user-login", async (req, res) => {
    try {
        const userCheck = await schemaModel.findOne({ mail: req.body.mail })//checking if user exists or not
        console.log('fetch ==>>', userCheck)
        if (userCheck) {
            const confirmation = await bcrypt.compare(req.body.password, userCheck.password);//comparing password,compare(userEntered-value,value-from-database) method's first arguement is userEntered password and second one is from database. 
            console.log('confirmation==>>', confirmation)
            const givesToken = async () => {
                try {
                    const token = await jwt.sign({ _id: userCheck._id }, "OnlyAuthenticatedUserCanAccess")
                    res.send(token);
                    res.send("Login successfully!!")
                }
                catch (err) {
                    console.log("Token error----", err)
                }

            }
            if (confirmation) {

                givesToken();

            }
            else {
                res.send("wrong UserMail or Password")
            }
        }
        else {
            res.send("User does not exist!!")
        }
    }
    catch (err) {
        res.send("Error is" + err)
    }

})
router.get("/showuser/:id", async (req, res) => {
    const idparam = req.params.id;
    const data = await schemaModel.findById({ _id: idparam });//query to database
    res.send(data);
})
router.patch("/updateuser/:id", async (req, res) => {
    try {

        const data = await schemaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("updated successfully!! and new data is" + data);
    } catch (e) {
        console.log(e)
    }

})
router.delete("/deleteuser/:id", async (req, res) => {
    const i_d = req.params.id;
    const deleteUser = await schemaModel.findByIdAndDelete({ _id: i_d });
    res.send("user deleted successfully!")

})
module.exports = router;