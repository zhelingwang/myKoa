module.exports = function () {
	return async (ctx,next) =>{
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		console.log(`--- logger --- ${ctx.method} ${ctx.url} - ${ms}`);
	}
};