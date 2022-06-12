var express = require("express");
var router = express.Router();
const mysql = require("mysql2");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//POST för att logga in

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
      if (result.length === 0) {
        res.json({ message: "error" });
      } else {
        res.json(result);
      }
      console.log("result ", result);
    });
  });
});

//post för att skapa ny användare

router.post("/newuser", async function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    if (req.body.userName.length === 0 || req.body.password.length === 0) {
      res.json({ message: "Användarnamn och password får inte vara tomma" });
    } else {
      let sql = `SELECT * FROM usertable WHERE userName = "${req.body.userName}"`;
      req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        if (result.length === 0) {
          let sql1 = `INSERT INTO usertable (userName, password) VALUES ("${req.body.userName}", "${req.body.password}")`;
          req.app.locals.con.query(sql1, function (err, result) {
            if (err) {
              console.log(err);
            }
            res.json({ message: "Ny användare skapad" });
          });
        } else {
          res.json({ message: "Användare finns redan, välj annat namn" });
        }
        console.log("result ", result);
      });
    }
  });
});

module.exports = router;
