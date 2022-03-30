window.onload = function () {
    AOS.init({
        // once : true
    });

    // 스크롤시 애니메이션    
    $(".customer-box-cont").each(function(index, el) {

        new Waypoint({
          element: el,
          handler: function(direction) {            
            var element = $(this.element);
            var delay = element.attr('data-delay');
            setTimeout(function() {
                if(direction == "down") {
                    element.addClass('slideUp');
                    element.addClass('effect-op-active');
                }else{
                    element.removeClass('slideUp');
                    element.removeClass('effect-op-active');
                }
            }, delay);
            // this.destroy();
          },
          offset: '90%'
        });    

      });

      $(".partner-link").each(function(index, el) {

        new Waypoint({
          element: el,
          handler: function(direction) {            
            var element = $(this.element);
            var delay = element.attr('data-delay');
            setTimeout(function() {
                if(direction == "down") {
                    element.addClass('slideUp');
                    element.addClass('effect-op-active');
                }else{
                    element.removeClass('slideUp');
                    element.removeClass('effect-op-active');
                }
            }, delay);
            // this.destroy();
          },
          offset: '90%'
        });    

      });
    // $('.customer-box-cont').waypoint(function(dir) {
    //     if(dir=="down") {
    //         $('this').addClass('slideUp');
    //     }else{
    //         $('this').removeClass('slideUp');
    //     }
    // }, 
    // { 
    //     offset: '100%' 
    // });
    
    // 클론코드 관련 안내
    let modal_close = $('.modal-close');
    let modal = $('.modal');
    modal_close.click(function () {
        modal.stop().fadeOut(200);
    });

    // menu
    let gnb_li = $('.gnb > li');
    let submenu_div = $('.submenu-div');
    let submenu_box = $('.submenu-box');
    let submenu_height = [];
    $.each(submenu_box, function (index, item) {
        let temp = $(this).outerHeight();
        temp = Math.ceil(temp);
        // console.log(temp);
        submenu_height.push(temp);
        
    });
    // console.log(submenu_height);
    $.each(gnb_li, function (index, item) {
        $(this).mouseenter(function () {
            let h = submenu_height[index];
            submenu_div.css('height', h);
            submenu_div.css('border-bottom-width', 2);
            submenu_box.hide();
            submenu_box.eq(index).show();

            gnb_li.find('a').removeClass('gnb-li-active');
            gnb_li.find('a').eq(index).addClass('gnb-li-active');
        });
    });

    let nav = $('.nav');
    let menu_timer;
    let menu_timer_delay = 100;
    nav.mouseenter(function () {
        clearTimeout(menu_timer);
    });
    nav.mouseleave(function () {
        menu_timer = setTimeout(menuUp, menu_timer_delay);
    });

    function menuUp() {
        clearTimeout(menu_timer);
        submenu_div.css('height', 0);
        submenu_div.css('border-bottom-width', 0);
        gnb_li.find('a').removeClass('gnb-li-active');
    }

    let submenu_container = $('.submenu-div .container');
    submenu_container.mouseenter(function () {
        clearTimeout(menu_timer);
    });
    submenu_container.mouseleave(function () {
        clearTimeout(menu_timer);
        menu_timer = setTimeout(menuUp, menu_timer_delay);
    });

    let news_menu = $('.news-menu a');
    let news_list = $('.news-list');
    $.each(news_menu, function (index, item) {
        $(this).click(function (event) {
            event.preventDefault();
            news_menu.removeClass('news-menu-active');
            news_menu.eq(index).addClass('news-menu-active');
            news_list.removeClass('news-list-active');
            news_list.eq(index).addClass('news-list-active');
        });
    });


    // visual-slide
    new Swiper('.sw-vs-notice', {
        loop: true,
        speed: 500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        direction: 'vertical',
        navigation: {
            nextEl: '.sw-vs-notice-next',
        },
    });

    new Swiper('.sw-vs-news', {
        loop: true,
        speed: 500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        direction: 'vertical',
        navigation: {
            nextEl: '.sw-vs-news-next',
        },
    });


    // 소식 slide
    let sw_news = new Swiper('.sw-news', {
        
        speed: 500,
        pagination: {
            el: '.sw-news-pg',
            clickable: true,
        },
    });

    $('.sw-news-bt').click(function () {
        
        let state = $(this).hasClass('sw-news-bt-active');
        if (state == true) {
        
            sw_news.autoplay.start();
        } else {
            
            sw_news.autoplay.stop();
        }

        $(this).toggleClass('sw-news-bt-active');

    });


    // 관련업체 배너 slide
    new Swiper('.sw-banner', {
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        speed: 500,
        slidesPerView: 7,
        navigation: {
            nextEl: '.sw-control-next',
            prevEl: '.sw-control-prev',
        },
    });

};

