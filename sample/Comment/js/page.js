jQuery.fn.extend({
    //相对元素offset定位
    AbsoluteBox: function(options){
        var settings = {
            el: null, //定位元素
            zIndex: 99,
            x: 0, //X偏移量
            y: 0 //Y偏移量
        };
        var _this = this;
        jQuery.extend(settings, options);
        this.setPos = function(){
            if (settings.el != null) {
                var x = settings.el.offset().left + settings.x;
                var y = settings.el.offset().top + settings.y;
                this.css("left", x + "px").css("top", y + "px");
            }
            return this;
        };
        this.show = function(){
            this.setPos().fadeIn();
            
        };
        this.close = function(){
            this.fadeOut();
        };
        this.css("position", "absolute").css("z-index", settings.zIndex).setPos().hide();
        jQuery(window).resize(function(){
            if (_this.css("display") != "none") {
                _this.setPos();
            }
        });
        return this;
    }
});
//RunCode
jQuery(function($){
    $("#tab_nav_1").tabs("#tab_ct_1 > div", {
        event: 'mouseover'
    });
    //定位对象
    var ab1 = $("#tip-1").AbsoluteBox({
        el: $("#J_show"),
        x: 0,
        y: 20
    });
	//绑定事件，你也可以绑定其它事件，例如click
    $("#J_show").focus(function(){
        ab1.show();
    }).blur(function(){
        ab1.close();
    });
});
