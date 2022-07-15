const dbconfig = require('../configs/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,
    {
        host : dbconfig.HOST,
        dialect : dbconfig.dialect
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//db.role = require('./admin.model')(sequelize,Sequelize);
//db.user = require('./authothention')(sequelize,Sequelize);
db.student = require('./student.model')(sequelize,Sequelize);
db.company = require('./company.model')(sequelize,Sequelize);
db.job = require('./job.model')(sequelize,Sequelize);
db.bcrypt = require('bcryptjs');
db.jwt = require('jsonwebtoken');
db.screate = 'key';

// db.user.belongsToMany(db.role,{
//     through : 'user_role',
//     foreignKey : 'userId',
//     otherKey : 'roleId'
// })
// db.role.belongsToMany(db.user,{
//     through : 'user_role',
//     foreignKey : 'roleId',
//     otherKey : 'userId'
// })

db.company.hasMany(db.job);

db.student.belongsToMany(db.job,{
    through : "students_jobs",
    foreignKey : "studentId",
    otherKey : "jobId"
});
db.job.belongsToMany(db.student,{
    through : "students_jobs",
    foreignKey : "jobId",
    otherKey : "studentId"
})

module.exports = db;