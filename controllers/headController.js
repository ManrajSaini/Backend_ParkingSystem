const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ParkingLotHead = require("../models/parkingLotHead");

dotenv.config();

const loginHead = async(req,res) => {
    try{
        const headEmail = req.body.email;
        const head = await ParkingLotHead.findOne({email: headEmail});
        if(!head){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Head does not exist",
                "data": null
            });
        }

        const isCorrectPass = await bcrypt.compare(req.body.password, head.password);
        if(!isCorrectPass){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Incorrect password",
                "data": null
            });
        }

        const token = jwt.sign({_id: head._id}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        res.header({token: token});

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Login successful",
            "data": [head]
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

const logoutHead = async(req,res) => {
    return res.status(200).send({
        "success": true,
        "error_code": null,
        "message": "Logout successful",
        "data": []
    });
};


const createSpot = async(req,res) => {

};


module.exports = {
    loginHead,
    logoutHead,
    createSpot
}