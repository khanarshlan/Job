const controller = require('../controllers/student.controller');
module.exports = (app) =>{
    app.post('/relevel/a7/students/signup',controller.signup);
    app.post('/relevel/a7/students/signin',controller.signin);
    app.get('/relevel/a7/students/:id',controller.find);
}