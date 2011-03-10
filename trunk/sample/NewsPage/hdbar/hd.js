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
    if (document.getElementById('UserName').value.trim() == '' || document.getElementById('UserName').value.trim() == 'Email���ֻ�����') {
        alert("�������û��������ֻ�����.");
        document.getElementById('UserName').focus();
        return false;
    }
    if (!validpwdstring(document.getElementById('Password').value.trim())) {
        alert("�������¼���롣");
        document.getElementById('Password').focus();
        return false;
    }
    if (document.getElementById('Password').value.trim().length > 14) {
        alert("����ĳ��ȱ�����С��14 λ !");
        document.getElementById('Password').value = "";
        document.getElementById('Password').focus();
        return false;
    }
    var str = document.getElementById('UserName').value;
    var str2 = document.getElementById('Password').value;
    if ((str.indexOf("'") != -1) || (str.indexOf("\"") != -1) || (str.indexOf("\\") != -1 || (str.indexOf("\?")) != -1)) {
        window.alert("�û����в��ܰ��� \' �� \" �� \\��\? �����������룡");
        document.getElementById('UserName').focus();
        return false;
    }
    if ((str2.indexOf("'") != -1) || (str2.indexOf("\"") != -1) || (str2.indexOf("\\") != -1 || (str2.indexOf("\?")) != -1)) {
        window.alert("�����в��ܰ��� \' �� \" �� \\ ��\?�����������룡");
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
    if (un == "Email���ֻ�����") {
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
                alert("�˲�����������ܾ���\n�����������ַ�����롰about:config�����س�\nȻ��[signed.applets.codebase_principal_support]����Ϊ'true'");
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
            }, //��λԪ��
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
    //���Ԫ��offset��λ
    AbsoluteBox: function(options){
        var settings = {
            el: null, //��λԪ��
            zIndex: 99,
            x: 0, //Xƫ����
            y: 0 //Yƫ����
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
        var tmpHtml = '<div class="flt pd-t2"> ��ӭ�� <span id="userName"></span></div>' +
        '<div class="widget-select flt" id="goto" >' +
        '<div id="gotoTxt" class="sel_txt">ѡ��ȥ��</div>' +
        '<ul  id="option" class="ddl" style="display:none">' +
        '<li class="br-b"><a href="http://passport.21cn.com/top.jsp" target="_blank" >21cnͨ��֤</a></li>' +
        '<li net="true"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn�����</a></li>' +
		'<li net="true"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn������</a></li>' +
        '<li net="true" class="br-b"><a href="http://passport.21cn.com/goto21cnmail.jsp" target="_blank" >21cn������</a></li>' +
        '<li><a href="http://free.21cn.com/newbbs/mainframe.jsp" target="_blank" >�ҵ�����</a></li>' +
        '<li><a href="http://photo.21cn.com/album/" target="_blank" >�ҵ����</a></li>' +
        '<li><a href="http://igame.21cn.com/" target="_blank" >�ҵ�����</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="flt pd-t2"> [<a href="http://passport.21cn.com/goto21cnmail.jsp" class="mail" id="num_mail">0</a>����<a href="http://score.21cn.com/" class="jf" id="num_jf">0</a>��<a href="http://score.21cn.com/listGoldGift.do" class="jd" id="num_jd">0</a>] <a href="http://passport.21cn.com/redirect1.jsp?redirurl=/logout_execute1.jsp" class="c-gray">�˳�</a></div>'
        el.html(tmpHtml);
    };
    //cookie�жϵ�¼
    var st = jQuery.cookie("SSONKEY")
    //alert("SSONKEY:"+st)
	//if (true) {
    if (!IsNullOrEmpty(st)) {
        //�ѵ�¼
        this.Render();
        //Widget_Select
        jQuery("#goto").Widget_Select(jQuery("#gotoTxt"), jQuery("#option"), {
            onClick: function(e){
                //�Ӻ���
            }
        });
        //����
        var m = jQuery("#num_mail"), jf = jQuery("#num_jf"), jd = jQuery("#num_jd");
        //�����û���
        UpdateUserName(jQuery("#userName"));
        //�����ʼ���
        UpdateMailCount(m);
        //���»��ֽ�
        UpdatePointCount(jf, jd);
        //add
    }
    else {
        //δ��¼
        //Widget_Select

        jQuery("#goto").Widget_Select(jQuery("#gotoTxt"), jQuery("#option"), {
            onClick: function(e){
                //�Ӻ���
                var un = jQuery("#UserName");
                var ut = un.val();
                var append = jQuery(e).attr("net") ? "@21cn.net" : "@21cn.com";
                if (jQuery.trim(ut) !== "") {
                    if (ut.indexOf('@') !== -1) {
                        ut = ut.substring(0, ut.indexOf('@'));
                    }
                    un.val(ut + append);
                }
                //����ȥ��
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
            jQuery("#tipTest1 .inner").html('������ֻ���<span class="c-green">' + mn + '</span>Ҳ���Ե�¼');
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
