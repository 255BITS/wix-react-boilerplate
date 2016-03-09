import wixMiddleware from './wix'; 
import bodyParser from 'body-parser';

export default {
  addRoutes(app) {
    app.set('view engine', 'jade');
    app.use(wixMiddleware);
    app.use(bodyParser.urlencoded());
    app.post('/save', function (req, res) {
      let instanceId = req.wix.instanceId;
      let settings = req.body.settings;
    });
 
    app.get('/settings', function (req, res) {
      let instanceId = req.wix.instanceId;

      res.render('settings');
    });
    app.get('/widget', function (req, res) {
      let instanceId = req.wix.instanceId;
      var poll = {};

      res.render('widget');
    });
    app.get('*', function response(req, res) {
      console.log("Not found", req.path);
      res.send(404);
    });
  }
}
