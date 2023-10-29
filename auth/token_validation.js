// this is middle ware to validate token
const {verify, decode} = require("jsonwebtoken");

module.exports ={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");
        if(token){
            token =token.slice(7) //it remove token from bearer
            verify(token,"qwe1234",(err,decode)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "invalid token"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success:0,
                message:"Access denied unauthorised user"
            });
        }
    }
};