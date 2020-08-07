let http = require('http');
let url = require('url');
let fs = require('fs');

let server = http.createServer ((req,res)=>{

  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  fs.readFile(pathname.substring(1),function (err,data) {
    if (err) {
      res.writeHead(404,{
        'Content-Type': 'text/html'
      });
    }else {
      res.writeHead(200,{
        'Content-Type': 'text/html'
      })
      res.write(data.toString());
      console.log(data);
    }
    res.end();
  });


});
server.listen(3000, ()=>{
  console.log("服务器已经运行，请打开浏览器输入：http://127.0.0.1:3000/ 来进行访问。")
})
console.log("haha");
