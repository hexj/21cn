//RunCode
jQuery(function($){
    var count = 0;
    var $ct = $('#ct');
    var triggers1 = $("#show2").click(function(){
    
        var left = $ct.offset().left + count * 30;
        var top = $ct.offset().top + count * 30;
        var html = '<div id="box' + count + '" class="box drag" style="left:' + left + 'px;top:' + top + 'px">' +
        '<label class="label-name"><span class="fun mod-name">ģ��' +
        count +
        '</span><span class="fun edit" num="' +
        count +
        '">�༭</span><span class="fun delete" num="' +
        count +
        '">ɾ��</span></label>' +
        '<div class="title handle-move"><strong>12px����</strong></div>' +
        '<div class="ct">����������</div>' +
        '<div class="handle NE">' +
        '</div>' +
        '<div class="handle NN">' +
        '</div>' +
        '<div class="handle NW">' +
        '</div>' +
        '<div class="handle WW">' +
        '</div>' +
        '<div class="handle EE">' +
        '</div>' +
        '<div class="handle SW">' +
        '</div>' +
        '<div class="handle SS">' +
        '</div>' +
        '<div class="handle SE">' +
        '</div>' +
        '</div>';
        $ct.append(html);
        
        count++;
    });
    $('.delete').live("click",function(){
            if(confirm("Delete Box?"))
            {
				$('#box' + $(this).attr("num")).remove();
			}
        })
    $('.edit').live("click",function(){
			var el=$('#box' + $(this).attr("num")+' .ct');
			el.html('<textarea>'+el.html()+'</textarea>');
			$(this).text("����").removeClass('edit').addClass('save');
        })
    
    $('.drag').live("dragstart", function(ev, dd){
        //��¼handle
        dd.attr = $(ev.target).attr("className");
        //����
        dd.width = $(this).width();
        dd.height = $(this).height();
        dd.limit = $ct.offset();
        dd.limit.bottom = dd.limit.top + $ct.outerHeight() - $(this).outerHeight();
        dd.limit.right = dd.limit.left + $ct.outerWidth() - $(this).outerWidth();
        
    }).live("drag", function(ev, dd){
        //����handle
        var props = {};
        if (dd.attr.indexOf("E") > -1) {
            props.width = Math.max(190, dd.width + dd.deltaX);
        }
        if (dd.attr.indexOf("S") > -1) {
            props.height = Math.max(60, dd.height + dd.deltaY);
        }
        if (dd.attr.indexOf("W") > -1) {
            props.width = Math.max(190, dd.width - dd.deltaX);
            props.left = dd.originalX + dd.width - props.width;
        }
        if (dd.attr.indexOf("N") > -1) {
            props.height = Math.max(60, dd.height - dd.deltaY);
            props.top = dd.originalY + dd.height - props.height;
        }
        if (dd.attr.indexOf("handle-move") > -1) {
            //props.top = dd.offsetY;
            //props.left = dd.offsetX;
            props.top = Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY));
            props.left = Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX));
            // props.top = Math.round(dd.offsetY / 30) * 30;
            // props.left = Math.round(dd.offsetX / 30) * 30;
        
        }
        $(this).css(props);
    }, {
        relative: false
    });
    
});
