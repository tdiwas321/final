const user = require("../models/user"),
    express = require('express'),
    router = express.Router();
    

router.post('/add', async (req, res) => {
    const users= new user(req.body)
    try {
        await users.save()
        res.status(201).json({
            status: 'Success',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err
        })
    }
})
router.get('/get/:id', async (req, res) => {
    const users = await user.findById(req.params.id)
    try {
        res.status(200).json({
            status: 'Sucess',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

router.get('/get', async (req, res) => {
    const users = await user.find({})
    try {
        res.status(200).json({
            status: 'Sucess',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})



router.delete('/delete/:id', async (req, res) => {
    await user.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})


module.exports = router;