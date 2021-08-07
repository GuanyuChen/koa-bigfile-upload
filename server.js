const path = require("path");
const Koa = require("koa");
const KoaBody = require("koa-body");
const Router = require("koa-router");
const Static = require("koa-static");

const fileLib = require("./lib/file");

const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(Static(path.join(__dirname, "/static")));
app.use(KoaBody({ multipart: true }));

router.post("/file-upload", async (ctx) => {
	try {
		await fileLib.saveFile(ctx.request.files.file);

		ctx.body = {
			code: 0,
		};
	} catch (error) {
		console.log("error", error);
		ctx.body = {
			code: -1,
			msg: error.message,
		};
	}
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5010, () => {
	console.log("koa server is running");
});
