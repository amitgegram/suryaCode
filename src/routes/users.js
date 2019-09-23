let userModel = require('../models/user.model')
let express = require('express')
let router = express.Router()
const bcrypt = require('bcrypt');

router.post('/user',(req,res)=>{
    if(!req.body){
        return res.status(400).send("Request body is missing")
    }
    console.log(req.body)
    let hash = bcrypt.hashSync(req.body.password, 12);
    req.body.password=hash
    let model = new userModel(req.body)    
    model.save().then(doc =>{        
        if(!doc ||  Object.keys(doc).length === 0){
            // console.log("errordoc=="+err)
            res.status(500).send(doc)
        }
        res.status(201).send(doc)
    })
    .catch(err =>{
        // console.log("errorin=="+err)
        res.status(500).json(err)
    })

})


router.get('/user', (req,res) =>{
    if(!req.query.email && !req.query.password){
        res.status(400).send("request parameters missing")
    }

    userModel.findOne({
        "email":req.query.email,
    }).then(doc =>{
        if(!doc || doc.length===0){
            res.json({})
        }else{
            if(bcrypt.compareSync(req.query.password, doc.password)) {              
                res.json(doc)
               } else {
                res.json({})
               }            
        }        
    }).catch(err=>{
        res.status(500).json(err)
    })
    
    
})
router.get('/profile', (req,res) =>{
    if(!req.query.email){
        res.status(400).send("request parameters missing")
    }

    userModel.findOne({
        "email":req.query.email
    }).then(doc =>{
        if(!doc || doc.length===0){
            res.json({})
        }else{
            res.json(doc)
        }
        
    }).catch(err=>{
        res.status(500).json(err)
    }) 
})
router.get('/user/:name', (req,res)=>{
res.send(`you have requested ${req.params.name}`)
})
router.get('/error',(req,res)=>{
    throw new Error("This is a forced error")
})

module.exports= router;