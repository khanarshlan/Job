module.exports = (sequelize,Sequelize)=>{
    const Company = sequelize.define('company',{
        name : {
            type : Sequelize.STRING
        },
        email : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        },
        website : {
            type : Sequelize.STRING
        },
        employeeSize : {
            type : Sequelize.INTEGER
        }
    });
    return Company;
}