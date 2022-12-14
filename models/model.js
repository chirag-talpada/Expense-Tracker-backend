const mongoose=require("mongoose");

const categories_model=mongoose.Schema({
    type:{
        type:String,
        default:"Investment"
    },
    color:{
        type:String,
        default:"#fcbe44"
    }
});

const transaction_model=mongoose.Schema({
    name:{
        type:String,
        default:"Anonymous"
    },
    type:{
        type:String,
        default:"Investment"
    },
    amount:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    }

});

const Categories=mongoose.model("categories",categories_model);

const Transaction=mongoose.model("transaction",transaction_model);

module.exports={
    Categories,
    Transaction
}
