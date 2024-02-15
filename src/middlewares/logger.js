const fs = require("node:fs");

const logger = (req, res, next) => {
	fs.open("./log.txt", "a+", (err, fd) => {
		if (err) throw err;
		fs.appendFile(
			fd,
			` ${getLocaltime()}   |   ${req.method} ${req.url}\n`,
			(err) => {
				if (err) throw err;
			}
		);
		fs.close(fd);
		return next();
	});
};

const getLocaltime = () => {
	const time = new Date();
	const timeString = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}, ${time
		.toTimeString()
		.substring(0, 18)}`;
	return timeString;
};

module.exports = logger;
