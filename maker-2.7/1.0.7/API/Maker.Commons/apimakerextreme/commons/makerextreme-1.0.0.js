var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */
$MEx = jQuery.noConflict();

/*
* These are the functions you'll usually want to call
* They take string arguments and return either hex or base-64 encoded strings
*/


// Fun��o de descriptografia 

//function disassembles (data) {
function decr(data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Thunder.m
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  // *     returns 1: 'Kevin van Zonneveld'
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['atob'] == 'function') {
  //    return atob(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}

// Fun��es de MD5

function hex_md5(s){ s=s+decr('ZXh0cmVtZUAx'); return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
* Perform a simple self-test to see if the VM is working
*/
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length
*/
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
* Calculate the HMAC-MD5, of a key and some data
*/
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
* Convert a string to an array of little-endian words
* If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
*/
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
* Convert an array of little-endian words to a string
*/
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
* Convert an array of little-endian words to a hex string.
*/
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
* Convert an array of little-endian words to a base-64 string
*/
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

/* Fun��o de valida��o da URL */
function getLibraries(){
	var listurl=['@@dominio','466f9a4ba66f8015288eb6890bb6cfca','88ecb5752fdc1980b3ccf6fcbd807b85'];
	var url = window.location;
	url = url.toString();
	url = url.split("/");
	var url = url[2];
	
	if(url.indexOf(":") != -1) {
	  url = url.substr(0, url.indexOf(":"));
	}

	if(!getObj(url,listurl)){
		var erro =decr("RXN0YSB2ZXJz428gZGUgZGVtb25zdHJh5+NvIGRhIE1ha2VyRXh0cmVtZSBBUEkgc/MgcG9kZSBzZXIgdXRpbGl6YWRhIGVtIG3hcXVpbmEgbG9jYWwu");
		throw erro;
	}
}

/* Fun��o de valida��o de subdom�nios */
function getObj(Url,listurl){
    // Transforma a URL para String
	Url=Url.toString();
	// Condi��o de sa�da da recurs�o
	if(Url==null || Url=='undefined' || Url==""){
		return false
	}
	
	var valido=false;
	for(var i=0;i<listurl.length;i++){
		// compara a do browser com as URLs da lista
		if(listurl[i]==hex_md5(Url)){			
			valido = true;
		}	
	}
	
	if(!valido){
	    // Se n�o for v�lido testa os subdom�nios recursivamente
	    if(Url.indexOf(".") != -1){
			return getObj(Url.substr(Url.indexOf(".")+1,Url.length),listurl);
		}else{ 
			return false
		}
	} else {
		return true;
	}
	
}

// Conserta o problema com o Internet Explorer.
// Em que o webrun for�a o browser a renderizar em Quirks Mode
function fixIEPanelQuirksMode(ElementID, wantedWidth, wantedHeight) {
    if (jQuery.support.boxModel == false) {
      $MEx("#" + ElementID).each(function() {
         if(parseInt($MEx(this).css("height")) > 0) {
		    var oldHeight = parseInt($MEx(this).css("height"));
            qHeight=
               parseInt(wantedHeight) - (
               parseInt($MEx(this).css("padding-top")) +
               parseInt($MEx(this).css("padding-bottom")) +
               parseInt($MEx(this).css("border-top-width")) +
               parseInt($MEx(this).css("border-bottom-width")) - 20);
            $MEx(this).height(qHeight);
			
			// Ajusta a posi��o X
			var dialog = $MEx(this).closest(".ui-dialog");
			dialog.css("top", parseInt(dialog.css("top")) - ((qHeight - oldHeight)/2))
         }
         if(parseInt($MEx(this).css("width")) > 0) {
            $MEx(this).width(wantedWidth);
         }
      });
   }
}

/*
* Esta fun��o cria uma aba e abre uma URL como conte�do da aba criada.
*/
function __mkxCreateURLTab(formulario, componente, url, titulo, permiteFechar) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     

     var found = false;
     var counter = 0;     

     var tabs = $MEx(div);     

     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");  
        tabsAnchors.each(function() {
            if($MEx(this).html() == titulo) {            
                $MEx(component.div).tabs("option", {active : counter});                
                found = true;
            }            
            counter++;
     });     

     if(!found) {
       var id = "mexURLTab_" + Math.round((Math.random() * 10000000));     
  
       // T�tulo     
       var tabTitulo = "<li><a href=\"#" + id + "\" id=\"" + id + "_tab\">" + titulo + "</a>";    
       // Adiciona o bot�o de fechar, se permitido   
       if(permiteFechar) {
         tabTitulo += "<span class='ui-icon ui-icon-close'>Remove Tab</span>";
       }     
       tabTitulo += "</li>";
  
       var tabContentHtml = "<iframe class=\"mexURLFrame\" frameborder=\"0\" src=\""+ url +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\"></iframe>";
        
       var tabs = $MEx(div);
       tabs.find( ".ui-tabs-nav" ).append( tabTitulo );
       tabs.append("<div id='"+ id + "'>" + tabContentHtml + "</div>");
   
       if(permiteFechar) {
          // A��o do click no bot�o         
          $MEx( "#" + id + "_tab").closest("li").find("span.ui-icon-close").bind( "click", function(evt) {             
              // dispara o evento associado ao fechar
              tabs.trigger("close", $MEx( this ).closest("li").find("a[class='ui-tabs-anchor']").html());             
              // remove a aba
              var panelId = $MEx( this ).closest( "li" ).remove().attr( "aria-controls" );
              $MEx( "#" + panelId ).remove();
              tabs.tabs( "refresh" );
              
                         
            // Dispara o evento ao fechar            
            var func = tabs.tabs("option","close")              
            var anchor = $MEx( this ).closest("li").find("a[class='ui-tabs-anchor']");
            if(func) func(evt,{tab : anchor[0]},anchor.html());                
          }); 
       }     
  
       // Calcula a altura do frame
       var frame = tabs.find("iframe[class='mexURLFrame']");         
       var parentHeight = frame.height(Math.floor(frame.closest(".mexTabs").height() - (5 + frame.closest(".mexTabs").find(".ui-tabs-nav").height())));
       tabs.tabs("refresh"); 

       // Ativa o painel adicionado
       $MEx(component.div).tabs("option", {active : ($MEx( "#" + component.div.id + " .ui-tabs-anchor").size() - 1)});     
     }
   }
}

/*
* Esta fun��o cria uma aba e abre um formul�rio como conte�do da aba criada.
*/
function __mkxCreateFormTab(formulario, componente, formularioDestino, titulo, permiteFechar, filtro, modo) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     var tabs = $MEx(div);          

     var found = false;
     var counter = 0;     

     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");  
     tabsAnchors.each(function() {
         if($MEx(this).html() == titulo) {            
             $MEx(component.div).tabs("option", {active : counter});                
              found = true;
          }            
          counter++;
     });

     if(!found) {
       var id = "mexFormTab_" + formularioDestino.replace("{","").replace("}","");     
 
       // T�tulo     
       var tabTitulo = "<li><a href=\"#" + id + "\" id=\"" + id + "_tab\">" + titulo + "</a>";  
       // Adiciona o bot�o de fechar, se permitido   
       if(permiteFechar) {
         tabTitulo += "<span class='ui-icon ui-icon-close'>Remove Tab</span>";
       }     
       tabTitulo += "</li>";
  
			formURL = "form.jsp?sys=" + sysCode + "&action=openform&formID="+ formularioDestino +"&align=0&mode="+(modo?modo:-1)+"&goto=-1&filter="+(filtro?filtro:"")+"&scrolling=no";
	 //Altera��o da corre��o da altura da moldura no IE 08/07/2013
	 var tabContentHtml = "<iframe class=\"mexFormFrame\" frameborder=\"0\" src=\""+ formURL +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" height=\"100%\"></iframe>";
        
       tabs.find( ".ui-tabs-nav" ).append( tabTitulo );
       tabs.append("<div id='"+ id + "'>" + tabContentHtml + "</div>");
   
       if(permiteFechar) {     
          // A��o do click no bot�o
          $MEx( "#" + id + "_tab").closest("li").find("span.ui-icon-close").bind( "click", function(evt) {                     
                // remove a aba
                var panelId = $MEx( this ).closest( "li" ).remove().attr( "aria-controls" );
                $MEx( "#" + panelId ).remove();
                tabs.tabs( "refresh" );               
                
            // Dispara o evento ao fechar            
            var func = tabs.tabs("option","close")              
            var anchor = $MEx( this ).closest("li").find("a[class='ui-tabs-anchor']");
            if(func) func(evt,{tab : anchor[0]},anchor.html());                 
          }); 
       }
      
       // Calcula a altura do frame
       var frame = tabs.find("iframe[class='mexFormFrame']");         
 	//Altera��o da corre��o da altura da moldura no IE 08/07/2013
	if(navigator.appName.indexOf('Microsoft')==-1){   
       var parentHeight = frame.height(Math.floor(frame.closest(".mexTabs").height() - (5 + frame.closest(".mexTabs").find(".ui-tabs-nav").height())));
	}
       tabs.tabs("refresh");                             

       // Ativa o painel adicionado
       $MEx(component.div).tabs("option", {active : ($MEx( "#" + component.div.id + " .ui-tabs-anchor").size() - 1)});              
     }
   }
}

/*
* Seleciona uma aba de acordo com o t�tulo ou com o �ndice.
*/
function __mkxSelectTab(formulario, componente, titulo) {

   // Obt�m o componente   
   var component = $c(componente, formulario);      

   if(component) {
     // Testa se o titulo � um inteiro     
     if(!isNaN(titulo) && Math.floor(titulo) === titulo) {     
         $MEx(component.div).tabs("option", {active : titulo});
     } else {
        // Localiza o �ndice        
        var counter = 0;        
        var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");  
        tabsAnchors.each(function() {
            if($MEx(this).html() == titulo) {            
                $MEx(component.div).tabs("option", {active : counter});
            }            
            counter++;
         });         
     }      
   }
}

/*
* Habilita ou desabilita uma aba.
*/
function __mkxEnableTabItem(formulario, componente, titulo, habilitar) {

   // Obt�m o componente   
   var component = $c(componente, formulario);      

   if(component) {
     // Testa se o titulo � um inteiro     
     if(!isNaN(titulo) && Math.floor(titulo) === titulo) {     
         $MEx(component.div).tabs( ((habilitar === "true") ? "enable" : "disable"), titulo );
     } else {
        // Localiza o �ndice        
        var counter = 0;        
        var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");  
        tabsAnchors.each(function() {
            if($MEx(this).html() == titulo) {            
                $MEx(component.div).tabs( ((habilitar === "true") ? "enable" : "disable"), counter );
            }            
            counter++;
         });         
     }      
   }
}

