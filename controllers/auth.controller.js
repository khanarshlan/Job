const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = 'key';
exports.signup = (req,res)=>{
    const body = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    }
    User.create(body).then(user=>{
        if(req.body.roles){
            Role.findAll({
                where :{ name : {
                    [Op.or] : req.body.roles
                }}
            }).then(roles=>{
                user.setRoles(roles).then(()=>{

                    res.status(201).send({
                        message : "Resgistration Complete " + req.body.username
                    });
                })
            })
        }else{
            user.setRoles([2]).then(()=>{
                res.status(201).send({
                    message : "Resgistration Complete " + req.body.username
                });
            })
        }
    }).catch(err=>{
        console.log("Error In  USER Creation");
        res.status(500).send({
            message : "Oops Internal Error !"
        });
    });
};

exports.signin = (req,res)=>{
    const emailId = req.body.email;
    User.findOne({where : {email:emailId}}).then(users=>{
        if(!users){
            res.status(404).send({
                message : "Email not found"
            })
            return;
        }
        var pass = bcrypt.compareSync(req.body.password,users.password);
        if(!pass){
            res.status(404).send({
                message : "Password not matched"
            })
            return;
        }
        let token = jwt.sign({id:users.id},key,{
            expiresIn : 100
        })
        var auth = [];
        users.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                auth.push(roles[i].name);
            }
            res.status(201).send({
                message : "Login Successfull",
                roles : auth
            })
        })
    }).catch(err=>{
        console.log("Error in login time");
        res.status(500).send({
            message : "Oops error found ! "
        })
    })
}