const model=require("../models/model")

async function get_Categories(req,res){
    let data=await model.Categories.find({});
    let filterData=await data.map(v=>Object.assign({},{type:v.type,color:v.color}));
    return res.json(filterData);
}

async function create_Transaction(req,res){
    if(!req.body)return res.status(400).json("Post data is not found");
    let {name,type,amount}=req.body;

    const create=await new model.Transaction({
        name,
        type,
        amount,
        date:new Date()
    });

    create.save((err)=>{
        if(!err)return res.json(create);
        return res.status(400).json({message:`Error While creating transaction ${err}`})
    });
}

async function get_Transaction(req,res){
    let data=await model.Transaction.find({});
    return res.json(data);
}

async function delete_Transaction(req,res){
    if(!req.body)res.status(400).json({message:"Request body not found"});

    await model.Transaction.deleteOne(req.body,(err)=>{
        if(!err) res.json("Record Deleted"); 
    }).clone().catch((err)=>{res.json(`Error While Deleting Transaction ${err}`)});
}

async function get_Labels(req,res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info["color"]}));
        res.json(data);
    }).catch(err=>{
        res.status(400).json(`lookup Collection Error! ${err}`);
    })
}


module.exports={
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
};