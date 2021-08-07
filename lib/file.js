const fs = require("fs");
const path = require("path");

function mkdirFilePath(path) {
	if (!fs.existsSync(path)) fs.mkdirSync(path);
}

function saveFile(file) {
	return new Promise((resolve, reject) => {
		try {
			const savePath = path.resolve(__dirname, "../static/upload_dir");
			mkdirFilePath(savePath);

			const reader = fs.createReadStream(file.path);
			const writer = fs.createWriteStream(
				path.resolve(savePath, file.name)
			);

			reader.pipe(writer);

			writer.on("finish", (data) => {
				resolve(data);
			});

			writer.on("error", (err) => reject(err));
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = {
	saveFile,
};
