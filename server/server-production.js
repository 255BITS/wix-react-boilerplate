import path from 'path';
import express from 'express';
import router from './router';
import st from 'st';

const port = process.env.PORT;
const app = express();
let eStaticPath = __dirname + '/../public';
let eStatic = st({
  path: eStaticPath,
  url: '/',
  gzip: true,
  passthrough: true,
  index: 'index.html'
});
app.use(eStatic);
var server = require('http').createServer(app)
 
router.addRoutes(app);
server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

