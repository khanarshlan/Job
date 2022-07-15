module.exports = (sequelize,Sequelize)=>{
    const Student =sequelize.define('students',{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        name : {
            type : Sequelize.STRING
        },
        qualification : {
            type : Sequelize.STRING
        },
        email : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        },
        phone : {
            type : Sequelize.STRING
        }
    })
    return Student;
};