/*
* Exibe ou oculta uma aba de acordo com o t�tulo ou com o �ndice. 
*/
function __mkxShowTab(formulario, componente, titulo, mostrar) {

   // Obt�m o componente   
   var component = $c(componente, formulario);      

   if(component) {
     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");     

     // Testa se o titulo � um inteiro     
     if(!isNaN(titulo) && Math.floor(titulo) === titulo) {              
         var counter = 0;
         tabsAnchors.each(function() {
            if(counter == titulo) {            
              if(mostrar === "true") {
                var panelId = $MEx( this ).closest( "li" ).hide().attr( "aria-controls" );              
                $MEx( "#" + panelId ).hide();
              } else {
                var panelId = $MEx( this ).closest( "li" ).show().attr( "aria-controls" );              
                $MEx( "#" + panelId ).show();
              }
            }            
            counter++;
         });         
     } else {
         tabsAnchors.each(function() {
            if($MEx(this).html() == titulo) {            
              if(mostrar === "true") {
                var panelId = $MEx( this ).closest( "li" ).show().attr( "aria-controls" );              
                $MEx( "#" + panelId ).show();
              } else {
                var panelId = $MEx( this ).closest( "li" ).hide().attr( "aria-controls" );              
                $MEx( "#" + panelId ).hide();
              }
            }            
         });
     }      
   }
}

/*
* Esta fun��o cria uma aba e adiciona um painel com conte�do HTML.
*/
function __mkxCreateTabContent(formulario, componente, conteudo, titulo, permiteFechar) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     var tabs = $MEx(div);
     var id = "mexHTMLTab_" + Math.round((Math.random() * 10000000));      

     // T�tulo     
     var tabTitulo = "<li><a href=\"#" + id + "\" id=\"" + id + "_tab\">" + titulo + "</a>";  
     // Adiciona o bot�o de fechar, se permitido   
     if(permiteFechar) {
       tabTitulo += "<span class='ui-icon ui-icon-close'>Remove Tab</span>";
     }     
     tabTitulo += "</li>";
      
     tabs.find( ".ui-tabs-nav" ).append( tabTitulo );
     tabs.append("<div id='"+ id + "' class=\"mexAccordionContent\">" + conteudo + "</div>");
 
     if(permiteFechar) {
        // A��o do click no bot�o
        $MEx( "#" + id + "_tab").closest("li").find("span.ui-icon-close").bind( "click", function(evt) {        
            // dispara o evento associado ao fechar
            tabs.trigger("close", $MEx( this ).closest("li").find("a[class='ui-tabs-anchor']").html());             
            // remove a aba
            var panelId = $MEx( this ).closest( "li" ).remove().attr( "aria-controls" );
            $MEx( "#" + panelId ).remove();
            tabs.tabs( "refresh" );            

            // Dispara o evento ao fechar            
            var func = tabs.tabs("option","close")              
            var anchor = $MEx( this ).closest("li").find("a[class='ui-tabs-anchor']");
            if(func) func(evt,{tab : anchor[0]},anchor.html());             
        }); 
     }     

     tabs.tabs("refresh");

     // Ativa o painel adicionado
     $MEx(component.div).tabs("option", {active : ($MEx( "#" + component.div.id + " .ui-tabs-anchor").size() - 1)});             
   }
}

/*
* Esta fun��o cria uma lista de propriedades para serem usadas na fun��o "Abas - Criar abas na moldura MEx"
*/
function __mkxCreateTabProperties(evento, efeitoFechar, efeitoMostrar, efeitoPaginar) {
   // Retorna um JSON com as propriedades  
   var properties = new Array();     
   if(evento != null) properties["event"] = evento;   
   if(efeitoFechar != null) properties["hide"] = efeitoFechar;      
   if(efeitoMostrar != null) properties["show"] = efeitoMostrar;
   if(efeitoMostrar != null) properties["pagginEffect"] = efeitoPaginar;      

   properties["heightStyle"] = "auto";

   return properties;
}

/*
* Esta fun��o cria um container de abas utilizando uma moldura.
*/
function __mkxRemoveTab(formulario, componente, titulo) {
    // Obt�m o componente   
   var component = $c(componente, formulario);      

   if(component) {   
     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-tabs-anchor");     

     // Testa se o titulo � um inteiro     
     if(!isNaN(titulo) && Math.floor(titulo) === titulo) {              
         var counter = 0;
         tabsAnchors.each(function() {         
            if(counter == titulo) {
                $MEx(component.div).trigger("close", $MEx( this ).html());            
                var panelId = $MEx( this ).closest( "li" ).remove().attr( "aria-controls" );              
                $MEx( "#" + panelId ).remove();
            }            
            counter++;
         });         
     } else {
         tabsAnchors.each(function() {
            if($MEx(this).html() == titulo) {
                $MEx(component.div).trigger("close", titulo);            
                var panelId = $MEx( this ).closest( "li" ).remove().attr( "aria-controls" );              
                $MEx( "#" + panelId ).remove();
            }            
         });
     } 
     
     $MEx(component.div).tabs( "refresh" );     
   }
}

/*
* Esta fun��o cria um container de abas utilizando uma moldura.
*/
function __mkxCreateTab(formulario, componente, propriedades) {
   // Importa as folhas de estilo 
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   
   mkxImportCss("apimakerextreme/plugins/ui-tabs-pagging/ui.tabs.paging.css");

   // Importa os scripts    
   mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
   mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");    
   mkxImportJs("apimakerextreme/plugins/ui-tabs-pagging/ui.tabs.paging.js");
      
   // Valida a URL
   getLibraries();
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     div.id = "mexTab_" + componente;     
     div.className = "mexTabs";
     div.innerHTML = "<ul></ul>";     

     // Associa evento ao ativar a aba para chamar o ao navegar do formul�rio.     
     // Caso o conte�do associado seja o formul�rio
     if(!propriedades) {     
       propriedades = {};
     }
     propriedades.activate = function(evt, ui) {  
       var tabPanelId = ui.newTab.find("a").attr("href"); 
       // Solu��o de contorno para o IE
       // as vezes o atributo href vem o a URL completa ex.:       
       // Ent�o eu localizo o pathname e remmovo
       var pathname = window.location.href;       
       tabPanelId = tabPanelId.replace(pathname,"");       

       $MEx(tabPanelId + " iframe[class='mexFormFrame']").first().each(function() {
            var _self = this;
        
            if(_self.contentWindow && _self.contentWindow.mainform) {              
               _self.contentWindow.mainform.formOnNavigate();
            }
       });               
     }     
     

     // Cria Aba     
     var jqueryDiv = $MEx(div);
     jqueryDiv.tabs(propriedades); 
     
     // Cria a pagina��o   
     var paggingProperties = { cycle: true, follow: true};     
     if(propriedades && propriedades.pagginEffect)     
        paggingProperties.paggingEffect = propriedades.pagginEffect;                
     jqueryDiv.tabs('paging', paggingProperties);     

   }
}

/*
* Esta fun��o associa eventos ao clicar em uma aba
*/
function __mkxAssociateTabEvent(formulario, componente, nomeEvento, fluxo, parametros) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;
     
     $MEx(div).tabs("option", nomeEvento, function(event, ui) {
       var defaultParams = new Array();         
       defaultParams.push(ui.tab.innerHTML);  
       executeJSRuleNoField(sysCode, idForm, fluxo, defaultParams.concat(parametros));       
     });          
   }
}

/*
* Esta fun��o cria um item do accordion e adiciona um painel com conte�do HTML.
*/
function __mkxCreateAccordionContent(formulario, componente, conteudo, titulo) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     var accordion = $MEx(div);
     var id = "mexHTMLTab_" + Math.round((Math.random() * 10000000));      

     // T�tulo     
     var accordionTitulo = "<h3>" + titulo + "</h3>";  
     //Concatena Conteudo 
     accordion.append( accordionTitulo );
     accordion.append("<div id='"+ id + "' class=\"mexAccordionContent\">" + conteudo + "</div>");
     //Recria Accordion              
     accordion.accordion('destroy');
     accordion.accordion();       

     // Ajusta a altura dos conte�dos
       $MEx(".mexAccordionContent").each(function() {
         // get the title height     
         var me = $MEx(this);    
         var titleHeight = parseInt(me.prev().css("height")); 
         var parentHeight = parseInt(me.closest(".mexAccordions").css("height"));        
         var qtdTitle = me.closest(".mexAccordions").find("h3").size();
         me.css("height", parentHeight - (titleHeight * qtdTitle));      
       });
   }
}

/*
* Esta fun��o cria um item do accordion e abre uma URL como conte�do.
*/
function __mkxCreateURLAccordion(formulario, componente, url, titulo) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div; 
     var accordion = $MEx(div);        

     var found = false;
     var counter = 0;     

     var tabs = $MEx(div);     

     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-accordion-header");  
        tabsAnchors.each(function() {
            if($MEx(this).html().indexOf(titulo) != -1) {            
                $MEx(component.div).accordion("option", {active : counter});                
                found = true;
            }            
            counter++;
     });     

     if(!found) {
       var id = "mexURLTab_" + Math.round((Math.random() * 10000000));     
  
       // T�tulo     
       var accordionTitulo = "<h3>" + titulo + "</h3>";    
      
       var tabContentHtml = "<iframe class=\"mexURLFrame\" frameborder=\"0\" src=\""+ url +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" height=\"100%\" width=\"100%\"></iframe>";
        
       
       accordion.append( accordionTitulo );
       accordion.append("<div id='"+ id + "' class=\"mexAccordionContent\">" + tabContentHtml + "</div>");
       
       accordion.accordion('destroy');
       accordion.accordion();
        
        // Ajusta a altura dos conte�dos
       $MEx(".mexAccordionContent").each(function() {
         // get the title height     
         var me = $MEx(this);    
         var titleHeight = parseInt(me.prev().css("height")); 
         var parentHeight = parseInt(me.closest(".mexAccordions").css("height"));        
         var qtdTitle = me.closest(".mexAccordions").find("h3").size();
         me.css("height", parentHeight - (titleHeight * qtdTitle));      
       });
     }
   }
}

/*
* Seleciona um item do accordion de acordo com o t�tulo. 
*/
function __mkxSelectAccordion(formulario, componente, titulo) {

   // Obt�m o componente   
   var component = $c(componente, formulario);      

   if(component) {
        // Localiza o �ndice        
        var counter = 0;        
        var accordionAnchors = $MEx( "#" + component.div.id + " h3");  
        accordionAnchors.each(function() {
            if($MEx(this).contents()[1].nodeValue == titulo) {            
                $MEx(component.div).accordion("option", {active : counter});
            }            
            counter++;
         });         
     }      
}

/*
* Esta fun��o cria uma lista de propriedades para serem usadas na fun��o "Accordion - Criar accordion na moldura MEx"
*/
function __mkxCreateAccordionProperties(evento, efeito, retraivel) {
   // Retorna um JSON com as propriedades  
   var properties = new Array();     
   if(evento != null) properties["event"] = evento;   
   if(efeitoFechar != null) properties["animate"] = efeito;      
   if(efeitoMostrar != null) properties["collapsible"] = retraivel;
    

   properties["heightStyle"] = "auto";

   return properties;
}

