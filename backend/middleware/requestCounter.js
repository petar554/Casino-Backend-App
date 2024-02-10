const fs = require("fs");
const path = require("path");

const counterFilePath = path.join(__dirname, "..", "requestCount.txt");

const requestCounter = (req, res, next) => {
  fs.readFile(counterFilePath, { encoding: "utf-8" }, (err, data) => {
    let count = 1;

    if (!err) {
      count = parseInt(data, 10) + 1;
    }

    fs.writeFile(counterFilePath, count.toString(), (err) => {
      if (err) {
        console.error("Error writing to request count file:", err);
      }
      console.log(`Request count: ${count}`);
    });

    next();
  });
};

module.exports = requestCounter;
