const Router=require('express').Router();
const controller=require("../controller/controller")

Router.get("/api/categories",controller.get_Categories);

Router.route("/api/transaction")
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction);

Router.get("/api/labels",controller.get_Labels);


module.exports=Router;