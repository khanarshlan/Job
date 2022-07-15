const db = require('../models');
const jwt = db.jwt;
const key = db.screate;
const Company = db.company;
const onlyCompany = (req,res,next)=>{
    const headers = req.headers['x-access-token'];
    if(!headers){
        res.status(404).send({
            Alert : "Please Enter AccessToken"
        })
        return;
    }
    jwt.verify(headers,key,(err,decodeToken)=>{
        if(err){
            res.status(403).send({
                Alert  : "Sorry you can not create Job"
            })
            return;
        }
        next();
    })
};
const validCompany = (req,res,next)=>{
    if(!req.body.companyId){
        res.status(402).send({
            message : "Please enter companyId"
        });
        return;
    }
    if(req.body.companyId){
        Company.findOne({where:{id:req.body.companyId}}).then(data=>{
            if(!data){
                res.status(404).send({
                    message : "Enter Valid Id"
                })
                return;
            }
            next();
        })
    }
}
module.exports = {
    onlyCompany  : onlyCompany,
    validCompany : validCompany
};
