var express = require("express");
// const req = require("express/lib/request");
var router = express.Router();
const mysql = require("mysql2");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let sql = `SELECT * FROM usertable WHERE userName = "${req.body.userName}" && password = "${req.body.password}"`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      if (result.length === 0) {
        res.json({ message: "error" });
      } else {
        res.json(result);
      }
      console.log("result ", result);
    });
  });
});
module.exports = router;
