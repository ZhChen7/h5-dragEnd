const express = require("express");
const router = express.Router();
const db = require("./models/mysql");

router.get("/", function (req, res, next) {
  return res.status(200).json({
    err_code: 0,
    message: "OK"
  });
});


// 创建新模版
router.post("/saveTemplate", function (req, res, next) {
  let body = req.body;
  let user = 'zc'

  let addSql = "INSERT INTO tplData(tplname,tplstrdata,user) VALUES(?,?,?)";
  let addSqlParams = [
    body.name,
    body.pointData,
    user
  ];

  db.query(addSql, addSqlParams, function (result, fields) {
    console.log("添加成功");
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });


});


// 编辑保存新模版
router.post("/fixtpldata", function (req, res, next) {
  console.log(req.body);

  let id = parseInt(req.body.id);
  let tplname = req.body.name;
  let tplstrdata = req.body.pointData;
  let updatasql =
    "UPDATE tplData SET tplname = ?,tplstrdata =? WHERE id = ?";
  let updataSqlParams = [
    tplname, tplstrdata, id
  ];
  db.query(updatasql, updataSqlParams, (err, results) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      err_code: 0,
      message: "OK"
    });
  });
});


// 取出模版所有数据
router.get("/getTplAllData", function (req, res, next) {
  let selectsql = "select * from  tplData";

  db.query(selectsql, [], function (result, fields) {
    return res.status(200).json({
      err_code: 0,
      message: "OK",
      result: result
    });
  });
});


module.exports = router;
