const db = require('../models');
const Company = db.company;
const bcrypt = db.bcrypt;
const key = db.screate;
const jwt = db.jwt;
exports.companyRegistration = (req,res)=>{
    const body = {
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        website : req.body.website,
        employeeSize : req.body.employeeSize
    };
    Company.create(body).then(data=>{
        res.status(201).send(data);
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error !"
        })
    });
};

exports.companySignin = (req,res)=>{
    const emailId = req.body.email;
    Company.findOne({where : {email:emailId}}).then(user=>{
        if(!user){
            res.status(404).send({
                message : "Email not found"
            })
            return;
        }
        let pass = bcrypt.compareSync(req.body.password,user.password);
        if(!pass){
            res.status(401).send({
                message : "password not matched"
            })
            return;
        }
        var token = jwt.sign({id:user.id},key,{
            expiresIn : 200
        }); 
        res.status(200).send({
            message : "Welcome "+user.name,
            accessToken : token
        });
    }).catch(err=>{
        console.log(err);
        res.status(200).send({
            message : "Internal Error !"
        })
    });
}