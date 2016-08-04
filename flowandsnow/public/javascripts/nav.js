$(document).ready(function() {
    var hamburger = document.getElementsByClassName('bar');
    var drop = document.getElementById('drop');
    var navDrop = document.getElementById('navDrop');
    var viewAdjust = null;
    var scrollTop = null;
    var navAdjust = null;
    var difference = null;
    // var maxScrollTop = $(document).height() - $(window).height();
    // var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    //                document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    // console.log(limit);
    // console.log('mxst: '+maxScrollTop);
    function hi() {
        // if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        //     console.log('maxed');
          
        // } else {
        $('#view').css('margin-top', viewAdjust+'px');
        navDrop.style.marginTop = navAdjust+'px';
        
    }

    $(window).scroll(function() { 
        
    	// clearTimeout( $.data( this, "scrollCheck" ) );
        
    	// $.data( this, "scrollCheck", setTimeout(function() {
            scrollTop = $(this).scrollTop();
            viewAdjust = String((scrollTop + 120)*-1);
            navAdjust = String(scrollTop +34); 
            console.log('st: '+scrollTop);
             $('#view').css('margin-top', viewAdjust+'px');
            navDrop.style.marginTop = navAdjust+'px';
            // hi();
    // 	}, 300) );
    });
    
    navDrop.addEventListener('mouseover', function() {
        drop.style.fill = '#1b3252';
        drop.style.stroke = '#04d7e9'
        for (var i = 0; i < hamburger.length; i++) {
            hamburger[i].style.background = 'white';
        }
    });
    navDrop.addEventListener('mouseleave', function() {
        drop.style.fill = '#216688';
        drop.style.stroke = 'white'
        for (var i = 0; i < hamburger.length; i++) {
            hamburger[i].style.background = '#04d7e9';
        }
    });
    
    function mobileView() {
        console.log('mobile');
    }
    function defaultView() {
        console.log('default');
    }

    if (/Mobi/.test(navigator.userAgent)) {
        mobileView();
    } 
    window.addEventListener('resize', function(){
        if (/Mobi/.test(navigator.userAgent)) {
            mobileView();
        } else {
            defaultView();
        }
    });

  
});