/*
* Esta fun��o associa eventos a um item do accordion.
*/
function __mkxAssociateAccordionEvent(formulario, componente, nomeEvento, fluxo, parametros) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;
     
     $MEx(div).accordion("option", nomeEvento, function(event, ui) {
       var defaultParams = new Array();         
       defaultParams.push(ui.newHeader.contents()[1].nodeValue);  
       executeJSRuleNoField(sysCode, idForm, fluxo, defaultParams.concat(parametros));       
     });          

   }
}

/*
* Remove um accordion de acordo com o t�tulo. N�o podendo o item ser selecionado ap�s a remo��o.
*/
function __mkxRemoveAccordion(formulario, componente, titulo) {
    // Obt�m o componente   
	var component = $c(componente, formulario);      
	var div = component.div;     
	var accordion = $MEx(div);
	if(component) {   
		var accordionAnchors = $MEx( "#" + component.div.id ); 
		//Busca elemento H3 para remover
        accordionAnchors.find('h3').each(function (){        
			var objetoAccordion =$MEx(this);
			if(objetoAccordion.contents()[1].nodeValue == titulo) {
				objetoAccordion.next().remove();                  
				objetoAccordion.remove();  
			}
		})
		
		//Recria Accordion
		accordion.accordion('destroy');
		accordion.accordion(); 	 
	}
}

/*
* Mostra um accordion de acordo com o t�tulo.
*/
function __mkxShowAccordion(formulario, componente, titulo, mostrar) {
// Obt�m o componente   
	var component = $c(componente, formulario);      
	var div = component.div;     
	var accordion = $MEx(div);
	if(component) {   
		var accordionAnchors = $MEx( "#" + component.div.id ); 
		//Busca elemento H3 para remover
                accordionAnchors.find('h3').each(function (){        
			var objetoAccordion = $MEx(this);
			if(objetoAccordion.contents()[1].nodeValue == titulo) {
                                if(mostrar==='true'){
				objetoAccordion.next().show();                  
				objetoAccordion.show(); 
                                }else{                                
                                objetoAccordion.next().hide();                  
				objetoAccordion.hide(); 
                                } 
			}
		})
		
		//Recria Accordion
		accordion.accordion('destroy');
		accordion.accordion(); 	 
	}
 
}

/*
* Esta fun��o cria um container de accordion utilizando uma moldura.
*/
function __mkxCreateAccordion(formulario, componente, propriedades) {
   // Importa as folhas de estilo   
   ebfCSSImportFile("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   ebfCSSImportFile("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   

   // Importa os scripts   
   webrun.include("apimakerextreme/commons/jquery/jquery.min.js");
   webrun.include("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");    
   
   // Fun��o que valida a restri��o de dom�nio
   getLibraries();
	
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     div.id = "mexAccordion_" + componente;     
     div.className = "mexAccordions";
     div.innerHTML = "";
     

     // Cria o Accordion     
     var jqueryDiv = $MEx(div);
     jqueryDiv.accordion({ activate: function() {
       
     }});
   }
}

/*
* Esta fun��o cria um accordion e abre um formul�rio dentro do accordion criado.
*/
function __mkxCreateFormAccordion(formulario, componente, formularioDestino, titulo, filtro, modo) {
        
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div;     
     var accordion = $MEx(div);          
     
     var found = false;
     var counter = 0;     

     // Verifica se j� existe o painel   
     var found = false;
     var tabsAnchors = $MEx( "#" + component.div.id + " .ui-accordion-header");  
        tabsAnchors.each(function() {
            if($MEx(this).html().indexOf(titulo) != -1) {            
                $MEx(component.div).accordion("option", {active : counter});                
                found = true;
            }            
            counter++;
     }); 

     if(!found) {
       var id = "mexFormAccordion_" + formularioDestino.replace("{","").replace("}","");     
 
       // T�tulo     
       var tabTitulo = "<h3 id=\""+id+"_title\">"+ titulo + "</h3>";  
  
       var formURL = "form.jsp?sys=" + sysCode + "&action=openform&formID="+ formularioDestino +"&align=0&mode="+(modo?modo:-1)+"&goto=-1&filter="+(filtro?filtro:"")+"&scrolling=yes";
       var tabContentHtml = "<iframe width=\"100%\" height=\"100%\" class=\"mexFormFrameAccordion\" frameborder=\"0\" src=\""+ formURL +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"auto\" width=\"100%\"></iframe>";
       //Adiciona HTML 
       accordion.append( tabTitulo );
       accordion.append("<div id='"+ id + "' class=\"mexAccordionContent\">" + tabContentHtml + "</div>");
   
       //Atualiza Accordion        
       accordion.accordion('destroy');
       accordion.accordion();        

       // Ajusta a altura dos conte�dos
       $MEx(".mexAccordionContent").each(function() {
         // get the title height     
         var me = $MEx(this);    
         var titleHeight = parseInt(me.prev().css("height")); 
         var parentHeight = parseInt(me.closest(".mexAccordions").css("height"));        
         var qtdTitle = me.closest(".mexAccordions").find("h3").size();
         me.css("height", parentHeight - (titleHeight * qtdTitle));      
       });
                     
     }
   }
}

/*
* Esta fun��o permite personalizar a funcionalidade da caixa de texto (do tipo data) MEx
*/
function __mkxSetDateProperties(formulario, componente, animacaoExibir, formatoData, ocultarIcone, qtdMeses, completarDias) {
   // Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(component) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var datePicker = $MEx(component.input);
     
     // Anima��o ao exibir        
     if(animacaoExibir) datePicker.datepicker("option", "showAnim", animacaoExibir);
     // Formato da data          
     if(formatoData) datePicker.datepicker("option", "dateFormat", formatoData);
     // Ocultar Icone
     if(ocultarIcone == true) {
       datePicker.datepicker("option", "showOn", "focus");
       datePicker.datepicker("option", "buttonImage", null);
       datePicker.datepicker("option", "buttonImageOnly", false);                  
     }
     // Quantidade de meses para mostrar
     if(qtdMeses) datePicker.datepicker("option", "numberOfMonths", qtdMeses);
     
     // Completa o calend�rio com dias de outros meses            
     if(completarDias == true) {
       datePicker.datepicker("option", "showOtherMonths", true);
       datePicker.datepicker("option", "selectOtherMonths", true);                  
     }
   }
}

/*
* Esta fun��o permite restringir um per�odo a ser selecionado no componente caixa de texto (do tipo data) MEx
*/
function __mkxSetDateRange(formulario, componente, dataMinima, dataMaxima) {
   // Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(component) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var datePicker = $MEx(component.input);
     // Restringe o per�odo        
     datePicker.datepicker("option", "minDate", dataMinima);     
     datePicker.datepicker("option", "maxDate", dataMaxima);
   }
}

/*
* Esta fun��o cria uma data fixa abaixo da moldura MEx
*/

function __mkxCreateDateFixed(formulario, componente, fluxo) {
   // Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(component) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var datePicker = $MEx(component.div);
	 //limpa div
	 datePicker.innerHTML='';
	 //Cria propiedades
	 var dateProperties = {
			dateFormat: "dd/mm/yy",
			dayNamesMin: [ "D", "S", "T", "Q", "Q", "S", "S" ],
			changeMonth: true,
            changeYear: true,
			//Ranger de anos que aparece no Componente
			yearRange: '1900:2050',			
			monthNamesShort: [ "Janeiro", "Fevereiro", "Mar�o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
			//Altera��o para abrir para cima no FF
			beforeShow: function(input, inst){				
				if(navigator.userAgent.indexOf('Firefox')!=-1){
					
					if($MEx(input).offset().top>220){
						inst.dpDiv.css({marginTop: -(input.offsetHeight+200) + 'px', marginLeft:'0px'});
					}else{
						inst.dpDiv.css({marginTop:'2px', marginLeft:'0px'});
					}
				}
			},				
			onSelect:function(dateText){if(fluxo){executeJSRuleNoField(sysCode, idForm, fluxo, [dateText])}}
		}
	// Associa o evento
		datePicker.datepicker(dateProperties); 
   }
}

/*
* Esta fun��o cobtem o valor da data fixa MEx
*/
function __mkxGetDateFixed(formulario, componente) {
   // Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(component) { 
     // Obt�m a div onde o scroll deve ser adicionado     
     var datePicker = $MEx(component.div);          
     return datePicker.datepicker("getDate");
   }
}



/*
* Esta fun��o transforma a dica padr�o de um componente para em uma caixa de texto personalizavel
*/
function __mkxConvertComponentsTooltip(posicao) {
	//importar css
	mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
	mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");
	
	//importar jquery
	mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
	mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js"); 
	
	// Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
	//Define Propriedades
        var properties = new Array();     
        if(posicao != null) properties["position"] = posicao;           

	var listaElementos = $MEx(".tabArea").find("*");
	for(var i = 0; i < listaElementos.length; i++){
		var elemento = listaElementos[i];
		if(elemento.div){
		var divElemento = $MEx(elemento.div);
		divElemento.find('*').each(function(){
			if($MEx(this).attr('title')){
			  	divElemento.attr('title',$MEx(this).attr('title'));
				$MEx(this).removeAttr('title').removeAttr('alt');
			}
		})
		}
	}
	$MEx(document).tooltip(properties);
}

/*
* Esta fun��o transforma a dica padr�o de um componente para em uma caixa de texto personalizavel
*/
function __mkxComponenteTooltip(formulario, componente, html, title, posicao, seguirMouse) {
	//importar css
	mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
	mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");
	
	//importar jquery
	mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
	mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js"); 
	
	// Fun��o que valida a restri��o de dom�nio
    getLibraries();
	
	//Define Propriedades
	var properties = new Array();     
	if(posicao == 'left') properties["position"] = { my: "right-10 center", at: "left center", collision: "flipfit" };
        if(posicao == 'right') properties["position"] = { my: "left+10 center", at: "right center", collision: "flipfit" };
        if(posicao == 'top') properties["position"] = {my: "right botton", at: "right top-20", collision: "flipfit"}; 
        if(posicao == 'botton') properties["position"] = {my: "right top+5", at: "right botton+10", collision: "flipfit" };
	if(seguirMouse != null) properties["track"] = seguirMouse;        
	
	// Obt�m o componente   
	var component = $c(componente, formulario);   
	var htmlContent = html;
	// Caso o componente seja encontrado
	if(component) { 

 	var divElemento = $MEx(component.div);
		divElemento.find('*').each(function(){
			if($MEx(this).attr('title')){
			  	divElemento.attr('title',$MEx(this).attr('title'));
				$MEx(this).removeAttr('title').removeAttr('alt');
			}
		})

		$MEx(component.div).attr('alt',title)
		$MEx(component.div).attr('title',title)                 
		if(htmlContent){
			$MEx(component.div).tooltip({
				content: function() {
					return htmlContent;
				}
			});
			}else{  
			$MEx(component.div).tooltip(properties);
		}
		
	}
}

