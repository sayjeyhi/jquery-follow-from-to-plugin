
var windw = this;
$.fn.followFromTo = function (options) {
        
    this.settings = {};

    var $this = this,
        $window = $(windw);

    var defaults = {
        from: 'self',       // also can be integer 
        to: 'end',          // also can be integer 
        behavior: 'css',       // [class,css]
        class: '',                  // if behavior is class
        marginTopFixed : '-'+$this.height(),
        debug : true 
    };


    
    this.init = function() {
        this.settings = $.extend({}, defaults, options);
        this.scroll();
    }

    this.scroll = function() {

        $setting = this.settings;

        if($setting.from == "self"){
            $setting.from = parseInt($(this).offset().top);
        }
        if($setting.to == "end"){
            $setting.to = parseInt($(document).height());
        }



        $window.scroll(function(e){

            if($setting.debug)console.log("Page Scroll : " + $window.scrollTop() + " - FixFrom : " + $setting.from + " - FixTo : " + $setting.to);

            if($window.scrollTop() < $setting.to && $window.scrollTop() > $setting.from) {
                if($setting.behavior == "class"){
                    $this.addClass($setting.class);
                    
                }else{

                    $this.css({
                        position: 'fixed',
                        top: 0
                    });
                }
                $('body').css("margin-top" , $setting.marginTopFixed + "px");
        
            }else if ($window.scrollTop() > $setting.to) {

                $this.css({
                    position: 'absolute',
                    top: $setting.to
                });

            } else {
                if($setting.behavior == "class"){
                    $this.removeClass($setting.class);
                }else{

                    $this.css({
                        position: 'static',
                        top: 0
                    });
                }
            }
        });

    }


    this.init();

};
