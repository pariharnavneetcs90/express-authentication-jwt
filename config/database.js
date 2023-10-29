const {createPool}= require("mysql");

// niche process.env.DB_PORT jo hai vo .env file se import hua hai taki log dhek na sake port number vagera
const pool =createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit :10
});

module.exports=pool;