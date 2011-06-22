//JQuery Extend
$.extend({
    //IE6
    isIE6: $.browser.msie && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6),
    //返回浏览器中点top,left
    center: function(){
        return {
            left: $(window).width() / 2 + $(window).scrollLeft(),
            top: $(window).height() / 2 + $(window).scrollTop()
        };
    }
});
//JQuery Fn Extend
$.fn.extend({
    Widget_DropdownLayer_Btn: function(layer, opt){
        //下拉浮层
        var set = {
            align: 'left'
        };
        $.extend(set, opt);
        var _this = this;
        var pannel_top = function(){
            var re = $(_this).offset().top + $(_this).innerHeight();
            return re;
        }
        var pannel_left = function(){
            var re = $(_this).offset().left;
            if (set.align == 'right') {
                re = re + $(_this).innerWidth() - layer.innerWidth();
            };
            return re;
        }
        $(this).overlay({
            fixed: false,
            closeOnClick: false,
            left: pannel_left(),
            top: pannel_top(),
            onBeforeLoad: function(){
                layer.children().hide();
            },
            onLoad: function(){
                layer.css('top', pannel_top() - $('body').scrollTop());
                layer.css('left', pannel_left());
                layer.children().show();
            }
        });
        this.api = $(this).data("overlay");
        return this;
    },
    Counter: function(show, num, options){
        //字数控制
        var _this = this;
        var now = 0;
        show.html('还能输入<em>' + num + '</em>字');
        function Counter(s){
            var n = 0;
            var uFF61 = parseInt("FF61", 16);
            var uFF9F = parseInt("FF9F", 16);
            var uFFE8 = parseInt("FFE8", 16);
            var uFFEE = parseInt("FFEE", 16);
            for (var i = 0; i < s.length; i++) {
                c = s.charCodeAt(i);
                console.log(c);
                if (c < 256) {
                    n = n + 1;
                }
                else {
                    if ((uFF61 <= c) && (c <= uFF9F)) {
                        n = n + 1;
                    }
                    else 
                        if ((uFFE8 <= c) && (c <= uFFEE)) {
                            n = n + 1;
                        }
                        else {
                            n = n + 2;
                        }
                }
            }
            return Math.ceil(n / 2);
            //return s.length;
        };
        this.updateNum = function(){
            if (num < _this.val().length) {
                //_this.val(_this.val().substring(0,num));
                now = Counter(_this.val()) - num;
                show.addClass("over");
                show.html('已超出<em>' + now + '</em>字');
            }
            else {
                now = num - Counter(_this.val());
                show.removeClass("over");
                show.html('还能输入<em>' + now + '</em>字');
            }
            
        }, this.keyup(function(){
            _this.updateNum();
        })
        return this;
    },
    debug: function(s){
        //console == 'undefined' ? console.log(s) : alert(s);
    }
});
//removePx
var removePx = function(pxStr){
    re = new RegExp("(\\d+)px", "g");
    pxStr = pxStr.replace(re, "$1");
    return parseInt(pxStr, 10);
};
//InitInterfaceList
function InitInterfaceList(el, pannel, display){
    var tmpHtml = '';
    var check = '';
    var title = [];
    var ds = display;
    var init = false;
    UpdateDisplay(ds);
    init = true;
    //UpdateDisplay
    function UpdateDisplay(ds){
        el.each(function(i){
            var ti = $(this).children('.title');
            var ct = $(this).children('.ct');
            if (!ds[i]) {
                ct.hide();
                ti.addClass('fold');
            }
            else {
                ct.show();
                ti.removeClass('fold');
            }
            if (!init) {
                title.push(ti.text());
                ti.attr('title', '点击显示/隐藏').css('cursor', 'pointer').click(function(){
                    if (ct.css('display') == 'none') {
                        $(this).removeClass('fold');
                        ct.show();
                    }
                    else {
                        ct.hide();
                        $(this).addClass('fold');
                    }
                });
            }
        });
    };
    //render
    for (var i = 0, l = el.size(); i < l; i++) {
        if (ds[i]) {
            check = 'checked="checked"';
        }
        else {
            check = '';
        }
        tmpHtml = tmpHtml + ' <div class="line">' +
        '<input type="checkbox" class="radio" value="' +
        i +
        '" name="interface_display" id="show_' +
        i +
        '" ' +
        check +
        '>' +
        '<label for="show_' +
        i +
        '" class="radio-txt">' +
        title[i] +
        '</label>' +
        '</div>';
    }
    $('#J_box_list').html(tmpHtml);
    //bind
    $('#J_update_display').click(function(){
        var s = document.getElementsByName('interface_display');
        ds = [];
        for (var i = 0, l = s.length; i < l; i++) {
            if (s[i].checked == true) {
                ds.push(1);
            }
            else {
                ds.push(0);
            }
        }
        pannel.api.close();
        UpdateDisplay(ds);
        //Server Update Result
        alert('模拟服务端更新结果' + ds);
    });
}

