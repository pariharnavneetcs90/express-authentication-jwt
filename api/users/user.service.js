// here basically we take input from users
// this is the same pool wich we have written in config/ database

// firt user.service.js second user.controller.js third user.service.js
const pool =require("../../config/database");

module.exports ={
    // this service is for POST  http://localhost:3000/api/users/
    create: (data, callBack)=>{
        // query funtion me 3 parameters hote hai
        pool.query(
            // ye registration table name hai mysql workbench me 
            // ye ? is liye hai kyo ki isko baad me bhara jaye ga
            `insert into registration(firstName,lastName,gender,email,password,number)
            values(?,?,?,?,?,?)
            `,
            //this (data.firstName,) is written to because it take input from user
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            //in 3rd parameter we have 3 parameters also. we currently dont't use fields
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                return callBack(null,results);
            }   
        );
    },

    //this service will return all the user from database http://localhost:3000/api/users/
    getUser:  callBack=>{ 
        // there query function hai 3 parameters
        pool.query(
            //first parameter
            `select id,firstName,lastName,gender,email,password,number from registration`
            ,
            //second parameter
            [],
            //third parameter
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                return callBack(null,results);
            }   
        );
    },

    //in this service  we get user by id http://localhost:3000/api/users/
    getUserByUserId:  (id,callBack)=>{ 
        pool.query(
            //first parameter
            `select id,firstName,lastName,gender,email,password,number from registration where id =?`
            ,
            //second parameter
            [id],
            //third parameter
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                return callBack(null,results[0]);
            }   
        );
    },

     // this service is for update user  http://localhost:3000/api/users/
     updateUsers: (data, callBack)=>{
        // query funtion me 3 parameters hote hai
        pool.query(
            //first parameter
            `update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=?,id=?`
            ,
            //second parameter
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            //third parameter
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                if (!results){
                    return res.json({
                        success:0,
                        message:"faild to update"
                    });
                }
                return callBack(null,results);
            }   
        );
    },

    //in this service  we delete user by  http://localhost:3000/api/users/
    deleteUser:  (data,callBack)=>{ 
        pool.query(
            //first parameter
            `delete from registration where id =?`
            ,
            //second parameter
            [data.id],
            //third parameter
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                return callBack(null,results[0]);
            }   
        );
    },

    //login
    getUserByUserEmail:  (email,callBack)=>{
        pool.query(
            //first parameter
            `select * from registration where email =?`,
            //second parameter
            [email],
            //third parameter
            (error,results,felids)=>{
                if (error){
                return   callBack(error);
                }
                return callBack(null,results[0]);
            }   
        );
    }

};