/*
* Esta fun��o retorna as linhas selecionadas da grade do Maker Extreme
*/
function __mkxGetGridSelectedRows(formulario, componente) {

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
   
      
   // Obt�m as linhas selecionadas   
   var selecteds;   

   if(grid.jqGrid('getGridParam','multiselect')) {
     selecteds = grid.jqGrid('getGridParam','selarrrow');
   } else {
     selecteds = grid.jqGrid('getGridParam','selrow');
   }
   
   return selecteds;  
}

/*
* Esta fun��o obt�m o valor de uma c�lula da grade
*/
function __mkxGetGridValue(formulario, componente, id, coluna) {

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
 
   // Seleciona a linha da grade   
   var columName = reduceVariable(coluna);   
   if(id) {
     var ret = grid.jqGrid('getRowData',id);
     return ret[columName];
   }            

   return null;    
}

/*
* Esta fun��o altera o valor de uma c�lula da grade
*/
function __mkxSetGridValue(formulario, componente, id, coluna, valor) {

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
 
   // Seleciona a linha da grade   
   var columName = reduceVariable(coluna);   
   if(id) {
     var ret = grid.jqGrid('getRowData',id);
     ret[columName] = valor;     
     grid.jqGrid('setRowData',id,ret);
   }                
}

/*
* Esta fun��o atualiza os dados de uma grade
*/
function __mkxUpdateGridData(formulario, componente, listaDados) {

  // Obt�m o componente  
   var grid;   

   try {   
     var component = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!component) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + component.id + "_table");     
   }
 
__mkxCreateSimpleGrid(formulario, componente, component.div.savedData["titulo"], component.div.savedData["listaColunas"], listaDados, component.div.savedData["multiSelect"], component.div.savedData["paging"]);
}

/*
* Esta cria uma grade em uma Moldura ou em um Container (DIV)
*/
function __mkxCreateSimpleGrid(formulario, componente, titulo, listaColunas, listaDados, multiSelect, paging) {
  //importar css                                                                       
  mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
  mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");
  mkxImportCss("apimakerextreme/plugins/jq-grid/css/ui.jqgrid.css");   

  //importar javascript
  mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
  mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");
  mkxImportJs("apimakerextreme/plugins/jq-grid/js/grid.locale-pt-br.js");
  mkxImportJs("apimakerextreme/plugins/jq-grid/js/jquery.jqGrid.min.js");       
  
  // Fun��o que valida a restri��o de dom�nio
  getLibraries();
   
  // Obt�m o componente  
   var component;   

   try {   
     component = $c(componente, formulario);
   } catch(ex) {}  
   
   // Caso o componente n�o seja encontrado
   var gridComp;
   if(!component) { 
     gridComp = $MEx("#" + componente);     
     if(gridComp.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }
     gridComp.attr("class","mexGrid");     
     gridComp.html("<table id=\""+ gridComp.attr("id") +"_table\" class=\"mexGridTable\"></table>");     

   } else {
     var id = component.id;   
     gridComp = $MEx(component.div);
     gridComp.attr("class","mexGrid");
     gridComp.attr("id",id);                       
     gridComp.html("<table id=\""+ id +"_table\" class=\"mexGridTable\"></table><div id=\""+ id +"_pager\"></div>");     
   }
   
   component.div.savedData = new Array();
   component.div.savedData["titulo"] = titulo;
   component.div.savedData["listaColunas"] = listaColunas;
   component.div.savedData["multiSelect"] = multiSelect;
   component.div.savedData["paging"] = paging;
   
   if(!listaColunas) throw "MEx error: A defini��o de colunas n�o foi informada";
   if(!listaDados) throw "MEx error: A fonte de dados n�o foi informada";   

   // Prepara as listas de colunas   
   var columnNames = new Array();   
   var columnModel = new Array();
   for(var i = 0; i < listaColunas.length; i++) {
     // Quebra a linha em uma lista   
     var currentDef = listaColunas[i].split(";");     
     // Adiciona o nome na lista de nomes
     columnNames.push(currentDef[0]);
     // Adiciona a lista de defini��es
	 var columnModelObj = {  

        key: (i == 0) ? true : false,
        name: reduceVariable(currentDef[0]),
        width: (currentDef[1]) ? currentDef[1] : 150, 
        align: (currentDef[2]) ? currentDef[2] : "left", 
        sortable: (currentDef[3]) ? (currentDef[3] === "true") : false,
		sorttype: (currentDef[4]) ? currentDef[4] : "text"
     };
	 
	if(currentDef[4]=="date"){
		columnModelObj.formatter='date';
		//columnModelObj.formatoptions= {newformat:'d/m/Y'};
		columnModelObj.datefmt= 'Y-M-D';
	}
	 
    columnModel.push(columnModelObj); 

   };   
   
   // Prepara a lista de dados   
   var dados = new Array();   
   for(var i = 0; i < listaDados.length; i++) {
     dados[i] = {};
     dados[i]["mexKey"] = listaDados[i][0]; 
     for(var j = 0; j < listaDados[i].length; j++) {
         dados[i][reduceVariable(columnNames[j]).toString()] = listaDados[i][j];
     }
   }
         
   // Cria a grade              
   var grid = $MEx("#" + gridComp.attr("id")).find(":first-child").first();
   grid.jqGrid({        
	datatype: "local",
   	colNames: columnNames,
   	colModel: columnModel,
	forceFit: false,
	shrinkToFit: false,
	hidegrid: false,
   	rowNum: (paging == true) ? 100 : dados.length,
   	rowList:[100,500,1000,5000],
   	pager: (paging == true) ? "#" + id +"_pager" : null,   
    scroll: (paging == false) ? true : false,
   	sortname: 'id',   
    gridview: true,
	width: gridComp.closest(".mexGrid").width(),
	height: (gridComp.closest(".mexGrid").height() - 50),
    viewrecords: true,
    sortorder: "desc",
	caption: titulo,
    multiselect: (multiSelect == true || multiSelect === "true")
   });   

  
      
   // Adiciona os dados   
   grid.jqGrid('setGridParam', {data: dados});
   // Recarrega a grade
   grid.trigger("reloadGrid");	
}

/*
* Esta fun��o associa um fluxo a um evento da grade
*/
function __mkxAssociateGridEvent(formulario, componente, evento, fluxo, parametros) {
   // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }                

   if(evento != "ondblClickRow") {
     var gridEvent = {};
     gridEvent[evento] = function(obj) {
         var defaultParams = new Array();
         
         // Par�metros com o id da linha
         if(evento == "beforeSelectRow" || evento == "onSelectRow" || evento == "onRightClickRow") {         
           defaultParams.push(obj);         
         }   
         
         return executeJSRuleNoField(sysCode, idForm, fluxo, defaultParams.concat(parametros));  
     } 

     // Adiciona novos dados   
     grid.jqGrid('setGridParam', gridEvent);      

   } else {
     grid.dblclick(function(e) {
       var td = e.target;
       var ptr = $MEx(td).closest("tr.jqgrow").attr("id");       
       var defaultParams = new Array();       
       defaultParams.push(ptr);
       return executeJSRuleNoField(sysCode, idForm, fluxo, defaultParams.concat(parametros));  
     });
   }
}

/*
* Esta fun��o seleciona uma linha da grade
*/
function __mkxSelectGridRow(formulario, componente, id) {       

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
 
   // Seleciona a linha da grade
   if(id != null && id != "" && id != "undefined") {
     grid.jqGrid('setSelection', id);
   } else {
     grid.jqGrid('resetSelection');
   } 
   

}

/*
* Esta fun��o retorna uma lista com os IDs de todas as linhas de uma grade Maker Extreme API
*/
function __mkxGetAllGridRows(formulario, componente) {     

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
   
      
   // Obt�m as linhas selecionadas   
   return grid.jqGrid('getDataIDs');
  
}

/*
* Esta fun��o define o estilo visual de uma linha
*/
function __mkxSetGridLineStyle(formulario, componente, id, estilo) {

  // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
      
   //obt�m a linha   
   var linha = grid.find("#" + id + " td");

    // Diferencia entre textoCSS e classeCSS
    if (estilo) {    
      if (estilo.indexOf(":") == -1) {
        linha.addClass(estilo);    
      } else {
        var listaStyle = estilo.split(";");
        for(var i = 0; i < listaStyle.length; i++) {        
          if(listaStyle[i] && listaStyle[i].length > 0) {          
            var map = $MEx.trim(listaStyle[i]).split(":");            
            linha.css(map[0], map[1]);
          }
          
        }      
         
      }  
    }
}

/*
* Esta fun��o adiciona um bot�o na grade, que, quando clicado, executa um fluxo.
*/
function __mkxAddGridImage(formulario, componente, id, coluna, url, fluxo, parametros) {

  // Obt�m o componente  
   var grid;   
   var componentID;
   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     componentID = "#" + componente + "_table";
     grid = $MEx(componentID);
          
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {
     componentID = "#" + grid.id + "_table";   
     grid = $MEx(componentID);     
   }
    
 
   // Formata o nome da coluna
   var columName = reduceVariable(coluna);   

   var data = {};     
      
   // Adiciona o ID da linha como par�metro padr�o
   var defaultParams = new Array();         
   defaultParams.push(id);
   
   // Guarda o evento onclick do bot�o dentro da pr�pria grade
   var _fluxo = fluxo;   
   var _param = parametros;   
   grid.find("#" + id).find("td[aria-describedby='"+ componente +"_table_" + coluna + "']")[0].clickGridButton = function() {
     if(_fluxo) executeJSRuleNoField(sysCode,idForm,_fluxo,defaultParams.concat(_param));  
   }

   data[columName] = "<img class='"+ ((_fluxo) ? "mexGridImageLink" : "mexGridImage") +"' id='"+ id + "_" + columName +"_img' "+ ((_fluxo) ? "onclick=\"$MEx(this).closest('td')[0].clickGridButton(); return false;\"" : "") +" src=\""+ url +"\" />";     
   grid.jqGrid('setRowData',id,data);                
}

/*
* Esta fun��o adiciona um bot�o na grade, que, quando clicado, executa um fluxo.
*/
function __mkxAddGridButton(formulario, componente, id, coluna, texto, fluxo, parametros) {

  // Obt�m o componente  
   var grid;   
   var componentID;
   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     componentID = "#" + componente + "_table";
     grid = $MEx(componentID);
          
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {
     componentID = "#" + grid.id + "_table";   
     grid = $MEx(componentID);     
   }
    
 
   // Formata o nome da coluna
   var columName = reduceVariable(coluna);   

   var data = {};     
      
   // Adiciona o ID da linha como par�metro padr�o
   var defaultParams = new Array();         
   defaultParams.push(id);
   
   // Guarda o evento onclick do bot�o dentro da pr�pria grade
   var _fluxo = fluxo;   
   var _param = parametros;
   grid.find("#" + id).find("td[aria-describedby='"+ componente +"_table_" + coluna + "']")[0].clickGridButton = function() {   
      executeJSRuleNoField(sysCode,idForm,_fluxo,defaultParams.concat(_param));  
   }

     data[columName] = "<input type='button' class='mexGridButton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' id='"+ id + "_" + columName +"_btn' onclick=\"$MEx(this).closest('td')[0].clickGridButton(); return false;\" value=\""+ texto +"\" />";     
     grid.jqGrid('setRowData',id,data);
}

