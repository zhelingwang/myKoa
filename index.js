const Koa = require("koa");
const KeyGrip = require("keygrip");
const onerror = require("koa-onerror");

const MyLogger = require("./middleware/MyLogger");

const app = new Koa();

onerror(app);

//app.keys start***********************************
//1.自己生产KeyGrip
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
//2.自动传递给KeyGrip
// app.keys = ['im a newer secret', 'i like turtle'];
//3.在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
// ctx.cookies.set('name', 'tobi', { signed: true });
//app.keys end***********************************

//app.context start***********************************
app.context.myOwnExtendData = {greeting:"hello world"};
//app.context end***********************************


// customize logger
app.use(MyLogger());




app.use(async ctx => {
	console.log(ctx.myOwnExtendData);
	// ctx.cookies.set("guan",'this is a cookie from server',{signed:true});
	ctx.body = 'Hello World 4000';
});



// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

app.listen(4000);