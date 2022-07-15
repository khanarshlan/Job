const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require('./models');
db.sequelize.sync({force:true}).then(()=>{ 
    console.log("Table Created..");
    //intiRole();
}).catch(error=>{
    console.log(error);
})
//const Role = db.role;
function intiRole(){
    Role.create({
        id : 1,
        roles : "admin"
    });
    Role.create({
        id : 2,
        roles : "user"
    })
}

require('./routes/login.api')(app);
require('./routes/student.api')(app);
require('./routes/company.api')(app);
require('./routes/jobs.api')(app);

app.listen(2020,()=>{
    console.log("Server is Started....");
})