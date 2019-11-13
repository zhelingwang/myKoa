# myKoa
koa learning from zero and official website of Koa

## 1.初始化项目
- 基本包
```
npm install koa -S
npm install nodemon -D  
```
- 配置npm命令(package.json)
```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
}
```

## 2.中间件 - app.use(middleware function)
- async-await function
- common function

## 3.app.keys
```text
设置签名cookie密钥
```

## 4.app.context
```text
//app.context : ctx 的原型,常用于挂载全局使用的属性或方法
{ 
    request:{ 
        method: 'GET',
        url: '/',
        header:{ 
            host: 'localhost:4000',
            connection: 'keep-alive',
            pragma: 'no-cache',
            'cache-control': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            cookie:'guan=this is a cookie from server; guan.sig=wl4ipAgL-o4O1w2Rac4dRsGXZj0ra02baMsgzTL04iQ' 
        }
    },
  response: { status: 404, message: 'Not Found', header: {} },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>' 
}

ctx.request: koa的request对象
ctx.response: koa的response对象

ctx.req: node的request对象
ctx.res: node的response对象

Koa 不支持 直接调用底层 res 进行响应处理。请避免使用以下 node 属性：
ctx.res.statusCode
ctx.res.writeHead()
ctx.res.write()
ctx.res.end()
```

## 5.cookies
```javascript
ctx.cookies.get(name, [options])

ctx.cookies.set(name, value, [options])
```

## 6.抛出错误
```javascript
ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });

ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
```

## 7.自定义中间件
```javascript
app.use(function(ctx,next) {
  //......
});
app.use(async(ctx,next)=>{
	//......
})
// 只需要返回一个函数作为app.use()的参数即可,所谓的中间件不过是一个函数,
// 该中间件函数用于某些特定的功能,比如:logger,解析request数据,挂载额外扩展的信息等等
```