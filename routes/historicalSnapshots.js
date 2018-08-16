var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//----------------------------
// 引用db.js的pool物件
//----------------------------
var pool = require('./db.js');


//========================
// 處理GET請求
//========================
router.get('/', function (req, res, next) {

  var city = 1;
  pool.query('select * from trace  join city on city.city_no=trace.city_no join picture on trace.trace_no=picture.trace_no  where trace.city_no =?', [city], function (error, results, fields) {
    if (error || results.length == 0) {
      res.render('dataNotFound', {});  //轉到找不到資料的畫面
    } else {
      var introduce = results[0].introduce.split("#");
      results[0]["introduce"] = introduce;
      console.log(results[0]["introduce"]);
      res.render('historicalSnapshots', { items: results });  //轉到顯示資料的畫面
    }
  });
});

router.post('/traces', function (req, res, next) {
  console.log("123");
  var cno = req.param("city").trim();  //取得傳入參數
  console.log("select * from trace  join city on city.city_no=trace.city_no where trace.city_no =" + cno);
  pool.query('select * from trace join city on city.city_no=trace.city_no where trace.city_no = ?', [cno], function (error, results, fields) {
    res.json({
      traces: results,
    })
  });

});

router.post('/images', function (req, res, next) {
  console.log("123");
  var tno = req.param("trace").trim();  //取得傳入參數
  console.log("select * from trace  join city on city.city_no=trace.city_no join picture on picture.trace_no=trace.trace_no where trace.trace_no=" + tno);
  pool.query('select * from trace  join city on city.city_no=trace.city_no join picture on picture.trace_no=trace.trace_no where trace.trace_no= ?', [tno], function (error, results, fields) {
  console.log(results);
    res.json({
      traces: results,
    })
  });

});

router.post('/showRemains', function (req, res, next) {
  var tna = req.param("trace").trim();
  console.log(tna);
  console.log('select * from trace where trace_no=' + tna);
  pool.query('select * from trace where trace_no=?', [tna], function (err, traces) {
    console.log(traces);
    res.json({
      traces: traces,
    })


  });

});



module.exports = router;
