var Router = require('koa-router');

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
		name: ctx.request.body.name
	});
	//1.注意 save 异步的
	let code;
	try {
		await userInstance.save();
		code = 0;
	} catch (e) {
		code = -1;
	}

	//other ways
	/**
	 Tank.create({ size: 'small' }, function (err, small) {
		  if (err) return handleError(err);
		  // saved!
	  });

	 // or, for inserting large batches of documents
	 Tank.insertMany([{ size: 'small' }], function(err) {

		});
	 */

	ctx.body = {
		code
	};
});

module.exports = router;