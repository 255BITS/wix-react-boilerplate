var crypto = require("crypto");

function verifyInstance(instance, secret) {
    // spilt the instance into signature and data
    var pair = instance.split('.');
    var signature = decode(pair[0], 'binary');
    var data = pair[1];
    // sign the data using hmac-sha1-256
    var hmac = crypto.createHmac('sha256', secret);
    var newSignature = hmac.update(data).digest('binary');

    return (signature === newSignature);
}
 
function parseSiteId(req, res, next) {
  if(!req.query['instance'] && process.env.NODE_ENV === 'production') {
    return next();
  }
  console.log(process.env.WIX_SECRET);
  if(!process.env.WIX_SECRET) {
    console.error("missing WIX_SECRET");
    return res.send("missing WIX_SECRET");
  }
  var instance = req.query['instance'];
  req.wix = {};
  if ( process.env.NODE_ENV !== 'production' && typeof(instance) === "undefined" ) {
    req.wix.plan = "paid";
    req.wix.instanceId= 'development';
    next();
  } else if(!verifyInstance(instance, process.env.WIX_SECRET)) {
    console.log("Could not verify wix instance.  Did you set the WIX_SECRET environment variable correctly?");
    res.sendStatus(500);
  } else {
    var wixdata = decode(instance.split(".")[1], "utf8");
    var data = JSON.parse(wixdata);
    req.wix = {};
    req.wix.permissions= data.permissions;
    let compId = req.param("origCompId") || req.param("compId");
    req.wix.instanceId= data.instanceId;
    if(compId) {
      req.wix.instanceId += '/'+compId;
    }
    req.wix.signDate = new Date(data.signDate);
    req.wix.isSiteOwner= data.uid == data.siteOwnerId;
    req.wix.deviceType = req.query.deviceType;
    req.wix.plan = "free";
    req.wix.aid = data.aid;
    req.wix.uid = data.uid;
    if(data.vendorProductId) {
      req.wix.plan = "paid";
    }
    next();
  }
}
function requireSameDay(req, res, next) {
  var signDate=  req.wix.signDate;
  var oneDay = 24 * 60 * 60 * 1000;
  if((new Date() - signDate) > oneDay) {
    res.send({error: "Please refresh to continue editing your App"});
  } else {
    next();
  }
}
function decode(data, encoding) {
  encoding = encoding === undefined ? 'utf8' : encoding
  var buf = new Buffer(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
  return encoding ? buf.toString(encoding) : buf;
}

module.exports = parseSiteId;

