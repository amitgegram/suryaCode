let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://suryakumar:Cluster@989492@smartcluster-cxhpj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

let userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobileNumber:{
        type:Number,
        require:true,
        unique:true,
    },
    password:String,
    companyName:String,
    GSTINnumber:String,
    address:String,
    accNo:Number,
    bankName:String,
    branchName:String,
    IFSC:String
})
module.exports = mongoose.model('SmartUser', userSchema);