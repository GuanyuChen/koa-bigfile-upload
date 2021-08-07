const path = require("path");
const Koa = require("koa");
const KoaBody = require("koa-body");
const Router = require("koa-router");
const Static = require("koa-static");

const fileLib = require("./lib/file");

const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(Static(path.join(__dirname, "/static")));
app.use(
	KoaBody({ multipart: true, formidable: { maxFileSize: 500 * 1024 * 1024 } })
);

router.post("/file-upload", async (ctx) => {
	try {
		const file = ctx.request.files.file;
		await fileLib.saveFile(file);

		ctx.body = {
			code: 0,
			data: "http://localhost:5010/upload_dir/" + file.name,
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
