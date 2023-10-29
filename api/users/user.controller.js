// here basically we take store value which is take from user in body variable
const {create, getUserByUserId,getUser,updateUsers,deleteUser,getUserByUserEmail} =require("./user.service");

//this is for encryption
const {genSaltSync,hashSync,compareSync} =require("bcrypt"); //comparesync compare password if true then pass

//jsonwebtoken
const {sign}= require("jsonwebtoken")
module.exports ={
    //
    createUser: (req,res)=>{
        const body  = req.body;
        //below 2 line is hashing techinque so that  password encrypted
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        //this is callback has 2 parameters err and result
        create(body,(err ,results)=>{
            // this is error
            if (err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            // if sucess this is responce
            return res.status(200).json({
                success:1,
                data :results
            });
        });
    },

    //
    getUserByUserId :(req,res)=>{
        const id = req.params.id;// it gives id which is passed in url
        // wahi id jo upar mile hai use niche use kare ga
        getUserByUserId(id,(err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success :0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                data : results
            });
        });
    },

    //
    getUser :(req,res)=>{      
        getUser((err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data : results
            });
        });
    },

    //
    updateUsers: (req,res)=>{
        const body  = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body,(err ,results)=>{
            if (err){
                console.log(err);
                return;
                };
            
            return res.json({
                success:1,
                message:"update sucessfully"
            });
        });
        
    },

    //
    deleteUser :(req,res)=>{
        const data = req.body;
        deleteUser(data,(err,results)=>{
            if (err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success :0,
                    message:"record not found"
                });
            }
            return res.json({
                success:1,
                 message:"user delete sucessfully"
            });
        });
    },

    //
    login:(req,res)=>{
      const body =req.body;
      getUserByUserEmail(body.email,(err,results)=>{
        if (err){
            console.log(err);
        }
        if(!results){
            return res.json({
                success:0,
                data: "Invalid email or password"
            });
        }
        const result = compareSync(body.password,results.password); //compareSynce comapare body password with result password
        if (result){
            result.password = undefined;
            // sign takes 3 parameters and "qwe1234" is key wich we will use to encrypt jwt
            //we are making jsonwebtoken below
            const jsonwebtoken =sign({result: results},"qwe1234",{
                expiresIn: "1hr"
            });
            return res.json({
                success:1,
                message: "login sucessfully",
                token: jsonwebtoken
            });
        } else{
            return res.json({
                success:0,
                data:"invalid email or password"
            });
        }

      });
    },
};