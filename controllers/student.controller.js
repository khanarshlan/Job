const db = require('../models');
const Student = db.student;
const bcrypt = db.bcrypt;
exports.signup = (req,res)=>{
    const body = {
        name : req.body.name,
        qualification : req.body.qualification,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10),
        phone : req.body.phone
    };
    Student.create(body).then(data=>{
        res.status(201).send(data)
    }).catch(err=>{
        res.status(200).send({
            message : "Oops Internal Error !"
        })
    });
};
exports.signin = (req,res)=>{
    const emailId = req.body.email;
    Student.findOne({where:{
        email : emailId
    }}).then(user=>{
        if(!user){
            res.status(404).send({
                message : "User not found !"
            })
            return;
        }
        var pass = bcrypt.compareSync(req.body.password,user.password);
        if(!pass){
            res.status(401).send({
                message : "password not matched"
            })
            return;
        }
        res.status(200).send({
            message : "Welcome "+user.name
        })
    }).catch(err=>{
        console.log(err);
        res.status(200).send({
            message : "Internal Error !"
        })
    });
};
exports.find = (req,res)=>{
    const param = req.params.name;
    let promis;
    if(param){
        promis = Student.findOne({
            where :{
                name : param
            }
        });
    }
    else{
        promis = Student.findAll();
    }
    promis.then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error !"
        })
    })
}

// exports.applyJob = (req,res)=>{

// }