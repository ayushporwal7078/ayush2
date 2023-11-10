const { json } = require("express");
const fs = require("fs");

module.exports.save = (req,res)=>{

    
    try {
        fs.writeFileSync("./data.json",JSON.stringify(req.body.data));
        res.status(200);
    } catch (error) {
        console.log("Error in saving data",error);
        res.status(400);
    }

}

module.exports.getData = async (req,res)=>{
    const data = JSON.parse(fs.readFileSync('./data.json'));

    res.status(200).json({
        data
    })
}