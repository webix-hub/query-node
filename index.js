const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");
const getSQL = require("wheresql");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "query"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static("./"));

const port = "3200";
const host = "localhost";

const server = app.listen(port, host, function () {
	console.log("Server is running on port " + port + "...");
	console.log(`Open http://${host}:${port} in browser`);
});

const dbConfig = {};

app.post("/api/data/:table", (req, res, next) => {
	const {sql, values, error} = getSQL(req.body, dbConfig);
	if(error)
		return res.status(500).send(error);

	con.query(
		`SELECT * FROM ${req.params.table} WHERE ${sql}`,
		values,
		function (err, result) {
			if (err)
				next(err);
			else
				res.send(result);
		}
	);
});

app.get("/api/data/:table/:field/suggest", (req, res, next) => {
	con.query(
		`SELECT DISTINCT ${req.params.field} FROM ${req.params.table} ORDER BY ${req.params.field} ASC`,
		function (err, result, fields) {
			if (err)
				next(err);
			else
				res.send(result.map(obj => obj[req.params.field]));
		}
	);
});