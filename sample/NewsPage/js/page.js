//fn
//ZoomText
function ZoomText(el, zoomin, zoomout){
    var fz = ["14px", "16px", "18px"];
    var now = "";
    setSize = function(size){
        el.css("font-size", size);
    }
    zoom = function(s){
        now = el.css("font-size");
        for (var i = 0, l = fz.length; i < l; i++) {
            if (fz[i] == now) {
                switch (s) {
                    case "in":
                        now = fz[i - 1];
                        break;
                    case "out":
                        now = fz[i + 1];
                        break;
                    default:
                        break;
                }
                return setSize(now);
            };
                    }
    }
    zoomin.click(function(){
        zoom("in");
    });
    zoomout.click(function(){
        zoom("out");
    });
    return this;
}

//SetBgColor
function BgColorCtrl(el, ctrl){
    var BgColor = ["#FFFFFF", "#EEF3F9", "#FCF6CB", "#E5FCD6"];
    var now = 0;
    var _this = this;
    var lis = ctrl.children();
    this.SetBgColor = function(i){
        el.css("background-color", BgColor[i]);
        $(lis[now]).removeClass("selected");
        $(lis[i]).addClass("selected");
        now = i;
    }
    
    lis.each(function(i){
        $(this).click(function(){
            _this.SetBgColor(i);
        });
    });
    return this;
}
function ShareCount(el,c){
	var count = c;
	el.text(count);
	this.add = function(){
		el.text(count+1);
		count++;
	}
	return this;
}
//RunCode
jQuery(function($){
    ZoomText($("#article-text"), $("#J_zoomin"), $("#J_zoomout"));
    var b = BgColorCtrl($("#J_change"), $("#J_choice"));
    b.SetBgColor(1);
	//scrollable
	$("#tab-ct-2").scrollable({circular: true}).navigator().autoscroll({ interval:5000,autoplay:true});
	//share Code
	var shareCount = ShareCount($("#J_shareCount"),100);
    $("#J_share2sinaweibo").click(function(){
		shareCount.add();
        (function(){
            window.open('http://v.t.sina.com.cn/share/share.php?appkey=3673594135&ralateUid=1865979352&title=' + encodeURIComponent(document.title) + '&url=' + encodeURIComponent(location.href) + '&source=bookmark', '_blank', 'width=450,height=400');
        })()
    });
    $("#J_share2qqweibo").click(function(){
		shareCount.add();
        var _t = encodeURI(document.title);
        var _url = encodeURI(window.location);
        var _source = encodeURI("9f67123b694049a0b3ddd014e263b574");
        var _site = 'http://www.21cn.com';
        var _pic = encodeURI('');
        var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&source=' + _source + '&site=' + _site + '&pic=' + _pic;
        window.open(_u, '×ª²¥µ½ÌÚÑ¶Î¢²©', 'width=700, height=580, top=320, left=180, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
    });
    $("#J_share2qzone").click(function(){
		shareCount.add();
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(document.location.href));
        return false;
    });
    $("#J_share2douban").click(function(){
		shareCount.add();
        void (function(){
            var d = document, e = encodeURIComponent, s1 = window.getSelection, s2 = d.getSelection, s3 = d.selection, s = s1 ? s1() : s2 ? s2() : s3 ? s3.createRange().text : '', r = 'http://www.douban.com/recommend/?url=' + e(d.location.href) + '&amp;title=' + e(d.title) + '&amp;sel=' + e(s) + '&amp;v=1', x = function(){
                if (!window.open(r, 'douban', 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330')) 
                    location.href = r + '&amp;r=1'
            };
            if (/Firefox/.test(navigator.userAgent)) {
                setTimeout(x, 0)
            }
            else {
                x()
            }
        })()
    });
});
