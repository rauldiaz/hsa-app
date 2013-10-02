!function(t){"use strict";function e(t,e){return!e&&t instanceof Array?t:Array.prototype.slice.call(t)}function i(t,e){return void 0!==t?t:e}function n(t,e,r,f){if(t instanceof n){var s=t.slice(e,e+r);return s._littleEndian=i(f,s._littleEndian),s}if(!(this instanceof n))return new n(t,e,r,f);if(this.buffer=t=n.wrapBuffer(t),this._isArrayBuffer=a.ArrayBuffer&&t instanceof ArrayBuffer,this._isPixelData=a.PixelData&&t instanceof CanvasPixelArray,this._isDataView=a.DataView&&this._isArrayBuffer,this._isNodeBuffer=a.NodeBuffer&&t instanceof Buffer,!(this._isNodeBuffer||this._isArrayBuffer||this._isPixelData||t instanceof Array))throw new TypeError("jDataView buffer has an incompatible type");this._littleEndian=!!f;var o="byteLength"in t?t.byteLength:t.length;this.byteOffset=e=i(e,0),this.byteLength=r=i(r,o-e),this._isDataView?this._view=new DataView(t,e,r):this._checkBounds(e,r,o),this._engineAction=this._isDataView?this._dataViewAction:this._isNodeBuffer?this._nodeBufferAction:this._isArrayBuffer?this._arrayBufferAction:this._arrayAction}function r(t){if(a.NodeBuffer)return new Buffer(t,"binary");for(var e=a.ArrayBuffer?Uint8Array:Array,i=new e(t.length),n=0,r=t.length;r>n;n++)i[n]=255&t.charCodeAt(n);return i}function f(t){return t>=0&&31>t?1<<t:f[t]||(f[t]=Math.pow(2,t))}function s(t,e){this.lo=t,this.hi=e}function o(){s.apply(this,arguments)}var a={NodeBuffer:"Buffer"in t&&"readInt16LE"in Buffer.prototype,DataView:"DataView"in t&&("getFloat64"in DataView.prototype||"getFloat64"in new DataView(new ArrayBuffer(1))),ArrayBuffer:"ArrayBuffer"in t,PixelData:"CanvasPixelArray"in t&&"ImageData"in t&&"document"in t};if(a.NodeBuffer&&!function(t){try{t.writeFloatLE(1/0,0)}catch(e){a.NodeBuffer=!1}}(new Buffer(4)),a.PixelData){var u=function(t,e){var i=u.context2d.createImageData((t+3)/4,1).data;if(i.byteLength=t,void 0!==e)for(var n=0;t>n;n++)i[n]=e[n];return i};u.context2d=document.createElement("canvas").getContext("2d")}var h={Int8:1,Int16:2,Int32:4,Uint8:1,Uint16:2,Uint32:4,Float32:4,Float64:8},c={Int8:"Int8",Int16:"Int16",Int32:"Int32",Uint8:"UInt8",Uint16:"UInt16",Uint32:"UInt32",Float32:"Float",Float64:"Double"};n.wrapBuffer=function(t){switch(typeof t){case"number":if(a.NodeBuffer)t=new Buffer(t),t.fill(0);else if(a.ArrayBuffer)t=new Uint8Array(t).buffer;else if(a.PixelData)t=u(t);else{t=new Array(t);for(var i=0;i<t.length;i++)t[i]=0}return t;case"string":t=r(t);default:return"length"in t&&!(a.NodeBuffer&&t instanceof Buffer||a.ArrayBuffer&&t instanceof ArrayBuffer||a.PixelData&&t instanceof CanvasPixelArray)&&(a.NodeBuffer?t=new Buffer(t):a.ArrayBuffer?t instanceof ArrayBuffer||(t=new Uint8Array(t).buffer,t instanceof ArrayBuffer||(t=new Uint8Array(e(t,!0)).buffer)):t=a.PixelData?u(t.length,t):e(t)),t}},n.createBuffer=function(){return n.wrapBuffer(arguments)},n.Uint64=s,s.prototype={valueOf:function(){return this.lo+f(32)*this.hi},toString:function(){return Number.prototype.toString.apply(this.valueOf(),arguments)}},s.fromNumber=function(t){var e=Math.floor(t/f(32)),i=t-e*f(32);return new s(i,e)},n.Int64=o,o.prototype="create"in Object?Object.create(s.prototype):new s,o.prototype.valueOf=function(){return this.hi<f(31)?s.prototype.valueOf.apply(this,arguments):-(f(32)-this.lo+f(32)*(f(32)-1-this.hi))},o.fromNumber=function(t){var e,i;if(t>=0){var n=s.fromNumber(t);e=n.lo,i=n.hi}else i=Math.floor(t/f(32)),e=t-i*f(32),i+=f(32);return new o(e,i)},n.prototype={_offset:0,_bitOffset:0,compatibility:a,_checkBounds:function(t,e,n){if("number"!=typeof t)throw new TypeError("Offset is not a number.");if("number"!=typeof e)throw new TypeError("Size is not a number.");if(0>e)throw new RangeError("Length is negative.");if(0>t||t+e>i(n,this.byteLength))throw new RangeError("Offsets are out of bounds.")},_action:function(t,e,n,r,f){return this._engineAction(t,e,i(n,this._offset),i(r,this._littleEndian),f)},_dataViewAction:function(t,e,i,n,r){return this._offset=i+h[t],e?this._view["get"+t](i,n):this._view["set"+t](i,r,n)},_nodeBufferAction:function(t,e,i,n,r){this._offset=i+h[t];var f=c[t]+("Int8"===t||"Uint8"===t?"":n?"LE":"BE");return i+=this.byteOffset,e?this.buffer["read"+f](i):this.buffer["write"+f](r,i)},_arrayBufferAction:function(e,n,r,f,s){var o,a=h[e],u=t[e+"Array"];if(f=i(f,this._littleEndian),1===a||0===(this.byteOffset+r)%a&&f)return o=new u(this.buffer,this.byteOffset+r,1),this._offset=r+a,n?o[0]:o[0]=s;var c=new Uint8Array(n?this.getBytes(a,r,f,!0):a);return o=new u(c.buffer,0,1),n?o[0]:(o[0]=s,this._setBytes(r,c,f),void 0)},_arrayAction:function(t,e,i,n,r){return e?this["_get"+t](i,n):this["_set"+t](i,r,n)},_getBytes:function(t,n,r){r=i(r,this._littleEndian),n=i(n,this._offset),t=i(t,this.byteLength-n),this._checkBounds(n,t),n+=this.byteOffset,this._offset=n-this.byteOffset+t;var f=this._isArrayBuffer?new Uint8Array(this.buffer,n,t):(this.buffer.slice||Array.prototype.slice).call(this.buffer,n,n+t);return r||1>=t?f:e(f).reverse()},getBytes:function(t,n,r,f){var s=this._getBytes(t,n,i(r,!0));return f?e(s):s},_setBytes:function(t,n,r){var f=n.length;if(0!==f){if(r=i(r,this._littleEndian),t=i(t,this._offset),this._checkBounds(t,f),!r&&f>1&&(n=e(n,!0).reverse()),t+=this.byteOffset,this._isArrayBuffer)new Uint8Array(this.buffer,t,f).set(n);else if(this._isNodeBuffer)(n instanceof Buffer?n:new Buffer(n)).copy(this.buffer,t);else for(var s=0;f>s;s++)this.buffer[t+s]=n[s];this._offset=t-this.byteOffset+f}},setBytes:function(t,e,n){this._setBytes(t,e,i(n,!0))},getString:function(t,e,n){if(this._isNodeBuffer)return e=i(e,this._offset),t=i(t,this.byteLength-e),this._checkBounds(e,t),this._offset=e+t,this.buffer.toString(n||"binary",this.byteOffset+e,this.byteOffset+this._offset);var r=this._getBytes(t,e,!0),f="";t=r.length;for(var s=0;t>s;s++)f+=String.fromCharCode(r[s]);return"utf8"===n&&(f=decodeURIComponent(escape(f))),f},setString:function(t,e,n){return this._isNodeBuffer?(t=i(t,this._offset),this._checkBounds(t,e.length),this._offset=t+this.buffer.write(e,this.byteOffset+t,n||"binary"),void 0):("utf8"===n&&(e=unescape(encodeURIComponent(e))),this._setBytes(t,r(e),!0),void 0)},getChar:function(t){return this.getString(1,t)},setChar:function(t,e){this.setString(t,e)},tell:function(){return this._offset},seek:function(t){return this._checkBounds(t,0),this._offset=t},skip:function(t){return this.seek(this._offset+t)},slice:function(t,e,r){function f(t,e){return 0>t?t+e:t}return t=f(t,this.byteLength),e=f(i(e,this.byteLength),this.byteLength),r?new n(this.getBytes(e-t,t,!0,!0),void 0,void 0,this._littleEndian):new n(this.buffer,this.byteOffset+t,e-t,this._littleEndian)},_getFloat64:function(t,e){var i=this._getBytes(8,t,e),n=1-2*(i[7]>>7),r=((255&i[7]<<1)<<3|i[6]>>4)-1023,s=(15&i[6])*f(48)+i[5]*f(40)+i[4]*f(32)+i[3]*f(24)+i[2]*f(16)+i[1]*f(8)+i[0];return 1024===r?0!==s?0/0:1/0*n:-1023===r?n*s*f(-1074):n*(1+s*f(-52))*f(r)},_getFloat32:function(t,e){var i=this._getBytes(4,t,e),n=1-2*(i[3]>>7),r=(255&i[3]<<1|i[2]>>7)-127,s=(127&i[2])<<16|i[1]<<8|i[0];return 128===r?0!==s?0/0:1/0*n:-127===r?n*s*f(-149):n*(1+s*f(-23))*f(r)},_get64:function(t,e,n){n=i(n,this._littleEndian),e=i(e,this._offset);for(var r=n?[0,4]:[4,0],f=0;2>f;f++)r[f]=this.getUint32(e+r[f],n);return this._offset=e+8,new t(r[0],r[1])},getInt64:function(t,e){return this._get64(o,t,e)},getUint64:function(t,e){return this._get64(s,t,e)},_getInt32:function(t,e){var i=this._getBytes(4,t,e);return i[3]<<24|i[2]<<16|i[1]<<8|i[0]},_getUint32:function(t,e){return this._getInt32(t,e)>>>0},_getInt16:function(t,e){return this._getUint16(t,e)<<16>>16},_getUint16:function(t,e){var i=this._getBytes(2,t,e);return i[1]<<8|i[0]},_getInt8:function(t){return this._getUint8(t)<<24>>24},_getUint8:function(t){return this._getBytes(1,t)[0]},_getBitRangeData:function(t,e){var n=(i(e,this._offset)<<3)+this._bitOffset,r=n+t,f=n>>>3,s=r+7>>>3,o=this._getBytes(s-f,f,!0),a=0;(this._bitOffset=7&r)&&(this._bitOffset-=8);for(var u=0,h=o.length;h>u;u++)a=a<<8|o[u];return{start:f,bytes:o,wideValue:a}},getSigned:function(t,e){var i=32-t;return this.getUnsigned(t,e)<<i>>i},getUnsigned:function(t,e){var i=this._getBitRangeData(t,e).wideValue>>>-this._bitOffset;return 32>t?i&~(-1<<t):i},_setBinaryFloat:function(t,e,i,n,r){var s,o,a=0>e?1:0,u=~(-1<<n-1),h=1-u;0>e&&(e=-e),0===e?(s=0,o=0):isNaN(e)?(s=2*u+1,o=1):1/0===e?(s=2*u+1,o=0):(s=Math.floor(Math.log(e)/Math.LN2),s>=h&&u>=s?(o=Math.floor((e*f(-s)-1)*f(i)),s+=u):(o=Math.floor(e/f(h-i)),s=0));for(var c=[];i>=8;)c.push(o%256),o=Math.floor(o/256),i-=8;for(s=s<<i|o,n+=i;n>=8;)c.push(255&s),s>>>=8,n-=8;c.push(a<<n|s),this._setBytes(t,c,r)},_setFloat32:function(t,e,i){this._setBinaryFloat(t,e,23,8,i)},_setFloat64:function(t,e,i){this._setBinaryFloat(t,e,52,11,i)},_set64:function(t,e,n,r){n instanceof t||(n=t.fromNumber(n)),r=i(r,this._littleEndian),e=i(e,this._offset);var f=r?{lo:0,hi:4}:{lo:4,hi:0};for(var s in f)this.setUint32(e+f[s],n[s],r);this._offset=e+8},setInt64:function(t,e,i){this._set64(o,t,e,i)},setUint64:function(t,e,i){this._set64(s,t,e,i)},_setUint32:function(t,e,i){this._setBytes(t,[255&e,255&e>>>8,255&e>>>16,e>>>24],i)},_setUint16:function(t,e,i){this._setBytes(t,[255&e,255&e>>>8],i)},_setUint8:function(t,e){this._setBytes(t,[255&e])},setUnsigned:function(t,e,i){var n=this._getBitRangeData(i,t),r=n.wideValue,f=n.bytes;r&=~(~(-1<<i)<<-this._bitOffset),r|=(32>i?e&~(-1<<i):e)<<-this._bitOffset;for(var s=f.length-1;s>=0;s--)f[s]=255&r,r>>>=8;this._setBytes(n.start,f,!0)}};var _=n.prototype;for(var y in h)!function(t){_["get"+t]=function(e,i){return this._action(t,!0,e,i)},_["set"+t]=function(e,i,n){this._action(t,!1,e,n,i)}}(y);_._setInt32=_._setUint32,_._setInt16=_._setUint16,_._setInt8=_._setUint8,_.setSigned=_.setUnsigned;for(var l in _)"set"===l.slice(0,3)&&!function(t){_["write"+t]=function(){Array.prototype.unshift.call(arguments,void 0),this["set"+t].apply(this,arguments)}}(l.slice(3));if("undefined"!=typeof module&&"object"==typeof module.exports)module.exports=n;else if("function"==typeof define&&define.amd)define([],function(){return n});else{var g=t.jDataView;(t.jDataView=n).noConflict=function(){return t.jDataView=g,this}}}(function(){return this}());
//# sourceMappingURL=jdataview.js.map
//@ sourceMappingURL=jdataview.js.map