$(document).ready(function(){
    let section = $('.main > section');
    let section_pos = [];
    $.each(section, function(index, item){
        let temp = $(this).offset().top;
        temp = parseInt(temp);
        section_pos.push(temp);
    });
    // footer 빠진 상태로 저장
    let footer_pos = $('.footer').offset().top;
    footer_pos = parseInt(footer_pos);
    section_pos.push(footer_pos);
    

    $(window).resize(function(){
        section_pos = [];
        $.each(section, function(index, item){
            let temp = $(this).offset().top;
            temp = parseInt(temp);
            section_pos.push(temp);
        });
        footer_pos = $('.footer').offset().top;
        footer_pos = parseInt(footer_pos);
        section_pos.push(footer_pos);
        sectionFn();
    });

    let section_index = 0;
    let section_total = section_pos.length;
    let section_scoll = 0;
    let section_speed = 500;

    // 윈도우 스크롤 처리
    $(window).scroll(function(){

    });

    // 마우스 휠 처리
    $(window).bind('mousewheel DOMMouseScroll', function (event){
        
        event.preventDefault();
        event.stopPropagation();
        if(section_scoll == 1) {
            return;
        }
        section_scoll = 1;
        
        let distance = event.originalEvent.wheelDelta;
        if (distance == null) {
            distance = event.originalEvent.detail * -1;
        }

        console.log(distance);
        

        if(distance < 0) {
            // console.log('화면 올라갑니다');
            section_index++;
            if(section_index >= section_total) {
                section_index = section_total - 1;
                
                section_scoll = 0;
                return;
            }
        } else {
            // console.log('화면 내려갑니다');
            section_index--;
            if(section_index < 0) {
                section_index = 0;

                section_scoll = 0;
                return;
            }
        }
        sectionFn();
    });

    let control_menu = $('.control-menu a');
    $.each(control_menu, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            section_index = index;
            sectionFn();
        });
    });

    function sectionFn(){
        let temp = section_pos[section_index];
       
        control_menu.removeClass('control-active');
        control_menu.eq(section_index).addClass('control-active');
        
        $('html').stop().animate({
            scrollTop : temp

        }, section_speed, function(){
            section_scoll = 0;
        });
        

    };


    sectionFn();

    // nav 기능 구현
    let gotop = $('.gotop');
    let goup = $('.goup');
    let godown = $('.godown');
    gotop.click(function(event){
        event.preventDefault();
        if(section_scoll == 1) {
            return;
        }
        section_scoll = 1;
        section_index = 0;
        sectionFn();
    });
    goup.click(function(event){
        event.preventDefault();
        if(section_scoll == 1) {
            return;
        }
        section_scoll = 1;
        section_index--;
        if(section_index < 0) {
            section_index = 0;

        }
        sectionFn();
    });
    godown.click(function(event){
        event.preventDefault();
        if(section_scoll == 1) {
            return;
        }
        section_scoll = 1;
        section_index++;
        if(section_index >= section_total -1 ) {
            section_index = section_total - 2;

        }
        sectionFn();
    });
});