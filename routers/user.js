var Router = require('koa-router');
const Redis = require('koa-redis');

const Store = new Redis().client;

let router = new Router({
	prefix: '/user'
});

//import models
const User = require("../models/user");

router.get("/",async (ctx,next)=>{

	ctx.cookies.set("guan",'this is a cookie from server');

	await ctx.render("user",{
		user: 'Coder-Guan'
	});

});
//CRUD : https://mongoosejs.com/docs/queries.html
router.post("/create", async (ctx, next) => {
	//console.log(ctx.request.body);
	let userInstance = new User({
		name: ctx.request.body.name,
		age:ctx.request.body.age,
		phone:ctx.request.body.phone,
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
	ctx.body = { code,user:userInstance };
});
router.get("/getUser",async(ctx,next)=>{
	// const results = await User.find({name: ctx.request.body.name});
	const results = await User.find().where('name').in(['guan','guan2']);
	ctx.body = {
		code: 0,
		results
	}
});
router.post('/updateUser',async function(ctx){
	const result = await User.where({
		name: ctx.request.body.name
	}).update({
		age: ctx.request.body.age
	});
	ctx.body={
		code:0,result
	}
});
router.post('/removeUser',async function(ctx){
	const result = await User.where({
		name: ctx.request.body.name
	}).remove();

	ctx.body={
		code:0,result
	}
});

//koa-redis 使用
router.get('/fix',async function(ctx){
	// sid key value
	const st = await Store.hset('fix','name',Math.random());
	// saved! 使用redis可视化工具查看即可

	Store.hget("fix","name").then(res=>{
		console.log(res,"----");
	});

	ctx.body={
		code:0
	}
});

//注意同异步操作
router.get('/testAsync',async (ctx)=>{
	global.console.log('start',new Date().getTime());

	const a = await new Promise((resolve,reject)=>{
		setTimeout(function () {
			global.console.log('async a method',new Date().getTime());
			resolve('ab')
		}, 1000);
	});

	const b= await new Promise((resolve,reject)=>{
		setTimeout(function () {
			global.console.log('async b method',new Date().getTime());
			resolve('abc')
		}, 2000);
	});

	ctx.body={
		a, b
	}
});

module.exports = router;