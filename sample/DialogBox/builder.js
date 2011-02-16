//RunCode
jQuery(function($){
    $("#gen-layout").click(function(){
        //var c1= parseInt($("#col-1").val(),10);
       // var c1 = GetValNum("col-1");
        //var c2 = GetValNum("col-2");
        var c3 = GetValNum("col-3");
		 alert(c3);
        var total = c1 + c2 + c3;
        var ct = $("#ct")
        if (total == 24) {
            alert(c3);
            //ct.append(TemplateBuilder())
        }
        else {
            alert("总栏数" + total + "不等于24")
        }
    })
    function GetValNum(id){
        var i = $("#" + id).val();
        if (i=="") {
            return 0;
        }
        else {
            return parseInt(i, 10);
        }
    }
    function TemplateBuilder(num){
        if (num == 0) {
        
        }
        else {
        
        }
    }
});
