/*
 Page JS
 vk Heung 20100917
 */
//check Login
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
function validpwdstring(str){
    var len;
    len = str.length;
    if (str.length == 0) 
        return false;
    return true;
}

function onsubmitForm(){
    if (document.getElementById('UserName').value.trim() == '' || document.getElementById('UserName').value.trim() == 'Email或手机号码') {
        alert("请输入用户名或者手机号码.");
        document.getElementById('UserName').focus();
        return false;
    }
    if (!validpwdstring(document.getElementById('Password').value.trim())) {
        alert("请输入登录密码。");
        document.getElementById('Password').focus();
        return false;
    }
    if (document.getElementById('Password').value.trim().length > 14) {
        alert("密码的长度必须是小于14 位 !");
        document.getElementById('Password').value = "";
        document.getElementById('Password').focus();
        return false;
    }
    var str = document.getElementById('UserName').value;
    var str2 = document.getElementById('Password').value;
    if ((str.indexOf("'") != -1) || (str.indexOf("\"") != -1) || (str.indexOf("\\") != -1 || (str.indexOf("\?")) != -1)) {
        window.alert("用户名中不能包含 \' 或 \" 或 \\或\? ，请重新输入！");
        document.getElementById('UserName').focus();
        return false;
    }
    if ((str2.indexOf("'") != -1) || (str2.indexOf("\"") != -1) || (str2.indexOf("\\") != -1 || (str2.indexOf("\?")) != -1)) {
        window.alert("密码中不能包含 \' 或 \" 或 \\ 或\?，请重新输入！");
        document.getElementById('Password').focus();
        return false;
    }
    var username = document.getElementById('UserName').value;
    if (username.indexOf('@') < 0) {
        username = username + "@21cn.com";
        document.getElementById('UserName').value = username;
    }
    document.form1.action = "http://passport.21cn.com/login_execute1.jsp";
    document.form1.method = "post";
    document.form1.submit();
}

function clearDefaultValue(){
    var obj = document.getElementById("UserName");
    var un = obj.value;
    if (un == "Email或手机号码") {
        obj.value = "";
    }
}

function getCookie(name){
    var CookieFound = false;
    var start = 0;
    var end = 0;
    var CookieString = document.cookie;
    var i = 0;
    
    while (i <= CookieString.length) {
        start = i;
        end = start + name.length;
        
        if (CookieString.substring(start, end) == name) {
            CookieFound = true;
            break;
        }
        i++;
    }
    
    if (CookieFound) {
        start = end + 1;
        end = CookieString.indexOf(";", start);
        if (end < start) 
            end = CookieString.length;
        return unescape(CookieString.substring(start, end));
    }
    return "";
}

//stopDefault
function stopDefault(e){
    // Prevent the default browser action (W3C) 
    if (e && e.preventDefault) 
        e.preventDefault();
    // A shortcut for stoping the browser action in IE 
    else 
        window.event.returnValue = false;
    return false;
}

//SetHome
function SetHome(obj, vrl){
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } 
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } 
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}

