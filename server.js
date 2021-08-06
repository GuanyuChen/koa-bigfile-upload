const Koa = require("koa");
const KoaBody = require("koa-body");
const Router = require("koa-router");

const app = new Koa();

app.listen(5010, () => {
    console.log("koa server is running");
});
