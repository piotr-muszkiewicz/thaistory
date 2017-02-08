$(document).ready(function () {

    function header_height() {
        var height = $(window).height();
        $(".header").css("height", height);
    }
    header_height()
    $(window).resize(function () {
        header_height();
    })

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > $(".header").height()/4) {
            $('.nav').addClass('fixed');
        } else {
            $('.nav').removeClass('fixed');
        }
        if ($(window).scrollTop() > $(".header").height() + 100) {
            $('.scroll-top').addClass('fixed');
        } else {
            $('.scroll-top').removeClass('fixed');
        }
    });
    if ($(window).scrollTop() > $(".header").height()/4) {
        $('.nav').addClass('fixed');
    } else {
        $('.nav').removeClass('fixed');
    }

    $(".scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $('.menu').onePageNav({
        // changeHash: true
    });

    if ($("#map").length) {
        function initialize() {
            var mlat = '51.2463673';
            var mlng = '22.5608534';
            var myLatLngCenter = new google.maps.LatLng(mlat,mlng);
            var styles = [{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"98"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#87cfec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#9de9e6"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}];
            var styledMap = new google.maps.StyledMapType(styles,
                {name: "Styled Map"});
            var mapOptions = {
                zoom: 17,
                center: myLatLngCenter,
                scrollwheel: false,
                navigationControl: true,
                mapTypeControl: true,
                scaleControl: true,
                draggable: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            var marker = new google.maps.Marker({
                position: myLatLngCenter,
                map: map
            });
            google.maps.event.addListener(map, 'click', function(event){
                this.setOptions({
                    scrollwheel:true,
                    draggable: true
                });
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }

    $(".gallery-item").fancybox();

    $(".menu-toggle").click(function () {
        $(".nav, .menu-close,.menu-toggle").addClass("open");
        return false
    })
    $(".menu-close, .menu li a").click(function () {
        $(".nav,.menu-close,.menu-toggle").removeClass("open");
        return false
    });
    
    $(".nav-menu a").click(function () {
        $(".nav-menu a").removeClass("active");
        $(this).addClass("active");
        var href = $(this).attr("href");
        if ($(href).is(":visible")) {

        } else {
            $(".menu-item").hide();
            $(href).fadeIn(800);
        }
        return false
    });
    $(".select select").change(function () {
        var this_s = $(this).val();
        $(".menu-item").hide();
        $(this_s).fadeIn(800);
        $(".nav-menu ul a").removeClass("active");
        $(".nav-menu ul a").each(function () {
            if ($(this).attr("href") == this_s) {
                $(this).addClass("active")
            }
        })
    })
    $(".select select").customSelect();

});
