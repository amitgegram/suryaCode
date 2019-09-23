let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let userRoute = require('./routes/users')
let billRoute = require('./routes/bills')

app.use(bodyParser.json())
app.use( (req,res,next )=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(`${new Date().toString()} => ${req.originalUrl}, req.body`)
    console.log("req"+req.url)
    // if (req.method !== "OPTIONS") {
    next()    
})

app.use(userRoute)
app.use(billRoute)

app.use(express.static('public'))

//Handling 404
app.use((req,res,next)=>{
    res.status(404).send("We think you are lost")
})
//Handling 500 error
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.info(`Server has started on ${PORT}`))