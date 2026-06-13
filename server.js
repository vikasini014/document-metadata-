const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`
CREATE TABLE IF NOT EXISTS files(
id INTEGER PRIMARY KEY AUTOINCREMENT,
filename TEXT,
size INTEGER,
extension TEXT
)
`);

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null,file.originalname);
}
});

const upload = multer({storage});

app.post(
"/upload",
upload.single("document"),
(req,res)=>{

const file=req.file;

const extension=
path.extname(file.originalname);

db.run(
"INSERT INTO files(filename,size,extension) VALUES(?,?,?)",
[file.originalname,file.size,extension]
);

res.send("Uploaded");
}
);

app.get("/files",(req,res)=>{

db.all(
"SELECT * FROM files",
[],
(err,rows)=>{
res.json(rows);
}
);

});

app.listen(5000,()=>{
console.log("Server running");
});