//SetBgColor
var ColorCtrl = function(el, ctrl){
    var BgColor = ["#000000", "#FF0000", "#0033FF"];
    var now = 0;
    var _this = this;
    var lis = ctrl.children();
    this.SetBgColor = function(i){
        el.css("color", BgColor[i]);
        $(lis[now]).removeClass("selected");
        $(lis[i]).addClass("selected");
        now = i;
    }
    lis.each(function(i){
        $(this).css('background-color', BgColor[i]).click(function(){
            _this.SetBgColor(i);
        });
    });
    return this;
}

//InitQuickNav
function InitQuickNav(el){
    var tmpHtml = '';
    var title = [];
    el.each(function(i){
        var ti = $(this).children('.title');
        var ct = $(this).children('.ct');
        $(this).attr('id', 'box_' + i);
        title.push(ti.text());
    });
    //render
    for (var i = 0, l = el.size(); i < l; i++) {
        tmpHtml = tmpHtml + '<a href="javascript:;" rel="#box_' + i + '" class="goto" title="跳到' + title[i] + '">' + title[i] + '</a>';
    }
    tmpHtml = tmpHtml + '<a href="javascript:;" class="goto gotop" title="返回顶部" rel="body">返回顶部</a>'
    $('#J_qnav_list').append(tmpHtml);
    //bind
    var moving = false;
    $(window).scroll(function(){
        $()
    });
    $('#J_qnav_list .goto').click(function(){
        var target = $($(this).attr('rel'));
        var top = target.offset().top;
        $('#J_qnav_list').hide()
        moving = true;
        $('html,body').animate({
            'scrollTop': top
        }, 300, function(){
            moving = false;
            $('#J_qnav_list').show();
            //show box
            if (target.children('.title').hasClass('fold')) {
                target.children('.title').removeClass('fold');
                target.children('.ct').show();
            }
        });
        return false;
    });
}

//RunCode
$(function($){
    //界面设置浮层
    var Interface = $('#J_interface_set').Widget_DropdownLayer_Btn($('#J_interface_set_pannel'), {
        align: 'right'
    });
    //Interface.api.load();
    var Display_list = [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0];
    InitInterfaceList($('.box'), Interface, Display_list);
    //快速导航浮层
    var Quick_nav = {};
    InitQuickNav($('.box'));
    var Quick_nav_top = function(){
        var re = $(window).height() - $('#J_qnav_pannel').innerHeight();
        return re;
    }
    Quick_nav_max = true;
    Quick_nav = $('#J_qnav').overlay({
        closeOnClick: false,
        left: 0,
        top: Quick_nav_top(),
        onLoad: function(){
            var layer = this.getOverlay();
            $(window).resize(function(){
                layer.css('top', Quick_nav_top());
				//修正ie6 resize 定位
                if ($.isIE6) {
                    if (Quick_nav_max) {
                        layer.css('top', Quick_nav_top() + $(window).scrollTop());
                    }
                    else {
                        layer.css('top', Quick_nav_top() + $(window).scrollTop() + $('#J_qnav_box').outerHeight());
                    }
                }
            });
			//ie6 fixed定位
            if ($.isIE6) {
                $(window).scroll(function(){
                    var top = Quick_nav_top() + $(window).scrollTop() + $('#J_qnav_box').outerHeight();
                    var max = $('body').outerHeight() - $('#J_qnav_pannel').innerHeight();
                    top = top < max ? top : max;
                    layer.css('top', top);
                    Quick_nav_max = false;
                });
            };
                    }
    });
    //收缩按钮
    $('#J_qnav_ctrl').click(function(){
        var target = $(this).parent();
        var h = $(this).next().outerHeight();
        if (Quick_nav_max) {
            target.animate({
                top: 0 + removePx(target.css('top')) + h
            }, function(){
                Quick_nav_max = false;
            });
        }
        else {
            target.animate({
                top: 0 + removePx(target.css('top')) - h
            }, function(){
                Quick_nav_max = true;
            });
        }
    });
    Quick_nav.api = Quick_nav.data("overlay");
    Quick_nav.api.load();
    //关注栏目浮层
    var Channel_set_1 = $('#J_channel_set').Widget_DropdownLayer_Btn($('#J_channel_set_pannel'));
    $('#J_channel_set_pannel .submit').click(function(){
        Channel_set_1.api.close();
    });
    //字数统计
    $('#source_title').Counter($('#source_title_counter'), 25);
    $('#long_title').Counter($('#long_title_counter'), 18);
    $('#short_title').Counter($('#short_title_counter'), 12);
    //颜色控制
    var cc_1 = new ColorCtrl($('#source_title'), $('#set_source_title_color'));
    cc_1.SetBgColor(1);
    var cc_2 = new ColorCtrl($('#long_title'), $('#set_long_title_color'));
    cc_2.SetBgColor(0);
    var cc_3 = new ColorCtrl($('#short_title'), $('#set_short_title_color'));
    cc_3.SetBgColor(2);
    //lightBox
    $('a.zoom').lightBox();
});
