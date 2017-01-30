
$(document).ready(function() {
    // var imageurl = "url(https://source.unsplash.com/collection/523015/" + $(window).width() + "x" + $(window).height() + ")";
    // $("body").css({"background-image": imageurl});

    function period(time){
        if(time < 12) {
            return "morning";
        } else if (time < 18) {
            return "afternoon";
        }
        return "evening";
    }

    function gettime() {
        var currentTime = new Date($.now());
        var hours = currentTime.getHours();
        var mins = currentTime.getMinutes();
        $("#time").html(hours + ":" +addzero(mins));
        $("#period").html(period(hours));
    }

    function addzero(i) {
        return (i < 10) ? "0" + i : i;
    }

    //creates clock
    var timer = setInterval(gettime, 1000);

    $("#settings").click(function(){
        $('#settings').toggleClass('rotate');
        $('#settings').toggleClass('rotate-reset');
        var left = $("#popupmenu").position().left;
    if(left == 5){
        $("#popupmenu").animate({
            left: "-700"
        }, 500);
    } else {
        $("#popupmenu").animate({
            left: "5"
        }, 500);
    }
        
    });
});


