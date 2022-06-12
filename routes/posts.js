var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

//POST id för att skriva ut den användarens meddelanden
router.post("/all", function (req, res, next) {
  let sql2 = `SELECT * FROM posts WHERE userId=${req.body.userId}`;
  req.app.locals.con.query(sql2, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("result ", result);
    res.send(result);
  });
});

//Rendera ut beroende på id

router.post("/findpost", function (req, res, next) {
  console.log(req.body.id);
  console.log(req.body.userId);
  let sql2 = `SELECT * FROM posts WHERE id=${req.body.id}`;
  req.app.locals.con.query(sql2, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("result ", result);
    res.json(result);
  });
});

//NYTT MEDDELANDE

router.post("/new", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    console.log(req.body);
    let sql = `INSERT INTO posts (title, message, userId) VALUES ("${req.body.title}", '${req.body.message}','${req.body.userId}')`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json({ result: "ok" });
    });
  });
});

router.post("/remove", function (req, res, next) {
  console.log(req.body.id);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    console.log(req.body);
    let sql = `DELETE FROM posts WHERE id = "${req.body.id}"`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json({ result: "ok" });
    });
  });
});

//ÄNDRA titel eller meddelande

router.post("/change/", function (req, res, next) {
  console.log(req.body.message);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql2 = `SELECT title,message FROM posts WHERE id="${req.body.id}" `;
    req.app.locals.con.query(sql2, function (err, result) {
      console.log(result[0].title + req.body.title);
      if (
        result[0].title === req.body.title &&
        result[0].message === req.body.message
      ) {
        res.json({ error: "Du har inte gjort några ändringar, försök igen!" });
      } else {
        let sql = `UPDATE posts SET message = '${req.body.message}',title = '${req.body.title}' WHERE id="${req.body.id}" AND userId="${req.body.userId}"`;
        req.app.locals.con.query(sql, function (err, result) {
          if (err) {
            console.log("HÄR ÄR ETT ERROR", err);
            res.json({ error: "Något gick fel, försök igen" });
          } else {
            res.json({ result: "ok" });
          }
        });
      }
    });
  });
});

module.exports = router;
