const cors = require("cors");

const whitelist = ["http://192.168.254.16:3000","http://192.168.254.16:3001"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Accept"));
  console.log(req.header("access_token"));
  if (whitelist.indexOf(req.header("Accept")) !== -1) {
    
    corsOptions = { origin: true };
    
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);