//jQuery.cookie
jQuery.cookie = function(name, value, options){
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
    else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//fn.extend
jQuery.fn.extend({
    //Widget_Select
    Widget_Select: function(t, l, options){
        var settings = {
            animate: false, //animate
            onClick: function(){
            }, //定位元素
            autoClose: true //autoClose
        };
        var _this = this;
        var timer;
        jQuery.extend(settings, options);
        this.show = function(){
            if (settings.animate) {
                l.slideDown();
            }
            else {
                l.show();
            }
        };
        this.close = function(){
            if (settings.animate) {
                l.slideUp();
            }
            else {
                l.hide();
            }
        };
        jQuery("div:first", this).click(function(){
			
            if (l.css("display") == "none") {
                _this.show();
            }
            else {
                _this.close();
            }
        });
		l.children().hover(function(){
            jQuery(this).addClass("active");
        }, function(){
            jQuery(this).removeClass("active");
        });
        l.children().click(function(){
            settings.onClick(this);
            //t.text(jQuery(this).text());
            _this.close();
        });
        //autoClose
        if (settings.autoClose) {
            this.mouseleave(function(ev){
                if (l.css("display") != "none") {
                    timer = setTimeout(function(){
                        _this.close()
                    }, 500);
                }
            }).mouseover(function(ev){
                if (l.css("display") != "none") {
                    clearTimeout(timer);
                }
            });
        };
        //keyCode
        jQuery(window).keyup(function(ev){
            if (l.css("display") != "none" && ev.keyCode == 27) {
                _this.close();
            }
        });
        return this;
    },
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
jQuery(function(jQuery){
    //UpdateUserBar
    UpdateUserBar(jQuery("#userBar"));
    
});
//UpdateUserBar
function UpdateUserBar(el){
    //Render
    this.Render = function(){
        var tmpHtml = '<div class="flt pd-t2"> 欢迎你 <span id="userName"></span></div>' +
        '<div class="widget-select flt" id="goto" >' +
        '<div id="gotoTxt" class="sel_txt">选择去向</div>' +
        '<ul  id="option" class="ddl" style="display:none">' +
        '<li class="br-b"><a href="http://passport.21cn.com/top.jsp" target="_blank" >21cn通行证</a></li>' +
        '<li net="true"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn免费邮</a></li>' +
		'<li net="true"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn经济邮</a></li>' +
        '<li net="true" class="br-b"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn商务邮</a></li>' +
        '<li><a href="http://free.21cn.com/newbbs/mainframe.jsp" target="_blank" >我的社区</a></li>' +
        '<li><a href="http://photo.21cn.com/album/" target="_blank" >我的相册</a></li>' +
        '<li><a href="http://igame.21cn.com/" target="_blank" >我的网游</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="flt pd-t2"> [<a href="http://passport.21cn.com/goto21cnmail.jsp" class="mail" id="num_mail">0</a>积分<a href="http://score.21cn.com/" class="jf" id="num_jf">0</a>金豆<a href="http://score.21cn.com/listGoldGift.do" class="jd" id="num_jd">0</a>] <a href="http://passport.21cn.com/redirect1.jsp?redirurl=/logout_execute1.jsp" class="c-gray">退出</a></div>'
        el.html(tmpHtml);
    };
    //cookie判断登录
    var st = jQuery.cookie("SSONKEY")
    //alert("SSONKEY:"+st)
	//if (true) {
    if (!IsNullOrEmpty(st)) {
        //已登录
        this.Render();
        //Widget_Select
        jQuery("#goto").Widget_Select(jQuery("#gotoTxt"), jQuery("#option"), {
            onClick: function(e){
                //加后续
            }
        });
        //定义
        var m = jQuery("#num_mail"), jf = jQuery("#num_jf"), jd = jQuery("#num_jd");
        //更新用户名
        UpdateUserName(jQuery("#userName"));
        //更新邮件数
        UpdateMailCount(m);
        //更新积分金豆
        UpdatePointCount(jf, jd);
        //add
    }
    else {
        //未登录
        //Widget_Select

        jQuery("#goto").Widget_Select(jQuery("#gotoTxt"), jQuery("#option"), {
            onClick: function(e){
                //加后续
                var un = jQuery("#UserName");
                var ut = un.val();
                var append = jQuery(e).attr("net") ? "@21cn.net" : "@21cn.com";
                if (jQuery.trim(ut) !== "") {
                    if (ut.indexOf('@') !== -1) {
                        ut = ut.substring(0, ut.indexOf('@'));
                    }
                    un.val(ut + append);
                }
                //处理去向
                jQuery("#gotoUrl").val(jQuery(e).children().attr("go"));
                jQuery("#gotoTxt").text(jQuery(e).text());
                jQuery("#returnUrl").val(jQuery(e).children().attr("go"));
            }
        });
        //remove form action
        jQuery("#form1").removeAttr("action");
        //tips
        var ab = jQuery("#tipTest1").AbsoluteBox({
            el: jQuery("#UserName"),
            x: 10,
            y: 17
        });
        jQuery("#tipTest1 .closeBt").click(function(){
            ab.close();
        });
        var mn = jQuery.cookie("mobilename");
        //alert("mobilename:"+mn);
        if (!IsNullOrEmpty(mn)) {
            jQuery("#tipTest1 .inner").html('用你的手机号<span class="c-green">' + mn + '</span>也可以登录');
        }
        ab.show();
        //add
    }
}

//IsNullOrEmpty
function IsNullOrEmpty(s){
    if (s == null || s == "null" || s == "") {
        return true;
    }
    else {
        return false;
    }
}

//UpdateUserName
function UpdateUserName(el){
    var u = jQuery.cookie("uud.username");
    if (IsNullOrEmpty(u)) {
        jQuery.getJSON("http://passport.21cn.com/getNewMail_ForUpPage.jsp?jsoncallback=?", function(data){
            el.text(data.username);
        });
        
    }
    else {//getJSON
        el.text(u);
    }
    
}

//UpdatePointCount
function UpdateMailCount(el){
    jQuery.getJSON("http://passport.21cn.com/getNewMail_ForUpPage.jsp?jsoncallback=?", function(data){
        jQuery("#num_mail").text(data.num_mail);
    });
}

//UpdatePointCount
function UpdatePointCount(jf_el, jd_el){
    jQuery.getJSON("http://score.21cn.com/user/renderScoreBalance.do?jsoncallback=?", function(data){
        jf_el.text(data.balance.scoreBalance);
        jd_el.text(data.consumeBalance.scoreBalance);
    });
}
