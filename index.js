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

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  // 如果没有提供日期参数，返回当前时间
  if (!dateParam) {
    const now = new Date();
    return res.json({  // 使用 return 终止后续代码
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // 尝试解析日期参数
  let date;
  // 检查是否是纯数字（Unix 时间戳）
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // 检查日期是否有效
  if (date.toString() === "Invalid Date") {
    return res.json({  // 使用 return 终止后续代码
      error: "Invalid Date"
    });
  }

  // 返回有效日期的结果
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
