window.onload = function () {
	const input = document.querySelector("#big");

	input.onchange = function (e) {
		const file = e.target.files[0];

		const formData = new FormData();

		formData.append("file", file);

		fetch("/api/file-upload", {
			method: "POST",
			body: formData,
		})
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
};
