require("dotenv/config");
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utilities/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require('express');
const routes = require('./routes');

migrationsRun();

const app = express();

var corsOptions = {
	origin: new RegExp('https:\/\/rocket-notes23\.netlify\.app.*$'),
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);


app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message
		});
	}

	console.log(error);

	return response.status(500).json({
		status: "error",
		message: "Internal Server Error"
	});
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));