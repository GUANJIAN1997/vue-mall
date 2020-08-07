var http = require('http')

let util = require('util');

http.get('http://m.imooc.com/api/user/userInfo', function (res) {
  let data = '';
  res.on("data", function (chunk) {
    data += chunk;
  });
  res.on("end", function () {
    let result = JSON.parse(data);
    console.log("result:"+result.msg);
  })
});

