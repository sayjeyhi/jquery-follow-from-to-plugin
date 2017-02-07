
$.fn.followFromTo = function ( from , to = "end" ) {
    var $this = this,
        $window = $(windw);
    
    if(from == "self"){
    	from = parseInt($(this).offset().top);
    }
    if(to == "end"){
    	to = parseInt($(document).height());
    }
        
    $window.scroll(function(e){
        if($window.scrollTop() < to && $window.scrollTop() > from) {
            $this.css({
                position: 'fixed',
                top: 0
            });
  
        }else if ($window.scrollTop() > to) {
            $this.css({
                position: 'absolute',
                top: to
            });
        } else {
            $this.css({
                position: 'static',
                top: 0
            });
        }
    });
};
