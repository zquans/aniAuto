(function ($) {

    var aniNames = [
        "bounce",
        "flash",
        "pulse",
        "rubberBand",
        "shake",
        "headShake",
        "swing",
        "tada",
        "wobble",
        "jello",
        "bounceIn",
        "bounceInDown",
        "bounceInLeft",
        "bounceInRight",
        "bounceInUp",
        "bounceOut",
        "bounceOutDown",
        "bounceOutLeft",
        "bounceOutRight",
        "bounceOutUp",
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "fadeOut",
        "fadeOutDown",
        "fadeOutDownBig",
        "fadeOutLeft",
        "fadeOutLeftBig",
        "fadeOutRight",
        "fadeOutRightBig",
        "fadeOutUp",
        "fadeOutUpBig",
        "flipInX",
        "flipInY",
        "flipOutX",
        "flipOutY",
        "lightSpeedIn",
        "lightSpeedOut",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "rotateOut",
        "rotateOutDownLeft",
        "rotateOutDownRight",
        "rotateOutUpLeft",
        "rotateOutUpRight",
        "hinge",
        "rollIn",
        "rollOut",
        "zoomIn",
        "zoomInDown",
        "zoomInLeft",
        "zoomInRight",
        "zoomInUp",
        "zoomOut",
        "zoomOutDown",
        "zoomOutLeft",
        "zoomOutRight",
        "zoomOutUp",
        "slideInDown",
        "slideInLeft",
        "slideInRight",
        "slideInUp",
        "slideOutDown",
        "slideOutLeft",
        "slideOutRight",
        "slideOutUp",
    ];

    function autoAni(item) {
        var delay = 0, duration = null;
        var $item = $(item);
        $item.hide();

        function runItemAni() {
            $item.show();

            //delay
            if ($item.attr('ani-delay')) {
                delay = $item.attr('ani-delay');
                $item.css({
                    'animation-delay': delay,
                    '-webkit-animation-delay': delay,
                    '-ms-animation-delay': delay,
                    '-woz-animation-delay': delay
                });
            }
            //duration
            if ($item.attr('ani-duration')) {
                duration = $item.attr('ani-duration');
                $item.css({
                    'animation-duration': duration,
                    '-webkit-animation-duration': duration,
                    '-ms-animation-duration': duration,
                    '-woz-animation-duration': duration
                });
            }
            //iteration
            if ($item.attr('ani-iteration')) {
                var iterationCount = $item.attr('ani-iteration');
                $item.css({
                    'animation-iteration-count': iterationCount,
                    '-webkit-animate-iteration-count': iterationCount,
                    '-ms-animate-iteration-count': iterationCount,
                    '-woz-animate-iteration-count': iterationCount
                });
            }

            $item.addClass('animated');

            $item.removeClass('ani-auto');


            //scroll
            if (undefined != $item.attr('ani-scroll')) {
                var offset = $item.attr('ani-scroll-offset');

                if (offset) {
                    if (offset.indexOf('%')) {
                        offset = parseFloat(offset);
                        if (offset.toString() == 'NaN') {
                            offset = 0;
                        } else {
                            offset = offset / 100 * $('body').height()
                        }
                    } else {
                        offset = parseFloat(offset);
                        if (offset.toString() == 'NaN') {
                            offset = 0;
                        } else {
                            offset = offset / 100 * $('body').height()
                        }
                    }
                } else {
                    offset = 0;
                }


                var top = $item.offset().top + offset;


                $('body,html').animate({scrollTop: top}, delay || 1000);

                //console.log('[' + $item.attr('id') + ']==>top:' + top);
            }

        }

        //trigger
        if ($item.attr('ani-trigger')) {
            var triggerSelector = $item.attr('ani-trigger');
            $(triggerSelector).
                one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function () {
                    if (!$item.hasClass('animated')) {
                        runItemAni();
                    }
                });
        } else {
            runItemAni();
        }

        //console.log('[' + $item.attr('id') + ']==>delay:' + delay);
    }

    //api

    $.aniAuto = function (dom) {
        var autoAniItems = $('.ani-auto', dom && $(dom));
        $.each(autoAniItems, function (index, item) {
            autoAni(item);


        });
    }

})(jQuery);