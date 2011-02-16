/*对象ID缩写*/
function $(Element){
	return document.getElementById(Element);
};
/*按左取字符*/
String.prototype.Left = function(len){
	if(isNaN(len)||len==null){
		len = this.length;
	}else{
		if(parseInt(len)<0||parseInt(len)>this.length){
			len = this.length;
		};
	}	;
	return this.substr(0,len);
};
/*按右取字符*/
String.prototype.Right = function(len){
	if(isNaN(len)||len==null){
		len = this.length;
	}else{
		if(parseInt(len)<0||parseInt(len)>this.length){
			len = this.length;
		};
	};	
	return this.substring(this.length-len,this.length);
};
function ColorToGray($0,$1,$2){
	var Color = $1;
	R=parseInt(Color.Right(6).Left(2),16);
	G=parseInt(Color.Right(4).Left(2),16);
	B=parseInt(Color.Right(2),16);
	PJ = parseInt((R + G + B) / 3);
	GR=GG=GB=zero_fill_hex(PJ,2);
	Gray="#"+GR.toString(16)+GG.toString(16)+GB.toString(16)+$2;
	return Gray.toUpperCase();
}
function ColorRGBAToGray($0,$1,$2,$3,$4){
	PJ=parseInt((parseInt($1)+parseInt($2)+parseInt($3))/3);
	Gray="rgba("+PJ+","+PJ+","+PJ+","+$4;
	return Gray;
	
}
function gogogo(str){
	str = str.replace(/#([\da-f]{3,6}?)([;\s])/ig,ColorToGray);
	str = str.replace(/rgba\(([^,]*)+,+([^,]*)+,+([^,]*)+,+([^\)]*)/ig,ColorRGBAToGray);
	return str;
}

function zero_fill_hex(num, digits) {
	var s = num.toString(16);
	while (s.length < digits)
	s = "0" + s;
	return s;
} 
function rgb2hex(rgb) {
//nnd, Firefox / IE not the same, fxck
	if (rgb.charAt(0) == '#')
	return rgb;
	var n = Number(rgb);
	var ds = rgb.split(/\D+/);
	var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
	return "#" + zero_fill_hex(decimal, 6);
};