/*
* Esta fun��o cria uma lista de propriedades para serem usadas nas fun��es de "Painel" da API MakerExtreme
*/
function __mkxCreatePanelProperties(autoAbrir, fecharESC, classeCSS, arrastavel, larguraMaxima, alturaMaxima, larguraMinima, alturaMinima, redimensionavel, efeitoMostrar) {
   // Retorna um JSON com as propriedades  
   var properties = new Array();     
   if(autoAbrir != null) properties["autoOpen"] = autoAbrir;   
   if(fecharESC != null) properties["closeOnEscape"] = fecharESC;      
   if(classeCSS != null) properties["dialogClass"] = classeCSS;
   if(arrastavel != null) properties["draggable"] = arrastavel;
   if(larguraMaxima != null) properties["maxWidth"] = larguraMaxima;
   if(alturaMaxima != null) properties["maxHeight"] = alturaMaxima;              
   if(larguraMinima != null) properties["minWidth"] = larguraMinima;   
   if(alturaMinima != null) properties["minHeight"] = alturaMinima;   
   if(redimensionavel != null) properties["resizable"] = redimensionavel;   
   if(efeitoMostrar != null) properties["show"] = efeitoMostrar;     

   return properties;
}

/*
* Esta fun��o abre um formul�rio dentro de um painel flutuante (semelhante a uma janela)
*/
function __mkxOpenFormPanel(titulo, formulario, largura, altura, modal, filtro, modo,rolagem, propriedades) {
   // Importa as folhas de estilo 
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   

   // Importa os scripts          
   mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
   mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");   
      
   // Fun��o que valida a restri��o de dom�nio
   getLibraries();
      
    // Verifica se j� existe o painel   
   var found = false;
   $MEx(".mexPanel").each(function() {
        if($MEx(this).attr("id") == ("mexPanel_" + reduceVariable(titulo))) {
          $MEx(this).dialog("open");          
          found = true;
        }
   });

   if(found) return;
      
   // Cria a div onde o Painel deve ser adicionado     
   var div = document.createElement("DIV");     
   div.id = "mexPanel_" + reduceVariable(titulo);     
   div.className = "mexPanel";
   div.title = titulo;   
   //Altera��o da barra de rolagem 19-06-2013
   if(rolagem){rolagem='yes';}else{rolagem='no';}
   
   var formURL = "form.jsp?sys=" + sysCode + "&action=openform&formID="+ formulario +"&align=0&mode="+ (modo?modo:-1) +"&goto=-1&filter="+ (filtro?filtro:"") +"&scrolling="+ rolagem;
   var tabContentHtml = "<iframe class=\"mexPanelFrame\" frameborder=\"0\" src=\""+ formURL +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" height=\"100%\"></iframe>";   

   div.innerHTML = tabContentHtml;

   $MEx("#lay").append(div);   

   var panel = $MEx(div);   

   if(!propriedades) {    
     // Inicializa as propriedades
     propriedades = {};                
     // Define os valores padr�es
     propriedades.autoOpen = true;     
     propriedades.resizable = false; 
   }
      
   propriedades.width = largura;   
   propriedades.height = altura;   
   propriedades.modal = modal;   

   // Chama o evento ao navegar
   propriedades.open = function(evt,ui) {
    var tabPanelId = $MEx(this).attr("id");
     $MEx("#" + tabPanelId + " iframe[class='mexPanelFrame']").first().each(function() {     
          if(this.contentWindow && this.contentWindow.mainform) {              
              this.contentWindow.mainform.formOnLoadAction();
          }
     });     
  }   

   // Chama o evento ao fechar o formul�rio
   propriedades.beforeClose = function(evt,ui) {
     var tabPanelId = $MEx(this).attr("id");
     $MEx("#" + tabPanelId + " iframe[class='mexPanelFrame']").first().each(function() {     
          if(this.contentWindow && this.contentWindow.mainform) {  	  
              this.contentWindow.formOnUnLoadAction();
          }
     });     
   }

   // Chama o evento ap�s fechar o formul�rio
   propriedades.close = function(evt,ui) {
     panel.dialog("destroy");
     panel.remove();	 
   }   
      
   panel.dialog(propriedades);
   
   // Corrige o problema do Quirks Mode no IE   
   var _largura = largura;   
   var _altura = altura;
   div.fixIEQuirksMode = function() {
        fixIEPanelQuirksMode(div.id, largura, altura);
   }     
   div.fixIEQuirksMode();   
   $MEx(div).dialog("option", "open", function(event, eventPanel) {
         div.fixIEQuirksMode();
         var resizeHandler = $MEx(this).closest(".ui-dialog").find(".ui-resizable-handle");         
         resizeHandler.css("bottom", "3px");
   });   
}

/*
* Esta fun��o oculta ou exibe um painel
*/
function __mkxShowPanel(titulo, mostrar) {
        
   // Obt�m o componente   
   var painel = $MEx("#mexPanel_" + reduceVariable(titulo));   

   // Caso o componente seja encontrado
   if(painel.size() > 0) { 
       if(mostrar === "true") {
         painel.dialog("open");
       } else {
         painel.dialog("close");
       }     
          
   } else {
       throw "MEx Error: Painel n�o encontrado!";
   }
}

/*
* Esta fun��o remove completamente um painel e toda a sua funcionalidade
*/
function __mkxRemovePanel(titulo) {
        
   // Obt�m o componente   
   var painel = $MEx("#mexPanel_" + reduceVariable(titulo));   
   
   // Se o painel n�o foi encontrado tenta fechar localizar o pr�prio mainel
   if(painel.length <= 0) {   
     if(parent.parent.$MEx) {
       painel = parent.parent.$MEx("#mexPanel_" + reduceVariable(titulo));
     }     
   }
   
   // Caso o componente seja encontrado
   if(painel.size() > 0) {     
      painel.dialog("destroy");      
      painel.remove();
   } else {
       throw "MEx Error: Painel n�o encontrado!";
   }
}

/*
* Esta fun��o muda a posi��o de um painel criado
*/
function __mkxMovePanel(titulo, posicaoX, posicaoY, velocidade) {
        
   // Obt�m o componente   
   var painel = $MEx("#mexPanel_" + reduceVariable(titulo));   

   // Caso o componente seja encontrado
   if(painel.size() > 0) {
      if(posicaoX.indexOf("px") == -1) posicaoX = posicaoX + "px";
      if(posicaoX.indexOf("px") == -1) posicaoY = posicaoY + "px";
        
		if(velocidade) {
           painel.dialog("widget").animate({
             left: posicaoX,          
             top: posicaoY
           }, velocidade);
        } else {
		  painel.dialog("widget").css({ top: posicaoX, left: posicaoY});
		}		 
   } else {
       throw "MEx Error: Painel n�o encontrado!";
   }
}

/*
* Esta fun��o associa um fluxo a um evento do painel
*/
function __mkxAssociatePanelEvent(titulo, nomeEvento, fluxo, parametros) {
        
   // Obt�m o componente   
   var painel = $MEx("#mexPanel_" + reduceVariable(titulo));   

   // Caso o componente seja encontrado
   if(painel.size() > 0) { 
     
     painel.dialog("option", nomeEvento, function(event, eventPanel) {
       executeJSRuleNoField(sysCode, idForm, fluxo, parametros);
       
       // FIX Ie quirks Mode
       if(nomeEvento == "open") {
         painel.get(0).fixIEQuirksMode();
       }      
     });           
   } else {
       throw "MEx Error: Painel n�o encontrado!";
   }
}

/*
* Esta fun��o adiciona bot�es a um painel. Ao clicar neste bot�o, um fluxo � executado.
*/
function __mkxAddPanelButton(titulo, textoBotao, fluxo, parametros) {
        
   // Obt�m o componente   
   var painel = $MEx("#mexPanel_" + reduceVariable(titulo));   

   // Caso o componente seja encontrado
   if(painel.size() > 0) {
      // Obt�m os bot�es atuais      
      var buttons = painel.dialog("option", "buttons");

      // adiciona o novo bot�o      
      buttons[textoBotao] = function() {      
         executeJSRuleNoField(sysCode, idForm, fluxo, parametros);
      };      

      painel.dialog("option", "buttons", buttons);
   
   } else {
       throw "MEx Error: Painel n�o encontrado!";
   }
}

/*
* Esta fun��o abre um painel flutuante (semelhante a uma janela)
*/
function __mkxOpenHTMLPanel(titulo, conteudo, largura, altura, modal, propriedades) {
   // Importa as folhas de estilo 
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   

   // Importa os scripts          
   mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
   mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");   
      
   // Fun��o que valida a restri��o de dom�nio
   getLibraries();
      
   // Verifica se j� existe o painel   
   var found = false;
   $MEx(".mexPanel").each(function() {
        if($MEx(this).attr("id") == ("mexPanel_" + reduceVariable(titulo))) {
          $MEx(this).dialog("open");          
          found = true;
        }
   });

   if(found) return;
      
   // Cria a div onde o Painel deve ser adicionado     
   var div = document.createElement("DIV");     
   div.id = "mexPanel_" + reduceVariable(titulo);     
   div.className = "mexPanel";
   div.title = titulo;      

   div.innerHTML = conteudo;

   $MEx("#lay").append(div);   

   if(!propriedades) {    
     // Inicializa as propriedades
     propriedades = {};                
     // Define os valores padr�es
     propriedades.autoOpen = true;     
     propriedades.resizable = false; 
   }
      
   propriedades.width = largura;   
   propriedades.height = altura;   
   propriedades.modal = (modal == true) ? true : false;
  
   $MEx(div).dialog(propriedades);
                       
   // Corrige o problema do Quirks Mode no IE   
   var _largura = largura;   
   var _altura = altura;
   div.fixIEQuirksMode = function() {
        fixIEPanelQuirksMode(div.id, largura, altura);
   }     
   div.fixIEQuirksMode();   
   $MEx(div).dialog("option", "open", function(event, eventPanel) {
         div.fixIEQuirksMode();
         var resizeHandler = $MEx(this).closest(".ui-dialog").find(".ui-resizable-handle");         
         resizeHandler.css("bottom", "3px");
                 
   });          
          
}

