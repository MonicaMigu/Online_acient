var express = require('express');
var router = express.Router();

//----------------------------
// 引用db.js的pool物件
//----------------------------
var pool = require('./db.js');


//========================
// 處理GET請求
//========================
router.get('/', function (req, res, next) {
    var tno = req.param("trace").trim();  //取得傳入參數
    console.log('select * from trace  join city on city.city_no=trace.city_no join picture on trace.trace_no=picture.trace_no  where trace.trace_no =' + tno);
    pool.query('select * from trace  join city on city.city_no=trace.city_no join picture on trace.trace_no=picture.trace_no  where trace.trace_no =?', [tno], function (error, results, fields) {
        if (error || results.length == 0) {
            res.render('dataNotFound', {});  //轉到找不到資料的畫面
        } else {
            var introduce = results[0].introduce.split("#");
            results[0]["introduce"] = introduce;
            for (var i = 0; i < results.length; i++) {
                var pic_introduce = results[i].pic_introduce.split("#");
                results[i]["pic_introduce"] = pic_introduce;
                console.log(results[i]["pic_introduce"][0].length);
            }
            for (var i = 0; i < results.length; i++) {
                var characteristic = results[i].characteristic.split("#");
                results[i]["characteristic"] = characteristic;
                console.log("characteristic" + results[i]["characteristic"].length);
            }



            res.render('showRemains', { items: results });  //轉到顯示資料的畫面
        }
    });
});

router.post('/location', function (req, res, next) {
    var tno = req.param("trace").trim();  //取得傳入參數

    pool.query('select * from location where trace_no = ?', [tno], function (error, results, fields) {
        res.json({
            lat: results[0].lat,
            lng: results[0].lng,
        })
    });

});

module.exports = router;