const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors({ 
    origin: '*',
}));
app.use(express.json());




app.get('/test',(req,res)=>{
    res.send("aa");
});

app.listen(3001, function(){
    console.log("start!!");
    // connectDB();
});

