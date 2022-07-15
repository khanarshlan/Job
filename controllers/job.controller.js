const db = require('../models');
const Job = db.job;
const Company = db.company;
const Student = db.student;

exports.make = (req,res)=>{
    const body = {
        jobName : req.body.jobName,
        minQualification : req.body.minQualification,
        salary : req.body.salary,
        location : req.body.location,
        expireOn : req.body.expireOn,
        companyId  : req.body.companyId
    }
    Job.create(body).then(data=>{
        res.status(201).send(data);
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error !"
        })
    });
};

exports.findJob = (req,res)=>{
    const queryJob = req.query.jobName;
    const querySalary = req.query.salary;
    if(queryJob){
        Job.findOne({where : {
            jd : queryJob
        }}).then(jobs=>{
            if(!jobs){
                res.status(404).send({
                    message : "No requirement"
                });
                return;
            }
            else
            res.status(200).send(data);
        }).catch(err=>{
            res.status(500).send({
                message : "internal error"
            });
        })
    }
    else if(querySalary){
        Job.findOne({where : {
            jd : querySalary
        }}).then(salarys=>{
            if(!salarys){
                res.status(404).send({
                    message : "Not avilable"
                });
                return;
            }
            else
            res.status(200).send(salarys);
        }).catch(err=>{
            res.status(500).send({
                message : "internal error"
            });
        })
    }else{
        Job.findAll().then(data=>{
            res.status(201).send(data);
        }).catch(err=>{
            res.status(500).send({
                message : "Internal Error !"
            })
        });
    }
};

