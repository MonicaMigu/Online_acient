var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//------------------------------
// 引用db.js的pool物件
//------------------------------
var pool = require('./db.js');
/* GET home page. */
router.get('/', function (req, res, next) {

  pool.query('select * from city  ', function (err, results) {

    pool.query('select * from trace join city where city.city_no=trace.city_no ', function (err, trace) {
      traces = [];
      number = [];
      console.log("----------------------------------------------");
      var change=[24 ,28 ,16 ,13 ,2];
      for (var i = 0; i < 8; i++) {
        var random = Math.floor(Math.random() * 30) + 1;
        var judge=true;
        if (number.length != 0) {
          for (var j = 0; j < i; j++) {
            console.log(j);
            if (random == number[j]) {
              judge=false;
              break;
            }
          }
          if(judge==true){
            number.push(random);
          }else{
            i--;
          }
        }else{
          number.push(random);
        }
      }
      console.log("----------------------------------------------");
      var image;
      for (var i = 0; i < trace.length; i++) {
        for (var j = 0; j < 8; j++) {
          if (trace[i].trace_no == number[j]) {
             image=0;
          
            for (var l=0; l<5 ;l++){
            
              if(change[0]==number[j]){
                image=1;
                break;
              }
            }
        
            trace[i]["image"]=image;
            console.log(image);
            traces.push(trace[i]);
          }
        }
      }
    
      console.log("----------------------------------------------");
      number=[];
      carousel=[];
      for (var i = 0; i < 3; i++) {
        var random = Math.floor(Math.random() * 30) + 1;
        var judge=true;
        if (number.length != 0) {
          for (var j = 0; j < i; j++) {
            console.log(j);
            if (random == number[j]) {
              judge=false;
              break;
            }
          }
          if(judge==true){
            number.push(random);
          }else{
            i--;
          }
        }else{
          number.push(random);
        }
      }
      for (var i = 0; i < trace.length; i++) {
        for (var j = 0; j < 3; j++) {
          if (trace[i].trace_no == number[j]) {
            trace[i]["carousel"]=j;
            console.log(trace[i]);
            carousel.push(trace[i]);
          }
        }
      }
      console.log("----------------------------------------------");
      res.render('index', { items: results, traces: traces, carousel:carousel});

    });

  });
});
router.post('/traces', function (req, res, next) {
  var cno = req.param("city").trim();
  console.log(cno);
  pool.query('select * from trace where city_no=? ', [cno], function (err, traces) {

    res.json({
      traces: traces,
    })


  });

});
router.post('/history', function (req, res, next) {
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
