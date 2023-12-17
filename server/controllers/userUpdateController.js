const user = require("../models/user"),
    express = require('express'),
    router = express.Router();
    

router.patch('/update/:id', async (req, res) => {
    const updatedusers = await user.findByIdAndUpdate(req.params.id,req.body,{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        address:req.body.address,
        phone:req.body.phone,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updatedusers
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;