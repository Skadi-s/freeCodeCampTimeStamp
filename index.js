// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  let date = req.params.date;
  // . 如果传入的参数是空日期，将返回一个包含当前时间的 unix 键的 JSON 对象。
  if (!date) {
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
  } else {
    // . 如果传入的参数是一个合法的日期字符串，应该返回一个包含该日期的 unix 键的 JSON 对象。
    // 参数也可能是一个unix时间戳，应该能够解析它并返回一个包含该日期的 unix 键的 JSON 对象。
    let dateInt = parseInt(date);
    let dateObj = new Date(dateInt);
    if (dateObj.toString() === 'Invalid Date') {
      dateObj = new Date(date);
    }
    if (dateObj.toString() === 'Invalid Date') {
      res.json({error: 'Invalid Date'});
    } else {
      res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
