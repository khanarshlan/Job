const controller = require('../controllers/job.controller');
const authMiddle = require('../middlewares/jobcreate.onlyCompany');
module.exports = (app)=>{
    app.post('/relevel/a7/make/jobs',controller.make);
    app.get("/relevel/a7/find/jobs",controller.findJob);
}

// [authMiddle.onlyCompany,authMiddle.validCompany]