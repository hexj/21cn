//fn
function ADShow(el, s){
    el.html(s);
    el.show();
}
//RunCode
jQuery(function($){
	//sampleCode
    var s1 = '<a href="#"><img src="images/960.jpg" alt="" /></a>';
    ADShow($("#ab-1"), s1);
	
	var s2 = '<div>°§<a href="#">“º∑°»˛À¡ŒÈ¬Ω∆‚∞∆æ¡ ∞</a></div>';
    ADShow($("#ab-2"), s2);
	var s8 = '<a href="#"><img src="images/320.jpg" alt="" /></a>';
	ADShow($("#ab-8"), s8);
	var s10 = '<iframe src="http://market.21cn.com/w/pay/other/110223/0301.html" id="" frameborder="0" width="320" height="168"  scrolling="no"></iframe>';
	ADShow($("#ab-10"), s10);
});
