
$(document).ready(function(){
    
    function imgfit(){
        var bw = $("#back").width();    
        var bh = $("#back").height();
        var iw = $("#back img").get(0).width;   // get 의 속성 width    
        var ih = $("#back img").get(0).height;    
        
        var br = bw/bh;
        var ir = iw/ih;
        
        if(br > ir){
            $("#back img").width(bw).height("auto");
        }else{
            $("#back img").width("auto").height(bh);
        }
    }
    imgfit();
    $(window).resize(imgfit);   
    
    function naljja(stamp){
        stamp = stamp * 1000;   // 서버는 초단위 자바스크립트는 밀리초 단위여서 천곱하기
        var time = new Date(stamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;  // 0 부터 시작이라 더하기 1
        var date = time.getDate();
        if(month < 10){
            month = "0"+month;
        }
        if(date < 10){
            date = "0"+date;
        }
        var day = time.getDay();    // 0,1,2,...,6
        var yoil = ["일","월","화","수","목","금","토"];
        date = year+"-"+month+"-"+date;
        day = yoil[day];
        var result = {
            date: date,
            day: day
        }
        return result;
    }
    
    var start = 0;
    
    // 위치 허용 전 위도 경도 값
    var lat = "37.52682";
    var lon = "126.92435";
    
    // 위치 허용 후
    navigator.geolocation.getCurrentPosition(function(pos){
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        $("#city>option").eq(0).attr({
            lat: lat,
            lot: lon
        });
        getweather();
    }, function(){
        getweather();
    });  
    
    function getweather(){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=e73f1448c81fd43fe459b26691ec3c5c&units=metric&lang=kr",
            success: function(data){
                var code = data.list[start].weather[0].id;
                
                if(code >= 200 && code <300){
                    $("#back img").attr("src", "images/thunder.jpg");
                }else if(code >= 300 && code <400){
                    $("#back img").attr("src", "images/drizzle.jpg");
                }else if(code >= 500 && code <600){
                    $("#back img").attr("src", "images/rain.jpg");
                }else if(code >= 600 && code <700){
                    $("#back img").attr("src", "images/snow.jpg");
                }else if(code >= 700 && code <800){
                    $("#back img").attr("src", "images/mist.jpg");
                }else if(code == 800){
                    $("#back img").attr("src", "images/sun.jpg");
                }else if(code >= 801 && code <=802){
                    $("#back img").attr("src", "images/cloud0.jpg");
                }else if(code >= 803 && code <=804){
                    $("#back img").attr("src", "images/cloud1.jpg");
                }
                
                $("#dosi").text(data.city.name);
                $("#date").text(naljja(data.list[start].dt).date + " ("+naljja(data.list[start].dt).day+"요일)");
                $("#icon").html("<img src='https://openweathermap.org/img/wn/"+data.list[start].weather[0].icon+"@2x.png' alt='"+data.list[start].weather[0].description+"' />");
                $("#forecast").text(data.list[start].weather[0].description);
                $("#temp").text(data.list[start].main.temp);
                $("#min").text(data.list[start].main.temp_min);
                $("#max").text(data.list[start].main.temp_max);
                $("#dir").css("transform","rotate("+data.list[0].wind.deg+"deg)");
                $("#speed").text(data.list[start].wind.speed);    
                for(i=0; i<4; i++){
                    $(".fore").eq(i).find(".ficon").html("<img src='https://openweathermap.org/img/wn/"+data.list[start+((i+1)*8)].weather[0].icon+"@2x.png' alt='"+data.list[start+((i+1)*8)].weather[0].description+"' />");
                    $(".fore").eq(i).find(".ftemp").text(data.list[start+((i+1)*8)].main.temp);
                    $(".fore").eq(i).find(".ftext").text(data.list[start+((i+1)*8)].weather[0].description);
                    $(".fore").eq(i).find(".fday").text(naljja(data.list[start+((i+1)*8)].dt).day);
                    
                }
            }
        });
    }
    
    
    $("#city").change(function(){
        lat = $(this).children("option:selected").attr("lat");
        lon = $(this).children("option:selected").attr("lon");
        getweather();
    });
    
    
    
});

//
//
//    {"cod":"200",
//     "message":0,
//     "cnt":40,
//     "list":[
//            {"dt":1636599600,
//             "main":{
//                 "temp":7.62,
//                 "feels_like":4.52,
//                 "temp_min":7.62,
//                 "temp_max":8.91,
//                 "pressure":1012,
//                 "sea_level":1012,
//                 "grnd_level":1004,
//                 "humidity":76,
//                 "temp_kf":-1.29
//             },
//             "weather":[
//                 {
//                     "id":500,
//                     "main":"Rain",
//                     "description":"light rain",
//                     "icon":"10d"}
//             ],
//             "clouds":{"all":95},
//             "wind":{"speed":5.22,"deg":279,"gust":11.49},
//             "visibility":10000,
//             "pop":0.79,
//             "rain":{"3h":0.35},
//             "sys":{"pod":"d"},
//             "dt_txt":"2021-11-11 03:00:00"}















