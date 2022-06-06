var express = require("express");
// const req = require("express/lib/request");
var router = express.Router();
const mysql = require("mysql2");

//POST id för att skriva ut den användarens meddelanden
router.post("/post/:id", function (req, res, next) {
  let sql2 = `SELECT * FROM posts WHERE userId=${req.body.userId}`;
  req.app.locals.con.query(sql2, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("result ", result);
    res.send(result);
  });
});

router.post("/poster/:titleandid", function (req, res, next) {
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

router.post("/post", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    console.log(req.body);
    let sql = `INSERT INTO posts (title, message, userId, created) VALUES ("${req.body.title}", "${req.body.message}","${req.body.userId}","${req.body.created}")`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result ", result);
    });
  });
});

//ÄNDRA TITEL ELLER MEDDELANDE

router.post("/updatef", function (req, res, next) {
  if (req.body.message !== null || undefined) {
    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }

      let sql = `UPDATE posts SET message = "${req.body.message}" WHERE id="${req.body.id}"`;
      req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result ", result);
      });
    });
  }
  if (req.body.title !== null || undefined) {
    req.app.locals.con.connect(function (err) {
      if (err) {
        console.log(err);
      }
      let newMessage = req.body.message.replace(/"/g, "'");

      let sql = `UPDATE posts SET title = "${newMessage}" WHERE id="${req.body.id}"`;
      req.app.locals.con.query(sql, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log("result ", result);
      });
    });
  }
});

router.post("/change/:itleandid", function (req, res, next) {
  console.log(req.body.message);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `UPDATE posts SET message = "${req.body.message}" WHERE id="${req.body.id}" AND userId="${req.body.userId}"`;
    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result ", result);
    });
  });
});

module.exports = router;