/*
* Esta fun��o modifica a barra de padr�o do navegador, em Tabelas HTML, por uma nova barra de rolagem cross-browser e totalmente customiz�vel
*/
function __mkxChangeTableScrollBar(formulario, componente, propriedades) {
   // Importa as folhas de estilo   
   ebfCSSImportFile("apimakerextreme/plugins/scrollpane/jquery.jscrollpane.css");   
   ebfCSSImportFile("apimakerextreme/plugins/scrollpane/jqScrollPaneCustom.css");   

   // Importa os scripts   
   webrun.include("apimakerextreme/commons/jquery/jquery.min.js");
   webrun.include("apimakerextreme/plugins/scrollpane/jquery.jscrollpane.min.js");   
   webrun.include("apimakerextreme/plugins/scrollpane/jquery.mousewheel.js");
   
   // Fun��o que valida a restri��o de dom�nio    
   getLibraries();       

   // Obt�m o componente   
   var component = $c(componente, formulario);   

   // Caso o componente seja encontrado
   if(componente) {
     // Obt�m a div onde o scroll deve ser adicionado     
     var div = component.div.firstChild;     

     // Cria o ScrollPanel
     $MEx(div).jScrollPane({
       horizontalGutter:5,
       verticalGutter:5,
       'showArrows': false
     });

     $MEx('.jspDrag').hide();
     $MEx('.jspScrollable').mouseenter(function(){
       $MEx(this).find('.jspDrag').stop(true, true).fadeIn('slow');
     });
     $MEx('.jspScrollable').mouseleave(function(){
       $MEx(this).find('.jspDrag').stop(true, true).fadeOut('slow');
     });
   }
}

function __mkxOpenFormSameWindow(form, filtro, modo) {
    parent.document.location.href = "form.jsp?sys="+sysCode+"&action=openform&formID="+form+"&align=0&mode="+((modo)? modo : -1)+"&goto=-1&filter="+ filtro +"&scrolling=no"
}

function __mkxSetAutocomplete(form, component, dados, propriedades) {
   // Importa as folhas de estilo 
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   

   // Importa os scripts          
   mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
   mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");   
   
   // Fun��o que valida a restri��o de dom�nio    
   getLibraries();       

   // Obt�m o componente   
   var component = $c(component, form);
   
   if(component) { 
   
     // Prepara os dados
	 var data;
	 if(propriedades && propriedades.fluxo) {
	   // Adiciona o termo buscado como primeiro par�metro     
           var data = function(request, response) {
             var defaultParams = new Array();         
             defaultParams.push(request.term);  
	     var ret = executeJSRuleNoField(sysCode, idForm, propriedades.fluxo, defaultParams.concat(propriedades.parametros)); 
             
             response( $MEx.map( ret, function( item ) {
               var campoChave;
	       var campoLista;
	       if(typeof(item) == "string") {
	         // Se o retorno for string o campo chave � igual ao campo lista
                 campoChave = item;
                 campoLista = item;
	       }       
               if(typeof(item) == "object") {
                 // Se for um array
		 if(item.length >= 2) {
		   campoChave = item[0];
		   campoLista = item[1];
		 } else {
		   campoChave = item[0];   
                   campoLista = item[0];
		 }
               }
		   // Retorno
	       return {
                 label: campoLista,
                 value: campoChave
               }
             }));     
	   } 
         }
	 if(dados && dados.length > 0) {
	     if(typeof(dados[0]) == "object") {
		   // se for array transforma o array de dados
		   data = new Array();
		   for(var i = 0; i < dados.length; i++) {     
		     // Monta os dados de retorno     
                     if(dados[i].length >= 2) {                     
                       data.push({ label: dados[i][0], value: dados[i][1] });
                     } else {
                       data.push(dados[i][0]);
                     }                     
		   }
	 
                 }
		 if(typeof(dados[0]) == "string") {
		   // se for string, o array j� est� pronto
		   data = dados;
		 }
	 }
	 
	 if(!propriedades) {
	   propriedades = {};
	   propriedades.source = data;
	 }
	 propriedades.source = data;
	 
     // Obt�m o input     
     var input = component.input;

     $MEx(input).autocomplete(propriedades);
   }     
}

/*
* Esta fun��o cria uma lista de propriedades para serem usadas nas fun��es de "Painel" da API MakerExtreme
*/
function __mkxCreateAutocompleteProperties(focarPrimeiro, fluxo, parametros, delay, tamanhoMinimo) {
   // Retorna um JSON com as propriedades  
   var properties = new Array();     
   if(focarPrimeiro != null) properties["autoFocus"] = focarPrimeiro;   
   if(fluxo != null) properties["fluxo"] = fluxo;      
   if(parametros != null) properties["parametros"] = parametros;
   if(delay != null) properties["delay"] = delay;
   if(tamanhoMinimo != null) properties["minLength"] = tamanhoMinimo;

   return properties;
}

function __mkxShowGridColumn(formulario, componente, coluna, mostrar) {
   // Obt�m o componente  
   var grid;   

   try {   
     grid = $c(componente, formulario);
   } catch(ex) {}  

   // Caso o componente n�o seja encontrado
   if(!grid) { 
     grid = $MEx("#" + componente + "_table");     
     if(grid.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }   

   } else {   
     grid = $MEx("#" + grid.id + "_table");     
   }
 
   // Formata o nome da coluna
   var columName; 
   if(typeof(coluna) == "string") {
     columName = reduceVariable(coluna);     
   } else {
     // Se for um array formata todos os nomes da lista 
     columName = new Array();    
     for(var i = 0; i < coluna.length; i++) {
        columName[i] = reduceVariable(coluna[i]);
     }
   }  
      
   
   if(mostrar === "true") {   
     grid.jqGrid('showCol', columName);  
   } else {
     grid.jqGrid('hideCol', columName);   
   }
}

function __mkxFindForm(formCode) {
    
	// Fun��o que valida a restri��o de dom�nio    
    getLibraries(); 
	
	// Retorna todos os elementos HTMLDocument encontrados
	var getAllWindows = function() {
		documents = [top];
		childDocuments = getAllChildWindows(documents);
		return documents.concat(childDocuments);
	}
	
	var toArray = function (obj) {
	    if(!obj) return null;
		var array = [];
		// iterate backwards ensuring that length is an UInt32
		for (var i = obj.length >>> 0; i--;) { 
			array[i] = obj[i];
		}
		return array;
	}
	
	// Fun��o recursiva que sai em busca de todos os elementos associados a IFRAME ou FRAME
	// docs: Array do tipo HTMLDocument
	var getAllChildWindows = function(docs) {
		childDocuments = []
		
		var docsLength = docs.length;
		for (var docIndex = 0; docIndex < docsLength; docIndex++) {
		    var iframes = new Array();
			iframes = iframes.concat(toArray(docs[docIndex].document.getElementsByTagName("iframe")));
			iframes = iframes.concat(toArray(docs[docIndex].document.getElementsByTagName("frame")));
			var iframesLength = iframes.length;
			if (iframesLength > 0) {
				for (var iframeIndex = 0; iframeIndex < iframesLength; iframeIndex++) {
					var iframeDocument = iframes[iframeIndex].contentWindow;
					if (iframeDocument) {
						childDocuments.push(iframeDocument);
		
						var frames = iframeDocument.document.getElementsByTagName("frame");
						var framesLength = frames.length;
						if (framesLength > 0) {
							for (frameIndex = 0; frameIndex < framesLength; frameIndex++) {
								var frameDocument = frames[frameIndex].contentWindow;
								if(frameDocument) {
									childDocuments.push(frameDocument);
								}
							}
						}
					}
				}
			}
		}
 
		if(childDocuments.length > 0) {
			return childDocuments.concat(getAllChildWindows(childDocuments));
		}
 
		return childDocuments;
	}
	
	// obt�m todos os documentos encontrados na p�gina
	var foundDocs = getAllWindows();
	var currentWin;
	for(var i = 0; i < foundDocs.length; i++) {
		currentWin = foundDocs[i];
		if(currentWin.location.href.indexOf("form.jsp") != -1) {
		  if(currentWin.mainform && currentWin.mainform.formGUID) {
		    if(currentWin.mainform.formGUID == formCode || currentWin.mainform.idForm == formCode) {
			  return currentWin;
			}
		  }
		}
	}
	
	return null;
}

function __mkxCreateAreaChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0; 
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);
          component.dataTable = data;          

          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };
          
          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
                    
          component.chartOptions = options;
 
          component.chart = new google.visualization.AreaChart(div);           

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxIsChartsAPILoaded() {
   if(document.mkxSetChartsLoaded) {
     return true;
   } else {
     return false;
   } 
}

function __mkxSetChartsAPILoaded() {
  document.mkxSetChartsLoaded = true;
}

function __mkxCreateBarChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };          

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }            
          component.chartOptions = options;
 
          component.chart = new google.visualization.BarChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {

	   google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreateColumnChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 100);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };           

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.ColumnChart(div);
          
          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });
          
          component.chart.draw(data, component.chartOptions);        
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {

	  google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreateGaugeChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };          

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.Gauge(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["gauge"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['gauge']})       
       document.googleLoaded["gauge"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreateGeoChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };           

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.GeoChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["geochart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['geochart']})       
       document.googleLoaded["geochart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreateGeoCityChart(formulario, componente, titulo, regiao, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
		  var options = {
             title: titulo,             
             region: regiao,             
             displayMode: 'markers',
			 width: component.getWidth(),
			 height: component.getHeight()
          };          

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.GeoChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     
     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['geochart']});
     } else {
       __drawChart();
     }       
     
   }    

   _drawChart();
       
}

function __mkxCreateLineChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
  
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };           

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.LineChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreatePieChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
  getLibraries();
   
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };          

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.PieChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxCreateSteppedAreaChart(formulario, componente, titulo, series, dados, propriedades) {
  // Valida a URL
   getLibraries();
   
  mkxImportJs("https://www.google.com/jsapi?callback=__mkxSetChartsAPILoaded");
  var loadCheck = 0;  
  var _drawChart = function() {  
     if(!__mkxIsChartsAPILoaded()) {
       if(loadCheck < 5) {       
         setTimeout(_drawChart, 500);
       } else {
         throw "MEx Error: Erro carregando biblioteca do Google";
       }
       return;
     } 

         
      var __drawChart = function() {
        // Obt�m o componente   
        var component = $c(componente, formulario);   
    
        // Caso o componente seja encontrado
        if(component) {
          // Obt�m a div onde o scroll deve ser adicionado     
          var div = component.div;
          div.innerHTML = '';  
             
          // Prepara a lista de t�tulos
          var listaSeries = series.split(";");
         
          // concatena com a lista de dados
          var dadosFinais = new Array();
          dadosFinais.push(listaSeries);           
          dadosFinais = dadosFinais.concat(dados); 
  
          var data = google.visualization.arrayToDataTable(dadosFinais);          
          component.dataTable = data;
  
          var options = {
             title: titulo,
			 width: component.getWidth(),
			 height: component.getHeight()
          };             

          if(propriedades) {		  
            var objProp = eval("[{" + ebfReplaceAll(propriedades,"\n"," ") + "}]")[0];
			options = __mkxMergeJSON(options,objProp)
          }
          component.chartOptions = options;  
 
          component.chart = new google.visualization.SteppedAreaChart(div);          

          google.visualization.events.addListener(component.chart, 'ready', function() {
            if(component.registeredEvents) {
              for(var i = 0; i < component.registeredEvents.length; i++) {
                 google.visualization.events.addListener(component.chart, component.registeredEvents[i][0],component.registeredEvents[i][1]);
              }
            }
          });          

          component.chart.draw(data, component.chartOptions);         
        } else {
          throw "MEx Error: Componente n�o encontrado";
        }
     };     

     if(!document.googleLoaded) document.googleLoaded = new Array(); 
     if(!document.googleLoaded["corechart"]) {
       google.load('visualization', '1', {'callback':__drawChart, 'packages':['corechart']})       
       document.googleLoaded["corechart"] = true;
     } else {
       __drawChart();
     }
     
   }    

   _drawChart();
       
}

