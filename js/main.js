jQuery(document).ready(function($){
    // update this value if you change this breakpoint in the style.css file (or _layout.scss if you use SASS)
    var MqL = 1070;

    // on desktop, on click the Details button
    $('a[href="#cd-product-tour"]').on('click', function(event){
        event.preventDefault();
        updatePage('next');
    });

    // on desktop, on click the slider button
    $('.cd-prev').on('click', function(event){
        event.preventDefault();
        updatePage('prev');
    });
    $('.cd-next').on('click', function(event){
        event.preventDefault();
        updatePage('next');
    });

    // on hit the ← or → button
    $(document).on('keyup', function(event) {
        if(event.which === 37) {
            updatePage('prev');
        } else if(event.which === 39) {
            updatePage('next');
        }
    });

    $(window).on('resize', function(){
        window.requestAnimationFrame(function(){
            if($(window).width() < MqL) {
                $('.cd-single-item').each(function(){
                    $(this).find('img').css('opacity', 1).end().find('video').hide();
                });
            } else {
                $('.cd-single-item.cd-active').find('video').show();
                ( $('.cd-main-content').hasClass('is-product-tour') ) ? $('header').addClass('slide-down') : $('header').removeClass('slide-down');
            }
        });
    });
    $(window).on('scroll', function(){
        window.requestAnimationFrame(function(){
            if($(window).width() < MqL && $(window).scrollTop() < $('#cd-product-tour').offset().top - 30 ) {
                $('header').removeClass('slide-down');
            } else if ($(window).width() < MqL && $(window).scrollTop() >= $('#cd-product-tour').offset().top - 30 ){
                $('header').addClass('slide-down');
            }
        });
    });

    function showMainPage() {
        $('header').removeClass('slide-down');
        $('.cd-main-content').removeClass('is-product-tour');
        var video = $('.cd-active').find('video').pause();
        $('.cd-single-item').find('video').each(function(){
            $(this).get(0).currentTime = 0;
        });
    }

    function hideMainPage() {
        $('header').addClass('slide-down');
        if($(window).width() < MqL) {
            $('body,html').animate({'scrollTop': $('#cd-product-tour').offset().top - 30 }, 200);
        } else {
            $('.cd-main-content').addClass('is-product-tour');
        }
    }

    function setInvisible(active) {
        active.addClass('cd-not-visible');
    }

    function setVisible(active) {
        active.removeClass('cd-not-visible');
    }

    function updatePage(direction) {
        var activeSlide = $('.cd-active');
        var selectedSlide;
        if(direction === 'prev') {
            // if move previous to the main page
            if(activeSlide.is(':first-child')) {
                showMainPage();
            } else {
                selectedSlide = activeSlide.prev();
                activeSlide.removeClass('cd-active').addClass('cd-move-right').prev().addClass('cd-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', setInvisible(activeSlide));
            }
        } else {
            // if move next from main page
            if(!$('.cd-main-content').hasClass('is-product-tour')) {
                hideMainPage();
            } else if(activeSlide.is(':last-child')) {
                return;
            } else {
                selectedSlide = activeSlide.next();
                activeSlide.removeClass('cd-active').addClass('cd-hidden').next().removeClass('cd-move-right').addClass('cd-active').one('webkitTr ansitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', setInvisible(activeSlide));
            }
        }

        setVisible(selectedSlide);

        // update slider navigation (in case we reached the last slider)
        ( selectedSlide.is(':last-child') ) ? $('.cd-next').addClass('cd-inactive') : $('.cd-next').removeClass('cd-inactive') ;
        $('.cd-loader').stop().hide().css('width', 0);

    }
});