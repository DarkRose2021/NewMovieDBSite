const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const dal = require("./dal").dal;

async function processCSV(filePath) {
	const jsonDataArray = [];

	return new Promise((resolve, reject) => {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (row) => {
				const { fname, email, password } = row;
				const jsonData = { fname, email, password };
				jsonDataArray.push(jsonData);
			})
			.on("end", async () => {
				try {
					// Batch insert users
                    console.log('going to mongodb')
					await dal.createUsersBatch(jsonDataArray);
					console.log(`Data from ${filePath} inserted into MongoDB using DAL`);
					resolve();
				} catch (error) {
					console.error(
						`Error inserting data from ${filePath} into MongoDB:`,
						error
					);
					reject(error);
				}
			});
	});
}

async function processAllCSVFiles(folderPath) {
	try {
		const files = fs.readdirSync(folderPath);
		for (const file of files) {
			if (path.extname(file) === ".csv") {
				const filePath = path.join(folderPath, file);
				await processCSV(filePath);
			}
		}

		console.log("All CSV files processed successfully.");
	} catch (error) {
		console.error("Error reading directory:", error);
	}
}

const folderPath = "./user_data";
processAllCSVFiles(folderPath);