function __mkxAssociateChartEvent(formulario, componente, evento, fluxo, parametros) {
   
   var _associate = function() {
   var loadCheck = 0;
   if(!__mkxIsChartsAPILoaded()) {
     if(loadCheck < 5) {       
       setTimeout(_associate, 100);
     } else {
       throw "MEx Error: Erro carregando biblioteca do Google";
     }
     return;
   }        

   // Obt�m o componente   
   var component = $c(componente, formulario);
   
   var executeFlow = function(e) {
     if(!e && component.chart.getSelection()) e = component.chart.getSelection()[0];
     var paramList = new Array();
           if(e) {
		     testRow = (e["row"] != null) && (e["row"] != "undefined") && (e["row"] != "");
			 testCol = (e["column"] != null) && (e["column"] != "undefined") && (e["column"] != "");
             if(!testRow && testCol) {
               // Serie             
               paramList.push(component.dataTable.getColumnLabel(e["column"])); 
               // Grupo
               paramList.push(null);                   
               // Valor
               paramList.push(null);
             }
             
             if(testRow && !testCol) {
               // Serie             
               paramList.push(null); 
               // Grupo
               paramList.push(component.dataTable.getValue(e["row"], 0));               
               // Valor
               paramList.push(null);
             } 
              
             if(e["row"] && testCol) {
               // Serie             
               paramList.push(component.dataTable.getColumnLabel(e["column"]));
               // Grupo
               paramList.push(component.dataTable.getValue(e["row"], 0));               
               // Valor
               paramList.push(component.dataTable.getValue(e["row"], e["column"]));
             }             
                              
           }           
           if(parametros) {
             parametros = paramList.concat(parametros);             
           }
           mkxFlowExecute(fluxo, paramList);
   }     

   // Caso o componente seja encontrado
   if(component && component.chart) {
       // Obt�m o gr�fico
       var grafico = component.chart;        

       // Associa os eventos
       google.visualization.events.addListener(grafico, evento, executeFlow); 

   } else {
     // Guarda o evento para ser associado quando o gr�fico estiver pronto   
     if(component && !component.chart) {
       if(!component.registeredEvents) component.registeredEvents = new Array();       
         component.registeredEvents.push([evento,executeFlow]);
     } else {
         throw "Gr�fico n�o localizado!";
     }
   } 
  }  

  _associate();        
}

function mkxFlowExecute(ruleName, params) {
  var reducedName = reduceVariable(ruleName);  
  var sysCode = ($mainform().d.WFRForm ? $mainform().d.WFRForm.sys.value : $mainform().sysCode);
  var formCode = ($mainform().d.WFRForm ? $mainform().d.WFRForm.formID.value : null);
  var isJava = false;
  var ruleFunction;
  try {
    ruleFunction = window.eval(reducedName);
  } catch (ex) {
    isJava = true;
  }
  var value = null;
  if (isJava) {
    if (params && params instanceof Array && params.length > 0) {
      value = executeSyncJavaRule(sysCode, formCode, ruleName, params);
    } else {
      value = executeSyncJavaRule(sysCode, formCode, ruleName);
    }
  } else {
    var ruleInstance = new ruleFunction(null, sysCode, formCode);
    if (ruleInstance && ruleInstance.run) { // � JS
      value = executeJSRuleNoField(sysCode, formCode, ruleName, params, true);
    }
  } 
  return value;
}

function __mkxAddChartData(formulario, componente, valores) {       
	
   // Obt�m o componente   
   var component = $c(componente, formulario);

   // Caso o componente seja encontrado
   if(component && component.chart) {
       // Obt�m o gr�fico
       var grafico = component.chart;        

       // Adiciona a linha
       component.dataTable.addRow(valores); 

       // Redesenha o gr�fico
      grafico.draw(component.dataTable, component.chartOptions);
   } else {
     throw "Gr�fico n�o localizado!";
   } 
        
}

function __mkxResizeWindowToMax() {
  window.moveTo(0,0);

  if (document.all) {
    top.window.resizeTo(screen.availWidth,screen.availHeight);
  } else if (document.layers||document.getElementById) {
    top.window.resizeTo(screen.width,screen.height);
  }
}

/*
* Cria o CKEditor numa moldura
*/
function __mkxCreateCKE(formulario, moldura, isReadOnly, tools){

  // Importa a biblioteca
  webrun.include('apimakerextreme/plugins/ckeditor/ckeditor.js');
 
  // Valida a restri��o de dom�nio
  getLibraries();
   
  // Cria os containers
  var CKEditorDiv = document.createElement("div");      
  var CKEditor = document.createElement("textarea"); 
 
  // Obt�m a div do componente
  var molduraDiv = $c(moldura, formulario).div;               
  var altura;         
 
  CKEditor.setAttribute("id",moldura); 
  CKEditor.setAttribute("name",moldura);           
  CKEditorDiv.appendChild(CKEditor);
 
  // Ajusta o zIndex 
  CKEditorDiv.style.zIndex = 999999999;        
 
  // Limpa o conte�do da moldura
  molduraDiv.innerHTML = "";
 
  // adiciona o CKEditor na moldura
  molduraDiv.appendChild(CKEditorDiv);             
  altura = $MEx(molduraDiv).height();             
  altura = altura-124;
              
  if(!isNullOrEmpty(tools)){
   // configura��es iniciais do CKEditor
   CKEDITOR.config.scayt_autoStartup = true;
   CKEDITOR.config.disableNativeSpellChecker = false;
   // se o CKEditor ja existir, remove ele e cria novamente
   if (CKEDITOR.instances[moldura]) {
     CKEDITOR.remove(CKEDITOR.instances[moldura]);
   }
   
    CKEDITOR.replace(moldura,{height: altura, skin:'kama',uiColor:'#e6edf3', readOnly: isReadOnly, toolbar:tools});
  }else{
    if (CKEDITOR.instances[moldura]) {
      CKEDITOR.remove(CKEDITOR.instances[moldura]);
    } else {
      CKEDITOR.replace( moldura , {height: altura, skin:'kama',uiColor:'#e6edf3',readOnly: isReadOnly}  );
    }
  } 
  molduraDiv.style.zIndex = 999999999;
}

/*
* Obt�m o valor de um componente CKEditor
*/
function __mkxGetDataCKE(formulario, idCKEditor) {         
  return CKEDITOR.instances[idCKEditor].getData();
}

/*
* Altera o valor de um componente CKEditor
*/
function __mkxSetDataCKE(formulario, idCKEditor,texto) { 
  // Verifica se o CKEditor ainda n�o est� pronto
  if(!CKEDITOR || !CKEDITOR.instances || CKEDITOR.instances.length == 0) {
       // Associa um evento para que o CKEditor seja alterado quando estiver pronto
       CKEDITOR.on( 'instanceReady', function( ev )
       {                          
         CKEDITOR.instances[idCKEditor].setData(texto);      
       });
  } else {
     // Altera o CKEditor imediatamente caso ele j� esteja pronto
     CKEDITOR.instances[idCKEditor].setData(texto);
  }         
}

/*
* Cria uma grade em forma de �rvore
*/
function __mkxCreateTreeGrid(formulario, componente, titulo, listaColunas, listaDados, multiSelect, paging) {
  //importar css                                                                        
  mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
  mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");
  mkxImportCss("apimakerextreme/plugins/jq-grid/css/ui.jqgrid.css");   

  //importar javascript
  mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
  mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");
  mkxImportJs("apimakerextreme/plugins/jq-grid/js/grid.locale-pt-br.js");
  mkxImportJs("apimakerextreme/plugins/jq-grid/js/jquery.jqGrid.min.js");
  
  // Valida a restri��o de dom�nio
  getLibraries();  
    
  // Obt�m o componente  
   var component;   

   try {   
     component = $c(componente, formulario);
   } catch(ex) {}  
   
   // Caso o componente n�o seja encontrado
   var gridComp;
   if(!component) { 
     gridComp = $MEx("#" + componente);     
     if(gridComp.size() == 0) {
       throw "MEx error: Container n�o encontrado";
     }
     gridComp.attr("class","mexGrid");     
     gridComp.html("<table id=\""+ gridComp.attr("id") +"_table\" class=\"mexGridTable\"></table>");     

   } else {
     var id = component.id;   
     gridComp = $MEx(component.div);
     gridComp.attr("class","mexGrid");
     gridComp.attr("id",id);                       
     gridComp.html("<table id=\""+ id +"_table\" class=\"mexGridTable\"></table><div id=\""+ id +"_pager\"></div>");     
   }
   
   component.div.savedData = new Array();
   component.div.savedData["titulo"] = titulo;
   component.div.savedData["listaColunas"] = listaColunas;
   component.div.savedData["multiSelect"] = multiSelect;
   component.div.savedData["paging"] = paging;
   
   if(!listaColunas) throw "MEx error: A defini��o de colunas n�o foi informada";
   if(!listaDados) throw "MEx error: A fonte de dados n�o foi informada";   

   // Prepara as listas de colunas   
   var columnNames = new Array();   
   var columnModel = new Array();    
      
   // Adiciona o ID   
   // Adiciona a lista de defini��es   
   columnNames.push("ID");
   columnModel.push({     
     key: true,
     name: "id",
     width: 50, 
     align: "center", 
     sortable: "true",
     sorttype: "integer",     
     hidden: true
   });     

   for(var i = 0; i < listaColunas.length; i++) {
     // Quebra a linha em uma lista   
     var currentDef = listaColunas[i].split(";");     
     // Adiciona o nome na lista de nomes
     columnNames.push(currentDef[0]);
     // Adiciona a lista de defini��es
	 
	 
	 var columnModelObj ={     

        key: false,
        name: reduceVariable(currentDef[0]),
        width: (currentDef[1]) ? currentDef[1] : 150, 
        align: (currentDef[2]) ? currentDef[2] : "left", 
        sortable: (currentDef[3]) ? (currentDef[3] === "true") : false,
        sorttype: (currentDef[4]) ? currentDef[4] : "text"
     }
	 if(currentDef[4]=="date"){
		columnModelObj.formatter='date';
		//columnModelObj.formatoptions= {newformat:'d/m/Y'};
		columnModelObj.datefmt= 'Y-M-D';
	}
	 
     columnModel.push(columnModelObj) 
   };   
   



   //ORDENA A LISTA
   /* Ordena a lista a ajusta os n�veis */	
   function organizeTreeList(listObj) {                  
     var DadosFinal=[];
     if(listObj == null) return null;            

     // Fun��o recursiva que organiza a lista
     var _organizeChildrenList = function(listObj, objPai, nivel) {
       // Varre os elementos da lista de origem        
       for(var i = 0; i < listObj.length; i++) {            
         // Verifica se o id do pai � o que est� sendo procurado             
         if(listObj[i][1] == objPai[0]) {               
           // Obt�m o objeto atual
           var currentLine = listObj[i];           
           // Ajusta o n�vel                
           currentLine = __mkxSetElementAtList(currentLine,nivel,3);           

           // Define o elemento atual como folha
           currentLine.push(true);
           // Define que o elemento pai n�o � folha           
           objPai[objPai.length - 1] = false;
                           
           // Adiciona o elemento atual na lista final
           DadosFinal.push(currentLine);                                 
           // Procura recursivamente por filhos do elemento atual
           _organizeChildrenList(listObj,currentLine, (nivel + 1));
         }
       }
     }                                           
   
     // Inicia a busca pelos elementos sem pai com n�vel zero
     _organizeChildrenList(listObj,["",true],0);
     return DadosFinal;                          
   }
                
   var listaDados = organizeTreeList(listaDados);    

   // Prepara a lista de dados   
   var dados = new Array();   
   for(var i = 0; i < listaDados.length; i++) {
     dados[i] = {};
     dados[i]["id"] = listaDados[i][0];
     dados[i]["parent"] = (isNullOrEmpty(listaDados[i][1])) ? "null": listaDados[i][1];
     dados[i]["level"] = listaDados[i][2];
     dados[i]["isLeaf"] = listaDados[i][listaDados[i].length - 1];
     dados[i]["expanded"] = false;     
     dados[i]["loaded"] = true;
     // A posi��o de 0 a 3 s�o dados de configura��o da grade
     // o restante s�o as colunas definidas por usu�rio (da posi��o 4 para frente)    
     for(var j = 3; j < listaDados[i].length - 1; j++) {
         dados[i][reduceVariable(columnNames[j - 2]).toString()] = listaDados[i][j];
     }
   }  
         
   // Cria a grade              
   var grid = $MEx("#" + gridComp.attr("id")).find(":first-child").first();
   grid.jqGrid({        
	datatype: "jsonstring",
    datastr: dados,
   	colNames: columnNames,
   	colModel: columnModel,
	forceFit: false,
	shrinkToFit: false,
	hidegrid: false,
   	rowNum: 100000,
   	rowList:[100,500,1000,5000],
   	pager: (paging == true) ? "#" + id +"_pager" : null,   
   	sortname: 'id',   
    gridview: true,
	width: gridComp.closest(".mexGrid").width(),
	height: (gridComp.closest(".mexGrid").height() - 50),
    viewrecords: true,
    sortorder: "desc",
	caption: titulo,
    multiselect: (multiSelect == true || multiSelect === "true"),       
    treeGrid: true,
	treeGridModel: 'adjacency',
    ExpandColumn: reduceVariable(columnNames[1]),
    jsonReader: {
        repeatitems: false,
        root: function (obj) { return obj; },
        page: function () { return 1; },
        total: function () { return 1; },
        records: function (obj) { return obj.length; }
     }      
   });   
	
}

