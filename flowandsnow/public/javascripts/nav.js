$(document).ready(function() {
    var hamburger = document.getElementsByClassName('bar');
    var drop = document.getElementById('drop');
    var navDrop = document.getElementById('navDrop');
    var svg = document.getElementById('svg');
//     $(window).scroll(function() { 
//         var scrollTop = $(this).scrollTop();
//         var viewAdjust = (scrollTop + 102)*-1;
//         var navAdjust = String(scrollTop +34);
     
//         $('#view').css('margin-top', String(viewAdjust)+'px');
//         $('#navDrop').animate({
//             top: '+='+navAdjust
//         }, 10000, function(){
//             console.log('done');
//         });
        // navDrop.style.marginTop = String(scrollTop +34)+'px';
//     });
    
    navDrop.addEventListener('mouseover', function() {
        drop.style.fill = '#216688';
        for (var i = 0; i < hamburger.length; i++) {
        //     hamburger[i].style.background = 'blue';
        }
    });
    navDrop.addEventListener('mouseleave', function() {
        drop.style.fill = '#216688';
        for (var i = 0; i < hamburger.length; i++) {
        //     hamburger[i].style.background = 'white';
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