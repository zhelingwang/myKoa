const Koa = require("koa");
const KeyGrip = require("keygrip");
const onerror = require("koa-onerror");
const session = require('koa-session');
const bodyparser = require("koa-bodyparser");
const redisStore = require("koa-redis");
const mongoose = require('mongoose');

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

// session
app.use(session({
	key:"guan:session",
	store:redisStore({})
},app));

app.use(bodyparser({
	enableTypes:['json', 'form', 'text']
}));

// static resources
app.use(require('koa-static')(__dirname + '/public'));

// use customize middleware : logger
app.use(MyLogger());


// 模板引擎 Must be used before any router is used
app.use(require('koa-view')(__dirname + '/views'));


// koa-router : routes handlers
// 为了便于维护 , 将router对象单独拿出来
let userRouter = require("./routers/user");
app.use(userRouter.routes()).use(userRouter.allowedMethods());

//连接mongoDB
let dbConfig = require("./DB/db");
mongoose.connect(dbConfig.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


//最后拦截的router
app.use(async (ctx,next) => {
	// ctx.cookies.set("guan",'this is a cookie from server',{signed:true});

	// let count = ctx.session.count || 0;
	// ctx.session.count = ++count;

	// if(ctx.url === '/template')
	// 	await ctx.render('./common/template', {
	// 		title: 'template-default'
	// 	});

	//ctx.body = `${count} times`;

	// ctx.body = `not found request URL......`;
});

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

app.listen(4000);