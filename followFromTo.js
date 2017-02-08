
var windw = this;
$.fn.followFromTo = function (options) {
        
    $settings = {};

    var $this = this,
        $window = $(windw);

    var defaults = {
        selector : '',
        from: 'self',           // int , self , or data 
        to: 'end',             // int , self , or data 
        behavior: 'css',       // [class,css]
        class: '',                  // if behavior is class
        marginTopFixed : true,
        marginTopFixedHeight : '',
        debug : false ,
        disable : false ,
        exit : false
    };


    
    this.init = function() {
        $settings = $.extend({}, defaults, options);

        // disable plug in
        if($settings.disable ){
            this.disable();

            if($settings.exit)
                return false;
        }


        // custum selector
        if($settings.selector !== ''){
            $this = $($settings.selector);
        }

        if($settings.marginTopFixed ){
            $settings.marginTopFixedHeight = $this.height() * 2;
        }



        if($settings.marginTopFixed ){
            $settings.marginTopFixedHeight = $this.height() * 2;
        }
    
        this.scroll();
    };


    this.scroll = function() {



        $window.off().on("scroll" , function(e) {


            if($settings.from == "data" ){
                $settings.from = $this.attr("data-from");
            }else if($settings.from == "self"){
                $settings.from = $this.offset().top;
            }


            if($settings.to == "data" ){
                $settings.to = $this.attr("data-to");
            }else if($settings.to == "end"){
                $settings.to = $(document).height();
            }

            // debug tool
            if($settings.debug){
                console.log("Page Scroll : " + $window.scrollTop() + " - FixFrom : " + $settings.from + " - FixTo : " + $settings.to);
            }

            if($window.scrollTop() < $settings.to && $window.scrollTop() > $settings.from) {

                if($settings.behavior == "class"){
                    $this.addClass($settings.class);
                    $this.removeClass("absoluteMenu");
                }else{

                    $this.css({
                        position: 'fixed',
                        top: 0
                    });
                }

                // add margin top to body
                if($settings.marginTopFixed){
                    $('body').css("margin-top" , $settings.marginTopFixedHeight + "px");
                }
        
            }else if ($window.scrollTop() > $settings.to) {

                if($settings.behavior == "class"){
                    $this.addClass("absoluteMenu");
                    $this.removeClass($settings.class);
                }else{
                    
                    $this.css({
                        position: 'absolute',
                        top: $settings.to
                    });
                }


            } else {

                if($settings.behavior == "class"){
                    $this.removeClass($settings.class + " absoluteMenu");
                }else{
                    $this.css({
                        position: 'static',
                        top: 0
                    });
                }

                // remove margin top to body
                if($settings.marginTopFixed){
                    $('body').css("margin-top" , 0);
                }

            }
        });

    };

    this.disable = function() {
        $window.off("scroll");
    };

    this.init();

};
