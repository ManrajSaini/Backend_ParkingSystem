const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const headAuthentication = async(req,res,next) => {
    const token = req.header("token");

    if(!token){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "Unauthorized head",
            "data": []
        });
    }

    const tokenWithoutPrefix = token.replace("Bearer ", "");

    try{
        const head = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET_KEY);
        if(!head){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Invalid Token",
                "data": []
            });
        }

        req.head = head;
        next();

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

module.exports = {headAuthentication};