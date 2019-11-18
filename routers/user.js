var Router = require('koa-router');
const Redis = require('koa-redis');

const Store = new Redis().client;

let router = new Router({
	prefix: '/user'
});

//import models
const User = require("../models/user");

//如何解析 get method params ?
//如何更好的处理 mongoose 操作的异步问题 ?

router.post("/", async (ctx, next) => {
	//console.log(ctx.request.body);
	let userInstance = new User({
		name: ctx.request.body.name,
		age:666,
		phone:' ',
		otherAttr:"该属性并未被定义,故无法被保存"
	});
	//1.注意 save 异步的
	let code;
	try {
		await userInstance.save();
		code = 0;
	} catch (e) {
		code = -1;
	}

	ctx.body = { code };
});

router.get('/fix',async function(ctx){
	const st = await Store.hset('fix','name',Math.random());
	ctx.body={
		code:0
	}
});

module.exports = router;