/*
* Fun��o que adiciona um objeto na liste (modificada para corrigir um BUG do Maker)
*/
function __mkxSetElementAtList() {
  var value = null;
  if (existArgs(arguments)) {
    var list = arguments[0];
    var element = arguments[1];
    var position = arguments[2];
    if (position) {
      position--;
      position = Math.max(0, position);
      position = Math.min(position, list.length);
      if (position == 0) {
        list.unshift(element);
      } else if (position == (list.length)) {
        list.push(element);
      } else {
        var arr1 = list.slice(0, (position));
        arr1.push(element);
        var arr2 = list.slice(position);
        value = new Array();
        value = value.concat(arr1);
        value = value.concat(arr2);
      }
    } else {
      list.push(element);
    }
    //value = list;
  }
  return value;
}

/*
* Faz o merge entre 2 objetos JSON
*/
function __mkxMergeJSON(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

/*
* Cria uma janela de alerta simples
*/
function __mkxSimpleAlert(titulo, mensagem) { 

  //importar css                                                                        
  mkxImportCss("apimakerextreme/plugins/jq-alerts/jquery.alerts.css");   

  //importar javascript
  mkxImportJs("apimakerextreme/plugins/jq-alerts/jquery.alerts.js");

//Chama o alerta
   jAlert(mensagem, (isNullOrEmpty(titulo)) ? "Alerta":titulo);
   
}


/*
* Cria uma janela de alerta con confirma��o
*/
function __mkxConfirmAlert(titulo, mensagem, fluxo) { 

  //importar css                                                                        
  mkxImportCss("apimakerextreme/plugins/jq-alerts/jquery.alerts.css");   

  //importar javascript
  mkxImportJs("apimakerextreme/plugins/jq-alerts/jquery.alerts.js");

//Chama o alerta
   jConfirm(mensagem, (isNullOrEmpty(titulo)) ? "Confirma��o":titulo, function(r){executeJSRuleNoField(sysCode, idForm, fluxo,[r]);});
   
}

/*
* Cria uma janela de alerta com prompt
*/
function __mkxPromptAlert(titulo, mensagem, fluxo) { 

  //importar css                                                                        
  mkxImportCss("apimakerextreme/plugins/jq-alerts/jquery.alerts.css");   

  //importar javascript
  mkxImportJs("apimakerextreme/plugins/jq-alerts/jquery.alerts.js");

//Chama o alerta
   jPrompt(mensagem, null, (isNullOrEmpty(titulo)) ? "Confirma��o":titulo, function(r){executeJSRuleNoField(sysCode, idForm, fluxo,[r]);});
   
}

/*
* Abre um formul�rio como Spin
*/
function __mkxCreateFormSpin(formularioDestino, modo, filtro, tamanho) { 

	if(!$MEx('#spinDiv_'+formularioDestino.replace("{","").replace("}","")).length){
		//Criar a url do form
		var formURL = "form.jsp?sys=" + sysCode + "&action=openform&formID="+ formularioDestino +"&align=0&mode="+(modo?modo:-1)+"&goto=-1&filter="+(filtro?filtro:"")+"&scrolling=no";
		//Concatena iframe do spin	
		var tabContentHtml = "<iframe class=\"mexFormFrame\" frameborder=\"0\" src=\""+ formURL +"\" seamless=\"seamless\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" height=\"100%\"></iframe>";
		//Cria contexto do spin
		var SpinDiv = $MEx(document.createElement("div"));      
		SpinDiv.attr('id','spinDiv_'+formularioDestino.replace("{","").replace("}",""));
		SpinDiv.append(tabContentHtml);
		$MEx('#lay').parent().append(SpinDiv);
		//Trata Tamanho
		if(!tamanho){
			tamanho=200;
		}
		$MEx('#lay').css({"border-left": "1px solid #898989"});	
		//Faz o efeito
		$MEx('#lay').animate({"left":tamanho+"px"});
		$MEx('#spinDiv').animate({"width":tamanho+"px"});  
	}	
}

/*
* Remove formul�rio do Spin
*/
function __mkxRemoveFormSpin(formularioDestino) { 
	//Remove formul�rio
	$MEx('#lay').animate({"left":"0px"},function(){  $MEx('#spinDiv_'+formularioDestino.replace("{","").replace("}","")).remove()});

}


/*
* Fun��o que cria o DashBoard
*/
function __mkxCreateDashboard(formulario, componente) {
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui.min.css");         
   mkxImportCss("apimakerextreme/commons/jquery-ui/css/jquery-ui-components.min.css");   

   // Importa os scripts    
   mkxImportJs("apimakerextreme/commons/jquery/jquery.min.js");
   mkxImportJs("apimakerextreme/commons/jquery-ui/js/jquery-ui.min.js");  
   
   ebfCSSImportContent(".portletFrame{border:0px};div.portlet{display: inline-block;margin:3px;padding:1px;float:left;height:100px}.portlet{vertical-align: top; border-radius: 0px !important;float:left; margin-right: 10px; margin-top: 10px;; overflow:hidden !important;};.portlet-minimized{height:auto!important};.portlet-header{margin:.3em;padding-bottom:4px;padding-left:.2em}.portlet-header .ui-icon{float:right}.portlet-content{padding:.4em}.portlet-minimized .portlet-content{display:none!important}.ui-sortable-placeholder{border:1px dotted black;visibility:visible!important;height:50px!important}.ui-sortable-placeholder *{visibility:hidden}")
   
   // Fun��o que valida a restri��o de dom�nio
   getLibraries();
      
   var component = $c(componente, formulario);    
   component.div.innerHTML = "";      
   component.dashboardColumn = new Array();   

   // Cria as divs das molduras
   var column = document.createElement("DIV");
   column.className = "column";
   column.id = component.id + "_column";     

   component.div.appendChild(column);     
   component.dashboardColumn = column;
}

function __mkxAddDashboardForm(formulario, componente, targetForm, filter, mode, altura, largura, rolagem) {
      
   var component = $c(componente, formulario);  
   if(rolagem){rolagem='yes';}else{rolagem='no';} 
   
   var properties = 'scroll:\''+rolagem+'\',width:\''+(largura?largura:100)+'px\',height:\''+(altura?altura:100)+'px\'';
   
   if(properties) properties = eval("[{"+ properties +"}]")[0]      

   var url = 'form.jsp?sys='+sysCode+'&formID='+targetForm+'&goto=-1&filter='+(filter?filter:'')+'&scrolling='+properties.scroll;
   var iframe = "<iframe class=\"portletFrame\" width=\"100%\" height=\"100%\" src=\""+ url +"\"></iframe>"    
   var portlet  = "<div id=\""+ formulario +"_portlet\" class=\"portlet\" style=\"width:"+properties.width+";height:"+properties.height+";\">" ;
       portlet += ((properties.title) ? "<div class=\"portlet-header\">"+properties.title+"</div>" : "");
       portlet += "<div class=\"portlet-content\">"+ iframe +"</div>";
       portlet += "</div>";        

   var columnDiv = component.dashboardColumn;    
   columnDiv.innerHTML = columnDiv.innerHTML + portlet;
   
}

function __mkxActivateDashboard(formulario, componente, fluxo, parametros) {   
  
  var component = $c(componente, formulario);
   
  $MEx(component.dashboardColumn).sortable({
    stop: function( event, ui ) {
      if(fluxo) {
         ebfFlowExecute(fluxo, parametros);
      }  
    }
  });
  $MEx(component.dashboardColumn).disableSelection();  

  
  $MEx( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-corner-all" )
    .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
    .end()
    .find( ".portlet-content" );

  $MEx( ".portlet-header .ui-icon" ).click(function() {
    
  });

  $MEx( ".column" ).disableSelection(); 
}




