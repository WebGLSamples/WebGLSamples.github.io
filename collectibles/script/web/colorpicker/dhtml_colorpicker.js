
/* DHTML Color Sphere : v1.0.2 : 2008/04/17 */
/* http://www.colorjack.com/software/dhtml+color+sphere.html */

function _$(v,o) { return((typeof(o)=='object'?o:document).getElementById(v)); }
function _$S(o) { o=_$(o); if(o) {
														return(o.style);
													}}; 
function abPos(o) { var o=(typeof(o)=='object'?o:_$(o)), z={X:0,Y:0}; while(o!=null) { z.X+=o.offsetLeft; z.Y+=o.offsetTop; o=o.offsetParent; }; return(z); }
function agent(v) { return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0)); }
function isset(v) { return((typeof(v)=='undefined' || v.length==0)?false:true); }
function toggle(i,t,xy) { var v=_$S(i); v.display=t?t:(v.display=='none'?'block':'none'); if(xy) { v.left=xy[0]; v.top=xy[1]; } }
function XY(e,v) { var o=agent('msie')?{'X':e.clientX+document.body.scrollLeft,'Y':e.clientY+document.body.scrollTop}:{'X':e.pageX,'Y':e.pageY}; return(v?o[v]:o); }
function zero(n) { return(!isNaN(n=parseFloat(n))?n:0); }
function zindex(d) { d.style.zIndex=zINDEX++; }


/* COLOR PICKER */

Picker={};

Picker.stop=1;

Picker.core=function(o,e,xy,z,fu) {
	function point(a,b,e) { eZ=XY(e); commit([eZ.X+a,eZ.Y+b]); }
	function M(v,a,z) { return(Math.max(!isNaN(z)?z:0,!isNaN(a)?Math.min(a,v):v)); }

	function commit(v) { if(fu) fu(v);
	
		if(o=='mCur') { var W=parseInt(_$S('mSpec').width), W2=W/2, W3=W2/2; 

			var x=v[0]-W2-3, y=W-v[1]-W2+21+10, SV=Math.sqrt(Math.pow(x,2)+Math.pow(y,2)), hue=Math.atan2(x,y)/(Math.PI*2);

			hsv={'H':hue>0?(hue*360):((hue*360)+360), 'S':SV<W3?(SV/W3)*100:100, 'V':SV>=W3?Math.max(0,1-((SV-W3)/(W2-W3)))*100:100};

			color.cords(W);
			
			//pass selection to API
			apiSetColor(color.HSV_RGB(hsv));
			//console.log("Color changed to: #" + _$('mHEX').innerHTML); 
			jQuery('div.north').css('background-color', '#' + color.HSV_HEX(hsv));
			
			


		}
		else if(o=='mSize') { var b=Math.max(Math.max(v[0],v[1])+oH,75); color.cords(b);

			_$S('mini').height=(b+28)+'px'; _$S('mini').width=(b+20)+'px';
			_$S('mSpec').height=b+'px'; _$S('mSpec').width=b+'px';

		}
		else {
		
			if(xy) v=[M(v[0],xy[0],xy[2]), M(v[1],xy[1],xy[3])]; // XY LIMIT

			if(!xy || xy[0]) d.left=v[0]+'px'; if(!xy || xy[1]) d.top=v[1]+'px';

		}
	};

	if(Picker.stop) { Picker.stop=''; var d=_$S(o), eZ=XY(e); if(!z) zindex(_$(o));

		if(o=='mCur') { 
			var ab=abPos(_$(o).parentNode); point(-(ab.X-5),-(ab.Y-28),e); 
		}
		
		if(o=='mSize') { var oH=parseInt(_$S('mSpec').height), oX=-XY(e).X, oY=-XY(e).Y; }
		
		else { 
			var oX=zero(d.left)-eZ.X, oY=zero(d.top)-eZ.Y; 
		}

		document.onmousemove=function(e){ 
			 if(!Picker.stop) point(oX,oY,e); 
		};
		document.onmouseup=function(){ Picker.stop=1; document.onmousemove=''; document.onmouseup=''; };

	}
};

Picker.hsv={H:0, S:0, V:100};

zINDEX=2;


/* COLOR LIBRARY */

color={};

color.cords=function(W) {

	var W2=W/2, rad=(hsv.H/360)*(Math.PI*2), hyp=(hsv.S+(100-hsv.V))/100*(W2/2);

	_$S('mCur').left=Math.round(Math.abs(Math.round(Math.sin(rad)*hyp)+W2+3))+'px';
	_$S('mCur').top=Math.round(Math.abs(Math.round(Math.cos(rad)*hyp)-W2-21))+'px';

};

color.HEX=function(o) { o=Math.round(Math.min(Math.max(0,o),255));

    return("0123456789ABCDEF".charAt((o-o%16)/16)+"0123456789ABCDEF".charAt(o%16));

};

color.RGB_HEX=function(o) { var fu=color.HEX; return(fu(o.R)+fu(o.G)+fu(o.B)); };

color.HSV_RGB=function(o) {
    
    var R, G, A, B, C, S=o.S/100, V=o.V/100, H=o.H/360;

    if(S>0) { if(H>=1) H=0;

        H=6*H; F=H-Math.floor(H);
        A=Math.round(255*V*(1-S));
        B=Math.round(255*V*(1-(S*F)));
        C=Math.round(255*V*(1-(S*(1-F))));
        V=Math.round(255*V); 

        switch(Math.floor(H)) {

            case 0: R=V; G=C; B=A; break;
            case 1: R=B; G=V; B=A; break;
            case 2: R=A; G=V; B=C; break;
            case 3: R=A; G=B; B=V; break;
            case 4: R=C; G=A; B=V; break;
            case 5: R=V; G=A; B=B; break;

        }

        return({'R':R?R:0, 'G':G?G:0, 'B':B?B:0, 'A':255});

    }
    else return({'R':(V=Math.round(V*255)), 'G':V, 'B':V, 'A':255});

};

color.HSV_HEX=function(o) { return(color.RGB_HEX(color.HSV_RGB(o))); };
