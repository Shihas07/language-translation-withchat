
  const express=require("express")
  const router=express.Router()
  const userController=require("../controller/userController")

  router.post("/signup",userController.signup)
  router.post("/login",userController.login)
  router.post("/logout",userController.logout)
  router.post("/profile",userController.profile)
  router.post("/search",userController.search)
  router.get('/messages/:senderId/:receiverId',userController.fetchMessage);



  module.exports=router