// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {


    var images_path = 'https://coinfabric.com/equi/images';

    $('img').each(function(index, el) {
        var src = $(this).attr('src');

        var new_src = src.replace('images', images_path);

        $(this).attr('src', new_src);
    });

    var pattern = "images",
        re = new RegExp(pattern, "g");

    var str = $('.images-styles').text();

    $('.images-styles').html( str.replace( re, images_path) );




    setTimeout( function(){
        $('.preloader').fadeOut('1000');
    }, 2000);


    $(".header").headroom();
    
    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.toggle-menu'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    /*---------------------------
                                  File input logic
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.page-menu a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.js-toggle-menu').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('is-active');
        $(this).siblings('header').toggleClass('open');
    });




    var time = new Date( Date.UTC(2018, 4, 15, 0, 0, 0) );

    $('.countdown').countdown({
        until: time,
        padZeroes: true
    }); 



    $('.js-close-telegram-popup').on('click', function(event) {
        event.preventDefault();
        

        $('.telegram-notification').fadeOut('500');
    });






    var words = [ 'Technology Startups?', 'Real Estate?', 'Assets?' ]
    var i = 0;

    setInterval(function() {

        $('.changing-words').fadeOut('500', function() {
            $(this).text( words[i] ).fadeIn('500');
            i++;
        });

        if ( i+1 > words.length ) {
            i = 0;
        }

    }, 4000);


    

    if ( !window.params.isMobile ) {
        $(window).on('scroll', function(event) {
            event.preventDefault();
            
            var topDistance = $(window).scrollTop();
            var layers = $('.parallax');

            layers.each(function(index, el) {
                var depth = $(this).attr('data-depth');
                var movement = -(topDistance * depth)
                var translate3d = 'translate3d(0, ' + movement + 'px, 0)';

                $(this).css('transform', translate3d);
            }); 
        });    
    }
    




    $('.js-continue').on('click', function(event) {
        event.preventDefault();
        
        $('.site-popup-holder').fadeOut('1000');
        $('body').removeClass('site-popup-opened');

        var wow = new WOW(
          {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       100,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
          }
        );
        wow.init();
    });


    /*---------------------------
                                    Accordeon
    ---------------------------*/
    $('.js-faq-handler').on('click', function(event) {
        event.preventDefault();
        var content = $(this).siblings('.faq-item-content');
        $('.js-faq-handler').not($(this)).parent().removeClass('is-open');
        $('.faq-item-content').not(content).slideUp();
        $(this).parent().toggleClass('is-open');
        content.slideToggle();
    });






    $('.js-mailchimp-form').each(function(index, el) {
        var form = $(this);

        form.ajaxChimp({
            url: 'https://capital.us17.list-manage.com/subscribe/post?u=6ad31076a58f0798185e70776&id=565635e94b',
            callback: function(result){
                if ( result.result == 'error' ) {
                    var message = result.msg.replace('0 - ', "");
                    var alert = $('<div class="alert alert-danger" style="display: none;">'+message+'</div>');

                    form.find('.alerts').html('').append( alert );
                    alert.fadeIn(500);
                } else {
                    var message = result.msg.replace('0 - ', "");
                    var alert = $('<div class="alert alert-success" style="display: none;">'+message+'</div>');

                    form.find('.alerts').html('').append( alert );
                    alert.fadeIn(500);
                    
                    form[0].reset();
                }
            }
        });

    });



    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
        
    });


    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }



    /*---------------------------
                                  Form submit
    ---------------------------*/
    $('.ajax-form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*---------------------------
                                  Google map init
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var styles = [];

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 16,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var styledMapType=new google.maps.StyledMapType(styles,{name:'Styled'});
        map.mapTypes.set('Styled',styledMapType);
        map.setMapTypeId('Styled');

        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Site Title"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file