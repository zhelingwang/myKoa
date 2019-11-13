const Koa = require("koa");



const app = new Koa();

app.use(async ctx => {
	ctx.body = 'Hello World 4000';
});


// logger
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});



app.listen(4000);