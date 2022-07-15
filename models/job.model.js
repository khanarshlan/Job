module.exports = (sequelize,Sequelize)=>{
    const Job = sequelize.define('jobs',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        jobName : {
            type : Sequelize.STRING
        },
        minQualification : {
            type : Sequelize.STRING
        },
        salary : {
            type : Sequelize.INTEGER
        },
        location : {
            type : Sequelize.STRING
        },
        expireOn : {
            type : Sequelize.STRING
        }
    });
    return Job;
}