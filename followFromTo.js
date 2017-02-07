
var windw = this;
$.fn.followFromTo = function (options) {
        
    this.settings = {};

    var $this = this,
        $window = $(windw);

    var defaults = {
        selector : '',
        from: 'self',       // also can be integer 
        to: 'end',          // also can be integer 
        behavior: 'css',       // [class,css]
        class: '',                  // if behavior is class
        marginTopFixed : true,
        marginTopFixedHeight : '',
        debug : false ,
        disable : false
    };


    
    this.init = function() {
        this.settings = $.extend({}, defaults, options);


        // disable plug in
        if(this.settings.disable ){
            this.disable();
            return false;
        }


        // custum selector
        if(this.settings.selector !== ''){
            $this = $(this.settings.selector);
        }

        if(this.settings.marginTopFixed ){
            this.settings.marginTopFixedHeight = $this.height() * 2;
        }
    
        this.scroll();
    };


    this.scroll = function() {

        $setting = this.settings;

        if($setting.from == "self"){
            $setting.from = parseInt($(this).offset().top);
        }
        if($setting.to == "end"){
            $setting.to = parseInt($(document).height());
        }



        $window.on("scroll" , function(e) {


            // debug tool
            if($setting.debug){
                console.log("Page Scroll : " + $window.scrollTop() + " - FixFrom : " + $setting.from + " - FixTo : " + $setting.to);
            }

            if($window.scrollTop() < $setting.to && $window.scrollTop() > $setting.from) {

                if($setting.behavior == "class"){
                    $this.addClass($setting.class);
                    
                }else{

                    $this.css({
                        position: 'fixed',
                        top: 0
                    });
                }

                // add margin top to body
                if($setting.marginTopFixed){
                    $('body').css("margin-top" , $setting.marginTopFixedHeight + "px");
                }
        
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

                // remove margin top to body
                if($setting.marginTopFixed){
                    $('body').css("margin-top" , 0);
                }

            }
        });

    };

    this.disable = function() {
        $window.off("scroll");
        $this = null ;
    };

    this.init();

};
