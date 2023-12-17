
const multer = require('multer');
const venue = require('../models/venue');
express = require('express');
router = express.Router();
    

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"../server/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage: storage});

router.post('/add', upload.single("image"), async (req, res) => {
    const venues = new venue({
        name:req.body.name,
        location:req.body.location,
        capacity:req.body.capacity,
        price:req.body.price,
        longitude:req.body.longitude,
        latitude:req.body.latitude,
        mail:req.body.mail,
        image:req.file.filename,
        description:req.body.description,
    })

    console.log(venues);
    venues
    .save()
    .then(()=>res.json("new venue added"))
    .catch((err)=>res.status(400).json({status:'Failed',
    message:err}));
    
})
//venue get route
router.get('/get',async(req,res)=>{
    const venues = await venue.find({})
    try{
        res.status(200).json({
            status:'Sucess',
            data:{
                venues
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err
        })
    }
})
//venue update route

router.patch('/update/:id',upload.single("image"), async (req,res) =>
 {
    const updatedvenue = await venue.findByIdAndUpdate(req.params.id,req.body,{
        name:req.body.name,
        location:req.body.location,
        capacity:req.body.capacity,
        price:req.body.price,
        longitude:req.body.longitude,
        latitude:req.body.latitude,
        mail:req.body.mail,
        image:req.file.filename,
        description:req.body.description,
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedvenue
            }
          })
    }catch(err){
        console.log(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    await venue.findByIdAndDelete(req.params.id)

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


module.exports = router