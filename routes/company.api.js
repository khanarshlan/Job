const controller = require('../controllers/compnay.controller');
module.exports = (app) =>{
    app.post('/relevel/a7/companies/signup',controller.companyRegistration);
    app.post('/relevel/a7/companies/signin',controller.companySignin);
}