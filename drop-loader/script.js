
var init = function() {document.addEventListener('DOMContentLoaded', function(){
    var hide = function() {
        var wrap = document.getElementById('test');
        console.log(wrap);
        wrap.classList.add('hide');
    }
    hide();
})};

