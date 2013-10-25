!function(t){"use strict";function e(t){for(var e=1,i=arguments.length;i>e;++e){var n=arguments[e];for(var r in n)void 0!==n[r]&&(t[r]=n[r])}return t}function i(t){return arguments[0]=u(t),e.apply(null,arguments)}function n(t,e,i){return i instanceof Function?i.call(t,e.contexts[0]):i}function r(t,e){return t instanceof r?t.as(e):(t instanceof s||(t=new s(t,void 0,void 0,e?e["jBinary.littleEndian"]:void 0)),this instanceof r?(this.view=t,this.view.seek(0),this.contexts=[],this.as(e,!0)):new r(t,e))}function a(t){return(s=t).prototype.toBinary=function(t){return new r(this,t)},r}"atob"in t&&"btoa"in t||!function(){var e=t,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n=function(){try{document.createElement("$")}catch(t){return t}}();e.btoa||(e.btoa=function(t){for(var e,r,a=0,s=i,o="";t.charAt(0|a)||(s="=",a%1);o+=s.charAt(63&e>>8-8*(a%1))){if(r=t.charCodeAt(a+=.75),r>255)throw n;e=e<<8|r}return o}),e.atob||(e.atob=function(t){if(t=t.replace(/=+$/,""),1==t.length%4)throw n;for(var e,r,a=0,s=0,o="";r=t.charAt(s++);~r&&(e=a%4?64*e+r:r,a++%4)?o+=String.fromCharCode(255&e>>(6&-2*a)):0)r=i.indexOf(r);return o})}();var s,o="[object process]"===Object.prototype.toString.call(t.process),u=Object.create||function(t){var e=function(){};return e.prototype=t,new e},c=r.prototype;c.cacheKey="jBinary.Cache",c.id=0;var h=Object.defineProperty;if(h)try{h({},"x",{})}catch(p){h=null}h||(h=function(t,e,i,n){n&&(t[e]=i.value)}),c._getCached=function(t,e,i){if(t.hasOwnProperty(this.cacheKey))return t[this.cacheKey];var n=e.call(this,t);return h(t,this.cacheKey,{value:n},i),n},c.getContext=function(t){switch(typeof t){case"undefined":t=0;case"number":return this.contexts[t];case"string":return this.getContext(function(e){return t in e});case"function":for(var e=0,i=this.contexts.length;i>e;e++){var n=this.contexts[e];if(t.call(this,n))return n}return}},c.inContext=function(t,e){this.contexts.unshift(t);var i=e.call(this);return this.contexts.shift(),i},r.Type=function(t){return i(r.Type.prototype,t)},r.Type.prototype={inherit:function(t,e){function n(t,e){var n=a[t];n&&(r||(r=i(a)),e.call(r,n),r[t]=null)}var r,a=this;return n("params",function(e){for(var i=0,n=Math.min(e.length,t.length);n>i;i++)this[e[i]]=t[i]}),n("setParams",function(e){e.apply(this,t)}),n("typeParams",function(t){for(var i=0,n=t.length;n>i;i++){var r=t[i],a=this[r];a&&(this[r]=e(a))}}),n("resolve",function(t){t.call(this,e)}),r||a},createProperty:function(t){return i(this,{binary:t})},toValue:function(t,e){return e!==!1&&"string"==typeof t?this.binary.getContext(t)[t]:n(this,this.binary,t)}},r.Template=function(t){return i(r.Template.prototype,t,{createProperty:function(){var e=(t.createProperty||r.Template.prototype.createProperty).apply(this,arguments);return e.getBaseType&&(e.baseType=e.binary.getType(e.getBaseType(e.binary.contexts[0]))),e}})},r.Template.prototype=i(r.Type.prototype,{setParams:function(){this.baseType&&(this.typeParams=["baseType"].concat(this.typeParams||[]))},baseRead:function(){return this.binary.read(this.baseType)},baseWrite:function(t){return this.binary.write(this.baseType,t)}}),r.Template.prototype.read=r.Template.prototype.baseRead,r.Template.prototype.write=r.Template.prototype.baseWrite,c.typeSet={extend:r.Type({setParams:function(){this.parts=arguments},resolve:function(t){for(var e=this.parts,i=e.length,n=new Array(i),r=0;i>r;r++)n[r]=t(e[r]);this.parts=n},read:function(){var t=this.parts,i=this.binary.read(t[0]);return this.binary.inContext(i,function(){for(var n=1,r=t.length;r>n;n++)e(i,this.read(t[n]))}),i},write:function(t){var e=this.parts;this.binary.inContext(t,function(){for(var i=0,n=e.length;n>i;i++)this.write(e[i],t)})}}),"enum":r.Template({params:["baseType","matches"],setParams:function(t,e){this.backMatches={};for(var i in e)this.backMatches[e[i]]=i},read:function(){var t=this.baseRead();return t in this.matches?this.matches[t]:t},write:function(t){this.baseWrite(t in this.backMatches?this.backMatches[t]:t)}}),string:r.Template({params:["length","encoding"],read:function(){return this.binary.view.getString(this.toValue(this.length),void 0,this.encoding)},write:function(t){this.binary.view.writeString(t,this.encoding)}}),string0:r.Type({params:["length","encoding"],read:function(){var t=this.binary.view,e=this.length;if(void 0===e){var i,n=t.tell(),r=0;for(e=t.byteLength-n;e>r&&(i=t.getUint8());)r++;var a=t.getString(r,n,this.encoding);return e>r&&t.skip(1),a}return t.getString(e,void 0,this.encoding).replace(/\0.*$/,"")},write:function(t){var e=this.binary.view,i=void 0===this.length?1:this.length-t.length;e.writeString(t,void 0,this.encoding),i>0&&(e.writeUint8(0),e.skip(i-1))}}),array:r.Template({params:["baseType","length"],read:function(){var t=this.toValue(this.length);if(this.baseType===c.typeSet.uint8)return this.binary.view.getBytes(t,void 0,!0,!0);var e;if(void 0!==t){e=new Array(t);for(var i=0;t>i;i++)e[i]=this.baseRead()}else{var n=this.binary.view.byteLength;for(e=[];this.binary.tell()<n;)e.push(this.baseRead())}return e},write:function(t){if(this.baseType===c.typeSet.uint8)return this.binary.view.writeBytes(t);for(var e=0,i=t.length;i>e;e++)this.baseWrite(t[e])}}),object:r.Type({params:["structure","proto"],resolve:function(t){var e={};for(var i in this.structure)e[i]=this.structure[i]instanceof Function?this.structure[i]:t(this.structure[i]);this.structure=e},read:function(){var t=this,e=this.structure,n=this.proto?i(this.proto):{};return this.binary.inContext(n,function(){for(var i in e){var r=e[i]instanceof Function?e[i].call(t,this.contexts[0]):this.read(e[i]);void 0!==r&&(n[i]=r)}}),n},write:function(t){var e=this,i=this.structure;this.binary.inContext(t,function(){for(var n in i)i[n]instanceof Function?t[n]=i[n].call(e,this.contexts[0]):this.write(i[n],t[n])})}}),bitfield:r.Type({params:["bitSize"],read:function(){return this.binary.view.getUnsigned(this.bitSize)},write:function(t){this.binary.view.writeUnsigned(t,this.bitSize)}}),"if":r.Template({params:["condition","trueType","falseType"],typeParams:["trueType","falseType"],getBaseType:function(){return this.toValue(this.condition)?this.trueType:this.falseType}}),if_not:r.Template({setParams:function(t,e,i){this.baseType=["if",t,i,e]}}),"const":r.Template({params:["baseType","value","strict"],read:function(){var t=this.baseRead();if(this.strict&&t!==this.value){if(this.strict instanceof Function)return this.strict(t);throw new TypeError("Unexpected value.")}return t},write:function(t){this.baseWrite(this.strict||void 0===t?this.value:t)}}),skip:r.Type({setParams:function(t){this.read=this.write=function(){this.binary.view.skip(this.toValue(t))}}}),blob:r.Type({params:["length"],read:function(){return this.binary.view.getBytes(this.toValue(this.length))},write:function(t){this.binary.view.writeBytes(t,!0)}}),binary:r.Template({params:["length","typeSet"],read:function(){var t=this.binary.tell(),e=this.binary.skip(this.toValue(this.length)),i=this.binary.view.slice(t,e);return new r(i,this.typeSet)},write:function(t){this.binary.write("blob",t.read("blob",0))}}),lazy:r.Template({marker:"jBinary.Lazy",params:["innerType","length"],getBaseType:function(){return["binary",this.length,this.binary.typeSet]},read:function(){var t=function(i){return 0===arguments.length?"value"in t?t.value:t.value=t.binary.read(t.innerType):e(t,{wasChanged:!0,value:i}).value};return t[this.marker]=!0,e(t,{binary:e(this.baseRead(),{contexts:this.binary.contexts.slice()}),innerType:this.innerType})},write:function(t){t.wasChanged||!t[this.marker]?this.binary.write(this.innerType,t()):this.baseWrite(t.binary)}})},c.as=function(t,e){var n=e?this:i(this);return t=t||c.typeSet,n.typeSet=c.typeSet===t||c.typeSet.isPrototypeOf(t)?t:i(c.typeSet,t),n.cacheKey=c.cacheKey,n.cacheKey=n._getCached(t,function(){return c.cacheKey+"."+ ++c.id},!0),n};for(var f=["Uint8","Uint16","Uint32","Uint64","Int8","Int16","Int32","Int64","Float32","Float64","Char"],y=r.Type({params:["littleEndian"],read:function(){return this.binary.view["get"+this.dataType](void 0,this.littleEndian)},write:function(t){this.binary.view["write"+this.dataType](t,this.littleEndian)}}),l=0,d=f.length;d>l;l++){var v=f[l];c.typeSet[v.toLowerCase()]=i(y,{dataType:v})}e(c.typeSet,{"byte":c.typeSet.uint8,"float":c.typeSet.float32,"double":c.typeSet.float64}),c.toValue=function(t){return n(this,this,t)},c.seek=function(t,e){if(t=this.toValue(t),void 0!==e){var i=this.view.tell();this.view.seek(t);var n=e.call(this);return this.view.seek(i),n}return this.view.seek(t)},c.tell=function(){return this.view.tell()},c.skip=function(t,e){return this.seek(this.tell()+this.toValue(t),e)},c.getType=function(t,e){switch(typeof t){case"string":if(!(t in this.typeSet))throw new ReferenceError("Unknown type `"+t+"`");return this.getType(this.typeSet[t],e);case"number":return this.getType(c.typeSet.bitfield,[t]);case"object":if(t instanceof r.Type){var i=this;return t.inherit(e||[],function(t){return i.getType(t)})}var n=t instanceof Array;return this._getCached(t,n?function(t){return this.getType(t[0],t.slice(1))}:function(t){return this.getType(c.typeSet.object,[t])},n)}},c.createProperty=function(t){return this.getType(t).createProperty(this)},c._action=function(t,e,i){return void 0!==t?void 0!==e?this.seek(e,i):i.call(this):void 0},c.read=function(t,e){return this._action(t,e,function(){return this.createProperty(t).read(this.contexts[0])})},c.readAll=function(){return this.read("jBinary.all",0)},c.write=function(t,e,i){return this._action(t,i,function(){var i=this.tell();return this.createProperty(t).write(e,this.contexts[0]),this.tell()-i})},c.writeAll=function(t){return this.write("jBinary.all",t,0)},c._toURI="URL"in t&&"createObjectURL"in URL?function(t){var e=this.seek(0,function(){return this.view.getBytes()});return URL.createObjectURL(new Blob([e],{type:t}))}:function(t){var e=this.seek(0,function(){return this.view.getString(void 0,void 0,this.view._isNodeBuffer?"base64":"binary")});return"data:"+t+";base64,"+(this.view._isNodeBuffer?e:btoa(e))},c.toURI=function(t){return this._toURI(t||this.typeSet["jBinary.mimeType"]||"application/octet-stream")},c.slice=function(t,e,i){return new r(this.view.slice(t,e,i),this.typeSet)};var b=o&&require("stream").Readable;r.loadData=function(e,i){var n;switch(!0){case"Blob"in t&&e instanceof Blob:var r=new FileReader;return r.onload=r.onerror=function(){i(this.error,this.result)},r.readAsArrayBuffer(e),void 0;case!!b&&e instanceof b:var a=[];return e.on("readable",function(){a.push(this.read())}).on("end",function(){i(null,Buffer.concat(a))}).on("error",i),void 0;case"string"!=typeof e:return i(new TypeError("Unsupported source type."));case!!(n=e.match(/^data:(.+?)(;base64)?,(.*)$/)):try{var u=n[2],c=n[3];i(null,u&&s.prototype.compatibility.NodeBuffer?new Buffer(c,"base64"):(u?atob:decodeURIComponent)(c))}catch(h){i(h)}break;case"XMLHttpRequest"in t:var p=new XMLHttpRequest;p.open("GET",e,!0),"responseType"in p?p.responseType="arraybuffer":"overrideMimeType"in p?p.overrideMimeType("text/plain; charset=x-user-defined"):p.setRequestHeader("Accept-Charset","x-user-defined"),"onload"in p||(p.onreadystatechange=function(){4===this.readyState&&this.onload()});var f=function(t){i(new Error(t))};p.onload=function(){return 0!==this.status&&200!==this.status?f("HTTP Error #"+this.status+": "+this.statusText):("response"in this||(this.response=new VBArray(this.responseBody).toArray()),i(null,this.response),void 0)},p.onerror=function(){f("Network error.")},p.send(null);break;case!o:return i(new TypeError("Unsupported source type."));case/^(https?):\/\//.test(e):require("request").get({uri:e,encoding:null},function(t,e,n){if(!t&&200!==e.statusCode){var r=require("http").STATUS_CODES[e.statusCode];t=new Error("HTTP Error #"+e.statusCode+": "+r)}i(t,n)});break;default:require("fs").readFile(e,i)}},r.load=function(t,e,i){arguments.length<3&&(i=e,e=void 0),r.loadData(t,function(t,n){t?i(t):i(null,new r(n,e))})},"undefined"!=typeof module&&"object"==typeof module.exports?module.exports=a(require("jdataview")):"function"==typeof define&&define.amd?define(["jdataview"],a):!function(e){if("jDataView"in t)e();else{var i="jBinary_activate";t[i]=function(){try{delete t[i]}catch(n){t[i]=void 0}e()},document.write('<script src="//jdataview.github.io/dist/jdataview.js"></script><script>'+i+"()</script>")}}(function(){var e=t.jBinary;(t.jBinary=a(t.jDataView)).noConflict=function(){return t.jBinary=e,this}})}(function(){return this}());
//# sourceMappingURL=jbinary.js.map
//@ sourceMappingURL=jbinary.js.map