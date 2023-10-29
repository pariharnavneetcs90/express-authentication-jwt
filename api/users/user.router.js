const {createUser,getUserByUserId,getUser,updateUsers,deleteUser,login} =require("./user.controller");
const router= require("express").Router();

//this is middleware for token validation
const {checkToken} = require("../../auth/token_validation");

router.post("/",checkToken,createUser);
router.get("/",getUser);
//router.get("/",checkToken,getUser);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUser);

router.post("/login",login); // we don't need ,checkToken because we are genrating token in login and vetifying in others
module.exports = router;