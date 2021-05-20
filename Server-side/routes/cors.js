const cors = require("cors");

const whitelist = ["http://10.0.0.33:3000","http://10.0.0.33:3001"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("connection"));
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