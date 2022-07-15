const controller = require('../controllers/auth.controller');
module.exports = (app)=>{
    app.post("/relevel/a7/users/signup",controller.signup);
    app.post("/relevel/a7/users/signin",controller.signin);
}

