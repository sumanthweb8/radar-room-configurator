(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Hv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Om={exports:{}},ql={},km={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qo=Symbol.for("react.element"),Vv=Symbol.for("react.portal"),Gv=Symbol.for("react.fragment"),Wv=Symbol.for("react.strict_mode"),jv=Symbol.for("react.profiler"),Xv=Symbol.for("react.provider"),Yv=Symbol.for("react.context"),$v=Symbol.for("react.forward_ref"),qv=Symbol.for("react.suspense"),Kv=Symbol.for("react.memo"),Zv=Symbol.for("react.lazy"),Wf=Symbol.iterator;function Jv(t){return t===null||typeof t!="object"?null:(t=Wf&&t[Wf]||t["@@iterator"],typeof t=="function"?t:null)}var zm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bm=Object.assign,Hm={};function Ys(t,e,n){this.props=t,this.context=e,this.refs=Hm,this.updater=n||zm}Ys.prototype.isReactComponent={};Ys.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ys.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Vm(){}Vm.prototype=Ys.prototype;function Fd(t,e,n){this.props=t,this.context=e,this.refs=Hm,this.updater=n||zm}var Od=Fd.prototype=new Vm;Od.constructor=Fd;Bm(Od,Ys.prototype);Od.isPureReactComponent=!0;var jf=Array.isArray,Gm=Object.prototype.hasOwnProperty,kd={current:null},Wm={key:!0,ref:!0,__self:!0,__source:!0};function jm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Gm.call(e,i)&&!Wm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Qo,type:t,key:s,ref:o,props:r,_owner:kd.current}}function Qv(t,e){return{$$typeof:Qo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function zd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Qo}function ex(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Xf=/\/+/g;function yc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ex(""+t.key):e.toString(36)}function Qa(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Qo:case Vv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+yc(o,0):i,jf(r)?(n="",t!=null&&(n=t.replace(Xf,"$&/")+"/"),Qa(r,e,n,"",function(c){return c})):r!=null&&(zd(r)&&(r=Qv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Xf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",jf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+yc(s,a);o+=Qa(s,e,n,l,r)}else if(l=Jv(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+yc(s,a++),o+=Qa(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function la(t,e,n){if(t==null)return t;var i=[],r=0;return Qa(t,i,"","",function(s){return e.call(n,s,r++)}),i}function tx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var sn={current:null},el={transition:null},nx={ReactCurrentDispatcher:sn,ReactCurrentBatchConfig:el,ReactCurrentOwner:kd};function Xm(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:la,forEach:function(t,e,n){la(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return la(t,function(){e++}),e},toArray:function(t){return la(t,function(e){return e})||[]},only:function(t){if(!zd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=Ys;Ke.Fragment=Gv;Ke.Profiler=jv;Ke.PureComponent=Fd;Ke.StrictMode=Wv;Ke.Suspense=qv;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nx;Ke.act=Xm;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Bm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=kd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Gm.call(e,l)&&!Wm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Qo,type:t.type,key:r,ref:s,props:i,_owner:o}};Ke.createContext=function(t){return t={$$typeof:Yv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Xv,_context:t},t.Consumer=t};Ke.createElement=jm;Ke.createFactory=function(t){var e=jm.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:$v,render:t}};Ke.isValidElement=zd;Ke.lazy=function(t){return{$$typeof:Zv,_payload:{_status:-1,_result:t},_init:tx}};Ke.memo=function(t,e){return{$$typeof:Kv,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=el.transition;el.transition={};try{t()}finally{el.transition=e}};Ke.unstable_act=Xm;Ke.useCallback=function(t,e){return sn.current.useCallback(t,e)};Ke.useContext=function(t){return sn.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return sn.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return sn.current.useEffect(t,e)};Ke.useId=function(){return sn.current.useId()};Ke.useImperativeHandle=function(t,e,n){return sn.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return sn.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return sn.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return sn.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return sn.current.useReducer(t,e,n)};Ke.useRef=function(t){return sn.current.useRef(t)};Ke.useState=function(t){return sn.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return sn.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return sn.current.useTransition()};Ke.version="18.3.1";km.exports=Ke;var Je=km.exports;const ix=Hv(Je);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rx=Je,sx=Symbol.for("react.element"),ox=Symbol.for("react.fragment"),ax=Object.prototype.hasOwnProperty,lx=rx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,cx={key:!0,ref:!0,__self:!0,__source:!0};function Ym(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)ax.call(e,i)&&!cx.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:sx,type:t,key:s,ref:o,props:r,_owner:lx.current}}ql.Fragment=ox;ql.jsx=Ym;ql.jsxs=Ym;Om.exports=ql;var M=Om.exports,Iu={},$m={exports:{}},Tn={},qm={exports:{}},Km={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,B){var k=U.length;U.push(B);e:for(;0<k;){var P=k-1>>>1,X=U[P];if(0<r(X,B))U[P]=B,U[k]=X,k=P;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var B=U[0],k=U.pop();if(k!==B){U[0]=k;e:for(var P=0,X=U.length,ne=X>>>1;P<ne;){var z=2*(P+1)-1,q=U[z],ie=z+1,re=U[ie];if(0>r(q,k))ie<X&&0>r(re,q)?(U[P]=re,U[ie]=k,P=ie):(U[P]=q,U[z]=k,P=z);else if(ie<X&&0>r(re,k))U[P]=re,U[ie]=k,P=ie;else break e}}return B}function r(U,B){var k=U.sortIndex-B.sortIndex;return k!==0?k:U.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],f=1,h=null,d=3,p=!1,v=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(U){for(var B=n(c);B!==null;){if(B.callback===null)i(c);else if(B.startTime<=U)i(c),B.sortIndex=B.expirationTime,e(l,B);else break;B=n(c)}}function y(U){if(_=!1,g(U),!v)if(n(l)!==null)v=!0,V(b);else{var B=n(c);B!==null&&Z(y,B.startTime-U)}}function b(U,B){v=!1,_&&(_=!1,u(N),N=-1),p=!0;var k=d;try{for(g(B),h=n(l);h!==null&&(!(h.expirationTime>B)||U&&!L());){var P=h.callback;if(typeof P=="function"){h.callback=null,d=h.priorityLevel;var X=P(h.expirationTime<=B);B=t.unstable_now(),typeof X=="function"?h.callback=X:h===n(l)&&i(l),g(B)}else i(l);h=n(l)}if(h!==null)var ne=!0;else{var z=n(c);z!==null&&Z(y,z.startTime-B),ne=!1}return ne}finally{h=null,d=k,p=!1}}var T=!1,C=null,N=-1,A=5,E=-1;function L(){return!(t.unstable_now()-E<A)}function O(){if(C!==null){var U=t.unstable_now();E=U;var B=!0;try{B=C(!0,U)}finally{B?I():(T=!1,C=null)}}else T=!1}var I;if(typeof x=="function")I=function(){x(O)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,W=G.port2;G.port1.onmessage=O,I=function(){W.postMessage(null)}}else I=function(){m(O,0)};function V(U){C=U,T||(T=!0,I())}function Z(U,B){N=m(function(){U(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,V(b))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(d){case 1:case 2:case 3:var B=3;break;default:B=d}var k=d;d=B;try{return U()}finally{d=k}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,B){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var k=d;d=U;try{return B()}finally{d=k}},t.unstable_scheduleCallback=function(U,B,k){var P=t.unstable_now();switch(typeof k=="object"&&k!==null?(k=k.delay,k=typeof k=="number"&&0<k?P+k:P):k=P,U){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=k+X,U={id:f++,callback:B,priorityLevel:U,startTime:k,expirationTime:X,sortIndex:-1},k>P?(U.sortIndex=k,e(c,U),n(l)===null&&U===n(c)&&(_?(u(N),N=-1):_=!0,Z(y,k-P))):(U.sortIndex=X,e(l,U),v||p||(v=!0,V(b))),U},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(U){var B=d;return function(){var k=d;d=B;try{return U.apply(this,arguments)}finally{d=k}}}})(Km);qm.exports=Km;var ux=qm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dx=Je,wn=ux;function ue(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zm=new Set,Io={};function Br(t,e){Ns(t,e),Ns(t+"Capture",e)}function Ns(t,e){for(Io[t]=e,t=0;t<e.length;t++)Zm.add(e[t])}var Si=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Nu=Object.prototype.hasOwnProperty,fx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Yf={},$f={};function hx(t){return Nu.call($f,t)?!0:Nu.call(Yf,t)?!1:fx.test(t)?$f[t]=!0:(Yf[t]=!0,!1)}function px(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function mx(t,e,n,i){if(e===null||typeof e>"u"||px(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function on(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var jt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){jt[t]=new on(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];jt[e]=new on(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){jt[t]=new on(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){jt[t]=new on(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){jt[t]=new on(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){jt[t]=new on(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){jt[t]=new on(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){jt[t]=new on(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){jt[t]=new on(t,5,!1,t.toLowerCase(),null,!1,!1)});var Bd=/[\-:]([a-z])/g;function Hd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Bd,Hd);jt[e]=new on(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Bd,Hd);jt[e]=new on(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Bd,Hd);jt[e]=new on(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){jt[t]=new on(t,1,!1,t.toLowerCase(),null,!1,!1)});jt.xlinkHref=new on("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){jt[t]=new on(t,1,!1,t.toLowerCase(),null,!0,!0)});function Vd(t,e,n,i){var r=jt.hasOwnProperty(e)?jt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(mx(e,n,r,i)&&(n=null),i||r===null?hx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ti=dx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ca=Symbol.for("react.element"),us=Symbol.for("react.portal"),ds=Symbol.for("react.fragment"),Gd=Symbol.for("react.strict_mode"),Uu=Symbol.for("react.profiler"),Jm=Symbol.for("react.provider"),Qm=Symbol.for("react.context"),Wd=Symbol.for("react.forward_ref"),Fu=Symbol.for("react.suspense"),Ou=Symbol.for("react.suspense_list"),jd=Symbol.for("react.memo"),Ui=Symbol.for("react.lazy"),eg=Symbol.for("react.offscreen"),qf=Symbol.iterator;function Qs(t){return t===null||typeof t!="object"?null:(t=qf&&t[qf]||t["@@iterator"],typeof t=="function"?t:null)}var yt=Object.assign,Sc;function go(t){if(Sc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Sc=e&&e[1]||""}return`
`+Sc+t}var Mc=!1;function Ec(t,e){if(!t||Mc)return"";Mc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Mc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?go(t):""}function gx(t){switch(t.tag){case 5:return go(t.type);case 16:return go("Lazy");case 13:return go("Suspense");case 19:return go("SuspenseList");case 0:case 2:case 15:return t=Ec(t.type,!1),t;case 11:return t=Ec(t.type.render,!1),t;case 1:return t=Ec(t.type,!0),t;default:return""}}function ku(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ds:return"Fragment";case us:return"Portal";case Uu:return"Profiler";case Gd:return"StrictMode";case Fu:return"Suspense";case Ou:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Qm:return(t.displayName||"Context")+".Consumer";case Jm:return(t._context.displayName||"Context")+".Provider";case Wd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case jd:return e=t.displayName||null,e!==null?e:ku(t.type)||"Memo";case Ui:e=t._payload,t=t._init;try{return ku(t(e))}catch{}}return null}function vx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ku(e);case 8:return e===Gd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function er(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function tg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function xx(t){var e=tg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ua(t){t._valueTracker||(t._valueTracker=xx(t))}function ng(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=tg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function pl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function zu(t,e){var n=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Kf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=er(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function ig(t,e){e=e.checked,e!=null&&Vd(t,"checked",e,!1)}function Bu(t,e){ig(t,e);var n=er(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Hu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Hu(t,e.type,er(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Zf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Hu(t,e,n){(e!=="number"||pl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var vo=Array.isArray;function ws(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+er(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Vu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ue(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ue(92));if(vo(n)){if(1<n.length)throw Error(ue(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:er(n)}}function rg(t,e){var n=er(e.value),i=er(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Qf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function sg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Gu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?sg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var da,og=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(da=da||document.createElement("div"),da.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=da.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function No(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var So={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_x=["Webkit","ms","Moz","O"];Object.keys(So).forEach(function(t){_x.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),So[e]=So[t]})});function ag(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||So.hasOwnProperty(t)&&So[t]?(""+e).trim():e+"px"}function lg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=ag(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var yx=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Wu(t,e){if(e){if(yx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ue(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ue(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ue(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ue(62))}}function ju(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xu=null;function Xd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Yu=null,Ts=null,As=null;function eh(t){if(t=na(t)){if(typeof Yu!="function")throw Error(ue(280));var e=t.stateNode;e&&(e=ec(e),Yu(t.stateNode,t.type,e))}}function cg(t){Ts?As?As.push(t):As=[t]:Ts=t}function ug(){if(Ts){var t=Ts,e=As;if(As=Ts=null,eh(t),e)for(t=0;t<e.length;t++)eh(e[t])}}function dg(t,e){return t(e)}function fg(){}var wc=!1;function hg(t,e,n){if(wc)return t(e,n);wc=!0;try{return dg(t,e,n)}finally{wc=!1,(Ts!==null||As!==null)&&(fg(),ug())}}function Uo(t,e){var n=t.stateNode;if(n===null)return null;var i=ec(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ue(231,e,typeof n));return n}var $u=!1;if(Si)try{var eo={};Object.defineProperty(eo,"passive",{get:function(){$u=!0}}),window.addEventListener("test",eo,eo),window.removeEventListener("test",eo,eo)}catch{$u=!1}function Sx(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var Mo=!1,ml=null,gl=!1,qu=null,Mx={onError:function(t){Mo=!0,ml=t}};function Ex(t,e,n,i,r,s,o,a,l){Mo=!1,ml=null,Sx.apply(Mx,arguments)}function wx(t,e,n,i,r,s,o,a,l){if(Ex.apply(this,arguments),Mo){if(Mo){var c=ml;Mo=!1,ml=null}else throw Error(ue(198));gl||(gl=!0,qu=c)}}function Hr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function pg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function th(t){if(Hr(t)!==t)throw Error(ue(188))}function Tx(t){var e=t.alternate;if(!e){if(e=Hr(t),e===null)throw Error(ue(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return th(r),t;if(s===i)return th(r),e;s=s.sibling}throw Error(ue(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ue(189))}}if(n.alternate!==i)throw Error(ue(190))}if(n.tag!==3)throw Error(ue(188));return n.stateNode.current===n?t:e}function mg(t){return t=Tx(t),t!==null?gg(t):null}function gg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=gg(t);if(e!==null)return e;t=t.sibling}return null}var vg=wn.unstable_scheduleCallback,nh=wn.unstable_cancelCallback,Ax=wn.unstable_shouldYield,bx=wn.unstable_requestPaint,Tt=wn.unstable_now,Cx=wn.unstable_getCurrentPriorityLevel,Yd=wn.unstable_ImmediatePriority,xg=wn.unstable_UserBlockingPriority,vl=wn.unstable_NormalPriority,Rx=wn.unstable_LowPriority,_g=wn.unstable_IdlePriority,Kl=null,ri=null;function Px(t){if(ri&&typeof ri.onCommitFiberRoot=="function")try{ri.onCommitFiberRoot(Kl,t,void 0,(t.current.flags&128)===128)}catch{}}var Xn=Math.clz32?Math.clz32:Ix,Lx=Math.log,Dx=Math.LN2;function Ix(t){return t>>>=0,t===0?32:31-(Lx(t)/Dx|0)|0}var fa=64,ha=4194304;function xo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function xl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=xo(a):(s&=o,s!==0&&(i=xo(s)))}else o=n&~r,o!==0?i=xo(o):s!==0&&(i=xo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Xn(e),r=1<<n,i|=t[n],e&=~r;return i}function Nx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ux(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Xn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Nx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Ku(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function yg(){var t=fa;return fa<<=1,!(fa&4194240)&&(fa=64),t}function Tc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ea(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Xn(e),t[e]=n}function Fx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Xn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function $d(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Xn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var rt=0;function Sg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Mg,qd,Eg,wg,Tg,Zu=!1,pa=[],Wi=null,ji=null,Xi=null,Fo=new Map,Oo=new Map,ki=[],Ox="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ih(t,e){switch(t){case"focusin":case"focusout":Wi=null;break;case"dragenter":case"dragleave":ji=null;break;case"mouseover":case"mouseout":Xi=null;break;case"pointerover":case"pointerout":Fo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oo.delete(e.pointerId)}}function to(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=na(e),e!==null&&qd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function kx(t,e,n,i,r){switch(e){case"focusin":return Wi=to(Wi,t,e,n,i,r),!0;case"dragenter":return ji=to(ji,t,e,n,i,r),!0;case"mouseover":return Xi=to(Xi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Fo.set(s,to(Fo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Oo.set(s,to(Oo.get(s)||null,t,e,n,i,r)),!0}return!1}function Ag(t){var e=Tr(t.target);if(e!==null){var n=Hr(e);if(n!==null){if(e=n.tag,e===13){if(e=pg(n),e!==null){t.blockedOn=e,Tg(t.priority,function(){Eg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function tl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ju(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Xu=i,n.target.dispatchEvent(i),Xu=null}else return e=na(n),e!==null&&qd(e),t.blockedOn=n,!1;e.shift()}return!0}function rh(t,e,n){tl(t)&&n.delete(e)}function zx(){Zu=!1,Wi!==null&&tl(Wi)&&(Wi=null),ji!==null&&tl(ji)&&(ji=null),Xi!==null&&tl(Xi)&&(Xi=null),Fo.forEach(rh),Oo.forEach(rh)}function no(t,e){t.blockedOn===e&&(t.blockedOn=null,Zu||(Zu=!0,wn.unstable_scheduleCallback(wn.unstable_NormalPriority,zx)))}function ko(t){function e(r){return no(r,t)}if(0<pa.length){no(pa[0],t);for(var n=1;n<pa.length;n++){var i=pa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Wi!==null&&no(Wi,t),ji!==null&&no(ji,t),Xi!==null&&no(Xi,t),Fo.forEach(e),Oo.forEach(e),n=0;n<ki.length;n++)i=ki[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ki.length&&(n=ki[0],n.blockedOn===null);)Ag(n),n.blockedOn===null&&ki.shift()}var bs=Ti.ReactCurrentBatchConfig,_l=!0;function Bx(t,e,n,i){var r=rt,s=bs.transition;bs.transition=null;try{rt=1,Kd(t,e,n,i)}finally{rt=r,bs.transition=s}}function Hx(t,e,n,i){var r=rt,s=bs.transition;bs.transition=null;try{rt=4,Kd(t,e,n,i)}finally{rt=r,bs.transition=s}}function Kd(t,e,n,i){if(_l){var r=Ju(t,e,n,i);if(r===null)Uc(t,e,i,yl,n),ih(t,i);else if(kx(r,t,e,n,i))i.stopPropagation();else if(ih(t,i),e&4&&-1<Ox.indexOf(t)){for(;r!==null;){var s=na(r);if(s!==null&&Mg(s),s=Ju(t,e,n,i),s===null&&Uc(t,e,i,yl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Uc(t,e,i,null,n)}}var yl=null;function Ju(t,e,n,i){if(yl=null,t=Xd(i),t=Tr(t),t!==null)if(e=Hr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=pg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return yl=t,null}function bg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Cx()){case Yd:return 1;case xg:return 4;case vl:case Rx:return 16;case _g:return 536870912;default:return 16}default:return 16}}var Hi=null,Zd=null,nl=null;function Cg(){if(nl)return nl;var t,e=Zd,n=e.length,i,r="value"in Hi?Hi.value:Hi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return nl=r.slice(t,1<i?1-i:void 0)}function il(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ma(){return!0}function sh(){return!1}function An(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ma:sh,this.isPropagationStopped=sh,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ma)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ma)},persist:function(){},isPersistent:ma}),e}var $s={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jd=An($s),ta=yt({},$s,{view:0,detail:0}),Vx=An(ta),Ac,bc,io,Zl=yt({},ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==io&&(io&&t.type==="mousemove"?(Ac=t.screenX-io.screenX,bc=t.screenY-io.screenY):bc=Ac=0,io=t),Ac)},movementY:function(t){return"movementY"in t?t.movementY:bc}}),oh=An(Zl),Gx=yt({},Zl,{dataTransfer:0}),Wx=An(Gx),jx=yt({},ta,{relatedTarget:0}),Cc=An(jx),Xx=yt({},$s,{animationName:0,elapsedTime:0,pseudoElement:0}),Yx=An(Xx),$x=yt({},$s,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),qx=An($x),Kx=yt({},$s,{data:0}),ah=An(Kx),Zx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Jx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function e_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Qx[t])?!!e[t]:!1}function Qd(){return e_}var t_=yt({},ta,{key:function(t){if(t.key){var e=Zx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=il(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Jx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qd,charCode:function(t){return t.type==="keypress"?il(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?il(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),n_=An(t_),i_=yt({},Zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lh=An(i_),r_=yt({},ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qd}),s_=An(r_),o_=yt({},$s,{propertyName:0,elapsedTime:0,pseudoElement:0}),a_=An(o_),l_=yt({},Zl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),c_=An(l_),u_=[9,13,27,32],ef=Si&&"CompositionEvent"in window,Eo=null;Si&&"documentMode"in document&&(Eo=document.documentMode);var d_=Si&&"TextEvent"in window&&!Eo,Rg=Si&&(!ef||Eo&&8<Eo&&11>=Eo),ch=" ",uh=!1;function Pg(t,e){switch(t){case"keyup":return u_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var fs=!1;function f_(t,e){switch(t){case"compositionend":return Lg(e);case"keypress":return e.which!==32?null:(uh=!0,ch);case"textInput":return t=e.data,t===ch&&uh?null:t;default:return null}}function h_(t,e){if(fs)return t==="compositionend"||!ef&&Pg(t,e)?(t=Cg(),nl=Zd=Hi=null,fs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Rg&&e.locale!=="ko"?null:e.data;default:return null}}var p_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!p_[t.type]:e==="textarea"}function Dg(t,e,n,i){cg(i),e=Sl(e,"onChange"),0<e.length&&(n=new Jd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var wo=null,zo=null;function m_(t){Gg(t,0)}function Jl(t){var e=ms(t);if(ng(e))return t}function g_(t,e){if(t==="change")return e}var Ig=!1;if(Si){var Rc;if(Si){var Pc="oninput"in document;if(!Pc){var fh=document.createElement("div");fh.setAttribute("oninput","return;"),Pc=typeof fh.oninput=="function"}Rc=Pc}else Rc=!1;Ig=Rc&&(!document.documentMode||9<document.documentMode)}function hh(){wo&&(wo.detachEvent("onpropertychange",Ng),zo=wo=null)}function Ng(t){if(t.propertyName==="value"&&Jl(zo)){var e=[];Dg(e,zo,t,Xd(t)),hg(m_,e)}}function v_(t,e,n){t==="focusin"?(hh(),wo=e,zo=n,wo.attachEvent("onpropertychange",Ng)):t==="focusout"&&hh()}function x_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Jl(zo)}function __(t,e){if(t==="click")return Jl(e)}function y_(t,e){if(t==="input"||t==="change")return Jl(e)}function S_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var qn=typeof Object.is=="function"?Object.is:S_;function Bo(t,e){if(qn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Nu.call(e,r)||!qn(t[r],e[r]))return!1}return!0}function ph(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function mh(t,e){var n=ph(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ph(n)}}function Ug(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ug(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fg(){for(var t=window,e=pl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=pl(t.document)}return e}function tf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function M_(t){var e=Fg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Ug(n.ownerDocument.documentElement,n)){if(i!==null&&tf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=mh(n,s);var o=mh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var E_=Si&&"documentMode"in document&&11>=document.documentMode,hs=null,Qu=null,To=null,ed=!1;function gh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ed||hs==null||hs!==pl(i)||(i=hs,"selectionStart"in i&&tf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),To&&Bo(To,i)||(To=i,i=Sl(Qu,"onSelect"),0<i.length&&(e=new Jd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=hs)))}function ga(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ps={animationend:ga("Animation","AnimationEnd"),animationiteration:ga("Animation","AnimationIteration"),animationstart:ga("Animation","AnimationStart"),transitionend:ga("Transition","TransitionEnd")},Lc={},Og={};Si&&(Og=document.createElement("div").style,"AnimationEvent"in window||(delete ps.animationend.animation,delete ps.animationiteration.animation,delete ps.animationstart.animation),"TransitionEvent"in window||delete ps.transitionend.transition);function Ql(t){if(Lc[t])return Lc[t];if(!ps[t])return t;var e=ps[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Og)return Lc[t]=e[n];return t}var kg=Ql("animationend"),zg=Ql("animationiteration"),Bg=Ql("animationstart"),Hg=Ql("transitionend"),Vg=new Map,vh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function or(t,e){Vg.set(t,e),Br(e,[t])}for(var Dc=0;Dc<vh.length;Dc++){var Ic=vh[Dc],w_=Ic.toLowerCase(),T_=Ic[0].toUpperCase()+Ic.slice(1);or(w_,"on"+T_)}or(kg,"onAnimationEnd");or(zg,"onAnimationIteration");or(Bg,"onAnimationStart");or("dblclick","onDoubleClick");or("focusin","onFocus");or("focusout","onBlur");or(Hg,"onTransitionEnd");Ns("onMouseEnter",["mouseout","mouseover"]);Ns("onMouseLeave",["mouseout","mouseover"]);Ns("onPointerEnter",["pointerout","pointerover"]);Ns("onPointerLeave",["pointerout","pointerover"]);Br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Br("onBeforeInput",["compositionend","keypress","textInput","paste"]);Br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),A_=new Set("cancel close invalid load scroll toggle".split(" ").concat(_o));function xh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,wx(i,e,void 0,t),t.currentTarget=null}function Gg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;xh(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;xh(r,a,c),s=l}}}if(gl)throw t=qu,gl=!1,qu=null,t}function ut(t,e){var n=e[sd];n===void 0&&(n=e[sd]=new Set);var i=t+"__bubble";n.has(i)||(Wg(e,t,2,!1),n.add(i))}function Nc(t,e,n){var i=0;e&&(i|=4),Wg(n,t,i,e)}var va="_reactListening"+Math.random().toString(36).slice(2);function Ho(t){if(!t[va]){t[va]=!0,Zm.forEach(function(n){n!=="selectionchange"&&(A_.has(n)||Nc(n,!1,t),Nc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[va]||(e[va]=!0,Nc("selectionchange",!1,e))}}function Wg(t,e,n,i){switch(bg(e)){case 1:var r=Bx;break;case 4:r=Hx;break;default:r=Kd}n=r.bind(null,e,n,t),r=void 0,!$u||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Uc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Tr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}hg(function(){var c=s,f=Xd(n),h=[];e:{var d=Vg.get(t);if(d!==void 0){var p=Jd,v=t;switch(t){case"keypress":if(il(n)===0)break e;case"keydown":case"keyup":p=n_;break;case"focusin":v="focus",p=Cc;break;case"focusout":v="blur",p=Cc;break;case"beforeblur":case"afterblur":p=Cc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=oh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Wx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=s_;break;case kg:case zg:case Bg:p=Yx;break;case Hg:p=a_;break;case"scroll":p=Vx;break;case"wheel":p=c_;break;case"copy":case"cut":case"paste":p=qx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=lh}var _=(e&4)!==0,m=!_&&t==="scroll",u=_?d!==null?d+"Capture":null:d;_=[];for(var x=c,g;x!==null;){g=x;var y=g.stateNode;if(g.tag===5&&y!==null&&(g=y,u!==null&&(y=Uo(x,u),y!=null&&_.push(Vo(x,y,g)))),m)break;x=x.return}0<_.length&&(d=new p(d,v,null,n,f),h.push({event:d,listeners:_}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==Xu&&(v=n.relatedTarget||n.fromElement)&&(Tr(v)||v[Mi]))break e;if((p||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Tr(v):null,v!==null&&(m=Hr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(_=oh,y="onMouseLeave",u="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(_=lh,y="onPointerLeave",u="onPointerEnter",x="pointer"),m=p==null?d:ms(p),g=v==null?d:ms(v),d=new _(y,x+"leave",p,n,f),d.target=m,d.relatedTarget=g,y=null,Tr(f)===c&&(_=new _(u,x+"enter",v,n,f),_.target=g,_.relatedTarget=m,y=_),m=y,p&&v)t:{for(_=p,u=v,x=0,g=_;g;g=Gr(g))x++;for(g=0,y=u;y;y=Gr(y))g++;for(;0<x-g;)_=Gr(_),x--;for(;0<g-x;)u=Gr(u),g--;for(;x--;){if(_===u||u!==null&&_===u.alternate)break t;_=Gr(_),u=Gr(u)}_=null}else _=null;p!==null&&_h(h,d,p,_,!1),v!==null&&m!==null&&_h(h,m,v,_,!0)}}e:{if(d=c?ms(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var b=g_;else if(dh(d))if(Ig)b=y_;else{b=x_;var T=v_}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(b=__);if(b&&(b=b(t,c))){Dg(h,b,n,f);break e}T&&T(t,d,c),t==="focusout"&&(T=d._wrapperState)&&T.controlled&&d.type==="number"&&Hu(d,"number",d.value)}switch(T=c?ms(c):window,t){case"focusin":(dh(T)||T.contentEditable==="true")&&(hs=T,Qu=c,To=null);break;case"focusout":To=Qu=hs=null;break;case"mousedown":ed=!0;break;case"contextmenu":case"mouseup":case"dragend":ed=!1,gh(h,n,f);break;case"selectionchange":if(E_)break;case"keydown":case"keyup":gh(h,n,f)}var C;if(ef)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else fs?Pg(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Rg&&n.locale!=="ko"&&(fs||N!=="onCompositionStart"?N==="onCompositionEnd"&&fs&&(C=Cg()):(Hi=f,Zd="value"in Hi?Hi.value:Hi.textContent,fs=!0)),T=Sl(c,N),0<T.length&&(N=new ah(N,t,null,n,f),h.push({event:N,listeners:T}),C?N.data=C:(C=Lg(n),C!==null&&(N.data=C)))),(C=d_?f_(t,n):h_(t,n))&&(c=Sl(c,"onBeforeInput"),0<c.length&&(f=new ah("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:c}),f.data=C))}Gg(h,e)})}function Vo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Sl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Uo(t,n),s!=null&&i.unshift(Vo(t,s,r)),s=Uo(t,e),s!=null&&i.push(Vo(t,s,r))),t=t.return}return i}function Gr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function _h(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Uo(n,s),l!=null&&o.unshift(Vo(n,l,a))):r||(l=Uo(n,s),l!=null&&o.push(Vo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var b_=/\r\n?/g,C_=/\u0000|\uFFFD/g;function yh(t){return(typeof t=="string"?t:""+t).replace(b_,`
`).replace(C_,"")}function xa(t,e,n){if(e=yh(e),yh(t)!==e&&n)throw Error(ue(425))}function Ml(){}var td=null,nd=null;function id(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rd=typeof setTimeout=="function"?setTimeout:void 0,R_=typeof clearTimeout=="function"?clearTimeout:void 0,Sh=typeof Promise=="function"?Promise:void 0,P_=typeof queueMicrotask=="function"?queueMicrotask:typeof Sh<"u"?function(t){return Sh.resolve(null).then(t).catch(L_)}:rd;function L_(t){setTimeout(function(){throw t})}function Fc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ko(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ko(e)}function Yi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Mh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var qs=Math.random().toString(36).slice(2),ti="__reactFiber$"+qs,Go="__reactProps$"+qs,Mi="__reactContainer$"+qs,sd="__reactEvents$"+qs,D_="__reactListeners$"+qs,I_="__reactHandles$"+qs;function Tr(t){var e=t[ti];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Mi]||n[ti]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Mh(t);t!==null;){if(n=t[ti])return n;t=Mh(t)}return e}t=n,n=t.parentNode}return null}function na(t){return t=t[ti]||t[Mi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ms(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ue(33))}function ec(t){return t[Go]||null}var od=[],gs=-1;function ar(t){return{current:t}}function ht(t){0>gs||(t.current=od[gs],od[gs]=null,gs--)}function ct(t,e){gs++,od[gs]=t.current,t.current=e}var tr={},Zt=ar(tr),un=ar(!1),Dr=tr;function Us(t,e){var n=t.type.contextTypes;if(!n)return tr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function dn(t){return t=t.childContextTypes,t!=null}function El(){ht(un),ht(Zt)}function Eh(t,e,n){if(Zt.current!==tr)throw Error(ue(168));ct(Zt,e),ct(un,n)}function jg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ue(108,vx(t)||"Unknown",r));return yt({},n,i)}function wl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||tr,Dr=Zt.current,ct(Zt,t),ct(un,un.current),!0}function wh(t,e,n){var i=t.stateNode;if(!i)throw Error(ue(169));n?(t=jg(t,e,Dr),i.__reactInternalMemoizedMergedChildContext=t,ht(un),ht(Zt),ct(Zt,t)):ht(un),ct(un,n)}var gi=null,tc=!1,Oc=!1;function Xg(t){gi===null?gi=[t]:gi.push(t)}function N_(t){tc=!0,Xg(t)}function lr(){if(!Oc&&gi!==null){Oc=!0;var t=0,e=rt;try{var n=gi;for(rt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}gi=null,tc=!1}catch(r){throw gi!==null&&(gi=gi.slice(t+1)),vg(Yd,lr),r}finally{rt=e,Oc=!1}}return null}var vs=[],xs=0,Tl=null,Al=0,Rn=[],Pn=0,Ir=null,vi=1,xi="";function yr(t,e){vs[xs++]=Al,vs[xs++]=Tl,Tl=t,Al=e}function Yg(t,e,n){Rn[Pn++]=vi,Rn[Pn++]=xi,Rn[Pn++]=Ir,Ir=t;var i=vi;t=xi;var r=32-Xn(i)-1;i&=~(1<<r),n+=1;var s=32-Xn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,vi=1<<32-Xn(e)+r|n<<r|i,xi=s+t}else vi=1<<s|n<<r|i,xi=t}function nf(t){t.return!==null&&(yr(t,1),Yg(t,1,0))}function rf(t){for(;t===Tl;)Tl=vs[--xs],vs[xs]=null,Al=vs[--xs],vs[xs]=null;for(;t===Ir;)Ir=Rn[--Pn],Rn[Pn]=null,xi=Rn[--Pn],Rn[Pn]=null,vi=Rn[--Pn],Rn[Pn]=null}var En=null,Mn=null,pt=!1,Wn=null;function $g(t,e){var n=Ln(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Th(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,En=t,Mn=Yi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,En=t,Mn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ir!==null?{id:vi,overflow:xi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ln(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,En=t,Mn=null,!0):!1;default:return!1}}function ad(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ld(t){if(pt){var e=Mn;if(e){var n=e;if(!Th(t,e)){if(ad(t))throw Error(ue(418));e=Yi(n.nextSibling);var i=En;e&&Th(t,e)?$g(i,n):(t.flags=t.flags&-4097|2,pt=!1,En=t)}}else{if(ad(t))throw Error(ue(418));t.flags=t.flags&-4097|2,pt=!1,En=t}}}function Ah(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;En=t}function _a(t){if(t!==En)return!1;if(!pt)return Ah(t),pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!id(t.type,t.memoizedProps)),e&&(e=Mn)){if(ad(t))throw qg(),Error(ue(418));for(;e;)$g(t,e),e=Yi(e.nextSibling)}if(Ah(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Mn=Yi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Mn=null}}else Mn=En?Yi(t.stateNode.nextSibling):null;return!0}function qg(){for(var t=Mn;t;)t=Yi(t.nextSibling)}function Fs(){Mn=En=null,pt=!1}function sf(t){Wn===null?Wn=[t]:Wn.push(t)}var U_=Ti.ReactCurrentBatchConfig;function ro(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ue(309));var i=n.stateNode}if(!i)throw Error(ue(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ue(284));if(!n._owner)throw Error(ue(290,t))}return t}function ya(t,e){throw t=Object.prototype.toString.call(e),Error(ue(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function bh(t){var e=t._init;return e(t._payload)}function Kg(t){function e(u,x){if(t){var g=u.deletions;g===null?(u.deletions=[x],u.flags|=16):g.push(x)}}function n(u,x){if(!t)return null;for(;x!==null;)e(u,x),x=x.sibling;return null}function i(u,x){for(u=new Map;x!==null;)x.key!==null?u.set(x.key,x):u.set(x.index,x),x=x.sibling;return u}function r(u,x){return u=Zi(u,x),u.index=0,u.sibling=null,u}function s(u,x,g){return u.index=g,t?(g=u.alternate,g!==null?(g=g.index,g<x?(u.flags|=2,x):g):(u.flags|=2,x)):(u.flags|=1048576,x)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,x,g,y){return x===null||x.tag!==6?(x=Wc(g,u.mode,y),x.return=u,x):(x=r(x,g),x.return=u,x)}function l(u,x,g,y){var b=g.type;return b===ds?f(u,x,g.props.children,y,g.key):x!==null&&(x.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ui&&bh(b)===x.type)?(y=r(x,g.props),y.ref=ro(u,x,g),y.return=u,y):(y=ul(g.type,g.key,g.props,null,u.mode,y),y.ref=ro(u,x,g),y.return=u,y)}function c(u,x,g,y){return x===null||x.tag!==4||x.stateNode.containerInfo!==g.containerInfo||x.stateNode.implementation!==g.implementation?(x=jc(g,u.mode,y),x.return=u,x):(x=r(x,g.children||[]),x.return=u,x)}function f(u,x,g,y,b){return x===null||x.tag!==7?(x=Lr(g,u.mode,y,b),x.return=u,x):(x=r(x,g),x.return=u,x)}function h(u,x,g){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Wc(""+x,u.mode,g),x.return=u,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ca:return g=ul(x.type,x.key,x.props,null,u.mode,g),g.ref=ro(u,null,x),g.return=u,g;case us:return x=jc(x,u.mode,g),x.return=u,x;case Ui:var y=x._init;return h(u,y(x._payload),g)}if(vo(x)||Qs(x))return x=Lr(x,u.mode,g,null),x.return=u,x;ya(u,x)}return null}function d(u,x,g,y){var b=x!==null?x.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return b!==null?null:a(u,x,""+g,y);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ca:return g.key===b?l(u,x,g,y):null;case us:return g.key===b?c(u,x,g,y):null;case Ui:return b=g._init,d(u,x,b(g._payload),y)}if(vo(g)||Qs(g))return b!==null?null:f(u,x,g,y,null);ya(u,g)}return null}function p(u,x,g,y,b){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(g)||null,a(x,u,""+y,b);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ca:return u=u.get(y.key===null?g:y.key)||null,l(x,u,y,b);case us:return u=u.get(y.key===null?g:y.key)||null,c(x,u,y,b);case Ui:var T=y._init;return p(u,x,g,T(y._payload),b)}if(vo(y)||Qs(y))return u=u.get(g)||null,f(x,u,y,b,null);ya(x,y)}return null}function v(u,x,g,y){for(var b=null,T=null,C=x,N=x=0,A=null;C!==null&&N<g.length;N++){C.index>N?(A=C,C=null):A=C.sibling;var E=d(u,C,g[N],y);if(E===null){C===null&&(C=A);break}t&&C&&E.alternate===null&&e(u,C),x=s(E,x,N),T===null?b=E:T.sibling=E,T=E,C=A}if(N===g.length)return n(u,C),pt&&yr(u,N),b;if(C===null){for(;N<g.length;N++)C=h(u,g[N],y),C!==null&&(x=s(C,x,N),T===null?b=C:T.sibling=C,T=C);return pt&&yr(u,N),b}for(C=i(u,C);N<g.length;N++)A=p(C,u,N,g[N],y),A!==null&&(t&&A.alternate!==null&&C.delete(A.key===null?N:A.key),x=s(A,x,N),T===null?b=A:T.sibling=A,T=A);return t&&C.forEach(function(L){return e(u,L)}),pt&&yr(u,N),b}function _(u,x,g,y){var b=Qs(g);if(typeof b!="function")throw Error(ue(150));if(g=b.call(g),g==null)throw Error(ue(151));for(var T=b=null,C=x,N=x=0,A=null,E=g.next();C!==null&&!E.done;N++,E=g.next()){C.index>N?(A=C,C=null):A=C.sibling;var L=d(u,C,E.value,y);if(L===null){C===null&&(C=A);break}t&&C&&L.alternate===null&&e(u,C),x=s(L,x,N),T===null?b=L:T.sibling=L,T=L,C=A}if(E.done)return n(u,C),pt&&yr(u,N),b;if(C===null){for(;!E.done;N++,E=g.next())E=h(u,E.value,y),E!==null&&(x=s(E,x,N),T===null?b=E:T.sibling=E,T=E);return pt&&yr(u,N),b}for(C=i(u,C);!E.done;N++,E=g.next())E=p(C,u,N,E.value,y),E!==null&&(t&&E.alternate!==null&&C.delete(E.key===null?N:E.key),x=s(E,x,N),T===null?b=E:T.sibling=E,T=E);return t&&C.forEach(function(O){return e(u,O)}),pt&&yr(u,N),b}function m(u,x,g,y){if(typeof g=="object"&&g!==null&&g.type===ds&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case ca:e:{for(var b=g.key,T=x;T!==null;){if(T.key===b){if(b=g.type,b===ds){if(T.tag===7){n(u,T.sibling),x=r(T,g.props.children),x.return=u,u=x;break e}}else if(T.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ui&&bh(b)===T.type){n(u,T.sibling),x=r(T,g.props),x.ref=ro(u,T,g),x.return=u,u=x;break e}n(u,T);break}else e(u,T);T=T.sibling}g.type===ds?(x=Lr(g.props.children,u.mode,y,g.key),x.return=u,u=x):(y=ul(g.type,g.key,g.props,null,u.mode,y),y.ref=ro(u,x,g),y.return=u,u=y)}return o(u);case us:e:{for(T=g.key;x!==null;){if(x.key===T)if(x.tag===4&&x.stateNode.containerInfo===g.containerInfo&&x.stateNode.implementation===g.implementation){n(u,x.sibling),x=r(x,g.children||[]),x.return=u,u=x;break e}else{n(u,x);break}else e(u,x);x=x.sibling}x=jc(g,u.mode,y),x.return=u,u=x}return o(u);case Ui:return T=g._init,m(u,x,T(g._payload),y)}if(vo(g))return v(u,x,g,y);if(Qs(g))return _(u,x,g,y);ya(u,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,x!==null&&x.tag===6?(n(u,x.sibling),x=r(x,g),x.return=u,u=x):(n(u,x),x=Wc(g,u.mode,y),x.return=u,u=x),o(u)):n(u,x)}return m}var Os=Kg(!0),Zg=Kg(!1),bl=ar(null),Cl=null,_s=null,of=null;function af(){of=_s=Cl=null}function lf(t){var e=bl.current;ht(bl),t._currentValue=e}function cd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Cs(t,e){Cl=t,of=_s=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(cn=!0),t.firstContext=null)}function Nn(t){var e=t._currentValue;if(of!==t)if(t={context:t,memoizedValue:e,next:null},_s===null){if(Cl===null)throw Error(ue(308));_s=t,Cl.dependencies={lanes:0,firstContext:t}}else _s=_s.next=t;return e}var Ar=null;function cf(t){Ar===null?Ar=[t]:Ar.push(t)}function Jg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,cf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ei(t,i)}function Ei(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Fi=!1;function uf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function yi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function $i(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ei(t,n)}return r=i.interleaved,r===null?(e.next=e,cf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ei(t,n)}function rl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,$d(t,n)}}function Ch(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Rl(t,e,n,i){var r=t.updateQueue;Fi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=c:a.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;o=0,f=c=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){f!==null&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,_=a;switch(d=e,p=n,_.tag){case 1:if(v=_.payload,typeof v=="function"){h=v.call(p,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=_.payload,d=typeof v=="function"?v.call(p,h,d):v,d==null)break e;h=yt({},h,d);break e;case 2:Fi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(f===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Ur|=o,t.lanes=o,t.memoizedState=h}}function Rh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ue(191,r));r.call(i)}}}var ia={},si=ar(ia),Wo=ar(ia),jo=ar(ia);function br(t){if(t===ia)throw Error(ue(174));return t}function df(t,e){switch(ct(jo,e),ct(Wo,t),ct(si,ia),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Gu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Gu(e,t)}ht(si),ct(si,e)}function ks(){ht(si),ht(Wo),ht(jo)}function e0(t){br(jo.current);var e=br(si.current),n=Gu(e,t.type);e!==n&&(ct(Wo,t),ct(si,n))}function ff(t){Wo.current===t&&(ht(si),ht(Wo))}var vt=ar(0);function Pl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var kc=[];function hf(){for(var t=0;t<kc.length;t++)kc[t]._workInProgressVersionPrimary=null;kc.length=0}var sl=Ti.ReactCurrentDispatcher,zc=Ti.ReactCurrentBatchConfig,Nr=0,_t=null,Dt=null,kt=null,Ll=!1,Ao=!1,Xo=0,F_=0;function Xt(){throw Error(ue(321))}function pf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!qn(t[n],e[n]))return!1;return!0}function mf(t,e,n,i,r,s){if(Nr=s,_t=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,sl.current=t===null||t.memoizedState===null?B_:H_,t=n(i,r),Ao){s=0;do{if(Ao=!1,Xo=0,25<=s)throw Error(ue(301));s+=1,kt=Dt=null,e.updateQueue=null,sl.current=V_,t=n(i,r)}while(Ao)}if(sl.current=Dl,e=Dt!==null&&Dt.next!==null,Nr=0,kt=Dt=_t=null,Ll=!1,e)throw Error(ue(300));return t}function gf(){var t=Xo!==0;return Xo=0,t}function Jn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?_t.memoizedState=kt=t:kt=kt.next=t,kt}function Un(){if(Dt===null){var t=_t.alternate;t=t!==null?t.memoizedState:null}else t=Dt.next;var e=kt===null?_t.memoizedState:kt.next;if(e!==null)kt=e,Dt=t;else{if(t===null)throw Error(ue(310));Dt=t,t={memoizedState:Dt.memoizedState,baseState:Dt.baseState,baseQueue:Dt.baseQueue,queue:Dt.queue,next:null},kt===null?_t.memoizedState=kt=t:kt=kt.next=t}return kt}function Yo(t,e){return typeof e=="function"?e(t):e}function Bc(t){var e=Un(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=Dt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var f=c.lane;if((Nr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,o=i):l=l.next=h,_t.lanes|=f,Ur|=f}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,qn(i,e.memoizedState)||(cn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,_t.lanes|=s,Ur|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Hc(t){var e=Un(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);qn(s,e.memoizedState)||(cn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function t0(){}function n0(t,e){var n=_t,i=Un(),r=e(),s=!qn(i.memoizedState,r);if(s&&(i.memoizedState=r,cn=!0),i=i.queue,vf(s0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||kt!==null&&kt.memoizedState.tag&1){if(n.flags|=2048,$o(9,r0.bind(null,n,i,r,e),void 0,null),Bt===null)throw Error(ue(349));Nr&30||i0(n,e,r)}return r}function i0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=_t.updateQueue,e===null?(e={lastEffect:null,stores:null},_t.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function r0(t,e,n,i){e.value=n,e.getSnapshot=i,o0(e)&&a0(t)}function s0(t,e,n){return n(function(){o0(e)&&a0(t)})}function o0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!qn(t,n)}catch{return!0}}function a0(t){var e=Ei(t,1);e!==null&&Yn(e,t,1,-1)}function Ph(t){var e=Jn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yo,lastRenderedState:t},e.queue=t,t=t.dispatch=z_.bind(null,_t,t),[e.memoizedState,t]}function $o(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=_t.updateQueue,e===null?(e={lastEffect:null,stores:null},_t.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function l0(){return Un().memoizedState}function ol(t,e,n,i){var r=Jn();_t.flags|=t,r.memoizedState=$o(1|e,n,void 0,i===void 0?null:i)}function nc(t,e,n,i){var r=Un();i=i===void 0?null:i;var s=void 0;if(Dt!==null){var o=Dt.memoizedState;if(s=o.destroy,i!==null&&pf(i,o.deps)){r.memoizedState=$o(e,n,s,i);return}}_t.flags|=t,r.memoizedState=$o(1|e,n,s,i)}function Lh(t,e){return ol(8390656,8,t,e)}function vf(t,e){return nc(2048,8,t,e)}function c0(t,e){return nc(4,2,t,e)}function u0(t,e){return nc(4,4,t,e)}function d0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function f0(t,e,n){return n=n!=null?n.concat([t]):null,nc(4,4,d0.bind(null,e,t),n)}function xf(){}function h0(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&pf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function p0(t,e){var n=Un();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&pf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function m0(t,e,n){return Nr&21?(qn(n,e)||(n=yg(),_t.lanes|=n,Ur|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,cn=!0),t.memoizedState=n)}function O_(t,e){var n=rt;rt=n!==0&&4>n?n:4,t(!0);var i=zc.transition;zc.transition={};try{t(!1),e()}finally{rt=n,zc.transition=i}}function g0(){return Un().memoizedState}function k_(t,e,n){var i=Ki(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},v0(t))x0(e,n);else if(n=Jg(t,e,n,i),n!==null){var r=nn();Yn(n,t,i,r),_0(n,e,i)}}function z_(t,e,n){var i=Ki(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(v0(t))x0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,qn(a,o)){var l=e.interleaved;l===null?(r.next=r,cf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Jg(t,e,r,i),n!==null&&(r=nn(),Yn(n,t,i,r),_0(n,e,i))}}function v0(t){var e=t.alternate;return t===_t||e!==null&&e===_t}function x0(t,e){Ao=Ll=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function _0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,$d(t,n)}}var Dl={readContext:Nn,useCallback:Xt,useContext:Xt,useEffect:Xt,useImperativeHandle:Xt,useInsertionEffect:Xt,useLayoutEffect:Xt,useMemo:Xt,useReducer:Xt,useRef:Xt,useState:Xt,useDebugValue:Xt,useDeferredValue:Xt,useTransition:Xt,useMutableSource:Xt,useSyncExternalStore:Xt,useId:Xt,unstable_isNewReconciler:!1},B_={readContext:Nn,useCallback:function(t,e){return Jn().memoizedState=[t,e===void 0?null:e],t},useContext:Nn,useEffect:Lh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ol(4194308,4,d0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ol(4194308,4,t,e)},useInsertionEffect:function(t,e){return ol(4,2,t,e)},useMemo:function(t,e){var n=Jn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Jn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=k_.bind(null,_t,t),[i.memoizedState,t]},useRef:function(t){var e=Jn();return t={current:t},e.memoizedState=t},useState:Ph,useDebugValue:xf,useDeferredValue:function(t){return Jn().memoizedState=t},useTransition:function(){var t=Ph(!1),e=t[0];return t=O_.bind(null,t[1]),Jn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=_t,r=Jn();if(pt){if(n===void 0)throw Error(ue(407));n=n()}else{if(n=e(),Bt===null)throw Error(ue(349));Nr&30||i0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Lh(s0.bind(null,i,s,t),[t]),i.flags|=2048,$o(9,r0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Jn(),e=Bt.identifierPrefix;if(pt){var n=xi,i=vi;n=(i&~(1<<32-Xn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=F_++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},H_={readContext:Nn,useCallback:h0,useContext:Nn,useEffect:vf,useImperativeHandle:f0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:Bc,useRef:l0,useState:function(){return Bc(Yo)},useDebugValue:xf,useDeferredValue:function(t){var e=Un();return m0(e,Dt.memoizedState,t)},useTransition:function(){var t=Bc(Yo)[0],e=Un().memoizedState;return[t,e]},useMutableSource:t0,useSyncExternalStore:n0,useId:g0,unstable_isNewReconciler:!1},V_={readContext:Nn,useCallback:h0,useContext:Nn,useEffect:vf,useImperativeHandle:f0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:Hc,useRef:l0,useState:function(){return Hc(Yo)},useDebugValue:xf,useDeferredValue:function(t){var e=Un();return Dt===null?e.memoizedState=t:m0(e,Dt.memoizedState,t)},useTransition:function(){var t=Hc(Yo)[0],e=Un().memoizedState;return[t,e]},useMutableSource:t0,useSyncExternalStore:n0,useId:g0,unstable_isNewReconciler:!1};function Hn(t,e){if(t&&t.defaultProps){e=yt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ud(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:yt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ic={isMounted:function(t){return(t=t._reactInternals)?Hr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=nn(),r=Ki(t),s=yi(i,r);s.payload=e,n!=null&&(s.callback=n),e=$i(t,s,r),e!==null&&(Yn(e,t,r,i),rl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=nn(),r=Ki(t),s=yi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=$i(t,s,r),e!==null&&(Yn(e,t,r,i),rl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nn(),i=Ki(t),r=yi(n,i);r.tag=2,e!=null&&(r.callback=e),e=$i(t,r,i),e!==null&&(Yn(e,t,i,n),rl(e,t,i))}};function Dh(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Bo(n,i)||!Bo(r,s):!0}function y0(t,e,n){var i=!1,r=tr,s=e.contextType;return typeof s=="object"&&s!==null?s=Nn(s):(r=dn(e)?Dr:Zt.current,i=e.contextTypes,s=(i=i!=null)?Us(t,r):tr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ic,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Ih(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&ic.enqueueReplaceState(e,e.state,null)}function dd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},uf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Nn(s):(s=dn(e)?Dr:Zt.current,r.context=Us(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(ud(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&ic.enqueueReplaceState(r,r.state,null),Rl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function zs(t,e){try{var n="",i=e;do n+=gx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Vc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function fd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var G_=typeof WeakMap=="function"?WeakMap:Map;function S0(t,e,n){n=yi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Nl||(Nl=!0,Md=i),fd(t,e)},n}function M0(t,e,n){n=yi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){fd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){fd(t,e),typeof i!="function"&&(qi===null?qi=new Set([this]):qi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Nh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new G_;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=iy.bind(null,t,e,n),e.then(t,t))}function Uh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Fh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=yi(-1,1),e.tag=2,$i(n,e,1))),n.lanes|=1),t)}var W_=Ti.ReactCurrentOwner,cn=!1;function en(t,e,n,i){e.child=t===null?Zg(e,null,n,i):Os(e,t.child,n,i)}function Oh(t,e,n,i,r){n=n.render;var s=e.ref;return Cs(e,r),i=mf(t,e,n,i,s,r),n=gf(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,wi(t,e,r)):(pt&&n&&nf(e),e.flags|=1,en(t,e,i,r),e.child)}function kh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Af(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,E0(t,e,s,i,r)):(t=ul(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Bo,n(o,i)&&t.ref===e.ref)return wi(t,e,r)}return e.flags|=1,t=Zi(s,i),t.ref=e.ref,t.return=e,e.child=t}function E0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Bo(s,i)&&t.ref===e.ref)if(cn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(cn=!0);else return e.lanes=t.lanes,wi(t,e,r)}return hd(t,e,n,i,r)}function w0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ct(Ss,_n),_n|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ct(Ss,_n),_n|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ct(Ss,_n),_n|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ct(Ss,_n),_n|=i;return en(t,e,r,n),e.child}function T0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function hd(t,e,n,i,r){var s=dn(n)?Dr:Zt.current;return s=Us(e,s),Cs(e,r),n=mf(t,e,n,i,s,r),i=gf(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,wi(t,e,r)):(pt&&i&&nf(e),e.flags|=1,en(t,e,n,r),e.child)}function zh(t,e,n,i,r){if(dn(n)){var s=!0;wl(e)}else s=!1;if(Cs(e,r),e.stateNode===null)al(t,e),y0(e,n,i),dd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Nn(c):(c=dn(n)?Dr:Zt.current,c=Us(e,c));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Ih(e,o,i,c),Fi=!1;var d=e.memoizedState;o.state=d,Rl(e,i,o,r),l=e.memoizedState,a!==i||d!==l||un.current||Fi?(typeof f=="function"&&(ud(e,n,f,i),l=e.memoizedState),(a=Fi||Dh(e,n,a,i,d,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Qg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Hn(e.type,a),o.props=c,h=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Nn(l):(l=dn(n)?Dr:Zt.current,l=Us(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||d!==l)&&Ih(e,o,i,l),Fi=!1,d=e.memoizedState,o.state=d,Rl(e,i,o,r);var v=e.memoizedState;a!==h||d!==v||un.current||Fi?(typeof p=="function"&&(ud(e,n,p,i),v=e.memoizedState),(c=Fi||Dh(e,n,c,i,d,v,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return pd(t,e,n,i,s,r)}function pd(t,e,n,i,r,s){T0(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&wh(e,n,!1),wi(t,e,s);i=e.stateNode,W_.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Os(e,t.child,null,s),e.child=Os(e,null,a,s)):en(t,e,a,s),e.memoizedState=i.state,r&&wh(e,n,!0),e.child}function A0(t){var e=t.stateNode;e.pendingContext?Eh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Eh(t,e.context,!1),df(t,e.containerInfo)}function Bh(t,e,n,i,r){return Fs(),sf(r),e.flags|=256,en(t,e,n,i),e.child}var md={dehydrated:null,treeContext:null,retryLane:0};function gd(t){return{baseLanes:t,cachePool:null,transitions:null}}function b0(t,e,n){var i=e.pendingProps,r=vt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ct(vt,r&1),t===null)return ld(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=oc(o,i,0,null),t=Lr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=gd(n),e.memoizedState=md,t):_f(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return j_(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Zi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Zi(a,s):(s=Lr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?gd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=md,i}return s=t.child,t=s.sibling,i=Zi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function _f(t,e){return e=oc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Sa(t,e,n,i){return i!==null&&sf(i),Os(e,t.child,null,n),t=_f(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function j_(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Vc(Error(ue(422))),Sa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=oc({mode:"visible",children:i.children},r,0,null),s=Lr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Os(e,t.child,null,o),e.child.memoizedState=gd(o),e.memoizedState=md,s);if(!(e.mode&1))return Sa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ue(419)),i=Vc(s,i,void 0),Sa(t,e,o,i)}if(a=(o&t.childLanes)!==0,cn||a){if(i=Bt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ei(t,r),Yn(i,t,r,-1))}return Tf(),i=Vc(Error(ue(421))),Sa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=ry.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Mn=Yi(r.nextSibling),En=e,pt=!0,Wn=null,t!==null&&(Rn[Pn++]=vi,Rn[Pn++]=xi,Rn[Pn++]=Ir,vi=t.id,xi=t.overflow,Ir=e),e=_f(e,i.children),e.flags|=4096,e)}function Hh(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),cd(t.return,e,n)}function Gc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function C0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(en(t,e,i.children,n),i=vt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Hh(t,n,e);else if(t.tag===19)Hh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ct(vt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Pl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Gc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Pl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Gc(e,!0,n,null,s);break;case"together":Gc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function al(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function wi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ur|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ue(153));if(e.child!==null){for(t=e.child,n=Zi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Zi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function X_(t,e,n){switch(e.tag){case 3:A0(e),Fs();break;case 5:e0(e);break;case 1:dn(e.type)&&wl(e);break;case 4:df(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ct(bl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ct(vt,vt.current&1),e.flags|=128,null):n&e.child.childLanes?b0(t,e,n):(ct(vt,vt.current&1),t=wi(t,e,n),t!==null?t.sibling:null);ct(vt,vt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return C0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ct(vt,vt.current),i)break;return null;case 22:case 23:return e.lanes=0,w0(t,e,n)}return wi(t,e,n)}var R0,vd,P0,L0;R0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vd=function(){};P0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,br(si.current);var s=null;switch(n){case"input":r=zu(t,r),i=zu(t,i),s=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),s=[];break;case"textarea":r=Vu(t,r),i=Vu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Ml)}Wu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Io.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Io.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};L0=function(t,e,n,i){n!==i&&(e.flags|=4)};function so(t,e){if(!pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Y_(t,e,n){var i=e.pendingProps;switch(rf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(e),null;case 1:return dn(e.type)&&El(),Yt(e),null;case 3:return i=e.stateNode,ks(),ht(un),ht(Zt),hf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(_a(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Wn!==null&&(Td(Wn),Wn=null))),vd(t,e),Yt(e),null;case 5:ff(e);var r=br(jo.current);if(n=e.type,t!==null&&e.stateNode!=null)P0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return Yt(e),null}if(t=br(si.current),_a(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ti]=e,i[Go]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<_o.length;r++)ut(_o[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":Kf(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":Jf(i,s),ut("invalid",i)}Wu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&xa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&xa(i.textContent,a,t),r=["children",""+a]):Io.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":ua(i),Zf(i,s,!0);break;case"textarea":ua(i),Qf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Ml)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=sg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[ti]=e,t[Go]=i,R0(t,e,!1,!1),e.stateNode=t;e:{switch(o=ju(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<_o.length;r++)ut(_o[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":Kf(t,i),r=zu(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),ut("invalid",t);break;case"textarea":Jf(t,i),r=Vu(t,i),ut("invalid",t);break;default:r=i}Wu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?lg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&og(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&No(t,l):typeof l=="number"&&No(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Io.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&Vd(t,s,l,o))}switch(n){case"input":ua(t),Zf(t,i,!1);break;case"textarea":ua(t),Qf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+er(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ws(t,!!i.multiple,s,!1):i.defaultValue!=null&&ws(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Ml)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Yt(e),null;case 6:if(t&&e.stateNode!=null)L0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ue(166));if(n=br(jo.current),br(si.current),_a(e)){if(i=e.stateNode,n=e.memoizedProps,i[ti]=e,(s=i.nodeValue!==n)&&(t=En,t!==null))switch(t.tag){case 3:xa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&xa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ti]=e,e.stateNode=i}return Yt(e),null;case 13:if(ht(vt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pt&&Mn!==null&&e.mode&1&&!(e.flags&128))qg(),Fs(),e.flags|=98560,s=!1;else if(s=_a(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ue(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ue(317));s[ti]=e}else Fs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Yt(e),s=!1}else Wn!==null&&(Td(Wn),Wn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||vt.current&1?It===0&&(It=3):Tf())),e.updateQueue!==null&&(e.flags|=4),Yt(e),null);case 4:return ks(),vd(t,e),t===null&&Ho(e.stateNode.containerInfo),Yt(e),null;case 10:return lf(e.type._context),Yt(e),null;case 17:return dn(e.type)&&El(),Yt(e),null;case 19:if(ht(vt),s=e.memoizedState,s===null)return Yt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)so(s,!1);else{if(It!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Pl(t),o!==null){for(e.flags|=128,so(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ct(vt,vt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Tt()>Bs&&(e.flags|=128,i=!0,so(s,!1),e.lanes=4194304)}else{if(!i)if(t=Pl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),so(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!pt)return Yt(e),null}else 2*Tt()-s.renderingStartTime>Bs&&n!==1073741824&&(e.flags|=128,i=!0,so(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Tt(),e.sibling=null,n=vt.current,ct(vt,i?n&1|2:n&1),e):(Yt(e),null);case 22:case 23:return wf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?_n&1073741824&&(Yt(e),e.subtreeFlags&6&&(e.flags|=8192)):Yt(e),null;case 24:return null;case 25:return null}throw Error(ue(156,e.tag))}function $_(t,e){switch(rf(e),e.tag){case 1:return dn(e.type)&&El(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ks(),ht(un),ht(Zt),hf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ff(e),null;case 13:if(ht(vt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ue(340));Fs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ht(vt),null;case 4:return ks(),null;case 10:return lf(e.type._context),null;case 22:case 23:return wf(),null;case 24:return null;default:return null}}var Ma=!1,Kt=!1,q_=typeof WeakSet=="function"?WeakSet:Set,Me=null;function ys(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){wt(t,e,i)}else n.current=null}function xd(t,e,n){try{n()}catch(i){wt(t,e,i)}}var Vh=!1;function K_(t,e){if(td=_l,t=Fg(),tf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,f=0,h=t,d=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(a=o+r),h!==s||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)d=h,h=p;for(;;){if(h===t)break t;if(d===n&&++c===r&&(a=o),d===s&&++f===i&&(l=o),(p=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(nd={focusedElem:t,selectionRange:n},_l=!1,Me=e;Me!==null;)if(e=Me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Me=t;else for(;Me!==null;){e=Me;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var _=v.memoizedProps,m=v.memoizedState,u=e.stateNode,x=u.getSnapshotBeforeUpdate(e.elementType===e.type?_:Hn(e.type,_),m);u.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ue(163))}}catch(y){wt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}return v=Vh,Vh=!1,v}function bo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&xd(e,n,s)}r=r.next}while(r!==i)}}function rc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function _d(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function D0(t){var e=t.alternate;e!==null&&(t.alternate=null,D0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ti],delete e[Go],delete e[sd],delete e[D_],delete e[I_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function I0(t){return t.tag===5||t.tag===3||t.tag===4}function Gh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||I0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function yd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ml));else if(i!==4&&(t=t.child,t!==null))for(yd(t,e,n),t=t.sibling;t!==null;)yd(t,e,n),t=t.sibling}function Sd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Sd(t,e,n),t=t.sibling;t!==null;)Sd(t,e,n),t=t.sibling}var Ht=null,Vn=!1;function Ci(t,e,n){for(n=n.child;n!==null;)N0(t,e,n),n=n.sibling}function N0(t,e,n){if(ri&&typeof ri.onCommitFiberUnmount=="function")try{ri.onCommitFiberUnmount(Kl,n)}catch{}switch(n.tag){case 5:Kt||ys(n,e);case 6:var i=Ht,r=Vn;Ht=null,Ci(t,e,n),Ht=i,Vn=r,Ht!==null&&(Vn?(t=Ht,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ht.removeChild(n.stateNode));break;case 18:Ht!==null&&(Vn?(t=Ht,n=n.stateNode,t.nodeType===8?Fc(t.parentNode,n):t.nodeType===1&&Fc(t,n),ko(t)):Fc(Ht,n.stateNode));break;case 4:i=Ht,r=Vn,Ht=n.stateNode.containerInfo,Vn=!0,Ci(t,e,n),Ht=i,Vn=r;break;case 0:case 11:case 14:case 15:if(!Kt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&xd(n,e,o),r=r.next}while(r!==i)}Ci(t,e,n);break;case 1:if(!Kt&&(ys(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){wt(n,e,a)}Ci(t,e,n);break;case 21:Ci(t,e,n);break;case 22:n.mode&1?(Kt=(i=Kt)||n.memoizedState!==null,Ci(t,e,n),Kt=i):Ci(t,e,n);break;default:Ci(t,e,n)}}function Wh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new q_),e.forEach(function(i){var r=sy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Fn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ht=a.stateNode,Vn=!1;break e;case 3:Ht=a.stateNode.containerInfo,Vn=!0;break e;case 4:Ht=a.stateNode.containerInfo,Vn=!0;break e}a=a.return}if(Ht===null)throw Error(ue(160));N0(s,o,r),Ht=null,Vn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){wt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)U0(e,t),e=e.sibling}function U0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Fn(e,t),Kn(t),i&4){try{bo(3,t,t.return),rc(3,t)}catch(_){wt(t,t.return,_)}try{bo(5,t,t.return)}catch(_){wt(t,t.return,_)}}break;case 1:Fn(e,t),Kn(t),i&512&&n!==null&&ys(n,n.return);break;case 5:if(Fn(e,t),Kn(t),i&512&&n!==null&&ys(n,n.return),t.flags&32){var r=t.stateNode;try{No(r,"")}catch(_){wt(t,t.return,_)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&ig(r,s),ju(a,o);var c=ju(a,s);for(o=0;o<l.length;o+=2){var f=l[o],h=l[o+1];f==="style"?lg(r,h):f==="dangerouslySetInnerHTML"?og(r,h):f==="children"?No(r,h):Vd(r,f,h,c)}switch(a){case"input":Bu(r,s);break;case"textarea":rg(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ws(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?ws(r,!!s.multiple,s.defaultValue,!0):ws(r,!!s.multiple,s.multiple?[]:"",!1))}r[Go]=s}catch(_){wt(t,t.return,_)}}break;case 6:if(Fn(e,t),Kn(t),i&4){if(t.stateNode===null)throw Error(ue(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(_){wt(t,t.return,_)}}break;case 3:if(Fn(e,t),Kn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ko(e.containerInfo)}catch(_){wt(t,t.return,_)}break;case 4:Fn(e,t),Kn(t);break;case 13:Fn(e,t),Kn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Mf=Tt())),i&4&&Wh(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Kt=(c=Kt)||f,Fn(e,t),Kt=c):Fn(e,t),Kn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Me=t,f=t.child;f!==null;){for(h=Me=f;Me!==null;){switch(d=Me,p=d.child,d.tag){case 0:case 11:case 14:case 15:bo(4,d,d.return);break;case 1:ys(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(_){wt(i,n,_)}}break;case 5:ys(d,d.return);break;case 22:if(d.memoizedState!==null){Xh(h);continue}}p!==null?(p.return=d,Me=p):Xh(h)}f=f.sibling}e:for(f=null,h=t;;){if(h.tag===5){if(f===null){f=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=ag("display",o))}catch(_){wt(t,t.return,_)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(_){wt(t,t.return,_)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Fn(e,t),Kn(t),i&4&&Wh(t);break;case 21:break;default:Fn(e,t),Kn(t)}}function Kn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(I0(n)){var i=n;break e}n=n.return}throw Error(ue(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(No(r,""),i.flags&=-33);var s=Gh(t);Sd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Gh(t);yd(t,a,o);break;default:throw Error(ue(161))}}catch(l){wt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Z_(t,e,n){Me=t,F0(t)}function F0(t,e,n){for(var i=(t.mode&1)!==0;Me!==null;){var r=Me,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ma;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Kt;a=Ma;var c=Kt;if(Ma=o,(Kt=l)&&!c)for(Me=r;Me!==null;)o=Me,l=o.child,o.tag===22&&o.memoizedState!==null?Yh(r):l!==null?(l.return=o,Me=l):Yh(r);for(;s!==null;)Me=s,F0(s),s=s.sibling;Me=r,Ma=a,Kt=c}jh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Me=s):jh(t)}}function jh(t){for(;Me!==null;){var e=Me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Kt||rc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Kt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Hn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Rh(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Rh(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&ko(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ue(163))}Kt||e.flags&512&&_d(e)}catch(d){wt(e,e.return,d)}}if(e===t){Me=null;break}if(n=e.sibling,n!==null){n.return=e.return,Me=n;break}Me=e.return}}function Xh(t){for(;Me!==null;){var e=Me;if(e===t){Me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Me=n;break}Me=e.return}}function Yh(t){for(;Me!==null;){var e=Me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{rc(4,e)}catch(l){wt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){wt(e,r,l)}}var s=e.return;try{_d(e)}catch(l){wt(e,s,l)}break;case 5:var o=e.return;try{_d(e)}catch(l){wt(e,o,l)}}}catch(l){wt(e,e.return,l)}if(e===t){Me=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Me=a;break}Me=e.return}}var J_=Math.ceil,Il=Ti.ReactCurrentDispatcher,yf=Ti.ReactCurrentOwner,In=Ti.ReactCurrentBatchConfig,Qe=0,Bt=null,Pt=null,Vt=0,_n=0,Ss=ar(0),It=0,qo=null,Ur=0,sc=0,Sf=0,Co=null,ln=null,Mf=0,Bs=1/0,mi=null,Nl=!1,Md=null,qi=null,Ea=!1,Vi=null,Ul=0,Ro=0,Ed=null,ll=-1,cl=0;function nn(){return Qe&6?Tt():ll!==-1?ll:ll=Tt()}function Ki(t){return t.mode&1?Qe&2&&Vt!==0?Vt&-Vt:U_.transition!==null?(cl===0&&(cl=yg()),cl):(t=rt,t!==0||(t=window.event,t=t===void 0?16:bg(t.type)),t):1}function Yn(t,e,n,i){if(50<Ro)throw Ro=0,Ed=null,Error(ue(185));ea(t,n,i),(!(Qe&2)||t!==Bt)&&(t===Bt&&(!(Qe&2)&&(sc|=n),It===4&&zi(t,Vt)),fn(t,i),n===1&&Qe===0&&!(e.mode&1)&&(Bs=Tt()+500,tc&&lr()))}function fn(t,e){var n=t.callbackNode;Ux(t,e);var i=xl(t,t===Bt?Vt:0);if(i===0)n!==null&&nh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&nh(n),e===1)t.tag===0?N_($h.bind(null,t)):Xg($h.bind(null,t)),P_(function(){!(Qe&6)&&lr()}),n=null;else{switch(Sg(i)){case 1:n=Yd;break;case 4:n=xg;break;case 16:n=vl;break;case 536870912:n=_g;break;default:n=vl}n=W0(n,O0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function O0(t,e){if(ll=-1,cl=0,Qe&6)throw Error(ue(327));var n=t.callbackNode;if(Rs()&&t.callbackNode!==n)return null;var i=xl(t,t===Bt?Vt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Fl(t,i);else{e=i;var r=Qe;Qe|=2;var s=z0();(Bt!==t||Vt!==e)&&(mi=null,Bs=Tt()+500,Pr(t,e));do try{ty();break}catch(a){k0(t,a)}while(!0);af(),Il.current=s,Qe=r,Pt!==null?e=0:(Bt=null,Vt=0,e=It)}if(e!==0){if(e===2&&(r=Ku(t),r!==0&&(i=r,e=wd(t,r))),e===1)throw n=qo,Pr(t,0),zi(t,i),fn(t,Tt()),n;if(e===6)zi(t,i);else{if(r=t.current.alternate,!(i&30)&&!Q_(r)&&(e=Fl(t,i),e===2&&(s=Ku(t),s!==0&&(i=s,e=wd(t,s))),e===1))throw n=qo,Pr(t,0),zi(t,i),fn(t,Tt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ue(345));case 2:Sr(t,ln,mi);break;case 3:if(zi(t,i),(i&130023424)===i&&(e=Mf+500-Tt(),10<e)){if(xl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){nn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=rd(Sr.bind(null,t,ln,mi),e);break}Sr(t,ln,mi);break;case 4:if(zi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Xn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Tt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*J_(i/1960))-i,10<i){t.timeoutHandle=rd(Sr.bind(null,t,ln,mi),i);break}Sr(t,ln,mi);break;case 5:Sr(t,ln,mi);break;default:throw Error(ue(329))}}}return fn(t,Tt()),t.callbackNode===n?O0.bind(null,t):null}function wd(t,e){var n=Co;return t.current.memoizedState.isDehydrated&&(Pr(t,e).flags|=256),t=Fl(t,e),t!==2&&(e=ln,ln=n,e!==null&&Td(e)),t}function Td(t){ln===null?ln=t:ln.push.apply(ln,t)}function Q_(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!qn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zi(t,e){for(e&=~Sf,e&=~sc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Xn(e),i=1<<n;t[n]=-1,e&=~i}}function $h(t){if(Qe&6)throw Error(ue(327));Rs();var e=xl(t,0);if(!(e&1))return fn(t,Tt()),null;var n=Fl(t,e);if(t.tag!==0&&n===2){var i=Ku(t);i!==0&&(e=i,n=wd(t,i))}if(n===1)throw n=qo,Pr(t,0),zi(t,e),fn(t,Tt()),n;if(n===6)throw Error(ue(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Sr(t,ln,mi),fn(t,Tt()),null}function Ef(t,e){var n=Qe;Qe|=1;try{return t(e)}finally{Qe=n,Qe===0&&(Bs=Tt()+500,tc&&lr())}}function Fr(t){Vi!==null&&Vi.tag===0&&!(Qe&6)&&Rs();var e=Qe;Qe|=1;var n=In.transition,i=rt;try{if(In.transition=null,rt=1,t)return t()}finally{rt=i,In.transition=n,Qe=e,!(Qe&6)&&lr()}}function wf(){_n=Ss.current,ht(Ss)}function Pr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,R_(n)),Pt!==null)for(n=Pt.return;n!==null;){var i=n;switch(rf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&El();break;case 3:ks(),ht(un),ht(Zt),hf();break;case 5:ff(i);break;case 4:ks();break;case 13:ht(vt);break;case 19:ht(vt);break;case 10:lf(i.type._context);break;case 22:case 23:wf()}n=n.return}if(Bt=t,Pt=t=Zi(t.current,null),Vt=_n=e,It=0,qo=null,Sf=sc=Ur=0,ln=Co=null,Ar!==null){for(e=0;e<Ar.length;e++)if(n=Ar[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Ar=null}return t}function k0(t,e){do{var n=Pt;try{if(af(),sl.current=Dl,Ll){for(var i=_t.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ll=!1}if(Nr=0,kt=Dt=_t=null,Ao=!1,Xo=0,yf.current=null,n===null||n.return===null){It=1,qo=e,Pt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Vt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=a,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Uh(o);if(p!==null){p.flags&=-257,Fh(p,o,a,s,e),p.mode&1&&Nh(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var _=new Set;_.add(l),e.updateQueue=_}else v.add(l);break e}else{if(!(e&1)){Nh(s,c,e),Tf();break e}l=Error(ue(426))}}else if(pt&&a.mode&1){var m=Uh(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Fh(m,o,a,s,e),sf(zs(l,a));break e}}s=l=zs(l,a),It!==4&&(It=2),Co===null?Co=[s]:Co.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=S0(s,l,e);Ch(s,u);break e;case 1:a=l;var x=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(qi===null||!qi.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=M0(s,a,e);Ch(s,y);break e}}s=s.return}while(s!==null)}H0(n)}catch(b){e=b,Pt===n&&n!==null&&(Pt=n=n.return);continue}break}while(!0)}function z0(){var t=Il.current;return Il.current=Dl,t===null?Dl:t}function Tf(){(It===0||It===3||It===2)&&(It=4),Bt===null||!(Ur&268435455)&&!(sc&268435455)||zi(Bt,Vt)}function Fl(t,e){var n=Qe;Qe|=2;var i=z0();(Bt!==t||Vt!==e)&&(mi=null,Pr(t,e));do try{ey();break}catch(r){k0(t,r)}while(!0);if(af(),Qe=n,Il.current=i,Pt!==null)throw Error(ue(261));return Bt=null,Vt=0,It}function ey(){for(;Pt!==null;)B0(Pt)}function ty(){for(;Pt!==null&&!Ax();)B0(Pt)}function B0(t){var e=G0(t.alternate,t,_n);t.memoizedProps=t.pendingProps,e===null?H0(t):Pt=e,yf.current=null}function H0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=$_(n,e),n!==null){n.flags&=32767,Pt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{It=6,Pt=null;return}}else if(n=Y_(n,e,_n),n!==null){Pt=n;return}if(e=e.sibling,e!==null){Pt=e;return}Pt=e=t}while(e!==null);It===0&&(It=5)}function Sr(t,e,n){var i=rt,r=In.transition;try{In.transition=null,rt=1,ny(t,e,n,i)}finally{In.transition=r,rt=i}return null}function ny(t,e,n,i){do Rs();while(Vi!==null);if(Qe&6)throw Error(ue(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ue(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Fx(t,s),t===Bt&&(Pt=Bt=null,Vt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ea||(Ea=!0,W0(vl,function(){return Rs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=In.transition,In.transition=null;var o=rt;rt=1;var a=Qe;Qe|=4,yf.current=null,K_(t,n),U0(n,t),M_(nd),_l=!!td,nd=td=null,t.current=n,Z_(n),bx(),Qe=a,rt=o,In.transition=s}else t.current=n;if(Ea&&(Ea=!1,Vi=t,Ul=r),s=t.pendingLanes,s===0&&(qi=null),Px(n.stateNode),fn(t,Tt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nl)throw Nl=!1,t=Md,Md=null,t;return Ul&1&&t.tag!==0&&Rs(),s=t.pendingLanes,s&1?t===Ed?Ro++:(Ro=0,Ed=t):Ro=0,lr(),null}function Rs(){if(Vi!==null){var t=Sg(Ul),e=In.transition,n=rt;try{if(In.transition=null,rt=16>t?16:t,Vi===null)var i=!1;else{if(t=Vi,Vi=null,Ul=0,Qe&6)throw Error(ue(331));var r=Qe;for(Qe|=4,Me=t.current;Me!==null;){var s=Me,o=s.child;if(Me.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Me=c;Me!==null;){var f=Me;switch(f.tag){case 0:case 11:case 15:bo(8,f,s)}var h=f.child;if(h!==null)h.return=f,Me=h;else for(;Me!==null;){f=Me;var d=f.sibling,p=f.return;if(D0(f),f===c){Me=null;break}if(d!==null){d.return=p,Me=d;break}Me=p}}}var v=s.alternate;if(v!==null){var _=v.child;if(_!==null){v.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}Me=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Me=o;else e:for(;Me!==null;){if(s=Me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:bo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Me=u;break e}Me=s.return}}var x=t.current;for(Me=x;Me!==null;){o=Me;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,Me=g;else e:for(o=x;Me!==null;){if(a=Me,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:rc(9,a)}}catch(b){wt(a,a.return,b)}if(a===o){Me=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,Me=y;break e}Me=a.return}}if(Qe=r,lr(),ri&&typeof ri.onPostCommitFiberRoot=="function")try{ri.onPostCommitFiberRoot(Kl,t)}catch{}i=!0}return i}finally{rt=n,In.transition=e}}return!1}function qh(t,e,n){e=zs(n,e),e=S0(t,e,1),t=$i(t,e,1),e=nn(),t!==null&&(ea(t,1,e),fn(t,e))}function wt(t,e,n){if(t.tag===3)qh(t,t,n);else for(;e!==null;){if(e.tag===3){qh(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(qi===null||!qi.has(i))){t=zs(n,t),t=M0(e,t,1),e=$i(e,t,1),t=nn(),e!==null&&(ea(e,1,t),fn(e,t));break}}e=e.return}}function iy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=nn(),t.pingedLanes|=t.suspendedLanes&n,Bt===t&&(Vt&n)===n&&(It===4||It===3&&(Vt&130023424)===Vt&&500>Tt()-Mf?Pr(t,0):Sf|=n),fn(t,e)}function V0(t,e){e===0&&(t.mode&1?(e=ha,ha<<=1,!(ha&130023424)&&(ha=4194304)):e=1);var n=nn();t=Ei(t,e),t!==null&&(ea(t,e,n),fn(t,n))}function ry(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),V0(t,n)}function sy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ue(314))}i!==null&&i.delete(e),V0(t,n)}var G0;G0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||un.current)cn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return cn=!1,X_(t,e,n);cn=!!(t.flags&131072)}else cn=!1,pt&&e.flags&1048576&&Yg(e,Al,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;al(t,e),t=e.pendingProps;var r=Us(e,Zt.current);Cs(e,n),r=mf(null,e,i,t,r,n);var s=gf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,dn(i)?(s=!0,wl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,uf(e),r.updater=ic,e.stateNode=r,r._reactInternals=e,dd(e,i,t,n),e=pd(null,e,i,!0,s,n)):(e.tag=0,pt&&s&&nf(e),en(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(al(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ay(i),t=Hn(i,t),r){case 0:e=hd(null,e,i,t,n);break e;case 1:e=zh(null,e,i,t,n);break e;case 11:e=Oh(null,e,i,t,n);break e;case 14:e=kh(null,e,i,Hn(i.type,t),n);break e}throw Error(ue(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),hd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),zh(t,e,i,r,n);case 3:e:{if(A0(e),t===null)throw Error(ue(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Qg(t,e),Rl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=zs(Error(ue(423)),e),e=Bh(t,e,i,n,r);break e}else if(i!==r){r=zs(Error(ue(424)),e),e=Bh(t,e,i,n,r);break e}else for(Mn=Yi(e.stateNode.containerInfo.firstChild),En=e,pt=!0,Wn=null,n=Zg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Fs(),i===r){e=wi(t,e,n);break e}en(t,e,i,n)}e=e.child}return e;case 5:return e0(e),t===null&&ld(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,id(i,r)?o=null:s!==null&&id(i,s)&&(e.flags|=32),T0(t,e),en(t,e,o,n),e.child;case 6:return t===null&&ld(e),null;case 13:return b0(t,e,n);case 4:return df(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Os(e,null,i,n):en(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),Oh(t,e,i,r,n);case 7:return en(t,e,e.pendingProps,n),e.child;case 8:return en(t,e,e.pendingProps.children,n),e.child;case 12:return en(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ct(bl,i._currentValue),i._currentValue=o,s!==null)if(qn(s.value,o)){if(s.children===r.children&&!un.current){e=wi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=yi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),cd(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ue(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),cd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}en(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Cs(e,n),r=Nn(r),i=i(r),e.flags|=1,en(t,e,i,n),e.child;case 14:return i=e.type,r=Hn(i,e.pendingProps),r=Hn(i.type,r),kh(t,e,i,r,n);case 15:return E0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Hn(i,r),al(t,e),e.tag=1,dn(i)?(t=!0,wl(e)):t=!1,Cs(e,n),y0(e,i,r),dd(e,i,r,n),pd(null,e,i,!0,t,n);case 19:return C0(t,e,n);case 22:return w0(t,e,n)}throw Error(ue(156,e.tag))};function W0(t,e){return vg(t,e)}function oy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ln(t,e,n,i){return new oy(t,e,n,i)}function Af(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ay(t){if(typeof t=="function")return Af(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Wd)return 11;if(t===jd)return 14}return 2}function Zi(t,e){var n=t.alternate;return n===null?(n=Ln(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function ul(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Af(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ds:return Lr(n.children,r,s,e);case Gd:o=8,r|=8;break;case Uu:return t=Ln(12,n,e,r|2),t.elementType=Uu,t.lanes=s,t;case Fu:return t=Ln(13,n,e,r),t.elementType=Fu,t.lanes=s,t;case Ou:return t=Ln(19,n,e,r),t.elementType=Ou,t.lanes=s,t;case eg:return oc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Jm:o=10;break e;case Qm:o=9;break e;case Wd:o=11;break e;case jd:o=14;break e;case Ui:o=16,i=null;break e}throw Error(ue(130,t==null?t:typeof t,""))}return e=Ln(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Lr(t,e,n,i){return t=Ln(7,t,i,e),t.lanes=n,t}function oc(t,e,n,i){return t=Ln(22,t,i,e),t.elementType=eg,t.lanes=n,t.stateNode={isHidden:!1},t}function Wc(t,e,n){return t=Ln(6,t,null,e),t.lanes=n,t}function jc(t,e,n){return e=Ln(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ly(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Tc(0),this.expirationTimes=Tc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Tc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function bf(t,e,n,i,r,s,o,a,l){return t=new ly(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Ln(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},uf(s),t}function cy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:us,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function j0(t){if(!t)return tr;t=t._reactInternals;e:{if(Hr(t)!==t||t.tag!==1)throw Error(ue(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(dn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ue(171))}if(t.tag===1){var n=t.type;if(dn(n))return jg(t,n,e)}return e}function X0(t,e,n,i,r,s,o,a,l){return t=bf(n,i,!0,t,r,s,o,a,l),t.context=j0(null),n=t.current,i=nn(),r=Ki(n),s=yi(i,r),s.callback=e??null,$i(n,s,r),t.current.lanes=r,ea(t,r,i),fn(t,i),t}function ac(t,e,n,i){var r=e.current,s=nn(),o=Ki(r);return n=j0(n),e.context===null?e.context=n:e.pendingContext=n,e=yi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=$i(r,e,o),t!==null&&(Yn(t,r,o,s),rl(t,r,o)),o}function Ol(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Kh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Cf(t,e){Kh(t,e),(t=t.alternate)&&Kh(t,e)}function uy(){return null}var Y0=typeof reportError=="function"?reportError:function(t){console.error(t)};function Rf(t){this._internalRoot=t}lc.prototype.render=Rf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ue(409));ac(t,e,null,null)};lc.prototype.unmount=Rf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){ac(null,t,null,null)}),e[Mi]=null}};function lc(t){this._internalRoot=t}lc.prototype.unstable_scheduleHydration=function(t){if(t){var e=wg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ki.length&&e!==0&&e<ki[n].priority;n++);ki.splice(n,0,t),n===0&&Ag(t)}};function Pf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function cc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Zh(){}function dy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ol(o);s.call(c)}}var o=X0(e,i,t,0,null,!1,!1,"",Zh);return t._reactRootContainer=o,t[Mi]=o.current,Ho(t.nodeType===8?t.parentNode:t),Fr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ol(l);a.call(c)}}var l=bf(t,0,!1,null,null,!1,!1,"",Zh);return t._reactRootContainer=l,t[Mi]=l.current,Ho(t.nodeType===8?t.parentNode:t),Fr(function(){ac(e,l,n,i)}),l}function uc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ol(o);a.call(l)}}ac(e,o,t,r)}else o=dy(n,e,t,r,i);return Ol(o)}Mg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=xo(e.pendingLanes);n!==0&&($d(e,n|1),fn(e,Tt()),!(Qe&6)&&(Bs=Tt()+500,lr()))}break;case 13:Fr(function(){var i=Ei(t,1);if(i!==null){var r=nn();Yn(i,t,1,r)}}),Cf(t,1)}};qd=function(t){if(t.tag===13){var e=Ei(t,134217728);if(e!==null){var n=nn();Yn(e,t,134217728,n)}Cf(t,134217728)}};Eg=function(t){if(t.tag===13){var e=Ki(t),n=Ei(t,e);if(n!==null){var i=nn();Yn(n,t,e,i)}Cf(t,e)}};wg=function(){return rt};Tg=function(t,e){var n=rt;try{return rt=t,e()}finally{rt=n}};Yu=function(t,e,n){switch(e){case"input":if(Bu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=ec(i);if(!r)throw Error(ue(90));ng(i),Bu(i,r)}}}break;case"textarea":rg(t,n);break;case"select":e=n.value,e!=null&&ws(t,!!n.multiple,e,!1)}};dg=Ef;fg=Fr;var fy={usingClientEntryPoint:!1,Events:[na,ms,ec,cg,ug,Ef]},oo={findFiberByHostInstance:Tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},hy={bundleType:oo.bundleType,version:oo.version,rendererPackageName:oo.rendererPackageName,rendererConfig:oo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ti.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=mg(t),t===null?null:t.stateNode},findFiberByHostInstance:oo.findFiberByHostInstance||uy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wa.isDisabled&&wa.supportsFiber)try{Kl=wa.inject(hy),ri=wa}catch{}}Tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fy;Tn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pf(e))throw Error(ue(200));return cy(t,e,null,n)};Tn.createRoot=function(t,e){if(!Pf(t))throw Error(ue(299));var n=!1,i="",r=Y0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=bf(t,1,!1,null,null,n,!1,i,r),t[Mi]=e.current,Ho(t.nodeType===8?t.parentNode:t),new Rf(e)};Tn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ue(188)):(t=Object.keys(t).join(","),Error(ue(268,t)));return t=mg(e),t=t===null?null:t.stateNode,t};Tn.flushSync=function(t){return Fr(t)};Tn.hydrate=function(t,e,n){if(!cc(e))throw Error(ue(200));return uc(null,t,e,!0,n)};Tn.hydrateRoot=function(t,e,n){if(!Pf(t))throw Error(ue(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Y0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=X0(e,null,t,1,n??null,r,!1,s,o),t[Mi]=e.current,Ho(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new lc(e)};Tn.render=function(t,e,n){if(!cc(e))throw Error(ue(200));return uc(null,t,e,!1,n)};Tn.unmountComponentAtNode=function(t){if(!cc(t))throw Error(ue(40));return t._reactRootContainer?(Fr(function(){uc(null,null,t,!1,function(){t._reactRootContainer=null,t[Mi]=null})}),!0):!1};Tn.unstable_batchedUpdates=Ef;Tn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!cc(n))throw Error(ue(200));if(t==null||t._reactInternals===void 0)throw Error(ue(38));return uc(t,e,n,!1,i)};Tn.version="18.3.1-next-f1338f8080-20240426";function $0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($0)}catch(t){console.error(t)}}$0(),$m.exports=Tn;var py=$m.exports,Jh=py;Iu.createRoot=Jh.createRoot,Iu.hydrateRoot=Jh.hydrateRoot;function q0(t,e){const n=t.x+t.width/2,i=t.y+t.height/2;let r=0,s=-1,o=1/0;if(e.polygon&&e.polygon.length>=3){const a=e.polygon;let l=0;for(let f=0;f<a.length;f++){const[h,d]=a[f],[p,v]=a[(f+1)%a.length];l+=h*v-p*d}const c=l>0;for(let f=0;f<a.length;f++){const[h,d]=a[f],[p,v]=a[(f+1)%a.length],_=p-h,m=v-d,u=Math.sqrt(_*_+m*m);if(u<.01)continue;let x=((n-h)*_+(i-d)*m)/(u*u);x=Math.max(0,Math.min(1,x));const g=h+x*_,y=d+x*m,b=Math.sqrt((n-g)**2+(i-y)**2);b<o&&(o=b,r=c?-m/u:m/u,s=c?_/u:-_/u)}}else{const a=i,l=e.height-i,c=n,f=e.width-n;o=Math.min(a,l,c,f),o===a?(r=0,s=1):o===l?(r=0,s=-1):o===c?(r=1,s=0):(r=-1,s=0)}return o>.3&&(t.height>t.width*1.2?(r=n<e.width/2?1:-1,s=0):t.width>t.height*1.2&&(r=0,s=i<e.height/2?1:-1)),{nx:r,ny:s}}function my(t){const e=t.rotation*Math.PI/180,n=Math.abs(Math.cos(e)),i=Math.abs(Math.sin(e));return{ew:t.width*n+t.height*i,eh:t.width*i+t.height*n}}function gy(t,e){const{ew:n,eh:i}=my(t),r=(n-t.width)/2,s=(i-t.height)/2,o=t.x-r,a=t.y-s,l=o+n,c=a+i,f=.5,d=[{wall:"top",dist:Math.abs(a)},{wall:"bottom",dist:Math.abs(e.height-c)},{wall:"left",dist:Math.abs(o)},{wall:"right",dist:Math.abs(e.width-l)}].reduce((p,v)=>p.dist<v.dist?p:v);return d.dist<f?d.wall:null}const Ps={bed:{label:"Bed",defaultWidth:1.4,defaultHeight:2,color:"#4299e1",emoji:"🛏",description:"Single/double bed"},sofa:{label:"Sofa",defaultWidth:2,defaultHeight:.9,color:"#48bb78",emoji:"🛋",description:"Living room sofa"},table:{label:"Table",defaultWidth:1.2,defaultHeight:.8,color:"#ed8936",emoji:"🪑",description:"Dining / coffee table"},desk:{label:"Desk",defaultWidth:1.2,defaultHeight:.6,color:"#4fd1c5",emoji:"🖥",description:"Work desk"},chair:{label:"Chair",defaultWidth:.5,defaultHeight:.5,color:"#b794f4",emoji:"💺",description:"Chair / stool"},wardrobe:{label:"Wardrobe",defaultWidth:1.2,defaultHeight:.6,color:"#fc8181",emoji:"🗄",description:"Wardrobe / almirah"},cabinet:{label:"Cabinet",defaultWidth:.8,defaultHeight:.4,color:"#f6e05e",emoji:"📦",description:"Storage cabinet"},door:{label:"Door",defaultWidth:.9,defaultHeight:.15,color:"#fbd38d",emoji:"🚪",description:"Door opening"},window:{label:"Window",defaultWidth:1.2,defaultHeight:.15,color:"#90cdf4",emoji:"🪟",description:"Window opening"},radar:{label:"Radar",defaultWidth:.08,defaultHeight:.08,color:"#a78bfa",emoji:"📡",description:"mmWave radar sensor"},person:{label:"Person",defaultWidth:.45,defaultHeight:.45,color:"#f6ad55",emoji:"🧍",description:"Human / radar target"},custom:{label:"Custom",defaultWidth:.5,defaultHeight:.5,color:"#718096",emoji:"⬜",description:"Custom obstacle"}},Xc=.05;function vy(t){const e=t.rotation*Math.PI/180,n=Math.abs(Math.cos(e)),i=Math.abs(Math.sin(e));return{ew:t.width*n+t.height*i,eh:t.width*i+t.height*n}}function Qh(t,e,n,i,r){const{ew:s,eh:o}=vy(t),a=(s-t.width)/2,l=(o-t.height)/2;return{x:Math.max(a,Math.min(e,i-t.width-a)),y:Math.max(l,Math.min(n,r-t.height-l))}}function xy({w:t,h:e,facing:n=0}){const r="#1a1a1a",s=n===0||n===180,o=Math.min(s?e*.18:t*.18,28),a=Math.min(s?e*.06:t*.06,8),l=Math.min(o*.85,22),c=s?t*.38:e*.38,f=4;let h,d,p,v;const m=((s?t:e)-c*2)/3;if(n===0){h={x:0,y:0,w:t,h:o},d={x:0,y:e-a,w:t,h:a};const u=o+f;p=[{x:m,y:u,w:c,h:l},{x:m*2+c,y:u,w:c,h:l}],v={x1:0,y1:u+l+f,x2:t,y2:u+l+f}}else if(n===180){h={x:0,y:e-o,w:t,h:o},d={x:0,y:0,w:t,h:a};const u=e-o-f-l;p=[{x:m,y:u,w:c,h:l},{x:m*2+c,y:u,w:c,h:l}],v={x1:0,y1:u-f,x2:t,y2:u-f}}else if(n===90){h={x:t-o,y:0,w:o,h:e},d={x:0,y:0,w:a,h:e};const u=t-o-f-l;p=[{x:u,y:m,w:l,h:c},{x:u,y:m*2+c,w:l,h:c}],v={x1:u-f,y1:0,x2:u-f,y2:e}}else{h={x:0,y:0,w:o,h:e},d={x:t-a,y:0,w:a,h:e};const u=o+f;p=[{x:u,y:m,w:l,h:c},{x:u,y:m*2+c,w:l,h:c}],v={x1:u+l+f,y1:0,x2:u+l+f,y2:e}}return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"#ffffff",rx:2}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"#f8f8f8",rx:2}),M.jsx("rect",{x:h.x,y:h.y,width:h.w,height:h.h,fill:"#2a2a2a",rx:2}),M.jsx("rect",{x:d.x,y:d.y,width:d.w,height:d.h,fill:"#2a2a2a",rx:1}),p.map((u,x)=>M.jsx("rect",{x:u.x,y:u.y,width:u.w,height:u.h,fill:"#ffffff",stroke:r,strokeWidth:1.8,rx:3},x)),M.jsx("line",{x1:v.x1,y1:v.y1,x2:v.x2,y2:v.y2,stroke:r,strokeWidth:1.8*.7}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"none",stroke:r,strokeWidth:1.8,rx:2})]})}function _y({w:t,h:e,color:n}){const i=e*.35,r=Math.min(t*.1,10);return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:n+"20",rx:3}),M.jsx("rect",{x:0,y:0,width:t,height:i,fill:n+"bb",rx:3}),M.jsx("rect",{x:0,y:i,width:r,height:e-i,fill:n+"90",rx:2}),M.jsx("rect",{x:t-r,y:i,width:r,height:e-i,fill:n+"90",rx:2}),t>60&&M.jsxs(M.Fragment,{children:[M.jsx("rect",{x:r+2,y:i+3,width:(t-r*2-4)/2-2,height:e-i-6,fill:n+"50",stroke:n+"60",strokeWidth:.5,rx:2}),M.jsx("rect",{x:t/2+2,y:i+3,width:(t-r*2-4)/2-2,height:e-i-6,fill:n+"50",stroke:n+"60",strokeWidth:.5,rx:2})]}),Math.min(t,e)>30&&M.jsx("text",{x:t/2,y:i+(e-i)/2+Math.min(t,e)*.13,textAnchor:"middle",fontSize:Math.min(t,e)*.32,style:{userSelect:"none",pointerEvents:"none"},children:"🛋"}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"none",stroke:n,strokeWidth:1.5,rx:3})]})}function yy({w:t,h:e,color:n}){if(e>t*1.5){const r=Math.min(t*1.6,8),s=t/2;return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:n+"38",rx:1}),M.jsx("line",{x1:s-r,y1:1.5,x2:s+r,y2:1.5,stroke:n,strokeWidth:2.5,strokeLinecap:"round"}),M.jsx("line",{x1:s-r,y1:e-1.5,x2:s+r,y2:e-1.5,stroke:n,strokeWidth:2.5,strokeLinecap:"round"}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"none",stroke:n,strokeWidth:1.2,rx:1}),M.jsx("path",{d:`M ${s} ${e*.18} A ${t*.9} ${t*.9} 0 0 1 ${s} ${e*.18+t*.9*2}`,fill:"none",stroke:n+"90",strokeWidth:.8,strokeDasharray:"3 2",clipPath:"inset(0 0 0 0)"}),M.jsx("circle",{cx:s,cy:e*.18,r:2,fill:n})]})}const i=t;return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:n+"30",stroke:n,strokeWidth:1.5,rx:2}),M.jsx("path",{d:`M 0 ${e/2} A ${i} ${i} 0 0 1 ${i} ${e/2}`,fill:n+"12",stroke:n+"70",strokeWidth:1,strokeDasharray:"4 3"}),M.jsx("line",{x1:0,y1:e/2,x2:i,y2:e/2,stroke:n+"70",strokeWidth:.8,strokeDasharray:"4 3"}),M.jsx("circle",{cx:0,cy:e/2,r:2.5,fill:n})]})}function Sy({w:t,h:e}){const n=t>=e,i=n?Math.max(2,Math.min(e*.18,5)):Math.max(2,Math.min(t*.18,5)),r="rgba(147,210,255,0.38)",s="rgba(100,180,255,0.85)",o="#1e3a5c",a="#2c5282";if(n){const h=e-i*2,d=Math.max(1,Math.floor(t/30)),p=t/d;return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:a,rx:1}),M.jsx("rect",{x:0,y:i,width:t,height:h,fill:r}),Array.from({length:d-1},(v,_)=>M.jsx("line",{x1:(_+1)*p,y1:i,x2:(_+1)*p,y2:i+h,stroke:s,strokeWidth:1.2},_)),M.jsx("rect",{x:0,y:0,width:t,height:i,fill:o}),M.jsx("rect",{x:0,y:e-i,width:t,height:i,fill:o}),Array.from({length:d},(v,_)=>{const u=_*p+p*.22,x=p*.28;return M.jsx("line",{x1:u,y1:i+1.5,x2:u+x,y2:i+h-1.5,stroke:"rgba(255,255,255,0.55)",strokeWidth:1,strokeLinecap:"round"},_)}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"none",stroke:s,strokeWidth:1.2,rx:1})]})}const l=t-i*2,c=Math.max(1,Math.floor(e/30)),f=e/c;return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:a,rx:1}),M.jsx("rect",{x:i,y:0,width:l,height:e,fill:r}),Array.from({length:c-1},(h,d)=>M.jsx("line",{x1:i,y1:(d+1)*f,x2:i+l,y2:(d+1)*f,stroke:s,strokeWidth:1.2},d)),M.jsx("rect",{x:0,y:0,width:i,height:e,fill:o}),M.jsx("rect",{x:t-i,y:0,width:i,height:e,fill:o}),Array.from({length:c},(h,d)=>{const v=d*f+f*.22,_=f*.28;return M.jsx("line",{x1:i+1.5,y1:v,x2:i+l-1.5,y2:v+_,stroke:"rgba(255,255,255,0.55)",strokeWidth:1,strokeLinecap:"round"},d)}),M.jsx("rect",{x:0,y:0,width:t,height:e,fill:"none",stroke:s,strokeWidth:1.2,rx:1})]})}function My({w:t,h:e,color:n}){const i=t/2,r=e/2,s=Math.min(t,e)/2-1;return M.jsxs("g",{children:[M.jsx("circle",{cx:i,cy:r,r:s,fill:n+"25",stroke:n,strokeWidth:1.5}),M.jsx("circle",{cx:i,cy:r,r:s*.6,fill:"none",stroke:n+"60",strokeWidth:.8}),M.jsx("circle",{cx:i,cy:r,r:s*.25,fill:n}),M.jsx("line",{x1:i,y1:r,x2:i+s*.8,y2:r-s*.4,stroke:n,strokeWidth:1.5,strokeLinecap:"round"})]})}function Ey({w:t,h:e,color:n}){const i=t/2,r=Math.min(t,e)*.22;return M.jsxs("g",{children:[M.jsx("circle",{cx:i,cy:r+2,r,fill:n+"80",stroke:n,strokeWidth:1}),M.jsx("ellipse",{cx:i,cy:e*.65,rx:t*.32,ry:e*.28,fill:n+"50",stroke:n,strokeWidth:1})]})}function wy({w:t,h:e,color:n,emoji:i}){const r=Math.min(t,e)*.45;return M.jsxs("g",{children:[M.jsx("rect",{x:0,y:0,width:t,height:e,fill:n+"22",stroke:n,strokeWidth:1.5,rx:3}),M.jsx("text",{x:t/2,y:e/2+r*.35,textAnchor:"middle",fontSize:r,style:{userSelect:"none",pointerEvents:"none"},children:i})]})}function Ty({obj:t,scale:e}){const n=t.width*e,i=t.height*e,{color:r,type:s}=t,{emoji:o}=Ps[s];switch(s){case"bed":return M.jsx(xy,{w:n,h:i,color:r,facing:t.rotation});case"sofa":return M.jsx(_y,{w:n,h:i,color:r});case"door":return M.jsx(yy,{w:n,h:i,color:r});case"window":return M.jsx(Sy,{w:n,h:i,color:r});case"radar":return M.jsx(My,{w:n,h:i,color:r});case"person":return M.jsx(Ey,{w:n,h:i,color:r});default:return M.jsx(wy,{w:n,h:i,color:r,emoji:o})}}const Ay=({room:t,objects:e,selectedId:n,onSelect:i,onUpdate:r,dark:s,adjacentRooms:o=[],radarObj:a=null})=>{const l=Je.useRef(null),[c,f]=Je.useState(100);function h(){if(!l.current)return;const{clientWidth:P,clientHeight:X}=l.current;f(Math.min((P-120)/t.width,(X-120)/t.height))}Je.useEffect(()=>{h()},[t.width,t.height]),Je.useEffect(()=>{const P=new ResizeObserver(()=>h());return l.current&&P.observe(l.current),()=>P.disconnect()},[t.width,t.height]);const d=t.width*c,p=t.height*c,v=48,_=o.filter(P=>P.wall==="left").reduce((P,X)=>Math.max(P,X.width*c),0),m=o.filter(P=>P.wall==="top").reduce((P,X)=>Math.max(P,X.height*c),0),u=o.filter(P=>P.wall==="right").reduce((P,X)=>Math.max(P,X.width*c),0),x=o.filter(P=>P.wall==="bottom").reduce((P,X)=>Math.max(P,X.height*c),0),g=v+_,y=v+m,b=Je.useRef(null);function T(P,X){if(P.button!==0)return;P.stopPropagation(),i(X);const ne=e.find(z=>z.id===X);ne&&(P.currentTarget.setPointerCapture(P.pointerId),b.current={id:X,sx:P.clientX,sy:P.clientY,ix:ne.x,iy:ne.y})}function C(P){if(!b.current)return;const{id:X,sx:ne,sy:z,ix:q,iy:ie}=b.current,re=e.find(F=>F.id===X);if(!re)return;const de=F=>Math.round(F/Xc)*Xc,ye=de(q+(P.clientX-ne)/c),we=de(ie+(P.clientY-z)/c);r(X,Qh(re,ye,we,t.width,t.height))}function N(){b.current=null}Je.useEffect(()=>{function P(X){var re;if(((re=X.target)==null?void 0:re.tagName)==="INPUT"||!n)return;const ne=e.find(de=>de.id===n);if(!ne)return;const z=X.shiftKey?.5:Xc;let q=ne.x,ie=ne.y;X.key==="ArrowLeft"&&(q-=z),X.key==="ArrowRight"&&(q+=z),X.key==="ArrowUp"&&(ie-=z),X.key==="ArrowDown"&&(ie+=z),(X.key==="r"||X.key==="R")&&r(n,{rotation:(ne.rotation+45)%360}),(X.key==="Delete"||X.key==="Backspace")&&r(n,{}),(q!==ne.x||ie!==ne.y)&&r(n,Qh(ne,q,ie,t.width,t.height))}return window.addEventListener("keydown",P),()=>window.removeEventListener("keydown",P)},[n,e,t.width,t.height,r]);const A=s?"#334155":"#94a3b8",E=s?"rgba(148,163,184,0.07)":"rgba(100,116,139,0.1)",L=s?"rgba(148,163,184,0.03)":"rgba(100,116,139,0.05)",O=s?"#0f1923":"#fafbfc",I=s?"#1e293b":"#f1f5f9",G=s?"#334155":"#94a3b8",W=s?"#2d3f50":"#cbd5e1",V=s?"rgba(148,163,184,0.12)":"rgba(100,116,139,0.12)",Z=g+d+u+20,U=y+p+x+20,B=[],k=[];for(let P=0;P<=t.width;P+=.5)B.push(P);for(let P=0;P<=t.height;P+=.5)k.push(P);return M.jsxs(M.Fragment,{children:[M.jsx("div",{ref:l,className:"absolute inset-0",style:{background:s?"#090e14":"#f0f4f8",backgroundImage:`radial-gradient(circle, ${V} 1px, transparent 1px)`,backgroundSize:"24px 24px",overflow:"auto"},children:M.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minWidth:"100%",minHeight:"100%",padding:32,boxSizing:"border-box"},children:M.jsxs("svg",{width:Z,height:U,onPointerMove:C,onPointerUp:N,style:{overflow:"visible",cursor:"default"},children:[M.jsx("rect",{x:0,y:0,width:Z,height:U,fill:"transparent",style:{cursor:"default"},onPointerDown:()=>i(null)}),M.jsxs("defs",{children:[M.jsx("pattern",{id:"grid1m",x:g,y,width:c,height:c,patternUnits:"userSpaceOnUse",children:M.jsx("path",{d:`M ${c} 0 L 0 0 0 ${c}`,fill:"none",stroke:E,strokeWidth:"1"})}),M.jsx("pattern",{id:"grid50cm",x:g,y,width:c/2,height:c/2,patternUnits:"userSpaceOnUse",children:M.jsx("path",{d:`M ${c/2} 0 L 0 0 0 ${c/2}`,fill:"none",stroke:L,strokeWidth:"0.5"})}),M.jsxs("filter",{id:"glow",children:[M.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),M.jsxs("feMerge",{children:[M.jsx("feMergeNode",{in:"blur"}),M.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),o.map(P=>{const X=e.find(Ee=>Ee.id===P.doorId);let ne=g,z=y,q=P.width*c,ie=P.height*c;const re=X?(()=>{const Ee=X.rotation*Math.PI/180,Se=Math.abs(Math.cos(Ee)),ke=Math.abs(Math.sin(Ee)),De=X.width*Se+X.height*ke;return X.x-(De-X.width)/2})():0,de=X?(()=>{const Ee=X.rotation*Math.PI/180,Se=Math.abs(Math.cos(Ee)),ke=Math.abs(Math.sin(Ee)),De=X.width*ke+X.height*Se;return X.y-(De-X.height)/2})():0;P.wall==="left"?(q=P.width*c,ie=P.height*c,ne=g-q,z=X?y+de*c:y):P.wall==="right"?(q=P.width*c,ie=P.height*c,ne=g+d,z=X?y+de*c:y):P.wall==="top"?(q=P.width*c,ie=P.height*c,z=y-ie,ne=X?g+re*c:g):P.wall==="bottom"&&(q=P.width*c,ie=P.height*c,z=y+p,ne=X?g+re*c:g);const ye=ne+q/2,we=z+ie/2,Ue={room:{fill:s?"#0f1e30":"#eef2f7",stroke:s?"rgba(99,102,241,0.5)":"rgba(99,102,241,0.4)",textCol:s?"#4a5568":"#6366f1",emoji:"🏠"},passage:{fill:s?"#0a1f18":"#ecfdf5",stroke:s?"rgba(16,185,129,0.5)":"rgba(16,185,129,0.4)",textCol:s?"#2d6a4f":"#059669",emoji:"🚶"},bathroom:{fill:s?"#081e26":"#ecfeff",stroke:s?"rgba(6,182,212,0.5)":"rgba(6,182,212,0.4)",textCol:s?"#164e63":"#0891b2",emoji:"🚿"}}[P.roomType??"room"],Fe=q>40&&ie>40;return M.jsxs("g",{children:[M.jsx("rect",{x:ne,y:z,width:q,height:ie,fill:Ue.fill,stroke:Ue.stroke,strokeWidth:1.5,strokeDasharray:"8 4",rx:2}),Fe&&M.jsx("text",{x:ye,y:we-8,textAnchor:"middle",fontSize:Math.min(q,ie)*.22,style:{pointerEvents:"none"},children:Ue.emoji}),M.jsx("text",{x:ye,y:we+(Fe?10:0),textAnchor:"middle",fontSize:10,fontWeight:600,fill:Ue.textCol,fontFamily:"Inter, system-ui",style:{pointerEvents:"none"},children:P.name}),M.jsxs("text",{x:ye,y:we+(Fe?22:12),textAnchor:"middle",fontSize:8,fill:Ue.textCol,fontFamily:"monospace",style:{pointerEvents:"none",opacity:.7},children:[P.width,"×",P.height," m"]}),(P.doors??[]).map(Ee=>{const Se=Ee.width*c,ke="#fbd38d";let De=0,Pe=0,Ze=0,D=0;return Ee.wall==="top"&&(De=ne+Ee.position*c,Pe=z,Ze=Se,D=6),Ee.wall==="bottom"&&(De=ne+Ee.position*c,Pe=z+ie-6,Ze=Se,D=6),Ee.wall==="left"&&(De=ne,Pe=z+Ee.position*c,Ze=6,D=Se),Ee.wall==="right"&&(De=ne+q-6,Pe=z+Ee.position*c,Ze=6,D=Se),M.jsxs("g",{children:[M.jsx("rect",{x:De,y:Pe,width:Ze,height:D,fill:ke,rx:1}),M.jsx("text",{x:De+Ze/2,y:Pe-3,textAnchor:"middle",fontSize:7,fill:ke,fontFamily:"monospace",style:{pointerEvents:"none"},children:Ee.label})]},Ee.id)})]},P.id)}),M.jsx("rect",{x:g,y:y-v+2,width:d,height:v-2,fill:I,rx:2}),M.jsx("rect",{x:g-v+2,y,width:v-2,height:p,fill:I,rx:2}),B.map(P=>{const X=g+P*c,ne=P%1===0;return M.jsxs("g",{children:[M.jsx("line",{x1:X,y1:ne?y-10:y-6,x2:X,y2:y-2,stroke:W,strokeWidth:ne?1:.5}),ne&&P>0&&P<t.width&&M.jsxs("text",{x:X,y:y-13,textAnchor:"middle",fontSize:8,fill:G,fontFamily:"monospace",children:[P,"m"]})]},`h${P}`)}),k.map(P=>{const X=y+P*c,ne=P%1===0;return M.jsxs("g",{children:[M.jsx("line",{x1:ne?g-10:g-6,y1:X,x2:g-2,y2:X,stroke:W,strokeWidth:ne?1:.5}),ne&&P>0&&P<t.height&&M.jsx("text",{x:g-13,y:X+3,textAnchor:"end",fontSize:8,fill:G,fontFamily:"monospace",children:P})]},`v${P}`)}),t.polygon?M.jsxs(M.Fragment,{children:[M.jsx("defs",{children:M.jsx("clipPath",{id:"roomClip",children:M.jsx("polygon",{points:t.polygon.map(([P,X])=>`${g+P*c},${y+X*c}`).join(" ")})})}),M.jsx("polygon",{points:t.polygon.map(([P,X])=>`${g+P*c},${y+X*c}`).join(" "),fill:O}),M.jsx("rect",{x:g,y,width:d,height:p,fill:"url(#grid50cm)",clipPath:"url(#roomClip)"}),M.jsx("rect",{x:g,y,width:d,height:p,fill:"url(#grid1m)",clipPath:"url(#roomClip)"}),M.jsx("polygon",{points:t.polygon.map(([P,X])=>`${g+P*c},${y+X*c}`).join(" "),fill:"none",stroke:A,strokeWidth:3})]}):M.jsxs(M.Fragment,{children:[M.jsx("rect",{x:g,y,width:d,height:p,fill:O}),M.jsx("rect",{x:g,y,width:d,height:p,fill:"url(#grid50cm)"}),M.jsx("rect",{x:g,y,width:d,height:p,fill:"url(#grid1m)"}),M.jsx("rect",{x:g,y,width:d,height:p,fill:"none",stroke:A,strokeWidth:3})]}),(()=>{const P=a?-(a.x+a.width/2):0,X=a?-(a.y+a.height/2):0,ne=z=>z%1===0?String(z):z.toFixed(2);return[{t:`${ne(P)},${ne(X)}`,x:g+4,y:y+10},{t:`${ne(P+t.width)},${ne(X)}`,x:g+d-4,y:y+10,anchor:"end"},{t:`${ne(P)},${ne(X+t.height)}`,x:g+4,y:y+p-4},{t:`${ne(P+t.width)},${ne(X+t.height)}`,x:g+d-4,y:y+p-4,anchor:"end"}].map(({t:z,x:q,y:ie,anchor:re})=>M.jsx("text",{x:q,y:ie,fontSize:8,fill:s?"#1e3a5f":"#cbd5e1",fontFamily:"monospace",textAnchor:re||"start",children:z},z))})(),a&&(()=>{const ne=a.x+a.width/2,z=a.y+a.height/2,q=g+ne*c,ie=y+z*c;let re=0,de=-1,ye=1/0;if(t.polygon&&t.polygon.length>=3){const se=t.polygon;let xe=0;for(let Ae=0;Ae<se.length;Ae++){const[me,ze]=se[Ae],[Ve,lt]=se[(Ae+1)%se.length];xe+=me*lt-Ve*ze}const Ie=xe>0;for(let Ae=0;Ae<se.length;Ae++){const[me,ze]=se[Ae],[Ve,lt]=se[(Ae+1)%se.length],S=Ve-me,Q=lt-ze,$=Math.sqrt(S*S+Q*Q);if($<.01)continue;let te=((ne-me)*S+(z-ze)*Q)/($*$);te=Math.max(0,Math.min(1,te));const ae=me+te*S,Le=ze+te*Q,Be=Math.sqrt((ne-ae)**2+(z-Le)**2);Be<ye&&(ye=Be,re=Ie?-Q/$:Q/$,de=Ie?S/$:-S/$)}}else{const se=z,xe=t.height-z,Ie=ne,Ae=t.width-ne;ye=Math.min(se,xe,Ie,Ae),ye===se?(re=0,de=1):ye===xe?(re=0,de=-1):ye===Ie?(re=1,de=0):(re=-1,de=0)}const we=a.width,F=a.height;ye>.3&&(F>we*1.2?(re=ne<t.width/2?1:-1,de=0):we>F*1.2&&(re=0,de=z<t.height/2?1:-1));const Ue=ne+Math.min(0,re)*4-Math.abs(de)*2,Fe=z+Math.min(0,de)*4-Math.abs(re)*2,Ee=ne+Math.max(0,re)*4+Math.abs(de)*2,Se=z+Math.max(0,de)*4+Math.abs(re)*2,ke=Math.max(0,Ue),De=Math.max(0,Fe),Pe=Math.min(t.width,Ee),Ze=Math.min(t.height,Se),D=g+ke*c,w=y+De*c,J=g+Pe*c,oe=y+Ze*c,le=J-D,ce=oe-w,Re=Math.abs(re)>Math.abs(de)?"v":"h",he=[];Re==="h"?[1,2,3].forEach((se,xe)=>{const Ie=y+(z+de*se)*c;Ie>w&&Ie<oe&&he.push(M.jsx("line",{x1:D,y1:Ie,x2:J,y2:Ie,stroke:"#a78bfa",strokeWidth:.8,strokeDasharray:"6 3",opacity:.35-xe*.08},se))}):[1,2,3].forEach((se,xe)=>{const Ie=g+(ne+re*se)*c;Ie>D&&Ie<J&&he.push(M.jsx("line",{x1:Ie,y1:w,x2:Ie,y2:oe,stroke:"#a78bfa",strokeWidth:.8,strokeDasharray:"6 3",opacity:.35-xe*.08},se))});const pe=g+(ne+re*4)*c,We=y+(z+de*4)*c;return M.jsxs("g",{style:{pointerEvents:"none"},children:[M.jsx("rect",{x:D,y:w,width:le,height:ce,fill:"#8b5cf6",fillOpacity:.08}),M.jsx("rect",{x:D,y:w,width:le,height:ce,fill:"none",stroke:"#a78bfa",strokeWidth:1.2,strokeDasharray:"8 4",opacity:.65}),he,M.jsx("line",{x1:q,y1:ie,x2:pe,y2:We,stroke:"#c4b5fd",strokeWidth:1,strokeDasharray:"5 3",opacity:.5}),(()=>{const se=(D+J)/2,xe=Re==="h"?de>0?oe+12:w-4:(w+oe)/2;return M.jsxs("g",{children:[M.jsx("rect",{x:se-22,y:xe-9,width:44,height:13,rx:4,fill:"#7c3aed",opacity:.85}),M.jsx("text",{x:se,y:xe,textAnchor:"middle",fontSize:8,fill:"white",fontFamily:"monospace",fontWeight:700,children:"4m · ±2m"})]})})(),M.jsx("line",{x1:g,y1:ie,x2:g+d,y2:ie,stroke:"#a78bfa",strokeWidth:.6,strokeDasharray:"5 4",opacity:.3}),M.jsx("line",{x1:q,y1:y,x2:q,y2:y+p,stroke:"#a78bfa",strokeWidth:.6,strokeDasharray:"5 4",opacity:.3}),M.jsx("circle",{cx:q,cy:ie,r:5,fill:"#7c3aed",opacity:.9}),M.jsx("circle",{cx:q,cy:ie,r:2.5,fill:"#fff"}),M.jsx("rect",{x:q+8,y:ie-11,width:34,height:13,rx:3,fill:"#7c3aed",opacity:.85}),M.jsx("text",{x:q+25,y:ie-2,textAnchor:"middle",fontSize:8,fill:"white",fontFamily:"monospace",fontWeight:700,children:"0, 0"})]})})(),e.map(P=>{const X=P.id===n,ne=g+P.x*c,z=y+P.y*c,q=P.width*c,ie=P.height*c,re=ne+q/2,de=z+ie/2,ye=Math.max(8,Math.min(11,Math.min(q,ie)/8)),we=a?a.x+a.width/2:0,F=a?a.y+a.height/2:0,Ue=+(P.x+P.width/2-we).toFixed(2),Fe=+(P.y+P.height/2-F).toFixed(2);return M.jsxs("g",{transform:P.type==="bed"?void 0:`rotate(${P.rotation}, ${re}, ${de})`,style:{cursor:"grab"},onPointerDown:Ee=>T(Ee,P.id),onClick:Ee=>Ee.stopPropagation(),children:[X&&M.jsx("rect",{x:ne-3,y:z-3,width:q+6,height:ie+6,fill:"none",stroke:P.color,strokeWidth:2,rx:5,opacity:.5,strokeDasharray:"5 3"}),M.jsx("g",{transform:`translate(${ne}, ${z})`,children:M.jsx(Ty,{obj:P,scale:c})}),M.jsx("text",{x:re,y:z+ie-(ie>30?5:-3),textAnchor:"middle",fontSize:ye,fill:s?"rgba(255,255,255,0.85)":"rgba(0,0,0,0.7)",fontWeight:500,fontFamily:"Inter, system-ui",style:{pointerEvents:"none",userSelect:"none"},children:P.label}),X&&[[ne,z],[ne+q,z],[ne+q,z+ie],[ne,z+ie]].map(([Ee,Se],ke)=>M.jsx("rect",{x:Ee-4,y:Se-4,width:8,height:8,fill:"white",stroke:P.color,strokeWidth:1.5,rx:2,style:{pointerEvents:"none"}},ke)),X&&P.rotation!==0&&M.jsxs("g",{style:{pointerEvents:"none"},children:[M.jsx("rect",{x:re-14,y:z-18,width:28,height:14,rx:7,fill:P.color}),M.jsxs("text",{x:re,y:z-7,textAnchor:"middle",fontSize:8,fill:"white",fontFamily:"monospace",children:[P.rotation,"°"]})]}),a&&P.type!=="radar"&&X&&M.jsxs("g",{style:{pointerEvents:"none"},children:[M.jsx("rect",{x:re-30,y:z+ie+3,width:60,height:13,rx:3,fill:"#7c3aed",opacity:.88}),M.jsxs("text",{x:re,y:z+ie+12,textAnchor:"middle",fontSize:8,fill:"white",fontFamily:"monospace",children:[Ue,",",Fe," m"]})]})]},P.id)}),M.jsx("line",{x1:g,y1:y+p+12,x2:g+d,y2:y+p+12,stroke:W,strokeWidth:1,markerEnd:"none"}),M.jsx("line",{x1:g,y1:y+p+8,x2:g,y2:y+p+16,stroke:W,strokeWidth:1}),M.jsx("line",{x1:g+d,y1:y+p+8,x2:g+d,y2:y+p+16,stroke:W,strokeWidth:1}),M.jsxs("text",{x:g+d/2,y:y+p+10,textAnchor:"middle",fontSize:9,fill:G,fontFamily:"monospace",dy:8,children:[t.width," m"]}),M.jsx("line",{x1:g+d+12,y1:y,x2:g+d+12,y2:y+p,stroke:W,strokeWidth:1}),M.jsx("line",{x1:g+d+8,y1:y,x2:g+d+16,y2:y,stroke:W,strokeWidth:1}),M.jsx("line",{x1:g+d+8,y1:y+p,x2:g+d+16,y2:y+p,stroke:W,strokeWidth:1}),M.jsxs("text",{x:g+d+12,y:y+p/2,textAnchor:"middle",fontSize:9,fill:G,fontFamily:"monospace",transform:`rotate(-90, ${g+d+12}, ${y+p/2})`,children:[t.height," m"]})]})})}),M.jsx("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap",style:{background:s?"rgba(15,23,42,0.85)":"rgba(255,255,255,0.85)",border:`1px solid ${s?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)"}`,borderRadius:99,padding:"5px 14px",fontSize:10,color:s?"#475569":"#94a3b8",backdropFilter:"blur(8px)"},children:"Arrow: move (5cm) · Shift+Arrow: 50cm · R: rotate"})]})};function by({label:t,value:e,onChange:n,dark:i,inputBg:r,border:s,textSm:o}){const[a,l]=Je.useState(String(e)),c=Je.useRef(!1),f=`room-size-${t.toLowerCase()}`;Je.useEffect(()=>{c.current||l(String(e))},[e]);function h(d){const p=parseFloat(d);!isNaN(p)&&p>0?(n(p),l(String(p))):l(String(e))}return M.jsxs("div",{style:{flex:1},children:[M.jsx("label",{htmlFor:f,style:{display:"block",fontSize:10,color:o,marginBottom:4},children:t}),M.jsxs("div",{style:{display:"flex",alignItems:"center",background:r,border:`1px solid ${s}`,borderRadius:8,padding:"5px 10px",gap:4},children:[M.jsx("input",{id:f,"data-rsf":t,type:"number",step:"0.1",min:"0.1",value:a,onChange:d=>l(d.target.value),onFocus:()=>{c.current=!0},onBlur:d=>{c.current=!1,h(d.target.value)},onKeyDown:d=>{d.key==="Enter"&&h(d.target.value)},style:{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,color:i?"#e2e8f0":"#0f172a",fontFamily:"inherit"}}),M.jsx("span",{style:{fontSize:10,color:o,flexShrink:0},children:"m"})]})]})}const Cy=[{label:"Furniture",types:["bed","sofa","table","desk","chair","wardrobe","cabinet"]},{label:"Structural",types:["door","window"]},{label:"Technology",types:["radar","person","custom"]}],Ry=({room:t,onRoomChange:e,onAdd:n,dark:i})=>{const[r,s]=Je.useState(new Set),o=i?"#0d1117":"#ffffff",a=i?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)",l=i?"#475569":"#94a3b8",c=i?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.03)",f=i?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",h=i?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)";return M.jsxs("aside",{style:{width:220,background:o,borderRight:`1px solid ${a}`,flexShrink:0},className:"flex flex-col overflow-hidden z-10",children:[M.jsxs("div",{style:{padding:"14px 14px 12px",borderBottom:`1px solid ${a}`},children:[M.jsx("p",{style:{fontSize:10,fontWeight:600,letterSpacing:"0.08em",color:l,textTransform:"uppercase",marginBottom:10},children:"Room Size"}),M.jsx("div",{style:{display:"flex",gap:8},children:["width","height"].map((d,p)=>M.jsx(by,{label:p===0?"Width":"Length",value:t[d],onChange:v=>e({...t,[d]:v}),dark:i,inputBg:c,border:a,textSm:l},d))}),M.jsxs("div",{style:{marginTop:8,display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:7,padding:"4px 10px"},children:[M.jsx("span",{style:{fontSize:10,color:"#818cf8"},children:"Area"}),M.jsxs("span",{style:{fontSize:11,color:"#a5b4fc",fontWeight:600,fontFamily:"monospace"},children:[(t.width*t.height).toFixed(1)," m²"]})]})]}),M.jsx("div",{style:{flex:1,overflowY:"auto",paddingBottom:8},children:Cy.map(({label:d,types:p})=>{const v=!r.has(d);return M.jsxs("div",{children:[M.jsxs("button",{onClick:()=>s(_=>{const m=new Set(_);return m.has(d)?m.delete(d):m.add(d),m}),style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px 6px",background:"none",border:"none",cursor:"pointer",fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:l},children:[M.jsx("span",{children:d}),M.jsx("span",{style:{transition:"transform 0.2s",transform:v?"rotate(180deg)":"none",fontSize:9,color:l},children:"▾"})]}),v&&M.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,padding:"0 10px 8px"},children:p.map(_=>{const m=Ps[_];return M.jsxs("button",{onClick:()=>n(_),title:m.description,onMouseEnter:u=>{u.currentTarget.style.background=i?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)",u.currentTarget.style.borderColor=m.color+"60",u.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:u=>{u.currentTarget.style.background=f,u.currentTarget.style.borderColor=h,u.currentTarget.style.transform="none"},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,padding:"10px 6px",borderRadius:10,background:f,border:`1px solid ${h}`,cursor:"pointer",transition:"all 0.15s",position:"relative",overflow:"hidden"},children:[M.jsx("div",{style:{position:"absolute",top:5,right:5,width:5,height:5,borderRadius:"50%",background:m.color,opacity:.7}}),M.jsx("span",{style:{fontSize:22,lineHeight:1,filter:`drop-shadow(0 1px 4px ${m.color}50)`},children:m.emoji}),M.jsx("span",{style:{fontSize:11,fontWeight:500,color:i?"#cbd5e1":"#334155"},children:m.label}),M.jsxs("span",{style:{fontSize:9,color:l,fontFamily:"monospace"},children:[m.defaultWidth,"×",m.defaultHeight,"m"]})]},_)})})]},d)})}),M.jsx("div",{style:{padding:"10px 14px",borderTop:`1px solid ${a}`},children:M.jsx("p",{style:{fontSize:10,color:l,lineHeight:1.5},children:"Click to place · Drag to move · R to rotate"})})]})},Zn=({label:t,value:e,step:n=.05,min:i,max:r,onChange:s,inputBg:o,inputBorder:a,textSm:l,dark:c})=>{const[f,h]=Je.useState(String(e)),d=Je.useRef(!1);Je.useEffect(()=>{d.current||h(String(e))},[e]);function p(v){const _=parseFloat(v);!isNaN(_)&&(i===void 0||_>=i)&&(r===void 0||_<=r)?(s(_),h(String(_))):h(String(e))}return M.jsxs("div",{children:[M.jsx("label",{style:{display:"block",fontSize:10,color:l,marginBottom:3},children:t}),M.jsx("div",{style:{display:"flex",alignItems:"center",background:o,border:`1px solid ${a}`,borderRadius:8,padding:"5px 10px"},children:M.jsx("input",{type:"number",step:n,min:i,max:r,value:f,onFocus:()=>{d.current=!0},onChange:v=>h(v.target.value),onBlur:v=>{d.current=!1,p(v.target.value)},onKeyDown:v=>{v.key==="Enter"&&p(v.target.value)},style:{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,color:c?"#e2e8f0":"#0f172a",fontFamily:"Inter, system-ui, sans-serif"}})})]})},Wr=({title:t,textSm:e,children:n})=>M.jsxs("div",{style:{marginBottom:20},children:[M.jsx("p",{style:{fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:e,marginBottom:10},children:t}),n]}),Py=({object:t,objects:e,room:n,onUpdate:i,onDelete:r,onDeselect:s,dark:o,adjacentRooms:a,onAddAdjacentRoom:l,onUpdateAdjacentRoom:c,onRemoveAdjacentRoom:f,radarObj:h=null})=>{const d=o?"#0d1117":"#ffffff",p=o?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)",v=o?"#475569":"#94a3b8",_=o?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.03)",m=o?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",u={inputBg:_,inputBorder:m,textSm:v,dark:o};if(!t){const b=e.find(k=>k.type==="radar"),T=b?b.x+b.width/2:0,C=b?b.y+b.height/2:0,{nx:N,ny:A}=b?q0(b,n):{nx:0,ny:-1},E=-A,L=N,O=e.filter(k=>k.type==="bed"||k.type==="door");let I=0;const G=O.map(k=>{const X=[[k.x,k.y],[k.x+k.width,k.y],[k.x,k.y+k.height],[k.x+k.width,k.y+k.height]].map(([F,Ue])=>{const Fe=F-T,Ee=Ue-C;return[+(Fe*E+Ee*L).toFixed(3),+(Fe*N+Ee*A).toFixed(3)]}),ne=X.map(F=>F[0]),z=X.map(F=>F[1]),q=Math.min(...ne),ie=Math.max(...ne),re=Math.min(...z),de=Math.max(...z),we={name:k.type==="door"?`door${++I}`:"bed",top_left:[q,de],top_right:[ie,de],bottom_left:[q,re],bottom_right:[ie,re],margin_top:k.marginTop??0,margin_bottom:k.marginBottom??0,margin_left:k.marginLeft??0,margin_right:k.marginRight??0};return k.type==="bed"&&(we.top_height=.5,we.bottom_height=.5,we.right_width=.5,we.left_width=.5),we}),W=G.map(k=>k.name),V=W.filter(k=>k==="bed"),Z=W.filter(k=>k.startsWith("door")),U={device_configs:{board:"<board>",location:n.name},objects:G,state_machine:{objects:W},out_of_room_alerts:{objects:Z},out_of_bed_alerts:{objects:V},"on_bed-toss":{objects:V},journey_mapping_time_taken:{objects:W},state_machine_v2:{objects:V},state_machine_flickering:{objects:V},near_edge_alerts:{objects:V}},B=JSON.stringify(U,null,2);return M.jsxs("aside",{style:{width:240,background:d,borderLeft:`1px solid ${p}`,flexShrink:0,display:"flex",flexDirection:"column"},children:[M.jsxs("div",{style:{padding:"12px 14px",borderBottom:`1px solid ${p}`,display:"flex",alignItems:"center",gap:8},children:[M.jsx("div",{style:{width:28,height:28,borderRadius:8,background:"rgba(99,102,241,0.12)",border:"1px solid rgba(99,102,241,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13},children:"↓"}),M.jsxs("div",{children:[M.jsx("p",{style:{margin:0,fontSize:12,fontWeight:700,color:o?"#f1f5f9":"#0f172a"},children:"Export Preview"}),M.jsxs("p",{style:{margin:0,fontSize:10,color:v},children:[e.length," objects · ",n.width,"×",n.height," m"]})]})]}),b?M.jsxs("div",{style:{margin:"10px 12px 0",padding:"7px 10px",borderRadius:8,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",display:"flex",alignItems:"center",gap:7},children:[M.jsx("span",{style:{fontSize:14},children:"📡"}),M.jsxs("div",{children:[M.jsx("p",{style:{margin:0,fontSize:10,fontWeight:700,color:"#818cf8"},children:"Radar origin (0, 0)"}),M.jsxs("p",{style:{margin:0,fontSize:9,color:v,fontFamily:"monospace"},children:["x=",b.x.toFixed(3)," y=",b.y.toFixed(3)," m"]})]})]}):M.jsx("div",{style:{margin:"10px 12px 0",padding:"7px 10px",borderRadius:8,background:"rgba(251,191,36,0.07)",border:"1px solid rgba(251,191,36,0.2)"},children:M.jsx("p",{style:{margin:0,fontSize:10,color:"#f59e0b"},children:"⚠ No radar placed — coordinates are room-relative"})}),M.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"10px 12px"},children:[M.jsx("p",{style:{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:v,marginBottom:6},children:"Config JSON"}),M.jsx("pre",{style:{margin:0,fontSize:9.5,lineHeight:1.65,fontFamily:"monospace",color:o?"#7dd3fc":"#0369a1",background:o?"rgba(0,0,0,0.35)":"rgba(0,0,0,0.04)",border:`1px solid ${m}`,borderRadius:8,padding:"10px 10px",whiteSpace:"pre-wrap",wordBreak:"break-all"},children:B})]}),M.jsx("div",{style:{padding:"10px 12px",borderTop:`1px solid ${p}`},children:M.jsx("p",{style:{margin:0,fontSize:10,color:v,textAlign:"center",lineHeight:1.5},children:"Click any object to edit · ↓ Export to download full config"})})]})}const x=t,g=Ps[x.type];function y(b){return T=>{if(b==="width"&&(T=Math.max(.1,T)),b==="height"&&(T=Math.max(.1,T)),b==="x"||b==="y"){const C=x.rotation*Math.PI/180,N=Math.abs(Math.cos(C)),A=Math.abs(Math.sin(C)),E=x.width*N+x.height*A,L=x.width*A+x.height*N,O=(E-x.width)/2,I=(L-x.height)/2;b==="x"&&(T=Math.max(O,Math.min(T,n.width-x.width-O))),b==="y"&&(T=Math.max(I,Math.min(T,n.height-x.height-I)))}i({[b]:T})}}return M.jsxs("aside",{style:{width:220,background:d,borderLeft:`1px solid ${p}`,flexShrink:0,display:"flex",flexDirection:"column"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderBottom:`1px solid ${p}`},children:[M.jsx("div",{style:{width:34,height:34,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,background:x.color+"20",border:`1.5px solid ${x.color}40`},children:g.emoji}),M.jsxs("div",{style:{flex:1,minWidth:0},children:[M.jsx("input",{type:"text",value:x.label,onChange:b=>i({label:b.target.value}),style:{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,fontWeight:600,color:o?"#f1f5f9":"#0f172a",fontFamily:"Inter, system-ui, sans-serif"}}),M.jsx("p",{style:{fontSize:10,color:v,textTransform:"capitalize",marginTop:1},children:x.type})]}),M.jsx("button",{onClick:s,style:{width:22,height:22,borderRadius:6,background:_,border:`1px solid ${m}`,cursor:"pointer",color:v,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:"✕"})]}),M.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"16px 14px"},children:[M.jsxs(Wr,{title:h&&x.type!=="radar"?"Position — radar-relative (m)":"Position (m)",textSm:v,children:[(()=>{const b=h&&x.type!=="radar"?h.x+h.width/2:0,T=h&&x.type!=="radar"?h.y+h.height/2:0;return M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[M.jsx(Zn,{label:"X →",value:+(x.x-b).toFixed(3),step:.05,onChange:C=>y("x")(C+b),...u}),M.jsx(Zn,{label:"Y ↓",value:+(x.y-T).toFixed(3),step:.05,onChange:C=>y("y")(C+T),...u})]})})(),h&&x.type!=="radar"&&M.jsx("p",{style:{fontSize:9,color:v,marginTop:4,fontFamily:"monospace"},children:"📡 origin = radar centre"})]}),M.jsxs(Wr,{title:"Margins (m)",textSm:v,children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[M.jsx(Zn,{label:"Top",value:x.marginTop??0,step:.05,min:0,onChange:b=>i({marginTop:b}),...u}),M.jsx(Zn,{label:"Bottom",value:x.marginBottom??0,step:.05,min:0,onChange:b=>i({marginBottom:b}),...u}),M.jsx(Zn,{label:"Left",value:x.marginLeft??0,step:.05,min:0,onChange:b=>i({marginLeft:b}),...u}),M.jsx(Zn,{label:"Right",value:x.marginRight??0,step:.05,min:0,onChange:b=>i({marginRight:b}),...u})]}),M.jsx("p",{style:{fontSize:9,color:v,marginTop:4},children:"Extra buffer zone around object for radar detection"})]}),M.jsxs(Wr,{title:"Size (m)",textSm:v,children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[M.jsx(Zn,{label:"Width",value:x.width,step:.1,min:.1,onChange:y("width"),...u}),M.jsx(Zn,{label:"Height",value:x.height,step:.1,min:.1,onChange:y("height"),...u})]}),M.jsx("div",{style:{marginTop:8,height:3,borderRadius:99,background:_,overflow:"hidden"},children:M.jsx("div",{style:{height:"100%",borderRadius:99,background:x.color,width:`${Math.min(100,x.width/n.width*100)}%`}})}),M.jsxs("p",{style:{fontSize:9,color:v,marginTop:4,fontFamily:"monospace"},children:[(x.width*x.height).toFixed(2)," m²"]})]}),M.jsxs(Wr,{title:x.type==="bed"||x.type==="sofa"?"Facing":"Rotation",textSm:v,children:[x.type==="bed"||x.type==="sofa"?M.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:10},children:[{deg:0,label:"↑ Top"},{deg:90,label:"→ Right"},{deg:180,label:"↓ Bottom"},{deg:270,label:"← Left"}].map(({deg:b,label:T})=>M.jsx("button",{onClick:()=>i({rotation:b}),style:{padding:"5px 0",borderRadius:8,fontSize:10,fontWeight:500,cursor:"pointer",border:"1px solid",transition:"all 0.15s",background:x.rotation===b?x.color:_,borderColor:x.rotation===b?x.color:m,color:x.rotation===b?"#fff":v},children:T},b))}):M.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:10},children:[0,90,180,270].map(b=>M.jsxs("button",{onClick:()=>i({rotation:b}),style:{padding:"5px 0",borderRadius:8,fontSize:11,fontWeight:500,cursor:"pointer",border:"1px solid",transition:"all 0.15s",background:x.rotation===b?x.color:_,borderColor:x.rotation===b?x.color:m,color:x.rotation===b?"#fff":v},children:[b,"°"]},b))}),M.jsx("input",{type:"range",min:0,max:359,step:1,value:x.rotation,onChange:b=>i({rotation:+b.target.value}),style:{width:"100%",accentColor:x.color}}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:2},children:[M.jsx("span",{style:{fontSize:9,color:v},children:"0°"}),M.jsxs("span",{style:{fontSize:10,color:o?"#e2e8f0":"#334155",fontFamily:"monospace",fontWeight:600},children:[x.rotation,"°"]}),M.jsx("span",{style:{fontSize:9,color:v},children:"359°"})]})]}),M.jsx(Wr,{title:"Colour",textSm:v,children:M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[M.jsx("input",{type:"color",value:x.color,onChange:b=>i({color:b.target.value}),style:{width:36,height:36,borderRadius:8,cursor:"pointer",border:`2px solid ${x.color}55`,padding:2}}),M.jsxs("div",{children:[M.jsx("p",{style:{fontSize:12,fontFamily:"monospace",color:o?"#e2e8f0":"#334155",fontWeight:600},children:x.color.toUpperCase()}),x.color!==g.color&&M.jsx("button",{onClick:()=>i({color:g.color}),style:{fontSize:10,color:v,background:"none",border:"none",cursor:"pointer",padding:0,textDecoration:"underline"},children:"reset"})]})]})}),x.type==="door"&&(()=>{const b=gy(x,n);if(!b)return null;const T=a.find(L=>L.doorId===x.id),C=b.charAt(0).toUpperCase()+b.slice(1),N=b==="left"||b==="right",A=N?3:n.width,E=N?n.height:3;return M.jsx(Wr,{title:`${C} Wall`,textSm:v,children:T?M.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[M.jsxs("div",{children:[M.jsx("label",{style:{display:"block",fontSize:10,color:v,marginBottom:3},children:"Name"}),M.jsx("div",{style:{display:"flex",alignItems:"center",background:_,border:`1px solid ${m}`,borderRadius:8,padding:"5px 10px"},children:M.jsx("input",{type:"text",value:T.name,onChange:L=>c(T.id,{name:L.target.value}),style:{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,color:o?"#e2e8f0":"#0f172a",fontFamily:"inherit"}})})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[M.jsx(Zn,{label:N?"Depth (m)":"Width (m)",value:T.width,step:.1,min:.5,onChange:L=>c(T.id,{width:Math.max(.5,L)}),inputBg:_,inputBorder:m,textSm:v,dark:o}),M.jsx(Zn,{label:N?"Height (m)":"Depth (m)",value:T.height,step:.1,min:.5,onChange:L=>c(T.id,{height:Math.max(.5,L)}),inputBg:_,inputBorder:m,textSm:v,dark:o})]}),M.jsxs("p",{style:{fontSize:9,color:v,fontFamily:"monospace",margin:0},children:[(T.width*T.height).toFixed(2)," m²"]}),M.jsxs("div",{children:[M.jsx("p",{style:{fontSize:10,fontWeight:600,color:v,textTransform:"uppercase",letterSpacing:"0.06em",margin:"4px 0 6px"},children:"Doors"}),(T.doors??[]).map((L,O)=>M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:5,background:_,border:`1px solid ${m}`,borderRadius:8,padding:"5px 8px"},children:[M.jsx("span",{style:{fontSize:12},children:"🚪"}),M.jsx("input",{type:"text",value:L.label,onChange:I=>{const G=(T.doors??[]).map((W,V)=>V===O?{...W,label:I.target.value}:W);c(T.id,{doors:G})},style:{flex:1,background:"transparent",border:"none",outline:"none",fontSize:12,color:o?"#e2e8f0":"#0f172a",fontFamily:"inherit"}}),M.jsxs("span",{style:{fontSize:10,color:v,fontFamily:"monospace"},children:[L.width,"m"]}),M.jsx("button",{onClick:()=>c(T.id,{doors:(T.doors??[]).filter(I=>I.id!==L.id)}),style:{background:"none",border:"none",cursor:"pointer",color:"#f87171",fontSize:12,padding:0,lineHeight:1},children:"✕"})]},L.id)),M.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginTop:4},children:["top","bottom","left","right"].map(L=>{const O=T.wall==="left"?"right":T.wall==="right"?"left":T.wall==="top"?"bottom":"top";if(L===O)return null;const I=L==="left"||L==="right"?T.height:T.width;return M.jsxs("button",{onClick:()=>{const G={id:Math.random().toString(36).slice(2,8),wall:L,position:+(I/2-.45).toFixed(2),width:.9,label:"Door"};c(T.id,{doors:[...T.doors??[],G]})},style:{padding:"5px 4px",borderRadius:7,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.07)",color:"#f59e0b",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"inherit"},children:["+ ",L," door"]},L)})})]}),M.jsx("button",{onClick:()=>f(T.id),style:{padding:"5px 0",borderRadius:8,border:"1px solid rgba(239,68,68,0.2)",background:"rgba(239,68,68,0.06)",color:"#f87171",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"},onMouseEnter:L=>{L.currentTarget.style.background="#ef4444",L.currentTarget.style.color="#fff"},onMouseLeave:L=>{L.currentTarget.style.background="rgba(239,68,68,0.06)",L.currentTarget.style.color="#f87171"},children:"Remove adjacent room"})]}):M.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[M.jsxs("p",{style:{fontSize:10,color:v,margin:0},children:["Add space on ",b," side:"]}),[{type:"room",label:"🏠 Room",color:"rgba(99,102,241",w:A,h:E},{type:"passage",label:"🚶 Passage",color:"rgba(16,185,129",w:N?1.2:n.width,h:N?n.height:1.2},{type:"bathroom",label:"🚿 Bathroom",color:"rgba(6,182,212",w:1.8,h:N?2.2:1.8}].map(({type:L,label:O,color:I,w:G,h:W})=>M.jsx("button",{onClick:()=>l(x.id,b,G,W,L),style:{width:"100%",padding:"7px 10px",borderRadius:9,textAlign:"left",border:`1px solid ${I},0.3)`,background:`${I},0.08)`,color:`${I},0.9)`,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"},onMouseEnter:V=>{V.currentTarget.style.background=`${I},0.18)`},onMouseLeave:V=>{V.currentTarget.style.background=`${I},0.08)`},children:O},L))]})})})(),x.type==="radar"&&M.jsxs("div",{style:{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:10,padding:12},children:[M.jsx("p",{style:{fontSize:10,fontWeight:700,color:"#818cf8",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8},children:"📡 Radar Origin"}),M.jsx("p",{style:{fontSize:11,color:v,lineHeight:1.5,marginBottom:8},children:"Set device firmware origin:"}),M.jsxs("div",{style:{background:o?"rgba(0,0,0,0.4)":"rgba(0,0,0,0.05)",borderRadius:8,padding:"8px 10px",fontFamily:"monospace",fontSize:12,color:"#a5b4fc",lineHeight:1.8},children:["X = ",x.x.toFixed(3)," m",M.jsx("br",{}),"Y = ",x.y.toFixed(3)," m"]})]})]}),M.jsx("div",{style:{padding:"12px 14px",borderTop:`1px solid ${p}`},children:M.jsxs("button",{onClick:r,onMouseEnter:b=>{b.currentTarget.style.background="#ef4444",b.currentTarget.style.color="#fff"},onMouseLeave:b=>{b.currentTarget.style.background="rgba(239,68,68,0.08)",b.currentTarget.style.color="#f87171"},style:{width:"100%",padding:"8px 0",borderRadius:10,border:"1px solid rgba(239,68,68,0.25)",background:"rgba(239,68,68,0.08)",color:"#f87171",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit"},children:["Delete ",x.label]})})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lf="165",jr={ROTATE:0,DOLLY:1,PAN:2},Xr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ly=0,ep=1,Dy=2,K0=1,Z0=2,pi=3,nr=0,hn=1,Sn=2,Ji=0,Ls=1,tp=2,np=3,ip=4,Iy=5,Er=100,Ny=101,Uy=102,Fy=103,Oy=104,ky=200,zy=201,By=202,Hy=203,Ad=204,bd=205,Vy=206,Gy=207,Wy=208,jy=209,Xy=210,Yy=211,$y=212,qy=213,Ky=214,Zy=0,Jy=1,Qy=2,kl=3,eS=4,tS=5,nS=6,iS=7,J0=0,rS=1,sS=2,Qi=0,oS=1,aS=2,lS=3,Q0=4,cS=5,uS=6,dS=7,ev=300,Hs=301,Vs=302,Cd=303,Rd=304,dc=306,zl=1e3,Cr=1001,Pd=1002,Dn=1003,fS=1004,Ta=1005,jn=1006,Yc=1007,Rr=1008,ir=1009,hS=1010,pS=1011,Bl=1012,tv=1013,Gs=1014,Gi=1015,fc=1016,nv=1017,iv=1018,Ws=1020,mS=35902,gS=1021,vS=1022,ii=1023,xS=1024,_S=1025,Ds=1026,js=1027,yS=1028,rv=1029,SS=1030,sv=1031,ov=1033,$c=33776,qc=33777,Kc=33778,Zc=33779,rp=35840,sp=35841,op=35842,ap=35843,lp=36196,cp=37492,up=37496,dp=37808,fp=37809,hp=37810,pp=37811,mp=37812,gp=37813,vp=37814,xp=37815,_p=37816,yp=37817,Sp=37818,Mp=37819,Ep=37820,wp=37821,Jc=36492,Tp=36494,Ap=36495,MS=36283,bp=36284,Cp=36285,Rp=36286,ES=3200,wS=3201,av=0,TS=1,Bi="",Qn="srgb",cr="srgb-linear",Df="display-p3",hc="display-p3-linear",Hl="linear",dt="srgb",Vl="rec709",Gl="p3",Yr=7680,Pp=519,AS=512,bS=513,CS=514,lv=515,RS=516,PS=517,LS=518,DS=519,Lp=35044,Dp="300 es",_i=2e3,Wl=2001;class Vr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dl=Math.PI/180,Ld=180/Math.PI;function Ks(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[t&255]+$t[t>>8&255]+$t[t>>16&255]+$t[t>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[n&63|128]+$t[n>>8&255]+"-"+$t[n>>16&255]+$t[n>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function zt(t,e,n){return Math.max(e,Math.min(n,t))}function IS(t,e){return(t%e+e)%e}function Qc(t,e,n){return(1-n)*t+n*e}function ao(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function an(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const NS={DEG2RAD:dl};class ve{constructor(e=0,n=0){ve.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,n,i,r,s,o,a,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],f=i[4],h=i[7],d=i[2],p=i[5],v=i[8],_=r[0],m=r[3],u=r[6],x=r[1],g=r[4],y=r[7],b=r[2],T=r[5],C=r[8];return s[0]=o*_+a*x+l*b,s[3]=o*m+a*g+l*T,s[6]=o*u+a*y+l*C,s[1]=c*_+f*x+h*b,s[4]=c*m+f*g+h*T,s[7]=c*u+f*y+h*C,s[2]=d*_+p*x+v*b,s[5]=d*m+p*g+v*T,s[8]=d*u+p*y+v*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*a*c-i*s*f+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],h=f*o-a*c,d=a*l-f*s,p=c*s-o*l,v=n*h+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=h*_,e[1]=(r*c-f*i)*_,e[2]=(a*i-r*o)*_,e[3]=d*_,e[4]=(f*n-r*l)*_,e[5]=(r*s-a*n)*_,e[6]=p*_,e[7]=(i*l-c*n)*_,e[8]=(o*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(eu.makeScale(e,n)),this}rotate(e){return this.premultiply(eu.makeRotation(-e)),this}translate(e,n){return this.premultiply(eu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const eu=new Ye;function cv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function jl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function US(){const t=jl("canvas");return t.style.display="block",t}const Ip={};function uv(t){t in Ip||(Ip[t]=!0,console.warn(t))}function FS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Np=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Up=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Aa={[cr]:{transfer:Hl,primaries:Vl,toReference:t=>t,fromReference:t=>t},[Qn]:{transfer:dt,primaries:Vl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[hc]:{transfer:Hl,primaries:Gl,toReference:t=>t.applyMatrix3(Up),fromReference:t=>t.applyMatrix3(Np)},[Df]:{transfer:dt,primaries:Gl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Up),fromReference:t=>t.applyMatrix3(Np).convertLinearToSRGB()}},OS=new Set([cr,hc]),it={enabled:!0,_workingColorSpace:cr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!OS.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Aa[e].toReference,r=Aa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Aa[t].primaries},getTransfer:function(t){return t===Bi?Hl:Aa[t].transfer}};function Is(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function tu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let $r;class kS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$r===void 0&&($r=jl("canvas")),$r.width=e.width,$r.height=e.height;const i=$r.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=$r}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=jl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Is(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Is(n[i]/255)*255):n[i]=Is(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zS=0;class dv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zS++}),this.uuid=Ks(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(nu(r[o].image)):s.push(nu(r[o]))}else s=nu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function nu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?kS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let BS=0;class rn extends Vr{constructor(e=rn.DEFAULT_IMAGE,n=rn.DEFAULT_MAPPING,i=Cr,r=Cr,s=jn,o=Rr,a=ii,l=ir,c=rn.DEFAULT_ANISOTROPY,f=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=Ks(),this.name="",this.source=new dv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ev)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zl:e.x=e.x-Math.floor(e.x);break;case Cr:e.x=e.x<0?0:1;break;case Pd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zl:e.y=e.y-Math.floor(e.y);break;case Cr:e.y=e.y<0?0:1;break;case Pd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=ev;rn.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,n=0,i=0,r=1){mt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],d=l[1],p=l[5],v=l[9],_=l[2],m=l[6],u=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+_)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,y=(p+1)/2,b=(u+1)/2,T=(f+d)/4,C=(h+_)/4,N=(v+m)/4;return g>y&&g>b?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=T/i,s=C/i):y>b?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=T/r,s=N/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=C/s,r=N/s),this.set(i,r,s,n),this}let x=Math.sqrt((m-v)*(m-v)+(h-_)*(h-_)+(d-f)*(d-f));return Math.abs(x)<.001&&(x=1),this.x=(m-v)/x,this.y=(h-_)/x,this.z=(d-f)/x,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class HS extends Vr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new mt(0,0,e,n),this.scissorTest=!1,this.viewport=new mt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new rn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new dv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Or extends HS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class fv extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class VS extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Dn,this.minFilter=Dn,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3];const d=s[o+0],p=s[o+1],v=s[o+2],_=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h;return}if(a===1){e[n+0]=d,e[n+1]=p,e[n+2]=v,e[n+3]=_;return}if(h!==_||l!==d||c!==p||f!==v){let m=1-a;const u=l*d+c*p+f*v+h*_,x=u>=0?1:-1,g=1-u*u;if(g>Number.EPSILON){const b=Math.sqrt(g),T=Math.atan2(b,u*x);m=Math.sin(m*T)/b,a=Math.sin(a*T)/b}const y=a*x;if(l=l*m+d*y,c=c*m+p*y,f=f*m+v*y,h=h*m+_*y,m===1-a){const b=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=b,c*=b,f*=b,h*=b}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[o],d=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+f*h+l*p-c*d,e[n+1]=l*v+f*d+c*h-a*p,e[n+2]=c*v+f*p+a*d-l*h,e[n+3]=f*v-a*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(r/2),h=a(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*f*h+c*p*v,this._y=c*p*h-d*f*v,this._z=c*f*v+d*p*h,this._w=c*f*h-d*p*v;break;case"YXZ":this._x=d*f*h+c*p*v,this._y=c*p*h-d*f*v,this._z=c*f*v-d*p*h,this._w=c*f*h+d*p*v;break;case"ZXY":this._x=d*f*h-c*p*v,this._y=c*p*h+d*f*v,this._z=c*f*v+d*p*h,this._w=c*f*h-d*p*v;break;case"ZYX":this._x=d*f*h-c*p*v,this._y=c*p*h+d*f*v,this._z=c*f*v-d*p*h,this._w=c*f*h+d*p*v;break;case"YZX":this._x=d*f*h+c*p*v,this._y=c*p*h+d*f*v,this._z=c*f*v-d*p*h,this._w=c*f*h-d*p*v;break;case"XZY":this._x=d*f*h-c*p*v,this._y=c*p*h-d*f*v,this._z=c*f*v+d*p*h,this._w=c*f*h+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],f=n[6],h=n[10],d=i+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*a+r*c-s*l,this._y=r*f+o*l+s*a-i*c,this._z=s*f+o*c+i*l-r*a,this._w=o*f-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),f=Math.atan2(c,a),h=Math.sin((1-n)*f)/c,d=Math.sin(n*f)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,n=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Fp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Fp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),f=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+l*c+o*h-a*f,this.y=i+l*f+a*c-s*h,this.z=r+l*h+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return iu.copy(this).projectOnVector(e),this.sub(iu)}reflect(e){return this.sub(iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const iu=new H,Fp=new kr;class ra{constructor(e=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(On.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(On.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=On.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,On):On.fromBufferAttribute(s,o),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ba.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ba.copy(i.boundingBox)),ba.applyMatrix4(e.matrixWorld),this.union(ba)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lo),Ca.subVectors(this.max,lo),qr.subVectors(e.a,lo),Kr.subVectors(e.b,lo),Zr.subVectors(e.c,lo),Ri.subVectors(Kr,qr),Pi.subVectors(Zr,Kr),pr.subVectors(qr,Zr);let n=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-pr.z,pr.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,pr.z,0,-pr.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-pr.y,pr.x,0];return!ru(n,qr,Kr,Zr,Ca)||(n=[1,0,0,0,1,0,0,0,1],!ru(n,qr,Kr,Zr,Ca))?!1:(Ra.crossVectors(Ri,Pi),n=[Ra.x,Ra.y,Ra.z],ru(n,qr,Kr,Zr,Ca))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ci=[new H,new H,new H,new H,new H,new H,new H,new H],On=new H,ba=new ra,qr=new H,Kr=new H,Zr=new H,Ri=new H,Pi=new H,pr=new H,lo=new H,Ca=new H,Ra=new H,mr=new H;function ru(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){mr.fromArray(t,s);const a=r.x*Math.abs(mr.x)+r.y*Math.abs(mr.y)+r.z*Math.abs(mr.z),l=e.dot(mr),c=n.dot(mr),f=i.dot(mr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}const GS=new ra,co=new H,su=new H;class pc{constructor(e=new H,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):GS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;co.subVectors(e,this.center);const n=co.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(co,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(co.copy(e.center).add(su)),this.expandByPoint(co.copy(e.center).sub(su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new H,ou=new H,Pa=new H,Li=new H,au=new H,La=new H,lu=new H;class If{constructor(e=new H,n=new H(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ui.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,n),ui.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){ou.copy(e).add(n).multiplyScalar(.5),Pa.copy(n).sub(e).normalize(),Li.copy(this.origin).sub(ou);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Pa),a=Li.dot(this.direction),l=-Li.dot(Pa),c=Li.lengthSq(),f=Math.abs(1-o*o);let h,d,p,v;if(f>0)if(h=o*l-a,d=o*a-l,v=s*f,h>=0)if(d>=-v)if(d<=v){const _=1/f;h*=_,d*=_,p=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ou).addScaledVector(Pa,d),p}intersectSphere(e,n){ui.subVectors(e.center,this.origin);const i=ui.dot(this.direction),r=ui.dot(ui)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,o=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,o=(e.min.y-d.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,n,i,r,s){au.subVectors(n,e),La.subVectors(i,e),lu.crossVectors(au,La);let o=this.direction.dot(lu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,e);const l=a*this.direction.dot(La.crossVectors(Li,La));if(l<0)return null;const c=a*this.direction.dot(au.cross(Li));if(c<0||l+c>o)return null;const f=-a*Li.dot(lu);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,n,i,r,s,o,a,l,c,f,h,d,p,v,_,m){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,f,h,d,p,v,_,m)}set(e,n,i,r,s,o,a,l,c,f,h,d,p,v,_,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=h,u[14]=d,u[3]=p,u[7]=v,u[11]=_,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Jr.setFromMatrixColumn(e,0).length(),s=1/Jr.setFromMatrixColumn(e,1).length(),o=1/Jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*f,p=o*h,v=a*f,_=a*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+v*c,n[5]=d-_*c,n[9]=-a*l,n[2]=_-d*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*f,p=l*h,v=c*f,_=c*h;n[0]=d+_*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*h,n[5]=o*f,n[9]=-a,n[2]=p*a-v,n[6]=_+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*f,p=l*h,v=c*f,_=c*h;n[0]=d-_*a,n[4]=-o*h,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*f,n[9]=_-d*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*f,p=o*h,v=a*f,_=a*h;n[0]=l*f,n[4]=v*c-p,n[8]=d*c+_,n[1]=l*h,n[5]=_*c+d,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,v=a*l,_=a*c;n[0]=l*f,n[4]=_-d*h,n[8]=v*h+p,n[1]=h,n[5]=o*f,n[9]=-a*f,n[2]=-c*f,n[6]=p*h+v,n[10]=d-_*h}else if(e.order==="XZY"){const d=o*l,p=o*c,v=a*l,_=a*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=d*h+_,n[5]=o*f,n[9]=p*h-v,n[2]=v*h-p,n[6]=a*f,n[10]=_*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WS,e,jS)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Di.crossVectors(i,vn),Di.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Di.crossVectors(i,vn)),Di.normalize(),Da.crossVectors(vn,Di),r[0]=Di.x,r[4]=Da.x,r[8]=vn.x,r[1]=Di.y,r[5]=Da.y,r[9]=vn.y,r[2]=Di.z,r[6]=Da.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],f=i[1],h=i[5],d=i[9],p=i[13],v=i[2],_=i[6],m=i[10],u=i[14],x=i[3],g=i[7],y=i[11],b=i[15],T=r[0],C=r[4],N=r[8],A=r[12],E=r[1],L=r[5],O=r[9],I=r[13],G=r[2],W=r[6],V=r[10],Z=r[14],U=r[3],B=r[7],k=r[11],P=r[15];return s[0]=o*T+a*E+l*G+c*U,s[4]=o*C+a*L+l*W+c*B,s[8]=o*N+a*O+l*V+c*k,s[12]=o*A+a*I+l*Z+c*P,s[1]=f*T+h*E+d*G+p*U,s[5]=f*C+h*L+d*W+p*B,s[9]=f*N+h*O+d*V+p*k,s[13]=f*A+h*I+d*Z+p*P,s[2]=v*T+_*E+m*G+u*U,s[6]=v*C+_*L+m*W+u*B,s[10]=v*N+_*O+m*V+u*k,s[14]=v*A+_*I+m*Z+u*P,s[3]=x*T+g*E+y*G+b*U,s[7]=x*C+g*L+y*W+b*B,s[11]=x*N+g*O+y*V+b*k,s[15]=x*A+g*I+y*Z+b*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],f=e[2],h=e[6],d=e[10],p=e[14],v=e[3],_=e[7],m=e[11],u=e[15];return v*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*p-i*l*p)+_*(+n*l*p-n*c*d+s*o*d-r*o*p+r*c*f-s*l*f)+m*(+n*c*h-n*a*p-s*o*h+i*o*p+s*a*f-i*c*f)+u*(-r*a*f-n*l*h+n*a*d+r*o*h-i*o*d+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],h=e[9],d=e[10],p=e[11],v=e[12],_=e[13],m=e[14],u=e[15],x=h*m*c-_*d*c+_*l*p-a*m*p-h*l*u+a*d*u,g=v*d*c-f*m*c-v*l*p+o*m*p+f*l*u-o*d*u,y=f*_*c-v*h*c+v*a*p-o*_*p-f*a*u+o*h*u,b=v*h*l-f*_*l-v*a*d+o*_*d+f*a*m-o*h*m,T=n*x+i*g+r*y+s*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=x*C,e[1]=(_*d*s-h*m*s-_*r*p+i*m*p+h*r*u-i*d*u)*C,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*u+i*l*u)*C,e[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*p-i*l*p)*C,e[4]=g*C,e[5]=(f*m*s-v*d*s+v*r*p-n*m*p-f*r*u+n*d*u)*C,e[6]=(v*l*s-o*m*s-v*r*c+n*m*c+o*r*u-n*l*u)*C,e[7]=(o*d*s-f*l*s+f*r*c-n*d*c-o*r*p+n*l*p)*C,e[8]=y*C,e[9]=(v*h*s-f*_*s-v*i*p+n*_*p+f*i*u-n*h*u)*C,e[10]=(o*_*s-v*a*s+v*i*c-n*_*c-o*i*u+n*a*u)*C,e[11]=(f*a*s-o*h*s-f*i*c+n*h*c+o*i*p-n*a*p)*C,e[12]=b*C,e[13]=(f*_*r-v*h*r+v*i*d-n*_*d-f*i*m+n*h*m)*C,e[14]=(v*a*r-o*_*r-v*i*l+n*_*l+o*i*m-n*a*m)*C,e[15]=(o*h*r-f*a*r+f*i*l-n*h*l-o*i*d+n*a*d)*C,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,f=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,f*a+i,f*l-r*o,0,c*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,f=o+o,h=a+a,d=s*c,p=s*f,v=s*h,_=o*f,m=o*h,u=a*h,x=l*c,g=l*f,y=l*h,b=i.x,T=i.y,C=i.z;return r[0]=(1-(_+u))*b,r[1]=(p+y)*b,r[2]=(v-g)*b,r[3]=0,r[4]=(p-y)*T,r[5]=(1-(d+u))*T,r[6]=(m+x)*T,r[7]=0,r[8]=(v+g)*C,r[9]=(m-x)*C,r[10]=(1-(d+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Jr.set(r[0],r[1],r[2]).length();const o=Jr.set(r[4],r[5],r[6]).length(),a=Jr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],kn.copy(this);const c=1/s,f=1/o,h=1/a;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=f,kn.elements[5]*=f,kn.elements[6]*=f,kn.elements[8]*=h,kn.elements[9]*=h,kn.elements[10]*=h,n.setFromRotationMatrix(kn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=_i){const l=this.elements,c=2*s/(n-e),f=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r);let p,v;if(a===_i)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Wl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=_i){const l=this.elements,c=1/(n-e),f=1/(i-r),h=1/(o-s),d=(n+e)*c,p=(i+r)*f;let v,_;if(a===_i)v=(o+s)*h,_=-2*h;else if(a===Wl)v=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Jr=new H,kn=new gt,WS=new H(0,0,0),jS=new H(1,1,1),Di=new H,Da=new H,vn=new H,Op=new gt,kp=new kr;class oi{constructor(e=0,n=0,i=0,r=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],f=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Op.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Op,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return kp.setFromEuler(this),this.setFromQuaternion(kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class hv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XS=0;const zp=new H,Qr=new kr,di=new gt,Ia=new H,uo=new H,YS=new H,$S=new kr,Bp=new H(1,0,0),Hp=new H(0,1,0),Vp=new H(0,0,1),Gp={type:"added"},qS={type:"removed"},es={type:"childadded",child:null},cu={type:"childremoved",child:null};class Gt extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=Ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new H,n=new oi,i=new kr,r=new H(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ye}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Qr.setFromAxisAngle(e,n),this.quaternion.multiply(Qr),this}rotateOnWorldAxis(e,n){return Qr.setFromAxisAngle(e,n),this.quaternion.premultiply(Qr),this}rotateX(e){return this.rotateOnAxis(Bp,e)}rotateY(e){return this.rotateOnAxis(Hp,e)}rotateZ(e){return this.rotateOnAxis(Vp,e)}translateOnAxis(e,n){return zp.copy(e).applyQuaternion(this.quaternion),this.position.add(zp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Bp,e)}translateY(e){return this.translateOnAxis(Hp,e)}translateZ(e){return this.translateOnAxis(Vp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ia.copy(e):Ia.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(uo,Ia,this.up):di.lookAt(Ia,uo,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),Qr.setFromRotationMatrix(di),this.quaternion.premultiply(Qr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gp),es.child=e,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(qS),cu.child=e,this.dispatchEvent(cu),cu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gp),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,e,YS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,$S,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Gt.DEFAULT_UP=new H(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new H,fi=new H,uu=new H,hi=new H,ts=new H,ns=new H,Wp=new H,du=new H,fu=new H,hu=new H;class ni{constructor(e=new H,n=new H,i=new H){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),zn.subVectors(e,n),r.cross(zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){zn.subVectors(r,n),fi.subVectors(i,n),uu.subVectors(e,n);const o=zn.dot(zn),a=zn.dot(fi),l=zn.dot(uu),c=fi.dot(fi),f=fi.dot(uu),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-a*f)*d,v=(o*f-a*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static isFrontFacing(e,n,i,r){return zn.subVectors(i,n),fi.subVectors(e,n),zn.cross(fi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),zn.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ni.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ni.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;ts.subVectors(r,i),ns.subVectors(s,i),du.subVectors(e,i);const l=ts.dot(du),c=ns.dot(du);if(l<=0&&c<=0)return n.copy(i);fu.subVectors(e,r);const f=ts.dot(fu),h=ns.dot(fu);if(f>=0&&h<=f)return n.copy(r);const d=l*h-f*c;if(d<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(ts,o);hu.subVectors(e,s);const p=ts.dot(hu),v=ns.dot(hu);if(v>=0&&p<=v)return n.copy(s);const _=p*c-l*v;if(_<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(ns,a);const m=f*v-p*h;if(m<=0&&h-f>=0&&p-v>=0)return Wp.subVectors(s,r),a=(h-f)/(h-f+(p-v)),n.copy(r).addScaledVector(Wp,a);const u=1/(m+_+d);return o=_*u,a=d*u,n.copy(i).addScaledVector(ts,o).addScaledVector(ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Na={h:0,s:0,l:0};function pu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Qn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=it.workingColorSpace){return this.r=e,this.g=n,this.b=i,it.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=it.workingColorSpace){if(e=IS(e,1),n=zt(n,0,1),i=zt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=pu(o,s,e+1/3),this.g=pu(o,s,e),this.b=pu(o,s,e-1/3)}return it.toWorkingColorSpace(this,r),this}setStyle(e,n=Qn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Qn){const i=pv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}copyLinearToSRGB(e){return this.r=tu(e.r),this.g=tu(e.g),this.b=tu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qn){return it.fromWorkingColorSpace(qt.copy(this),e),Math.round(zt(qt.r*255,0,255))*65536+Math.round(zt(qt.g*255,0,255))*256+Math.round(zt(qt.b*255,0,255))}getHexString(e=Qn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=it.workingColorSpace){it.fromWorkingColorSpace(qt.copy(this),n);const i=qt.r,r=qt.g,s=qt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const f=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=f<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=it.workingColorSpace){return it.fromWorkingColorSpace(qt.copy(this),n),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Qn){it.fromWorkingColorSpace(qt.copy(this),e);const n=qt.r,i=qt.g,r=qt.b;return e!==Qn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+n,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ii),e.getHSL(Na);const i=Qc(Ii.h,Na.h,n),r=Qc(Ii.s,Na.s,n),s=Qc(Ii.l,Na.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new qe;qe.NAMES=pv;let KS=0;class Zs extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=Ks(),this.name="",this.type="Material",this.blending=Ls,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ad,this.blendDst=bd,this.blendEquation=Er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=kl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yr,this.stencilZFail=Yr,this.stencilZPass=Yr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(i.blending=this.blending),this.side!==nr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ad&&(i.blendSrc=this.blendSrc),this.blendDst!==bd&&(i.blendDst=this.blendDst),this.blendEquation!==Er&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==kl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class sa extends Zs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=J0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new H,Ua=new ve;class $n{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Lp,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return uv("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ua.fromBufferAttribute(this,n),Ua.applyMatrix3(e),this.setXY(n,Ua.x,Ua.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Rt.fromBufferAttribute(this,n),Rt.applyMatrix3(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Rt.fromBufferAttribute(this,n),Rt.applyMatrix4(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Rt.fromBufferAttribute(this,n),Rt.applyNormalMatrix(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Rt.fromBufferAttribute(this,n),Rt.transformDirection(e),this.setXYZ(n,Rt.x,Rt.y,Rt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ao(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=an(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ao(n,this.array)),n}setX(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ao(n,this.array)),n}setY(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ao(n,this.array)),n}setZ(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ao(n,this.array)),n}setW(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lp&&(e.usage=this.usage),e}}class mv extends $n{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class gv extends $n{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Wt extends $n{constructor(e,n,i){super(new Float32Array(e),n,i)}}let ZS=0;const Cn=new gt,mu=new Gt,is=new H,xn=new ra,fo=new ra,Ot=new H;class tn extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Ks(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cv(e)?gv:mv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,n,i){return Cn.makeTranslation(e,n,i),this.applyMatrix4(Cn),this}scale(e,n,i){return Cn.makeScale(e,n,i),this.applyMatrix4(Cn),this}lookAt(e){return mu.lookAt(e),mu.updateMatrix(),this.applyMatrix4(mu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Wt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ra);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];fo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(xn.min,fo.min),xn.expandByPoint(Ot),Ot.addVectors(xn.max,fo.max),xn.expandByPoint(Ot)):(xn.expandByPoint(fo.min),xn.expandByPoint(fo.max))}xn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)Ot.fromBufferAttribute(a,c),l&&(is.fromBufferAttribute(e,c),Ot.add(is)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $n(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new H,l[N]=new H;const c=new H,f=new H,h=new H,d=new ve,p=new ve,v=new ve,_=new H,m=new H;function u(N,A,E){c.fromBufferAttribute(i,N),f.fromBufferAttribute(i,A),h.fromBufferAttribute(i,E),d.fromBufferAttribute(s,N),p.fromBufferAttribute(s,A),v.fromBufferAttribute(s,E),f.sub(c),h.sub(c),p.sub(d),v.sub(d);const L=1/(p.x*v.y-v.x*p.y);isFinite(L)&&(_.copy(f).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(L),m.copy(h).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(L),a[N].add(_),a[A].add(_),a[E].add(_),l[N].add(m),l[A].add(m),l[E].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let N=0,A=x.length;N<A;++N){const E=x[N],L=E.start,O=E.count;for(let I=L,G=L+O;I<G;I+=3)u(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const g=new H,y=new H,b=new H,T=new H;function C(N){b.fromBufferAttribute(r,N),T.copy(b);const A=a[N];g.copy(A),g.sub(b.multiplyScalar(b.dot(A))).normalize(),y.crossVectors(T,A);const L=y.dot(l[N])<0?-1:1;o.setXYZW(N,g.x,g.y,g.z,L)}for(let N=0,A=x.length;N<A;++N){const E=x[N],L=E.start,O=E.count;for(let I=L,G=L+O;I<G;I+=3)C(e.getX(I+0)),C(e.getX(I+1)),C(e.getX(I+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $n(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,f=new H,h=new H;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(f),l.add(f),c.add(f),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ot.fromBufferAttribute(e,n),Ot.normalize(),e.setXYZ(n,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const c=a.array,f=a.itemSize,h=a.normalized,d=new c.constructor(l.length*f);let p=0,v=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*f;for(let u=0;u<f;u++)d[v++]=c[p++]}return new $n(d,f,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new tn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let f=0,h=c.length;f<h;f++){const d=c[f],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let d=0,p=h.length;d<p;d++)f.push(h[d].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jp=new gt,gr=new If,Fa=new pc,Xp=new H,rs=new H,ss=new H,os=new H,gu=new H,Oa=new H,ka=new ve,za=new ve,Ba=new ve,Yp=new H,$p=new H,qp=new H,Ha=new H,Va=new H;class je extends Gt{constructor(e=new tn,n=new sa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Oa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=a[l],h=s[l];f!==0&&(gu.fromBufferAttribute(h,e),o?Oa.addScaledVector(gu,f):Oa.addScaledVector(gu.sub(n),f))}n.add(Oa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fa.copy(i.boundingSphere),Fa.applyMatrix4(s),gr.copy(e.ray).recast(e.near),!(Fa.containsPoint(gr.origin)===!1&&(gr.intersectSphere(Fa,Xp)===null||gr.origin.distanceToSquared(Xp)>(e.far-e.near)**2))&&(jp.copy(s).invert(),gr.copy(e.ray).applyMatrix4(jp),!(i.boundingBox!==null&&gr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,gr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,_=d.length;v<_;v++){const m=d[v],u=o[m.materialIndex],x=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,b=g;y<b;y+=3){const T=a.getX(y),C=a.getX(y+1),N=a.getX(y+2);r=Ga(this,u,e,i,c,f,h,T,C,N),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=v,u=_;m<u;m+=3){const x=a.getX(m),g=a.getX(m+1),y=a.getX(m+2);r=Ga(this,o,e,i,c,f,h,x,g,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,_=d.length;v<_;v++){const m=d[v],u=o[m.materialIndex],x=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,b=g;y<b;y+=3){const T=y,C=y+1,N=y+2;r=Ga(this,u,e,i,c,f,h,T,C,N),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=v,u=_;m<u;m+=3){const x=m,g=m+1,y=m+2;r=Ga(this,o,e,i,c,f,h,x,g,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function JS(t,e,n,i,r,s,o,a){let l;if(e.side===hn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===nr,a),l===null)return null;Va.copy(a),Va.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Va);return c<n.near||c>n.far?null:{distance:c,point:Va.clone(),object:t}}function Ga(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,rs),t.getVertexPosition(l,ss),t.getVertexPosition(c,os);const f=JS(t,e,n,i,rs,ss,os,Ha);if(f){r&&(ka.fromBufferAttribute(r,a),za.fromBufferAttribute(r,l),Ba.fromBufferAttribute(r,c),f.uv=ni.getInterpolation(Ha,rs,ss,os,ka,za,Ba,new ve)),s&&(ka.fromBufferAttribute(s,a),za.fromBufferAttribute(s,l),Ba.fromBufferAttribute(s,c),f.uv1=ni.getInterpolation(Ha,rs,ss,os,ka,za,Ba,new ve)),o&&(Yp.fromBufferAttribute(o,a),$p.fromBufferAttribute(o,l),qp.fromBufferAttribute(o,c),f.normal=ni.getInterpolation(Ha,rs,ss,os,Yp,$p,qp,new H),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new H,materialIndex:0};ni.getNormal(rs,ss,os,h.normal),f.face=h}return f}class ft extends tn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],f=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(f,3)),this.setAttribute("uv",new Wt(h,2));function v(_,m,u,x,g,y,b,T,C,N,A){const E=y/C,L=b/N,O=y/2,I=b/2,G=T/2,W=C+1,V=N+1;let Z=0,U=0;const B=new H;for(let k=0;k<V;k++){const P=k*L-I;for(let X=0;X<W;X++){const ne=X*E-O;B[_]=ne*x,B[m]=P*g,B[u]=G,c.push(B.x,B.y,B.z),B[_]=0,B[m]=0,B[u]=T>0?1:-1,f.push(B.x,B.y,B.z),h.push(X/C),h.push(1-k/N),Z+=1}}for(let k=0;k<N;k++)for(let P=0;P<C;P++){const X=d+P+W*k,ne=d+P+W*(k+1),z=d+(P+1)+W*(k+1),q=d+(P+1)+W*k;l.push(X,ne,q),l.push(ne,z,q),U+=6}a.addGroup(p,U,A),p+=U,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ft(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Qt(t){const e={};for(let n=0;n<t.length;n++){const i=Xs(t[n]);for(const r in i)e[r]=i[r]}return e}function QS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function vv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const e1={clone:Xs,merge:Qt};var t1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rr extends Zs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t1,this.fragmentShader=n1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=QS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class xv extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=_i}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new H,Kp=new ve,Zp=new ve;class yn extends xv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ld*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ld*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,n){return this.getViewBounds(e,Kp,Zp),n.subVectors(Zp,Kp)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(dl*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const as=-90,ls=1;class i1 extends Gt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new yn(as,ls,e,n);r.layers=this.layers,this.add(r);const s=new yn(as,ls,e,n);s.layers=this.layers,this.add(s);const o=new yn(as,ls,e,n);o.layers=this.layers,this.add(o);const a=new yn(as,ls,e,n);a.layers=this.layers,this.add(a);const l=new yn(as,ls,e,n);l.layers=this.layers,this.add(l);const c=new yn(as,ls,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===_i)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(h,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class _v extends rn{constructor(e,n,i,r,s,o,a,l,c,f){e=e!==void 0?e:[],n=n!==void 0?n:Hs,super(e,n,i,r,s,o,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class r1 extends Or{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new _v(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:jn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ft(5,5,5),s=new rr({name:"CubemapFromEquirect",uniforms:Xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:Ji});s.uniforms.tEquirect.value=n;const o=new je(r,s),a=n.minFilter;return n.minFilter===Rr&&(n.minFilter=jn),new i1(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const vu=new H,s1=new H,o1=new Ye;class Oi{constructor(e=new H(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=vu.subVectors(i,n).cross(s1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(vu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||o1.getNormalMatrix(e),r=this.coplanarPoint(vu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vr=new pc,Wa=new H;class Nf{constructor(e=new Oi,n=new Oi,i=new Oi,r=new Oi,s=new Oi,o=new Oi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=_i){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],f=r[5],h=r[6],d=r[7],p=r[8],v=r[9],_=r[10],m=r[11],u=r[12],x=r[13],g=r[14],y=r[15];if(i[0].setComponents(l-s,d-c,m-p,y-u).normalize(),i[1].setComponents(l+s,d+c,m+p,y+u).normalize(),i[2].setComponents(l+o,d+f,m+v,y+x).normalize(),i[3].setComponents(l-o,d-f,m-v,y-x).normalize(),i[4].setComponents(l-a,d-h,m-_,y-g).normalize(),n===_i)i[5].setComponents(l+a,d+h,m+_,y+g).normalize();else if(n===Wl)i[5].setComponents(a,h,_,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(e){return vr.center.set(0,0,0),vr.radius=.7071067811865476,vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Wa.x=r.normal.x>0?e.max.x:e.min.x,Wa.y=r.normal.y>0?e.max.y:e.min.y,Wa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function a1(t){const e=new WeakMap;function n(a,l){const c=a.array,f=a.usage,h=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,f),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const f=l.array,h=l._updateRange,d=l.updateRanges;if(t.bindBuffer(c,a),h.count===-1&&d.length===0&&t.bufferSubData(c,0,f),d.length!==0){for(let p=0,v=d.length;p<v;p++){const _=d[p];t.bufferSubData(c,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}l.clearUpdateRanges()}h.count!==-1&&(t.bufferSubData(c,h.offset*f.BYTES_PER_ELEMENT,f,h.offset,h.count),h.count=-1),l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Gn extends tn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,f=l+1,h=e/a,d=n/l,p=[],v=[],_=[],m=[];for(let u=0;u<f;u++){const x=u*d-o;for(let g=0;g<c;g++){const y=g*h-s;v.push(y,-x,0),_.push(0,0,1),m.push(g/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<a;x++){const g=x+c*u,y=x+c*(u+1),b=x+1+c*(u+1),T=x+1+c*u;p.push(g,y,T),p.push(y,b,T)}this.setIndex(p),this.setAttribute("position",new Wt(v,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.width,e.height,e.widthSegments,e.heightSegments)}}var l1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,u1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,h1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,m1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g1=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,v1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,x1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,S1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,M1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,E1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,w1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,C1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,R1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,P1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,L1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,D1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,I1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,N1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,U1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,F1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,O1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k1="gl_FragColor = linearToOutputTexel( gl_FragColor );",z1=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,B1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,H1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,V1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,G1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,W1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,j1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Y1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,q1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,K1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Z1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,oM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,aM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_M=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,SM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,MM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,EM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,AM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,PM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,LM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,DM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,IM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,UM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,OM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,BM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,GM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,WM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,XM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,YM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$M=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,KM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ZM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,JM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,eE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,nE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,iE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,oE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const aE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,mE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_E=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ME=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,AE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,CE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,RE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,DE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,FE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:l1,alphahash_pars_fragment:c1,alphamap_fragment:u1,alphamap_pars_fragment:d1,alphatest_fragment:f1,alphatest_pars_fragment:h1,aomap_fragment:p1,aomap_pars_fragment:m1,batching_pars_vertex:g1,batching_vertex:v1,begin_vertex:x1,beginnormal_vertex:_1,bsdfs:y1,iridescence_fragment:S1,bumpmap_pars_fragment:M1,clipping_planes_fragment:E1,clipping_planes_pars_fragment:w1,clipping_planes_pars_vertex:T1,clipping_planes_vertex:A1,color_fragment:b1,color_pars_fragment:C1,color_pars_vertex:R1,color_vertex:P1,common:L1,cube_uv_reflection_fragment:D1,defaultnormal_vertex:I1,displacementmap_pars_vertex:N1,displacementmap_vertex:U1,emissivemap_fragment:F1,emissivemap_pars_fragment:O1,colorspace_fragment:k1,colorspace_pars_fragment:z1,envmap_fragment:B1,envmap_common_pars_fragment:H1,envmap_pars_fragment:V1,envmap_pars_vertex:G1,envmap_physical_pars_fragment:eM,envmap_vertex:W1,fog_vertex:j1,fog_pars_vertex:X1,fog_fragment:Y1,fog_pars_fragment:$1,gradientmap_pars_fragment:q1,lightmap_pars_fragment:K1,lights_lambert_fragment:Z1,lights_lambert_pars_fragment:J1,lights_pars_begin:Q1,lights_toon_fragment:tM,lights_toon_pars_fragment:nM,lights_phong_fragment:iM,lights_phong_pars_fragment:rM,lights_physical_fragment:sM,lights_physical_pars_fragment:oM,lights_fragment_begin:aM,lights_fragment_maps:lM,lights_fragment_end:cM,logdepthbuf_fragment:uM,logdepthbuf_pars_fragment:dM,logdepthbuf_pars_vertex:fM,logdepthbuf_vertex:hM,map_fragment:pM,map_pars_fragment:mM,map_particle_fragment:gM,map_particle_pars_fragment:vM,metalnessmap_fragment:xM,metalnessmap_pars_fragment:_M,morphinstance_vertex:yM,morphcolor_vertex:SM,morphnormal_vertex:MM,morphtarget_pars_vertex:EM,morphtarget_vertex:wM,normal_fragment_begin:TM,normal_fragment_maps:AM,normal_pars_fragment:bM,normal_pars_vertex:CM,normal_vertex:RM,normalmap_pars_fragment:PM,clearcoat_normal_fragment_begin:LM,clearcoat_normal_fragment_maps:DM,clearcoat_pars_fragment:IM,iridescence_pars_fragment:NM,opaque_fragment:UM,packing:FM,premultiplied_alpha_fragment:OM,project_vertex:kM,dithering_fragment:zM,dithering_pars_fragment:BM,roughnessmap_fragment:HM,roughnessmap_pars_fragment:VM,shadowmap_pars_fragment:GM,shadowmap_pars_vertex:WM,shadowmap_vertex:jM,shadowmask_pars_fragment:XM,skinbase_vertex:YM,skinning_pars_vertex:$M,skinning_vertex:qM,skinnormal_vertex:KM,specularmap_fragment:ZM,specularmap_pars_fragment:JM,tonemapping_fragment:QM,tonemapping_pars_fragment:eE,transmission_fragment:tE,transmission_pars_fragment:nE,uv_pars_fragment:iE,uv_pars_vertex:rE,uv_vertex:sE,worldpos_vertex:oE,background_vert:aE,background_frag:lE,backgroundCube_vert:cE,backgroundCube_frag:uE,cube_vert:dE,cube_frag:fE,depth_vert:hE,depth_frag:pE,distanceRGBA_vert:mE,distanceRGBA_frag:gE,equirect_vert:vE,equirect_frag:xE,linedashed_vert:_E,linedashed_frag:yE,meshbasic_vert:SE,meshbasic_frag:ME,meshlambert_vert:EE,meshlambert_frag:wE,meshmatcap_vert:TE,meshmatcap_frag:AE,meshnormal_vert:bE,meshnormal_frag:CE,meshphong_vert:RE,meshphong_frag:PE,meshphysical_vert:LE,meshphysical_frag:DE,meshtoon_vert:IE,meshtoon_frag:NE,points_vert:UE,points_frag:FE,shadow_vert:OE,shadow_frag:kE,sprite_vert:zE,sprite_frag:BE},ge={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ei={basic:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Qt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Qt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new qe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Qt([ge.points,ge.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Qt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Qt([ge.common,ge.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Qt([ge.sprite,ge.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Qt([ge.common,ge.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Qt([ge.lights,ge.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ei.physical={uniforms:Qt([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const ja={r:0,b:0,g:0},xr=new oi,HE=new gt;function VE(t,e,n,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,f,h=null,d=0,p=null;function v(x){let g=x.isScene===!0?x.background:null;return g&&g.isTexture&&(g=(x.backgroundBlurriness>0?n:e).get(g)),g}function _(x){let g=!1;const y=v(x);y===null?u(a,l):y&&y.isColor&&(u(y,1),g=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(x,g){const y=v(g);y&&(y.isCubeTexture||y.mapping===dc)?(f===void 0&&(f=new je(new ft(1,1,1),new rr({name:"BackgroundCubeMaterial",uniforms:Xs(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(b,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),xr.copy(g.backgroundRotation),xr.x*=-1,xr.y*=-1,xr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(xr.y*=-1,xr.z*=-1),f.material.uniforms.envMap.value=y,f.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(HE.makeRotationFromEuler(xr)),f.material.toneMapped=it.getTransfer(y.colorSpace)!==dt,(h!==y||d!==y.version||p!==t.toneMapping)&&(f.material.needsUpdate=!0,h=y,d=y.version,p=t.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new je(new Gn(2,2),new rr({name:"BackgroundMaterial",uniforms:Xs(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=it.getTransfer(y.colorSpace)!==dt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,p=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,g){x.getRGB(ja,vv(t)),i.buffers.color.setClear(ja.r,ja.g,ja.b,g,o)}return{getClearColor:function(){return a},setClearColor:function(x,g=1){a.set(x),l=g,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,u(a,l)},render:_,addToRenderList:m}}function GE(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(E,L,O,I,G){let W=!1;const V=h(I,O,L);s!==V&&(s=V,c(s.object)),W=p(E,I,O,G),W&&v(E,I,O,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(E,L,O,I),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(E){return t.bindVertexArray(E)}function f(E){return t.deleteVertexArray(E)}function h(E,L,O){const I=O.wireframe===!0;let G=i[E.id];G===void 0&&(G={},i[E.id]=G);let W=G[L.id];W===void 0&&(W={},G[L.id]=W);let V=W[I];return V===void 0&&(V=d(l()),W[I]=V),V}function d(E){const L=[],O=[],I=[];for(let G=0;G<n;G++)L[G]=0,O[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:I,object:E,attributes:{},index:null}}function p(E,L,O,I){const G=s.attributes,W=L.attributes;let V=0;const Z=O.getAttributes();for(const U in Z)if(Z[U].location>=0){const k=G[U];let P=W[U];if(P===void 0&&(U==="instanceMatrix"&&E.instanceMatrix&&(P=E.instanceMatrix),U==="instanceColor"&&E.instanceColor&&(P=E.instanceColor)),k===void 0||k.attribute!==P||P&&k.data!==P.data)return!0;V++}return s.attributesNum!==V||s.index!==I}function v(E,L,O,I){const G={},W=L.attributes;let V=0;const Z=O.getAttributes();for(const U in Z)if(Z[U].location>=0){let k=W[U];k===void 0&&(U==="instanceMatrix"&&E.instanceMatrix&&(k=E.instanceMatrix),U==="instanceColor"&&E.instanceColor&&(k=E.instanceColor));const P={};P.attribute=k,k&&k.data&&(P.data=k.data),G[U]=P,V++}s.attributes=G,s.attributesNum=V,s.index=I}function _(){const E=s.newAttributes;for(let L=0,O=E.length;L<O;L++)E[L]=0}function m(E){u(E,0)}function u(E,L){const O=s.newAttributes,I=s.enabledAttributes,G=s.attributeDivisors;O[E]=1,I[E]===0&&(t.enableVertexAttribArray(E),I[E]=1),G[E]!==L&&(t.vertexAttribDivisor(E,L),G[E]=L)}function x(){const E=s.newAttributes,L=s.enabledAttributes;for(let O=0,I=L.length;O<I;O++)L[O]!==E[O]&&(t.disableVertexAttribArray(O),L[O]=0)}function g(E,L,O,I,G,W,V){V===!0?t.vertexAttribIPointer(E,L,O,G,W):t.vertexAttribPointer(E,L,O,I,G,W)}function y(E,L,O,I){_();const G=I.attributes,W=O.getAttributes(),V=L.defaultAttributeValues;for(const Z in W){const U=W[Z];if(U.location>=0){let B=G[Z];if(B===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(B=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(B=E.instanceColor)),B!==void 0){const k=B.normalized,P=B.itemSize,X=e.get(B);if(X===void 0)continue;const ne=X.buffer,z=X.type,q=X.bytesPerElement,ie=z===t.INT||z===t.UNSIGNED_INT||B.gpuType===tv;if(B.isInterleavedBufferAttribute){const re=B.data,de=re.stride,ye=B.offset;if(re.isInstancedInterleavedBuffer){for(let we=0;we<U.locationSize;we++)u(U.location+we,re.meshPerAttribute);E.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let we=0;we<U.locationSize;we++)m(U.location+we);t.bindBuffer(t.ARRAY_BUFFER,ne);for(let we=0;we<U.locationSize;we++)g(U.location+we,P/U.locationSize,z,k,de*q,(ye+P/U.locationSize*we)*q,ie)}else{if(B.isInstancedBufferAttribute){for(let re=0;re<U.locationSize;re++)u(U.location+re,B.meshPerAttribute);E.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let re=0;re<U.locationSize;re++)m(U.location+re);t.bindBuffer(t.ARRAY_BUFFER,ne);for(let re=0;re<U.locationSize;re++)g(U.location+re,P/U.locationSize,z,k,P*q,P/U.locationSize*re*q,ie)}}else if(V!==void 0){const k=V[Z];if(k!==void 0)switch(k.length){case 2:t.vertexAttrib2fv(U.location,k);break;case 3:t.vertexAttrib3fv(U.location,k);break;case 4:t.vertexAttrib4fv(U.location,k);break;default:t.vertexAttrib1fv(U.location,k)}}}}x()}function b(){N();for(const E in i){const L=i[E];for(const O in L){const I=L[O];for(const G in I)f(I[G].object),delete I[G];delete L[O]}delete i[E]}}function T(E){if(i[E.id]===void 0)return;const L=i[E.id];for(const O in L){const I=L[O];for(const G in I)f(I[G].object),delete I[G];delete L[O]}delete i[E.id]}function C(E){for(const L in i){const O=i[L];if(O[E.id]===void 0)continue;const I=O[E.id];for(const G in I)f(I[G].object),delete I[G];delete O[E.id]}}function N(){A(),o=!0,s!==r&&(s=r,c(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:N,resetDefaultState:A,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function WE(t,e,n){let i;function r(c){i=c}function s(c,f){t.drawArrays(i,c,f),n.update(f,i,1)}function o(c,f,h){h!==0&&(t.drawArraysInstanced(i,c,f,h),n.update(f,i,h))}function a(c,f,h){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<h;p++)this.render(c[p],f[p]);else{d.multiDrawArraysWEBGL(i,c,0,f,0,h);let p=0;for(let v=0;v<h;v++)p+=f[v];n.update(p,i,1)}}function l(c,f,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],f[v],d[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,d,0,h);let v=0;for(let _=0;_<h;_++)v+=f[_];for(let _=0;_<d.length;_++)n.update(v,i,d[_])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function jE(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==ii&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===fc&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ir&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Gi&&!C)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,d=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),m=t.getParameter(t.MAX_VERTEX_ATTRIBS),u=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),g=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),y=p>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:u,maxVaryings:x,maxFragmentUniforms:g,vertexTextures:y,maxSamples:b}}function XE(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Oi,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=f(h,d,0)},this.setState=function(h,d,p){const v=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,u=t.get(h);if(!r||v===null||v.length===0||s&&!m)s?f(null):c();else{const x=s?0:i,g=x*4;let y=u.clippingState||null;l.value=y,y=f(v,d,g,p);for(let b=0;b!==g;++b)y[b]=n[b];u.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,p,v){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const u=p+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<u)&&(m=new Float32Array(u));for(let g=0,y=p;g!==_;++g,y+=4)o.copy(h[g]).applyMatrix4(x,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function YE(t){let e=new WeakMap;function n(o,a){return a===Cd?o.mapping=Hs:a===Rd&&(o.mapping=Vs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Cd||a===Rd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new r1(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Sv extends xv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ms=4,Jp=[.125,.215,.35,.446,.526,.582],wr=20,xu=new Sv,Qp=new qe;let _u=null,yu=0,Su=0,Mu=!1;const Mr=(1+Math.sqrt(5))/2,cs=1/Mr,em=[new H(-Mr,cs,0),new H(Mr,cs,0),new H(-cs,0,Mr),new H(cs,0,Mr),new H(0,Mr,-cs),new H(0,Mr,cs),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class tm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){_u=this._renderer.getRenderTarget(),yu=this._renderer.getActiveCubeFace(),Su=this._renderer.getActiveMipmapLevel(),Mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=im(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_u,yu,Su),this._renderer.xr.enabled=Mu,e.scissorTest=!1,Xa(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Hs||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_u=this._renderer.getRenderTarget(),yu=this._renderer.getActiveCubeFace(),Su=this._renderer.getActiveMipmapLevel(),Mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:fc,format:ii,colorSpace:cr,depthBuffer:!1},r=nm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$E(s)),this._blurMaterial=qE(s,e,n)}return r}_compileMaterial(e){const n=new je(this._lodPlanes[0],e);this._renderer.compile(n,xu)}_sceneToCubeUV(e,n,i,r){const a=new yn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Qp),f.toneMapping=Qi,f.autoClear=!1;const p=new sa({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),v=new je(new ft,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Qp),_=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):x===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const g=this._cubeSize;Xa(r,x*g,u>2?g:0,g,g),f.setRenderTarget(r),_&&f.render(v,a),f.render(e,a)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Hs||e.mapping===Vs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=rm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=im());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new je(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Xa(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,xu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=em[(r-s-1)%em.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,h=new je(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*wr-1),_=s/v,m=isFinite(s)?1+Math.floor(f*_):wr;m>wr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wr}`);const u=[];let x=0;for(let C=0;C<wr;++C){const N=C/_,A=Math.exp(-N*N/2);u.push(A),C===0?x+=A:C<m&&(x+=2*A)}for(let C=0;C<u.length;C++)u[C]=u[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=u,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:g}=this;d.dTheta.value=v,d.mipInt.value=g-i;const y=this._sizeLods[r],b=3*y*(r>g-Ms?r-g+Ms:0),T=4*(this._cubeSize-y);Xa(n,b,T,3*y,2*y),l.setRenderTarget(n),l.render(h,xu)}}function $E(t){const e=[],n=[],i=[];let r=t;const s=t-Ms+1+Jp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-Ms?l=Jp[o-t+Ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),f=-c,h=1+c,d=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,v=6,_=3,m=2,u=1,x=new Float32Array(_*v*p),g=new Float32Array(m*v*p),y=new Float32Array(u*v*p);for(let T=0;T<p;T++){const C=T%3*2/3-1,N=T>2?0:-1,A=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];x.set(A,_*v*T),g.set(d,m*v*T);const E=[T,T,T,T,T,T];y.set(E,u*v*T)}const b=new tn;b.setAttribute("position",new $n(x,_)),b.setAttribute("uv",new $n(g,m)),b.setAttribute("faceIndex",new $n(y,u)),e.push(b),r>Ms&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function nm(t,e,n){const i=new Or(t,e,n);return i.texture.mapping=dc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Xa(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function qE(t,e,n){const i=new Float32Array(wr),r=new H(0,1,0);return new rr({name:"SphericalGaussianBlur",defines:{n:wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function im(){return new rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function rm(){return new rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Uf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function KE(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Cd||l===Rd,f=l===Hs||l===Vs;if(c||f){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return n===null&&(n=new tm(t)),h=c?n.fromEquirectangular(a,h):n.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||f&&p&&r(p)?(n===null&&(n=new tm(t)),h=c?n.fromEquirectangular(a):n.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function ZE(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&uv("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function JE(t,e,n,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const _=d.morphAttributes[v];for(let m=0,u=_.length;m<u;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],t.ARRAY_BUFFER);const p=h.morphAttributes;for(const v in p){const _=p[v];for(let m=0,u=_.length;m<u;m++)e.update(_[m],t.ARRAY_BUFFER)}}function c(h){const d=[],p=h.index,v=h.attributes.position;let _=0;if(p!==null){const x=p.array;_=p.version;for(let g=0,y=x.length;g<y;g+=3){const b=x[g+0],T=x[g+1],C=x[g+2];d.push(b,T,T,C,C,b)}}else if(v!==void 0){const x=v.array;_=v.version;for(let g=0,y=x.length/3-1;g<y;g+=3){const b=g+0,T=g+1,C=g+2;d.push(b,T,T,C,C,b)}}else return;const m=new(cv(d)?gv:mv)(d,1);m.version=_;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function f(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:f}}function QE(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){t.drawElements(i,p,s,d*o),n.update(p,i,1)}function c(d,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,d*o,v),n.update(p,i,v))}function f(d,p,v){if(v===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<v;m++)this.render(d[m]/o,p[m]);else{_.multiDrawElementsWEBGL(i,p,0,s,d,0,v);let m=0;for(let u=0;u<v;u++)m+=p[u];n.update(m,i,1)}}function h(d,p,v,_){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<d.length;u++)c(d[u]/o,p[u],_[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,_,0,v);let u=0;for(let x=0;x<v;x++)u+=p[x];for(let x=0;x<_.length;x++)n.update(u,i,_[x])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function ew(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function tw(t,e,n){const i=new WeakMap,r=new mt;function s(o,a,l){const c=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let E=function(){N.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var p=E;d!==void 0&&d.texture.dispose();const v=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],g=a.morphAttributes.color||[];let y=0;v===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let b=a.attributes.position.count*y,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const C=new Float32Array(b*T*4*h),N=new fv(C,b,T,h);N.type=Gi,N.needsUpdate=!0;const A=y*4;for(let L=0;L<h;L++){const O=u[L],I=x[L],G=g[L],W=b*T*4*L;for(let V=0;V<O.count;V++){const Z=V*A;v===!0&&(r.fromBufferAttribute(O,V),C[W+Z+0]=r.x,C[W+Z+1]=r.y,C[W+Z+2]=r.z,C[W+Z+3]=0),_===!0&&(r.fromBufferAttribute(I,V),C[W+Z+4]=r.x,C[W+Z+5]=r.y,C[W+Z+6]=r.z,C[W+Z+7]=0),m===!0&&(r.fromBufferAttribute(G,V),C[W+Z+8]=r.x,C[W+Z+9]=r.y,C[W+Z+10]=r.z,C[W+Z+11]=G.itemSize===4?r.w:1)}}d={count:h,texture:N,size:new ve(b,T)},i.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const _=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function nw(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Mv extends rn{constructor(e,n,i,r,s,o,a,l,c,f=Ds){if(f!==Ds&&f!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Ds&&(i=Gs),i===void 0&&f===js&&(i=Ws),super(null,r,s,o,a,l,f,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Dn,this.minFilter=l!==void 0?l:Dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Ev=new rn,wv=new Mv(1,1);wv.compareFunction=lv;const Tv=new fv,Av=new VS,bv=new _v,sm=[],om=[],am=new Float32Array(16),lm=new Float32Array(9),cm=new Float32Array(4);function Js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=sm[r];if(s===void 0&&(s=new Float32Array(r),sm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Nt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function mc(t,e){let n=om[e];n===void 0&&(n=new Int32Array(e),om[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function iw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function rw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function sw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Nt(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function ow(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function aw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;cm.set(i),t.uniformMatrix2fv(this.addr,!1,cm),Ut(n,i)}}function lw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;lm.set(i),t.uniformMatrix3fv(this.addr,!1,lm),Ut(n,i)}}function cw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;am.set(i),t.uniformMatrix4fv(this.addr,!1,am),Ut(n,i)}}function uw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function dw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function fw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function hw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function pw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function mw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function gw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function vw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function xw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?wv:Ev;n.setTexture2D(e||s,r)}function _w(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Av,r)}function yw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||bv,r)}function Sw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Tv,r)}function Mw(t){switch(t){case 5126:return iw;case 35664:return rw;case 35665:return sw;case 35666:return ow;case 35674:return aw;case 35675:return lw;case 35676:return cw;case 5124:case 35670:return uw;case 35667:case 35671:return dw;case 35668:case 35672:return fw;case 35669:case 35673:return hw;case 5125:return pw;case 36294:return mw;case 36295:return gw;case 36296:return vw;case 35678:case 36198:case 36298:case 36306:case 35682:return xw;case 35679:case 36299:case 36307:return _w;case 35680:case 36300:case 36308:case 36293:return yw;case 36289:case 36303:case 36311:case 36292:return Sw}}function Ew(t,e){t.uniform1fv(this.addr,e)}function ww(t,e){const n=Js(e,this.size,2);t.uniform2fv(this.addr,n)}function Tw(t,e){const n=Js(e,this.size,3);t.uniform3fv(this.addr,n)}function Aw(t,e){const n=Js(e,this.size,4);t.uniform4fv(this.addr,n)}function bw(t,e){const n=Js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Cw(t,e){const n=Js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Rw(t,e){const n=Js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Pw(t,e){t.uniform1iv(this.addr,e)}function Lw(t,e){t.uniform2iv(this.addr,e)}function Dw(t,e){t.uniform3iv(this.addr,e)}function Iw(t,e){t.uniform4iv(this.addr,e)}function Nw(t,e){t.uniform1uiv(this.addr,e)}function Uw(t,e){t.uniform2uiv(this.addr,e)}function Fw(t,e){t.uniform3uiv(this.addr,e)}function Ow(t,e){t.uniform4uiv(this.addr,e)}function kw(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Ev,s[o])}function zw(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Av,s[o])}function Bw(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||bv,s[o])}function Hw(t,e,n){const i=this.cache,r=e.length,s=mc(n,r);Nt(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Tv,s[o])}function Vw(t){switch(t){case 5126:return Ew;case 35664:return ww;case 35665:return Tw;case 35666:return Aw;case 35674:return bw;case 35675:return Cw;case 35676:return Rw;case 5124:case 35670:return Pw;case 35667:case 35671:return Lw;case 35668:case 35672:return Dw;case 35669:case 35673:return Iw;case 5125:return Nw;case 36294:return Uw;case 36295:return Fw;case 36296:return Ow;case 35678:case 36198:case 36298:case 36306:case 35682:return kw;case 35679:case 36299:case 36307:return zw;case 35680:case 36300:case 36308:case 36293:return Bw;case 36289:case 36303:case 36311:case 36292:return Hw}}class Gw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Mw(n.type)}}class Ww{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Vw(n.type)}}class jw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Eu=/(\w+)(\])?(\[|\.)?/g;function um(t,e){t.seq.push(e),t.map[e.id]=e}function Xw(t,e,n){const i=t.name,r=i.length;for(Eu.lastIndex=0;;){const s=Eu.exec(i),o=Eu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){um(n,c===void 0?new Gw(a,t,e):new Ww(a,t,e));break}else{let h=n.map[a];h===void 0&&(h=new jw(a),um(n,h)),n=h}}}class fl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);Xw(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function dm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Yw=37297;let $w=0;function qw(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function Kw(t){const e=it.getPrimaries(it.workingColorSpace),n=it.getPrimaries(t);let i;switch(e===n?i="":e===Gl&&n===Vl?i="LinearDisplayP3ToLinearSRGB":e===Vl&&n===Gl&&(i="LinearSRGBToLinearDisplayP3"),t){case cr:case hc:return[i,"LinearTransferOETF"];case Qn:case Df:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function fm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+qw(t.getShaderSource(e),o)}else return r}function Zw(t,e){const n=Kw(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Jw(t,e){let n;switch(e){case oS:n="Linear";break;case aS:n="Reinhard";break;case lS:n="OptimizedCineon";break;case Q0:n="ACESFilmic";break;case uS:n="AgX";break;case dS:n="Neutral";break;case cS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Qw(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yo).join(`
`)}function e2(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function t2(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function yo(t){return t!==""}function hm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const n2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dd(t){return t.replace(n2,r2)}const i2=new Map;function r2(t,e){let n=Xe[e];if(n===void 0){const i=i2.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Dd(n)}const s2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mm(t){return t.replace(s2,o2)}function o2(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function gm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function a2(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===K0?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Z0?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function l2(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Hs:case Vs:e="ENVMAP_TYPE_CUBE";break;case dc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function c2(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Vs:e="ENVMAP_MODE_REFRACTION";break}return e}function u2(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case J0:e="ENVMAP_BLENDING_MULTIPLY";break;case rS:e="ENVMAP_BLENDING_MIX";break;case sS:e="ENVMAP_BLENDING_ADD";break}return e}function d2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function f2(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=a2(n),c=l2(n),f=c2(n),h=u2(n),d=d2(n),p=Qw(n),v=e2(s),_=r.createProgram();let m,u,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(yo).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(yo).join(`
`),u.length>0&&(u+=`
`)):(m=[gm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yo).join(`
`),u=[gm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Qi?"#define TONE_MAPPING":"",n.toneMapping!==Qi?Xe.tonemapping_pars_fragment:"",n.toneMapping!==Qi?Jw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Zw("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(yo).join(`
`)),o=Dd(o),o=hm(o,n),o=pm(o,n),a=Dd(a),a=hm(a,n),a=pm(a,n),o=mm(o),a=mm(a),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===Dp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Dp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const g=x+m+o,y=x+u+a,b=dm(r,r.VERTEX_SHADER,g),T=dm(r,r.FRAGMENT_SHADER,y);r.attachShader(_,b),r.attachShader(_,T),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(L){if(t.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),I=r.getShaderInfoLog(b).trim(),G=r.getShaderInfoLog(T).trim();let W=!0,V=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,b,T);else{const Z=fm(r,b,"vertex"),U=fm(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+Z+`
`+U)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(I===""||G==="")&&(V=!1);V&&(L.diagnostics={runnable:W,programLog:O,vertexShader:{log:I,prefix:m},fragmentShader:{log:G,prefix:u}})}r.deleteShader(b),r.deleteShader(T),N=new fl(r,_),A=t2(r,_)}let N;this.getUniforms=function(){return N===void 0&&C(this),N};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,Yw)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=$w++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=T,this}let h2=0;class p2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new m2(e),n.set(e,i)),i}}class m2{constructor(e){this.id=h2++,this.code=e,this.usedTimes=0}}function g2(t,e,n,i,r,s,o){const a=new hv,l=new p2,c=new Set,f=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(A){return c.add(A),A===0?"uv":`uv${A}`}function m(A,E,L,O,I){const G=O.fog,W=I.geometry,V=A.isMeshStandardMaterial?O.environment:null,Z=(A.isMeshStandardMaterial?n:e).get(A.envMap||V),U=Z&&Z.mapping===dc?Z.image.height:null,B=v[A.type];A.precision!==null&&(p=r.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));const k=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,P=k!==void 0?k.length:0;let X=0;W.morphAttributes.position!==void 0&&(X=1),W.morphAttributes.normal!==void 0&&(X=2),W.morphAttributes.color!==void 0&&(X=3);let ne,z,q,ie;if(B){const et=ei[B];ne=et.vertexShader,z=et.fragmentShader}else ne=A.vertexShader,z=A.fragmentShader,l.update(A),q=l.getVertexShaderID(A),ie=l.getFragmentShaderID(A);const re=t.getRenderTarget(),de=I.isInstancedMesh===!0,ye=I.isBatchedMesh===!0,we=!!A.map,F=!!A.matcap,Ue=!!Z,Fe=!!A.aoMap,Ee=!!A.lightMap,Se=!!A.bumpMap,ke=!!A.normalMap,De=!!A.displacementMap,Pe=!!A.emissiveMap,Ze=!!A.metalnessMap,D=!!A.roughnessMap,w=A.anisotropy>0,J=A.clearcoat>0,oe=A.dispersion>0,le=A.iridescence>0,ce=A.sheen>0,Re=A.transmission>0,he=w&&!!A.anisotropyMap,pe=J&&!!A.clearcoatMap,We=J&&!!A.clearcoatNormalMap,se=J&&!!A.clearcoatRoughnessMap,xe=le&&!!A.iridescenceMap,Ie=le&&!!A.iridescenceThicknessMap,Ae=ce&&!!A.sheenColorMap,me=ce&&!!A.sheenRoughnessMap,ze=!!A.specularMap,Ve=!!A.specularColorMap,lt=!!A.specularIntensityMap,S=Re&&!!A.transmissionMap,Q=Re&&!!A.thicknessMap,$=!!A.gradientMap,te=!!A.alphaMap,ae=A.alphaTest>0,Le=!!A.alphaHash,Be=!!A.extensions;let St=Qi;A.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(St=t.toneMapping);const At={shaderID:B,shaderType:A.type,shaderName:A.name,vertexShader:ne,fragmentShader:z,defines:A.defines,customVertexShaderID:q,customFragmentShaderID:ie,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:ye,batchingColor:ye&&I._colorsTexture!==null,instancing:de,instancingColor:de&&I.instanceColor!==null,instancingMorph:de&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?t.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:cr,alphaToCoverage:!!A.alphaToCoverage,map:we,matcap:F,envMap:Ue,envMapMode:Ue&&Z.mapping,envMapCubeUVHeight:U,aoMap:Fe,lightMap:Ee,bumpMap:Se,normalMap:ke,displacementMap:d&&De,emissiveMap:Pe,normalMapObjectSpace:ke&&A.normalMapType===TS,normalMapTangentSpace:ke&&A.normalMapType===av,metalnessMap:Ze,roughnessMap:D,anisotropy:w,anisotropyMap:he,clearcoat:J,clearcoatMap:pe,clearcoatNormalMap:We,clearcoatRoughnessMap:se,dispersion:oe,iridescence:le,iridescenceMap:xe,iridescenceThicknessMap:Ie,sheen:ce,sheenColorMap:Ae,sheenRoughnessMap:me,specularMap:ze,specularColorMap:Ve,specularIntensityMap:lt,transmission:Re,transmissionMap:S,thicknessMap:Q,gradientMap:$,opaque:A.transparent===!1&&A.blending===Ls&&A.alphaToCoverage===!1,alphaMap:te,alphaTest:ae,alphaHash:Le,combine:A.combine,mapUv:we&&_(A.map.channel),aoMapUv:Fe&&_(A.aoMap.channel),lightMapUv:Ee&&_(A.lightMap.channel),bumpMapUv:Se&&_(A.bumpMap.channel),normalMapUv:ke&&_(A.normalMap.channel),displacementMapUv:De&&_(A.displacementMap.channel),emissiveMapUv:Pe&&_(A.emissiveMap.channel),metalnessMapUv:Ze&&_(A.metalnessMap.channel),roughnessMapUv:D&&_(A.roughnessMap.channel),anisotropyMapUv:he&&_(A.anisotropyMap.channel),clearcoatMapUv:pe&&_(A.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&_(A.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&_(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&_(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&_(A.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(A.sheenRoughnessMap.channel),specularMapUv:ze&&_(A.specularMap.channel),specularColorMapUv:Ve&&_(A.specularColorMap.channel),specularIntensityMapUv:lt&&_(A.specularIntensityMap.channel),transmissionMapUv:S&&_(A.transmissionMap.channel),thicknessMapUv:Q&&_(A.thicknessMap.channel),alphaMapUv:te&&_(A.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ke||w),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!W.attributes.uv&&(we||te),fog:!!G,useFog:A.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:I.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:X,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:St,decodeVideoTexture:we&&A.map.isVideoTexture===!0&&it.getTransfer(A.map.colorSpace)===dt,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Sn,flipSided:A.side===hn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Be&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Be&&A.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return At.vertexUv1s=c.has(1),At.vertexUv2s=c.has(2),At.vertexUv3s=c.has(3),c.clear(),At}function u(A){const E=[];if(A.shaderID?E.push(A.shaderID):(E.push(A.customVertexShaderID),E.push(A.customFragmentShaderID)),A.defines!==void 0)for(const L in A.defines)E.push(L),E.push(A.defines[L]);return A.isRawShaderMaterial===!1&&(x(E,A),g(E,A),E.push(t.outputColorSpace)),E.push(A.customProgramCacheKey),E.join()}function x(A,E){A.push(E.precision),A.push(E.outputColorSpace),A.push(E.envMapMode),A.push(E.envMapCubeUVHeight),A.push(E.mapUv),A.push(E.alphaMapUv),A.push(E.lightMapUv),A.push(E.aoMapUv),A.push(E.bumpMapUv),A.push(E.normalMapUv),A.push(E.displacementMapUv),A.push(E.emissiveMapUv),A.push(E.metalnessMapUv),A.push(E.roughnessMapUv),A.push(E.anisotropyMapUv),A.push(E.clearcoatMapUv),A.push(E.clearcoatNormalMapUv),A.push(E.clearcoatRoughnessMapUv),A.push(E.iridescenceMapUv),A.push(E.iridescenceThicknessMapUv),A.push(E.sheenColorMapUv),A.push(E.sheenRoughnessMapUv),A.push(E.specularMapUv),A.push(E.specularColorMapUv),A.push(E.specularIntensityMapUv),A.push(E.transmissionMapUv),A.push(E.thicknessMapUv),A.push(E.combine),A.push(E.fogExp2),A.push(E.sizeAttenuation),A.push(E.morphTargetsCount),A.push(E.morphAttributeCount),A.push(E.numDirLights),A.push(E.numPointLights),A.push(E.numSpotLights),A.push(E.numSpotLightMaps),A.push(E.numHemiLights),A.push(E.numRectAreaLights),A.push(E.numDirLightShadows),A.push(E.numPointLightShadows),A.push(E.numSpotLightShadows),A.push(E.numSpotLightShadowsWithMaps),A.push(E.numLightProbes),A.push(E.shadowMapType),A.push(E.toneMapping),A.push(E.numClippingPlanes),A.push(E.numClipIntersection),A.push(E.depthPacking)}function g(A,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.doubleSided&&a.enable(10),E.flipSided&&a.enable(11),E.useDepthPacking&&a.enable(12),E.dithering&&a.enable(13),E.transmission&&a.enable(14),E.sheen&&a.enable(15),E.opaque&&a.enable(16),E.pointsUvs&&a.enable(17),E.decodeVideoTexture&&a.enable(18),E.alphaToCoverage&&a.enable(19),A.push(a.mask)}function y(A){const E=v[A.type];let L;if(E){const O=ei[E];L=e1.clone(O.uniforms)}else L=A.uniforms;return L}function b(A,E){let L;for(let O=0,I=f.length;O<I;O++){const G=f[O];if(G.cacheKey===E){L=G,++L.usedTimes;break}}return L===void 0&&(L=new f2(t,E,A,s),f.push(L)),L}function T(A){if(--A.usedTimes===0){const E=f.indexOf(A);f[E]=f[f.length-1],f.pop(),A.destroy()}}function C(A){l.remove(A)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:b,releaseProgram:T,releaseShaderCache:C,programs:f,dispose:N}}function v2(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function x2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function vm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function xm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,d,p,v,_,m){let u=t[e];return u===void 0?(u={id:h.id,object:h,geometry:d,material:p,groupOrder:v,renderOrder:h.renderOrder,z:_,group:m},t[e]=u):(u.id=h.id,u.object=h,u.geometry=d,u.material=p,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=_,u.group=m),e++,u}function a(h,d,p,v,_,m){const u=o(h,d,p,v,_,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(h,d,p,v,_,m){const u=o(h,d,p,v,_,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(h,d){n.length>1&&n.sort(h||x2),i.length>1&&i.sort(d||vm),r.length>1&&r.sort(d||vm)}function f(){for(let h=e,d=t.length;h<d;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:c}}function _2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new xm,t.set(i,[o])):r>=s.length?(o=new xm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function y2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new H,color:new qe};break;case"SpotLight":n={position:new H,direction:new H,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":n={color:new qe,position:new H,halfWidth:new H,halfHeight:new H};break}return t[e.id]=n,n}}}function S2(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let M2=0;function E2(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function w2(t){const e=new y2,n=S2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new gt,o=new gt;function a(c){let f=0,h=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,v=0,_=0,m=0,u=0,x=0,g=0,y=0,b=0,T=0,C=0;c.sort(E2);for(let A=0,E=c.length;A<E;A++){const L=c[A],O=L.color,I=L.intensity,G=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=O.r*I,h+=O.g*I,d+=O.b*I;else if(L.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(L.sh.coefficients[V],I);C++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,U=n.get(L);U.shadowBias=Z.bias,U.shadowNormalBias=Z.normalBias,U.shadowRadius=Z.radius,U.shadowMapSize=Z.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=L.shadow.matrix,x++}i.directional[p]=V,p++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(O).multiplyScalar(I),V.distance=G,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,i.spot[_]=V;const Z=L.shadow;if(L.map&&(i.spotLightMap[b]=L.map,b++,Z.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[_]=Z.matrix,L.castShadow){const U=n.get(L);U.shadowBias=Z.bias,U.shadowNormalBias=Z.normalBias,U.shadowRadius=Z.radius,U.shadowMapSize=Z.mapSize,i.spotShadow[_]=U,i.spotShadowMap[_]=W,y++}_++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(O).multiplyScalar(I),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=V,m++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const Z=L.shadow,U=n.get(L);U.shadowBias=Z.bias,U.shadowNormalBias=Z.normalBias,U.shadowRadius=Z.radius,U.shadowMapSize=Z.mapSize,U.shadowCameraNear=Z.camera.near,U.shadowCameraFar=Z.camera.far,i.pointShadow[v]=U,i.pointShadowMap[v]=W,i.pointShadowMatrix[v]=L.shadow.matrix,g++}i.point[v]=V,v++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(I),V.groundColor.copy(L.groundColor).multiplyScalar(I),i.hemi[u]=V,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const N=i.hash;(N.directionalLength!==p||N.pointLength!==v||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==u||N.numDirectionalShadows!==x||N.numPointShadows!==g||N.numSpotShadows!==y||N.numSpotMaps!==b||N.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=g,i.pointShadowMap.length=g,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=g,i.spotLightMatrix.length=y+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,N.directionalLength=p,N.pointLength=v,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=u,N.numDirectionalShadows=x,N.numPointShadows=g,N.numSpotShadows=y,N.numSpotMaps=b,N.numLightProbes=C,i.version=M2++)}function l(c,f){let h=0,d=0,p=0,v=0,_=0;const m=f.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const g=c[u];if(g.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(g.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(g.isRectAreaLight){const y=i.rectArea[v];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(g.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(g.width*.5,0,0),y.halfHeight.set(0,g.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(g.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(g.matrixWorld),y.position.applyMatrix4(m),d++}else if(g.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(g.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function _m(t){const e=new w2(t),n=[],i=[];function r(f){c.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function o(f){i.push(f)}function a(){e.setup(n)}function l(f){e.setupView(n,f)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function T2(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new _m(t),e.set(r,[a])):s>=o.length?(a=new _m(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class A2 extends Zs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ES,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class b2 extends Zs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const C2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function P2(t,e,n){let i=new Nf;const r=new ve,s=new ve,o=new mt,a=new A2({depthPacking:wS}),l=new b2,c={},f=n.maxTextureSize,h={[nr]:hn,[hn]:nr,[Sn]:Sn},d=new rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:C2,fragmentShader:R2}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new tn;v.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new je(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=K0;let u=this.type;this.render=function(T,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const A=t.getRenderTarget(),E=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),O=t.state;O.setBlending(Ji),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const I=u!==pi&&this.type===pi,G=u===pi&&this.type!==pi;for(let W=0,V=T.length;W<V;W++){const Z=T[W],U=Z.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const B=U.getFrameExtents();if(r.multiply(B),s.copy(U.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/B.x),r.x=s.x*B.x,U.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/B.y),r.y=s.y*B.y,U.mapSize.y=s.y)),U.map===null||I===!0||G===!0){const P=this.type!==pi?{minFilter:Dn,magFilter:Dn}:{};U.map!==null&&U.map.dispose(),U.map=new Or(r.x,r.y,P),U.map.texture.name=Z.name+".shadowMap",U.camera.updateProjectionMatrix()}t.setRenderTarget(U.map),t.clear();const k=U.getViewportCount();for(let P=0;P<k;P++){const X=U.getViewport(P);o.set(s.x*X.x,s.y*X.y,s.x*X.z,s.y*X.w),O.viewport(o),U.updateMatrices(Z,P),i=U.getFrustum(),y(C,N,U.camera,Z,this.type)}U.isPointLightShadow!==!0&&this.type===pi&&x(U,N),U.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(A,E,L)};function x(T,C){const N=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Or(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(C,null,N,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(C,null,N,p,_,null)}function g(T,C,N,A){let E=null;const L=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)E=L;else if(E=N.isPointLight===!0?l:a,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const O=E.uuid,I=C.uuid;let G=c[O];G===void 0&&(G={},c[O]=G);let W=G[I];W===void 0&&(W=E.clone(),G[I]=W,C.addEventListener("dispose",b)),E=W}if(E.visible=C.visible,E.wireframe=C.wireframe,A===pi?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:h[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,N.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const O=t.properties.get(E);O.light=N}return E}function y(T,C,N,A,E){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===pi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const I=e.update(T),G=T.material;if(Array.isArray(G)){const W=I.groups;for(let V=0,Z=W.length;V<Z;V++){const U=W[V],B=G[U.materialIndex];if(B&&B.visible){const k=g(T,B,A,E);T.onBeforeShadow(t,T,C,N,I,k,U),t.renderBufferDirect(N,null,I,k,T,U),T.onAfterShadow(t,T,C,N,I,k,U)}}}else if(G.visible){const W=g(T,G,A,E);T.onBeforeShadow(t,T,C,N,I,W,null),t.renderBufferDirect(N,null,I,W,T,null),T.onAfterShadow(t,T,C,N,I,W,null)}}const O=T.children;for(let I=0,G=O.length;I<G;I++)y(O[I],C,N,A,E)}function b(T){T.target.removeEventListener("dispose",b);for(const N in c){const A=c[N],E=T.target.uuid;E in A&&(A[E].dispose(),delete A[E])}}}function L2(t){function e(){let S=!1;const Q=new mt;let $=null;const te=new mt(0,0,0,0);return{setMask:function(ae){$!==ae&&!S&&(t.colorMask(ae,ae,ae,ae),$=ae)},setLocked:function(ae){S=ae},setClear:function(ae,Le,Be,St,At){At===!0&&(ae*=St,Le*=St,Be*=St),Q.set(ae,Le,Be,St),te.equals(Q)===!1&&(t.clearColor(ae,Le,Be,St),te.copy(Q))},reset:function(){S=!1,$=null,te.set(-1,0,0,0)}}}function n(){let S=!1,Q=null,$=null,te=null;return{setTest:function(ae){ae?ie(t.DEPTH_TEST):re(t.DEPTH_TEST)},setMask:function(ae){Q!==ae&&!S&&(t.depthMask(ae),Q=ae)},setFunc:function(ae){if($!==ae){switch(ae){case Zy:t.depthFunc(t.NEVER);break;case Jy:t.depthFunc(t.ALWAYS);break;case Qy:t.depthFunc(t.LESS);break;case kl:t.depthFunc(t.LEQUAL);break;case eS:t.depthFunc(t.EQUAL);break;case tS:t.depthFunc(t.GEQUAL);break;case nS:t.depthFunc(t.GREATER);break;case iS:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}$=ae}},setLocked:function(ae){S=ae},setClear:function(ae){te!==ae&&(t.clearDepth(ae),te=ae)},reset:function(){S=!1,Q=null,$=null,te=null}}}function i(){let S=!1,Q=null,$=null,te=null,ae=null,Le=null,Be=null,St=null,At=null;return{setTest:function(et){S||(et?ie(t.STENCIL_TEST):re(t.STENCIL_TEST))},setMask:function(et){Q!==et&&!S&&(t.stencilMask(et),Q=et)},setFunc:function(et,bt,Ct){($!==et||te!==bt||ae!==Ct)&&(t.stencilFunc(et,bt,Ct),$=et,te=bt,ae=Ct)},setOp:function(et,bt,Ct){(Le!==et||Be!==bt||St!==Ct)&&(t.stencilOp(et,bt,Ct),Le=et,Be=bt,St=Ct)},setLocked:function(et){S=et},setClear:function(et){At!==et&&(t.clearStencil(et),At=et)},reset:function(){S=!1,Q=null,$=null,te=null,ae=null,Le=null,Be=null,St=null,At=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},f={},h=new WeakMap,d=[],p=null,v=!1,_=null,m=null,u=null,x=null,g=null,y=null,b=null,T=new qe(0,0,0),C=0,N=!1,A=null,E=null,L=null,O=null,I=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,V=0;const Z=t.getParameter(t.VERSION);Z.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Z)[1]),W=V>=1):Z.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),W=V>=2);let U=null,B={};const k=t.getParameter(t.SCISSOR_BOX),P=t.getParameter(t.VIEWPORT),X=new mt().fromArray(k),ne=new mt().fromArray(P);function z(S,Q,$,te){const ae=new Uint8Array(4),Le=t.createTexture();t.bindTexture(S,Le),t.texParameteri(S,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(S,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Be=0;Be<$;Be++)S===t.TEXTURE_3D||S===t.TEXTURE_2D_ARRAY?t.texImage3D(Q,0,t.RGBA,1,1,te,0,t.RGBA,t.UNSIGNED_BYTE,ae):t.texImage2D(Q+Be,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ae);return Le}const q={};q[t.TEXTURE_2D]=z(t.TEXTURE_2D,t.TEXTURE_2D,1),q[t.TEXTURE_CUBE_MAP]=z(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[t.TEXTURE_2D_ARRAY]=z(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),q[t.TEXTURE_3D]=z(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(t.DEPTH_TEST),s.setFunc(kl),Se(!1),ke(ep),ie(t.CULL_FACE),Fe(Ji);function ie(S){c[S]!==!0&&(t.enable(S),c[S]=!0)}function re(S){c[S]!==!1&&(t.disable(S),c[S]=!1)}function de(S,Q){return f[S]!==Q?(t.bindFramebuffer(S,Q),f[S]=Q,S===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=Q),S===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=Q),!0):!1}function ye(S,Q){let $=d,te=!1;if(S){$=h.get(Q),$===void 0&&($=[],h.set(Q,$));const ae=S.textures;if($.length!==ae.length||$[0]!==t.COLOR_ATTACHMENT0){for(let Le=0,Be=ae.length;Le<Be;Le++)$[Le]=t.COLOR_ATTACHMENT0+Le;$.length=ae.length,te=!0}}else $[0]!==t.BACK&&($[0]=t.BACK,te=!0);te&&t.drawBuffers($)}function we(S){return p!==S?(t.useProgram(S),p=S,!0):!1}const F={[Er]:t.FUNC_ADD,[Ny]:t.FUNC_SUBTRACT,[Uy]:t.FUNC_REVERSE_SUBTRACT};F[Fy]=t.MIN,F[Oy]=t.MAX;const Ue={[ky]:t.ZERO,[zy]:t.ONE,[By]:t.SRC_COLOR,[Ad]:t.SRC_ALPHA,[Xy]:t.SRC_ALPHA_SATURATE,[Wy]:t.DST_COLOR,[Vy]:t.DST_ALPHA,[Hy]:t.ONE_MINUS_SRC_COLOR,[bd]:t.ONE_MINUS_SRC_ALPHA,[jy]:t.ONE_MINUS_DST_COLOR,[Gy]:t.ONE_MINUS_DST_ALPHA,[Yy]:t.CONSTANT_COLOR,[$y]:t.ONE_MINUS_CONSTANT_COLOR,[qy]:t.CONSTANT_ALPHA,[Ky]:t.ONE_MINUS_CONSTANT_ALPHA};function Fe(S,Q,$,te,ae,Le,Be,St,At,et){if(S===Ji){v===!0&&(re(t.BLEND),v=!1);return}if(v===!1&&(ie(t.BLEND),v=!0),S!==Iy){if(S!==_||et!==N){if((m!==Er||g!==Er)&&(t.blendEquation(t.FUNC_ADD),m=Er,g=Er),et)switch(S){case Ls:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tp:t.blendFunc(t.ONE,t.ONE);break;case np:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ip:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case Ls:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case np:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ip:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}u=null,x=null,y=null,b=null,T.set(0,0,0),C=0,_=S,N=et}return}ae=ae||Q,Le=Le||$,Be=Be||te,(Q!==m||ae!==g)&&(t.blendEquationSeparate(F[Q],F[ae]),m=Q,g=ae),($!==u||te!==x||Le!==y||Be!==b)&&(t.blendFuncSeparate(Ue[$],Ue[te],Ue[Le],Ue[Be]),u=$,x=te,y=Le,b=Be),(St.equals(T)===!1||At!==C)&&(t.blendColor(St.r,St.g,St.b,At),T.copy(St),C=At),_=S,N=!1}function Ee(S,Q){S.side===Sn?re(t.CULL_FACE):ie(t.CULL_FACE);let $=S.side===hn;Q&&($=!$),Se($),S.blending===Ls&&S.transparent===!1?Fe(Ji):Fe(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),s.setFunc(S.depthFunc),s.setTest(S.depthTest),s.setMask(S.depthWrite),r.setMask(S.colorWrite);const te=S.stencilWrite;o.setTest(te),te&&(o.setMask(S.stencilWriteMask),o.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),o.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),Pe(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ie(t.SAMPLE_ALPHA_TO_COVERAGE):re(t.SAMPLE_ALPHA_TO_COVERAGE)}function Se(S){A!==S&&(S?t.frontFace(t.CW):t.frontFace(t.CCW),A=S)}function ke(S){S!==Ly?(ie(t.CULL_FACE),S!==E&&(S===ep?t.cullFace(t.BACK):S===Dy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):re(t.CULL_FACE),E=S}function De(S){S!==L&&(W&&t.lineWidth(S),L=S)}function Pe(S,Q,$){S?(ie(t.POLYGON_OFFSET_FILL),(O!==Q||I!==$)&&(t.polygonOffset(Q,$),O=Q,I=$)):re(t.POLYGON_OFFSET_FILL)}function Ze(S){S?ie(t.SCISSOR_TEST):re(t.SCISSOR_TEST)}function D(S){S===void 0&&(S=t.TEXTURE0+G-1),U!==S&&(t.activeTexture(S),U=S)}function w(S,Q,$){$===void 0&&(U===null?$=t.TEXTURE0+G-1:$=U);let te=B[$];te===void 0&&(te={type:void 0,texture:void 0},B[$]=te),(te.type!==S||te.texture!==Q)&&(U!==$&&(t.activeTexture($),U=$),t.bindTexture(S,Q||q[S]),te.type=S,te.texture=Q)}function J(){const S=B[U];S!==void 0&&S.type!==void 0&&(t.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function oe(){try{t.compressedTexImage2D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function le(){try{t.compressedTexImage3D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ce(){try{t.texSubImage2D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Re(){try{t.texSubImage3D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function he(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function pe(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function We(){try{t.texStorage2D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function se(){try{t.texStorage3D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function xe(){try{t.texImage2D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ie(){try{t.texImage3D.apply(t,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ae(S){X.equals(S)===!1&&(t.scissor(S.x,S.y,S.z,S.w),X.copy(S))}function me(S){ne.equals(S)===!1&&(t.viewport(S.x,S.y,S.z,S.w),ne.copy(S))}function ze(S,Q){let $=l.get(Q);$===void 0&&($=new WeakMap,l.set(Q,$));let te=$.get(S);te===void 0&&(te=t.getUniformBlockIndex(Q,S.name),$.set(S,te))}function Ve(S,Q){const te=l.get(Q).get(S);a.get(Q)!==te&&(t.uniformBlockBinding(Q,te,S.__bindingPointIndex),a.set(Q,te))}function lt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},U=null,B={},f={},h=new WeakMap,d=[],p=null,v=!1,_=null,m=null,u=null,x=null,g=null,y=null,b=null,T=new qe(0,0,0),C=0,N=!1,A=null,E=null,L=null,O=null,I=null,X.set(0,0,t.canvas.width,t.canvas.height),ne.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ie,disable:re,bindFramebuffer:de,drawBuffers:ye,useProgram:we,setBlending:Fe,setMaterial:Ee,setFlipSided:Se,setCullFace:ke,setLineWidth:De,setPolygonOffset:Pe,setScissorTest:Ze,activeTexture:D,bindTexture:w,unbindTexture:J,compressedTexImage2D:oe,compressedTexImage3D:le,texImage2D:xe,texImage3D:Ie,updateUBOMapping:ze,uniformBlockBinding:Ve,texStorage2D:We,texStorage3D:se,texSubImage2D:ce,texSubImage3D:Re,compressedTexSubImage2D:he,compressedTexSubImage3D:pe,scissor:Ae,viewport:me,reset:lt}}function D2(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ve,f=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(D,w){return p?new OffscreenCanvas(D,w):jl("canvas")}function _(D,w,J){let oe=1;const le=Ze(D);if((le.width>J||le.height>J)&&(oe=J/Math.max(le.width,le.height)),oe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ce=Math.floor(oe*le.width),Re=Math.floor(oe*le.height);h===void 0&&(h=v(ce,Re));const he=w?v(ce,Re):h;return he.width=ce,he.height=Re,he.getContext("2d").drawImage(D,0,0,ce,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+le.width+"x"+le.height+") to ("+ce+"x"+Re+")."),he}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+le.width+"x"+le.height+")."),D;return D}function m(D){return D.generateMipmaps&&D.minFilter!==Dn&&D.minFilter!==jn}function u(D){t.generateMipmap(D)}function x(D,w,J,oe,le=!1){if(D!==null){if(t[D]!==void 0)return t[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ce=w;if(w===t.RED&&(J===t.FLOAT&&(ce=t.R32F),J===t.HALF_FLOAT&&(ce=t.R16F),J===t.UNSIGNED_BYTE&&(ce=t.R8)),w===t.RED_INTEGER&&(J===t.UNSIGNED_BYTE&&(ce=t.R8UI),J===t.UNSIGNED_SHORT&&(ce=t.R16UI),J===t.UNSIGNED_INT&&(ce=t.R32UI),J===t.BYTE&&(ce=t.R8I),J===t.SHORT&&(ce=t.R16I),J===t.INT&&(ce=t.R32I)),w===t.RG&&(J===t.FLOAT&&(ce=t.RG32F),J===t.HALF_FLOAT&&(ce=t.RG16F),J===t.UNSIGNED_BYTE&&(ce=t.RG8)),w===t.RG_INTEGER&&(J===t.UNSIGNED_BYTE&&(ce=t.RG8UI),J===t.UNSIGNED_SHORT&&(ce=t.RG16UI),J===t.UNSIGNED_INT&&(ce=t.RG32UI),J===t.BYTE&&(ce=t.RG8I),J===t.SHORT&&(ce=t.RG16I),J===t.INT&&(ce=t.RG32I)),w===t.RGB&&J===t.UNSIGNED_INT_5_9_9_9_REV&&(ce=t.RGB9_E5),w===t.RGBA){const Re=le?Hl:it.getTransfer(oe);J===t.FLOAT&&(ce=t.RGBA32F),J===t.HALF_FLOAT&&(ce=t.RGBA16F),J===t.UNSIGNED_BYTE&&(ce=Re===dt?t.SRGB8_ALPHA8:t.RGBA8),J===t.UNSIGNED_SHORT_4_4_4_4&&(ce=t.RGBA4),J===t.UNSIGNED_SHORT_5_5_5_1&&(ce=t.RGB5_A1)}return(ce===t.R16F||ce===t.R32F||ce===t.RG16F||ce===t.RG32F||ce===t.RGBA16F||ce===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function g(D,w){let J;return D?w===null||w===Gs||w===Ws?J=t.DEPTH24_STENCIL8:w===Gi?J=t.DEPTH32F_STENCIL8:w===Bl&&(J=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Gs||w===Ws?J=t.DEPTH_COMPONENT24:w===Gi?J=t.DEPTH_COMPONENT32F:w===Bl&&(J=t.DEPTH_COMPONENT16),J}function y(D,w){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Dn&&D.minFilter!==jn?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function b(D){const w=D.target;w.removeEventListener("dispose",b),C(w),w.isVideoTexture&&f.delete(w)}function T(D){const w=D.target;w.removeEventListener("dispose",T),A(w)}function C(D){const w=i.get(D);if(w.__webglInit===void 0)return;const J=D.source,oe=d.get(J);if(oe){const le=oe[w.__cacheKey];le.usedTimes--,le.usedTimes===0&&N(D),Object.keys(oe).length===0&&d.delete(J)}i.remove(D)}function N(D){const w=i.get(D);t.deleteTexture(w.__webglTexture);const J=D.source,oe=d.get(J);delete oe[w.__cacheKey],o.memory.textures--}function A(D){const w=i.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(w.__webglFramebuffer[oe]))for(let le=0;le<w.__webglFramebuffer[oe].length;le++)t.deleteFramebuffer(w.__webglFramebuffer[oe][le]);else t.deleteFramebuffer(w.__webglFramebuffer[oe]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[oe])}else{if(Array.isArray(w.__webglFramebuffer))for(let oe=0;oe<w.__webglFramebuffer.length;oe++)t.deleteFramebuffer(w.__webglFramebuffer[oe]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let oe=0;oe<w.__webglColorRenderbuffer.length;oe++)w.__webglColorRenderbuffer[oe]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[oe]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const J=D.textures;for(let oe=0,le=J.length;oe<le;oe++){const ce=i.get(J[oe]);ce.__webglTexture&&(t.deleteTexture(ce.__webglTexture),o.memory.textures--),i.remove(J[oe])}i.remove(D)}let E=0;function L(){E=0}function O(){const D=E;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),E+=1,D}function I(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function G(D,w){const J=i.get(D);if(D.isVideoTexture&&De(D),D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){const oe=D.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(J,D,w);return}}n.bindTexture(t.TEXTURE_2D,J.__webglTexture,t.TEXTURE0+w)}function W(D,w){const J=i.get(D);if(D.version>0&&J.__version!==D.version){ne(J,D,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,J.__webglTexture,t.TEXTURE0+w)}function V(D,w){const J=i.get(D);if(D.version>0&&J.__version!==D.version){ne(J,D,w);return}n.bindTexture(t.TEXTURE_3D,J.__webglTexture,t.TEXTURE0+w)}function Z(D,w){const J=i.get(D);if(D.version>0&&J.__version!==D.version){z(J,D,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture,t.TEXTURE0+w)}const U={[zl]:t.REPEAT,[Cr]:t.CLAMP_TO_EDGE,[Pd]:t.MIRRORED_REPEAT},B={[Dn]:t.NEAREST,[fS]:t.NEAREST_MIPMAP_NEAREST,[Ta]:t.NEAREST_MIPMAP_LINEAR,[jn]:t.LINEAR,[Yc]:t.LINEAR_MIPMAP_NEAREST,[Rr]:t.LINEAR_MIPMAP_LINEAR},k={[AS]:t.NEVER,[DS]:t.ALWAYS,[bS]:t.LESS,[lv]:t.LEQUAL,[CS]:t.EQUAL,[LS]:t.GEQUAL,[RS]:t.GREATER,[PS]:t.NOTEQUAL};function P(D,w){if(w.type===Gi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===jn||w.magFilter===Yc||w.magFilter===Ta||w.magFilter===Rr||w.minFilter===jn||w.minFilter===Yc||w.minFilter===Ta||w.minFilter===Rr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(D,t.TEXTURE_WRAP_S,U[w.wrapS]),t.texParameteri(D,t.TEXTURE_WRAP_T,U[w.wrapT]),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,U[w.wrapR]),t.texParameteri(D,t.TEXTURE_MAG_FILTER,B[w.magFilter]),t.texParameteri(D,t.TEXTURE_MIN_FILTER,B[w.minFilter]),w.compareFunction&&(t.texParameteri(D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(D,t.TEXTURE_COMPARE_FUNC,k[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Dn||w.minFilter!==Ta&&w.minFilter!==Rr||w.type===Gi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");t.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function X(D,w){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",b));const oe=w.source;let le=d.get(oe);le===void 0&&(le={},d.set(oe,le));const ce=I(w);if(ce!==D.__cacheKey){le[ce]===void 0&&(le[ce]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,J=!0),le[ce].usedTimes++;const Re=le[D.__cacheKey];Re!==void 0&&(le[D.__cacheKey].usedTimes--,Re.usedTimes===0&&N(w)),D.__cacheKey=ce,D.__webglTexture=le[ce].texture}return J}function ne(D,w,J){let oe=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(oe=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(oe=t.TEXTURE_3D);const le=X(D,w),ce=w.source;n.bindTexture(oe,D.__webglTexture,t.TEXTURE0+J);const Re=i.get(ce);if(ce.version!==Re.__version||le===!0){n.activeTexture(t.TEXTURE0+J);const he=it.getPrimaries(it.workingColorSpace),pe=w.colorSpace===Bi?null:it.getPrimaries(w.colorSpace),We=w.colorSpace===Bi||he===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let se=_(w.image,!1,r.maxTextureSize);se=Pe(w,se);const xe=s.convert(w.format,w.colorSpace),Ie=s.convert(w.type);let Ae=x(w.internalFormat,xe,Ie,w.colorSpace,w.isVideoTexture);P(oe,w);let me;const ze=w.mipmaps,Ve=w.isVideoTexture!==!0,lt=Re.__version===void 0||le===!0,S=ce.dataReady,Q=y(w,se);if(w.isDepthTexture)Ae=g(w.format===js,w.type),lt&&(Ve?n.texStorage2D(t.TEXTURE_2D,1,Ae,se.width,se.height):n.texImage2D(t.TEXTURE_2D,0,Ae,se.width,se.height,0,xe,Ie,null));else if(w.isDataTexture)if(ze.length>0){Ve&&lt&&n.texStorage2D(t.TEXTURE_2D,Q,Ae,ze[0].width,ze[0].height);for(let $=0,te=ze.length;$<te;$++)me=ze[$],Ve?S&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,me.width,me.height,xe,Ie,me.data):n.texImage2D(t.TEXTURE_2D,$,Ae,me.width,me.height,0,xe,Ie,me.data);w.generateMipmaps=!1}else Ve?(lt&&n.texStorage2D(t.TEXTURE_2D,Q,Ae,se.width,se.height),S&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,se.width,se.height,xe,Ie,se.data)):n.texImage2D(t.TEXTURE_2D,0,Ae,se.width,se.height,0,xe,Ie,se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ve&&lt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Q,Ae,ze[0].width,ze[0].height,se.depth);for(let $=0,te=ze.length;$<te;$++)if(me=ze[$],w.format!==ii)if(xe!==null)if(Ve){if(S)if(w.layerUpdates.size>0){for(const ae of w.layerUpdates){const Le=me.width*me.height;n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,ae,me.width,me.height,1,xe,me.data.slice(Le*ae,Le*(ae+1)),0,0)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,me.width,me.height,se.depth,xe,me.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,$,Ae,me.width,me.height,se.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?S&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,me.width,me.height,se.depth,xe,Ie,me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,$,Ae,me.width,me.height,se.depth,0,xe,Ie,me.data)}else{Ve&&lt&&n.texStorage2D(t.TEXTURE_2D,Q,Ae,ze[0].width,ze[0].height);for(let $=0,te=ze.length;$<te;$++)me=ze[$],w.format!==ii?xe!==null?Ve?S&&n.compressedTexSubImage2D(t.TEXTURE_2D,$,0,0,me.width,me.height,xe,me.data):n.compressedTexImage2D(t.TEXTURE_2D,$,Ae,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?S&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,me.width,me.height,xe,Ie,me.data):n.texImage2D(t.TEXTURE_2D,$,Ae,me.width,me.height,0,xe,Ie,me.data)}else if(w.isDataArrayTexture)if(Ve){if(lt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Q,Ae,se.width,se.height,se.depth),S)if(w.layerUpdates.size>0){let $;switch(Ie){case t.UNSIGNED_BYTE:switch(xe){case t.ALPHA:$=1;break;case t.LUMINANCE:$=1;break;case t.LUMINANCE_ALPHA:$=2;break;case t.RGB:$=3;break;case t.RGBA:$=4;break;default:throw new Error(`Unknown texel size for format ${xe}.`)}break;case t.UNSIGNED_SHORT_4_4_4_4:case t.UNSIGNED_SHORT_5_5_5_1:case t.UNSIGNED_SHORT_5_6_5:$=1;break;default:throw new Error(`Unknown texel size for type ${Ie}.`)}const te=se.width*se.height*$;for(const ae of w.layerUpdates)n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ae,se.width,se.height,1,xe,Ie,se.data.slice(te*ae,te*(ae+1)));w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,xe,Ie,se.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ae,se.width,se.height,se.depth,0,xe,Ie,se.data);else if(w.isData3DTexture)Ve?(lt&&n.texStorage3D(t.TEXTURE_3D,Q,Ae,se.width,se.height,se.depth),S&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,xe,Ie,se.data)):n.texImage3D(t.TEXTURE_3D,0,Ae,se.width,se.height,se.depth,0,xe,Ie,se.data);else if(w.isFramebufferTexture){if(lt)if(Ve)n.texStorage2D(t.TEXTURE_2D,Q,Ae,se.width,se.height);else{let $=se.width,te=se.height;for(let ae=0;ae<Q;ae++)n.texImage2D(t.TEXTURE_2D,ae,Ae,$,te,0,xe,Ie,null),$>>=1,te>>=1}}else if(ze.length>0){if(Ve&&lt){const $=Ze(ze[0]);n.texStorage2D(t.TEXTURE_2D,Q,Ae,$.width,$.height)}for(let $=0,te=ze.length;$<te;$++)me=ze[$],Ve?S&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,xe,Ie,me):n.texImage2D(t.TEXTURE_2D,$,Ae,xe,Ie,me);w.generateMipmaps=!1}else if(Ve){if(lt){const $=Ze(se);n.texStorage2D(t.TEXTURE_2D,Q,Ae,$.width,$.height)}S&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,xe,Ie,se)}else n.texImage2D(t.TEXTURE_2D,0,Ae,xe,Ie,se);m(w)&&u(oe),Re.__version=ce.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function z(D,w,J){if(w.image.length!==6)return;const oe=X(D,w),le=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+J);const ce=i.get(le);if(le.version!==ce.__version||oe===!0){n.activeTexture(t.TEXTURE0+J);const Re=it.getPrimaries(it.workingColorSpace),he=w.colorSpace===Bi?null:it.getPrimaries(w.colorSpace),pe=w.colorSpace===Bi||Re===he?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const We=w.isCompressedTexture||w.image[0].isCompressedTexture,se=w.image[0]&&w.image[0].isDataTexture,xe=[];for(let te=0;te<6;te++)!We&&!se?xe[te]=_(w.image[te],!0,r.maxCubemapSize):xe[te]=se?w.image[te].image:w.image[te],xe[te]=Pe(w,xe[te]);const Ie=xe[0],Ae=s.convert(w.format,w.colorSpace),me=s.convert(w.type),ze=x(w.internalFormat,Ae,me,w.colorSpace),Ve=w.isVideoTexture!==!0,lt=ce.__version===void 0||oe===!0,S=le.dataReady;let Q=y(w,Ie);P(t.TEXTURE_CUBE_MAP,w);let $;if(We){Ve&&lt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,ze,Ie.width,Ie.height);for(let te=0;te<6;te++){$=xe[te].mipmaps;for(let ae=0;ae<$.length;ae++){const Le=$[ae];w.format!==ii?Ae!==null?Ve?S&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae,0,0,Le.width,Le.height,Ae,Le.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae,ze,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?S&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae,0,0,Le.width,Le.height,Ae,me,Le.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae,ze,Le.width,Le.height,0,Ae,me,Le.data)}}}else{if($=w.mipmaps,Ve&&lt){$.length>0&&Q++;const te=Ze(xe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,ze,te.width,te.height)}for(let te=0;te<6;te++)if(se){Ve?S&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,xe[te].width,xe[te].height,Ae,me,xe[te].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ze,xe[te].width,xe[te].height,0,Ae,me,xe[te].data);for(let ae=0;ae<$.length;ae++){const Be=$[ae].image[te].image;Ve?S&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae+1,0,0,Be.width,Be.height,Ae,me,Be.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae+1,ze,Be.width,Be.height,0,Ae,me,Be.data)}}else{Ve?S&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,me,xe[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,ze,Ae,me,xe[te]);for(let ae=0;ae<$.length;ae++){const Le=$[ae];Ve?S&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae+1,0,0,Ae,me,Le.image[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,ae+1,ze,Ae,me,Le.image[te])}}}m(w)&&u(t.TEXTURE_CUBE_MAP),ce.__version=le.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function q(D,w,J,oe,le,ce){const Re=s.convert(J.format,J.colorSpace),he=s.convert(J.type),pe=x(J.internalFormat,Re,he,J.colorSpace);if(!i.get(w).__hasExternalTextures){const se=Math.max(1,w.width>>ce),xe=Math.max(1,w.height>>ce);le===t.TEXTURE_3D||le===t.TEXTURE_2D_ARRAY?n.texImage3D(le,ce,pe,se,xe,w.depth,0,Re,he,null):n.texImage2D(le,ce,pe,se,xe,0,Re,he,null)}n.bindFramebuffer(t.FRAMEBUFFER,D),ke(w)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,le,i.get(J).__webglTexture,0,Se(w)):(le===t.TEXTURE_2D||le>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,oe,le,i.get(J).__webglTexture,ce),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ie(D,w,J){if(t.bindRenderbuffer(t.RENDERBUFFER,D),w.depthBuffer){const oe=w.depthTexture,le=oe&&oe.isDepthTexture?oe.type:null,ce=g(w.stencilBuffer,le),Re=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=Se(w);ke(w)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,he,ce,w.width,w.height):J?t.renderbufferStorageMultisample(t.RENDERBUFFER,he,ce,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,ce,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Re,t.RENDERBUFFER,D)}else{const oe=w.textures;for(let le=0;le<oe.length;le++){const ce=oe[le],Re=s.convert(ce.format,ce.colorSpace),he=s.convert(ce.type),pe=x(ce.internalFormat,Re,he,ce.colorSpace),We=Se(w);J&&ke(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,We,pe,w.width,w.height):ke(w)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,We,pe,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,pe,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function re(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const oe=i.get(w.depthTexture).__webglTexture,le=Se(w);if(w.depthTexture.format===Ds)ke(w)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,oe,0,le):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,oe,0);else if(w.depthTexture.format===js)ke(w)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,oe,0,le):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function de(D){const w=i.get(D),J=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");re(w.__webglFramebuffer,D)}else if(J){w.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[oe]),w.__webglDepthbuffer[oe]=t.createRenderbuffer(),ie(w.__webglDepthbuffer[oe],D,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=t.createRenderbuffer(),ie(w.__webglDepthbuffer,D,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function ye(D,w,J){const oe=i.get(D);w!==void 0&&q(oe.__webglFramebuffer,D,D.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),J!==void 0&&de(D)}function we(D){const w=D.texture,J=i.get(D),oe=i.get(w);D.addEventListener("dispose",T);const le=D.textures,ce=D.isWebGLCubeRenderTarget===!0,Re=le.length>1;if(Re||(oe.__webglTexture===void 0&&(oe.__webglTexture=t.createTexture()),oe.__version=w.version,o.memory.textures++),ce){J.__webglFramebuffer=[];for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0){J.__webglFramebuffer[he]=[];for(let pe=0;pe<w.mipmaps.length;pe++)J.__webglFramebuffer[he][pe]=t.createFramebuffer()}else J.__webglFramebuffer[he]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){J.__webglFramebuffer=[];for(let he=0;he<w.mipmaps.length;he++)J.__webglFramebuffer[he]=t.createFramebuffer()}else J.__webglFramebuffer=t.createFramebuffer();if(Re)for(let he=0,pe=le.length;he<pe;he++){const We=i.get(le[he]);We.__webglTexture===void 0&&(We.__webglTexture=t.createTexture(),o.memory.textures++)}if(D.samples>0&&ke(D)===!1){J.__webglMultisampledFramebuffer=t.createFramebuffer(),J.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let he=0;he<le.length;he++){const pe=le[he];J.__webglColorRenderbuffer[he]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,J.__webglColorRenderbuffer[he]);const We=s.convert(pe.format,pe.colorSpace),se=s.convert(pe.type),xe=x(pe.internalFormat,We,se,pe.colorSpace,D.isXRRenderTarget===!0),Ie=Se(D);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ie,xe,D.width,D.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+he,t.RENDERBUFFER,J.__webglColorRenderbuffer[he])}t.bindRenderbuffer(t.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=t.createRenderbuffer(),ie(J.__webglDepthRenderbuffer,D,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){n.bindTexture(t.TEXTURE_CUBE_MAP,oe.__webglTexture),P(t.TEXTURE_CUBE_MAP,w);for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)q(J.__webglFramebuffer[he][pe],D,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+he,pe);else q(J.__webglFramebuffer[he],D,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(w)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Re){for(let he=0,pe=le.length;he<pe;he++){const We=le[he],se=i.get(We);n.bindTexture(t.TEXTURE_2D,se.__webglTexture),P(t.TEXTURE_2D,We),q(J.__webglFramebuffer,D,We,t.COLOR_ATTACHMENT0+he,t.TEXTURE_2D,0),m(We)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let he=t.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(he=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(he,oe.__webglTexture),P(he,w),w.mipmaps&&w.mipmaps.length>0)for(let pe=0;pe<w.mipmaps.length;pe++)q(J.__webglFramebuffer[pe],D,w,t.COLOR_ATTACHMENT0,he,pe);else q(J.__webglFramebuffer,D,w,t.COLOR_ATTACHMENT0,he,0);m(w)&&u(he),n.unbindTexture()}D.depthBuffer&&de(D)}function F(D){const w=D.textures;for(let J=0,oe=w.length;J<oe;J++){const le=w[J];if(m(le)){const ce=D.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Re=i.get(le).__webglTexture;n.bindTexture(ce,Re),u(ce),n.unbindTexture()}}}const Ue=[],Fe=[];function Ee(D){if(D.samples>0){if(ke(D)===!1){const w=D.textures,J=D.width,oe=D.height;let le=t.COLOR_BUFFER_BIT;const ce=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Re=i.get(D),he=w.length>1;if(he)for(let pe=0;pe<w.length;pe++)n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let pe=0;pe<w.length;pe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(le|=t.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(le|=t.STENCIL_BUFFER_BIT)),he){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Re.__webglColorRenderbuffer[pe]);const We=i.get(w[pe]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,We,0)}t.blitFramebuffer(0,0,J,oe,0,0,J,oe,le,t.NEAREST),l===!0&&(Ue.length=0,Fe.length=0,Ue.push(t.COLOR_ATTACHMENT0+pe),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ue.push(ce),Fe.push(ce),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Fe)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ue))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),he)for(let pe=0;pe<w.length;pe++){n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,Re.__webglColorRenderbuffer[pe]);const We=i.get(w[pe]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,We,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const w=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function Se(D){return Math.min(r.maxSamples,D.samples)}function ke(D){const w=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function De(D){const w=o.render.frame;f.get(D)!==w&&(f.set(D,w),D.update())}function Pe(D,w){const J=D.colorSpace,oe=D.format,le=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==cr&&J!==Bi&&(it.getTransfer(J)===dt?(oe!==ii||le!==ir)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),w}function Ze(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=L,this.setTexture2D=G,this.setTexture2DArray=W,this.setTexture3D=V,this.setTextureCube=Z,this.rebindTextures=ye,this.setupRenderTarget=we,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=q,this.useMultisampledRTT=ke}function I2(t,e){function n(i,r=Bi){let s;const o=it.getTransfer(r);if(i===ir)return t.UNSIGNED_BYTE;if(i===nv)return t.UNSIGNED_SHORT_4_4_4_4;if(i===iv)return t.UNSIGNED_SHORT_5_5_5_1;if(i===mS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===hS)return t.BYTE;if(i===pS)return t.SHORT;if(i===Bl)return t.UNSIGNED_SHORT;if(i===tv)return t.INT;if(i===Gs)return t.UNSIGNED_INT;if(i===Gi)return t.FLOAT;if(i===fc)return t.HALF_FLOAT;if(i===gS)return t.ALPHA;if(i===vS)return t.RGB;if(i===ii)return t.RGBA;if(i===xS)return t.LUMINANCE;if(i===_S)return t.LUMINANCE_ALPHA;if(i===Ds)return t.DEPTH_COMPONENT;if(i===js)return t.DEPTH_STENCIL;if(i===yS)return t.RED;if(i===rv)return t.RED_INTEGER;if(i===SS)return t.RG;if(i===sv)return t.RG_INTEGER;if(i===ov)return t.RGBA_INTEGER;if(i===$c||i===qc||i===Kc||i===Zc)if(o===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===$c)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===$c)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Kc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Zc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rp||i===sp||i===op||i===ap)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===rp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===op)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ap)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lp||i===cp||i===up)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===lp||i===cp)return o===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===up)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===dp||i===fp||i===hp||i===pp||i===mp||i===gp||i===vp||i===xp||i===_p||i===yp||i===Sp||i===Mp||i===Ep||i===wp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===dp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_p)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ep)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wp)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jc||i===Tp||i===Ap)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Jc)return o===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Tp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ap)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===MS||i===bp||i===Cp||i===Rp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Jc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===bp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ws?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class N2 extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Lt extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U2={type:"move"};class wu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=n.getJointPose(_,i),u=this._getHandJoint(c,_);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=f.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(U2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Lt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const F2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class k2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new rn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new rr({vertexShader:F2,fragmentShader:O2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new je(new Gn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class z2 extends Vr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,f=null,h=null,d=null,p=null,v=null;const _=new k2,m=n.getContextAttributes();let u=null,x=null;const g=[],y=[],b=new ve;let T=null;const C=new yn;C.layers.enable(1),C.viewport=new mt;const N=new yn;N.layers.enable(2),N.viewport=new mt;const A=[C,N],E=new N2;E.layers.enable(1),E.layers.enable(2);let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let q=g[z];return q===void 0&&(q=new wu,g[z]=q),q.getTargetRaySpace()},this.getControllerGrip=function(z){let q=g[z];return q===void 0&&(q=new wu,g[z]=q),q.getGripSpace()},this.getHand=function(z){let q=g[z];return q===void 0&&(q=new wu,g[z]=q),q.getHandSpace()};function I(z){const q=y.indexOf(z.inputSource);if(q===-1)return;const ie=g[q];ie!==void 0&&(ie.update(z.inputSource,z.frame,c||o),ie.dispatchEvent({type:z.type,data:z.inputSource}))}function G(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",W);for(let z=0;z<g.length;z++){const q=y[z];q!==null&&(y[z]=null,g[z].disconnect(q))}L=null,O=null,_.reset(),e.setRenderTarget(u),p=null,d=null,h=null,r=null,x=null,ne.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",G),r.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0){const q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Or(p.framebufferWidth,p.framebufferHeight,{format:ii,type:ir,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let q=null,ie=null,re=null;m.depth&&(re=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,q=m.stencil?js:Ds,ie=m.stencil?Ws:Gs);const de={colorFormat:n.RGBA8,depthFormat:re,scaleFactor:s};h=new XRWebGLBinding(r,n),d=h.createProjectionLayer(de),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Or(d.textureWidth,d.textureHeight,{format:ii,type:ir,depthTexture:new Mv(d.textureWidth,d.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ne.setContext(r),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function W(z){for(let q=0;q<z.removed.length;q++){const ie=z.removed[q],re=y.indexOf(ie);re>=0&&(y[re]=null,g[re].disconnect(ie))}for(let q=0;q<z.added.length;q++){const ie=z.added[q];let re=y.indexOf(ie);if(re===-1){for(let ye=0;ye<g.length;ye++)if(ye>=y.length){y.push(ie),re=ye;break}else if(y[ye]===null){y[ye]=ie,re=ye;break}if(re===-1)break}const de=g[re];de&&de.connect(ie)}}const V=new H,Z=new H;function U(z,q,ie){V.setFromMatrixPosition(q.matrixWorld),Z.setFromMatrixPosition(ie.matrixWorld);const re=V.distanceTo(Z),de=q.projectionMatrix.elements,ye=ie.projectionMatrix.elements,we=de[14]/(de[10]-1),F=de[14]/(de[10]+1),Ue=(de[9]+1)/de[5],Fe=(de[9]-1)/de[5],Ee=(de[8]-1)/de[0],Se=(ye[8]+1)/ye[0],ke=we*Ee,De=we*Se,Pe=re/(-Ee+Se),Ze=Pe*-Ee;q.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ze),z.translateZ(Pe),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const D=we+Pe,w=F+Pe,J=ke-Ze,oe=De+(re-Ze),le=Ue*F/w*D,ce=Fe*F/w*D;z.projectionMatrix.makePerspective(J,oe,le,ce,D,w),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function B(z,q){q===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(q.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;_.texture!==null&&(z.near=_.depthNear,z.far=_.depthFar),E.near=N.near=C.near=z.near,E.far=N.far=C.far=z.far,(L!==E.near||O!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),L=E.near,O=E.far,C.near=L,C.far=O,N.near=L,N.far=O,C.updateProjectionMatrix(),N.updateProjectionMatrix(),z.updateProjectionMatrix());const q=z.parent,ie=E.cameras;B(E,q);for(let re=0;re<ie.length;re++)B(ie[re],q);ie.length===2?U(E,C,N):E.projectionMatrix.copy(C.projectionMatrix),k(z,E,q)};function k(z,q,ie){ie===null?z.matrix.copy(q.matrixWorld):(z.matrix.copy(ie.matrixWorld),z.matrix.invert(),z.matrix.multiply(q.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(q.projectionMatrix),z.projectionMatrixInverse.copy(q.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Ld*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let P=null;function X(z,q){if(f=q.getViewerPose(c||o),v=q,f!==null){const ie=f.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let re=!1;ie.length!==E.cameras.length&&(E.cameras.length=0,re=!0);for(let ye=0;ye<ie.length;ye++){const we=ie[ye];let F=null;if(p!==null)F=p.getViewport(we);else{const Fe=h.getViewSubImage(d,we);F=Fe.viewport,ye===0&&(e.setRenderTargetTextures(x,Fe.colorTexture,d.ignoreDepthValues?void 0:Fe.depthStencilTexture),e.setRenderTarget(x))}let Ue=A[ye];Ue===void 0&&(Ue=new yn,Ue.layers.enable(ye),Ue.viewport=new mt,A[ye]=Ue),Ue.matrix.fromArray(we.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(we.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(F.x,F.y,F.width,F.height),ye===0&&(E.matrix.copy(Ue.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),re===!0&&E.cameras.push(Ue)}const de=r.enabledFeatures;if(de&&de.includes("depth-sensing")){const ye=h.getDepthInformation(ie[0]);ye&&ye.isValid&&ye.texture&&_.init(e,ye,r.renderState)}}for(let ie=0;ie<g.length;ie++){const re=y[ie],de=g[ie];re!==null&&de!==void 0&&de.update(re,q,c||o)}P&&P(z,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),v=null}const ne=new yv;ne.setAnimationLoop(X),this.setAnimationLoop=function(z){P=z},this.dispose=function(){}}}const _r=new oi,B2=new gt;function H2(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,vv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,x,g,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u)):u.isMeshStandardMaterial?(s(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(s(m,u),v(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),_(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,x,g):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===hn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===hn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const x=e.get(u),g=x.envMap,y=x.envMapRotation;g&&(m.envMap.value=g,_r.copy(y),_r.x*=-1,_r.y*=-1,_r.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),m.envMapRotation.value.setFromMatrix4(B2.makeRotationFromEuler(_r)),m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,x,g){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*x,m.scale.value=g*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,x){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===hn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function _(m,u){const x=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function V2(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,g){const y=g.program;i.uniformBlockBinding(x,y)}function c(x,g){let y=r[x.id];y===void 0&&(v(x),y=f(x),r[x.id]=y,x.addEventListener("dispose",m));const b=g.program;i.updateUBOMapping(x,b);const T=e.render.frame;s[x.id]!==T&&(d(x),s[x.id]=T)}function f(x){const g=h();x.__bindingPointIndex=g;const y=t.createBuffer(),b=x.__size,T=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,b,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,y),y}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const g=r[x.id],y=x.uniforms,b=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let T=0,C=y.length;T<C;T++){const N=Array.isArray(y[T])?y[T]:[y[T]];for(let A=0,E=N.length;A<E;A++){const L=N[A];if(p(L,T,A,b)===!0){const O=L.__offset,I=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let W=0;W<I.length;W++){const V=I[W],Z=_(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,t.bufferSubData(t.UNIFORM_BUFFER,O+G,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,G),G+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,O,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(x,g,y,b){const T=x.value,C=g+"_"+y;if(b[C]===void 0)return typeof T=="number"||typeof T=="boolean"?b[C]=T:b[C]=T.clone(),!0;{const N=b[C];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return b[C]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function v(x){const g=x.uniforms;let y=0;const b=16;for(let C=0,N=g.length;C<N;C++){const A=Array.isArray(g[C])?g[C]:[g[C]];for(let E=0,L=A.length;E<L;E++){const O=A[E],I=Array.isArray(O.value)?O.value:[O.value];for(let G=0,W=I.length;G<W;G++){const V=I[G],Z=_(V),U=y%b;U!==0&&b-U<Z.boundary&&(y+=b-U),O.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=Z.storage}}}const T=y%b;return T>0&&(y+=b-T),x.__size=y,x.__cache={},this}function _(x){const g={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(g.boundary=4,g.storage=4):x.isVector2?(g.boundary=8,g.storage=8):x.isVector3||x.isColor?(g.boundary=16,g.storage=12):x.isVector4?(g.boundary=16,g.storage=16):x.isMatrix3?(g.boundary=48,g.storage=48):x.isMatrix4?(g.boundary=64,g.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),g}function m(x){const g=x.target;g.removeEventListener("dispose",m);const y=o.indexOf(g.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function u(){for(const x in r)t.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class G2{constructor(e={}){const{canvas:n=US(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const u=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qn,this.toneMapping=Qi,this.toneMappingExposure=1;const g=this;let y=!1,b=0,T=0,C=null,N=-1,A=null;const E=new mt,L=new mt;let O=null;const I=new qe(0);let G=0,W=n.width,V=n.height,Z=1,U=null,B=null;const k=new mt(0,0,W,V),P=new mt(0,0,W,V);let X=!1;const ne=new Nf;let z=!1,q=!1;const ie=new gt,re=new H,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function we(){return C===null?Z:1}let F=i;function Ue(R,j){return n.getContext(R,j)}try{const R={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Lf}`),n.addEventListener("webglcontextlost",Q,!1),n.addEventListener("webglcontextrestored",$,!1),n.addEventListener("webglcontextcreationerror",te,!1),F===null){const j="webgl2";if(F=Ue(j,R),F===null)throw Ue(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Fe,Ee,Se,ke,De,Pe,Ze,D,w,J,oe,le,ce,Re,he,pe,We,se,xe,Ie,Ae,me,ze,Ve;function lt(){Fe=new ZE(F),Fe.init(),me=new I2(F,Fe),Ee=new jE(F,Fe,e,me),Se=new L2(F),ke=new ew(F),De=new v2,Pe=new D2(F,Fe,Se,De,Ee,me,ke),Ze=new YE(g),D=new KE(g),w=new a1(F),ze=new GE(F,w),J=new JE(F,w,ke,ze),oe=new nw(F,J,w,ke),xe=new tw(F,Ee,Pe),pe=new XE(De),le=new g2(g,Ze,D,Fe,Ee,ze,pe),ce=new H2(g,De),Re=new _2,he=new T2(Fe),se=new VE(g,Ze,D,Se,oe,d,l),We=new P2(g,oe,Ee),Ve=new V2(F,ke,Ee,Se),Ie=new WE(F,Fe,ke),Ae=new QE(F,Fe,ke),ke.programs=le.programs,g.capabilities=Ee,g.extensions=Fe,g.properties=De,g.renderLists=Re,g.shadowMap=We,g.state=Se,g.info=ke}lt();const S=new z2(g,F);this.xr=S,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=Fe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Fe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(W,V,!1))},this.getSize=function(R){return R.set(W,V)},this.setSize=function(R,j,K=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=R,V=j,n.width=Math.floor(R*Z),n.height=Math.floor(j*Z),K===!0&&(n.style.width=R+"px",n.style.height=j+"px"),this.setViewport(0,0,R,j)},this.getDrawingBufferSize=function(R){return R.set(W*Z,V*Z).floor()},this.setDrawingBufferSize=function(R,j,K){W=R,V=j,Z=K,n.width=Math.floor(R*K),n.height=Math.floor(j*K),this.setViewport(0,0,R,j)},this.getCurrentViewport=function(R){return R.copy(E)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,j,K,ee){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,j,K,ee),Se.viewport(E.copy(k).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(P)},this.setScissor=function(R,j,K,ee){R.isVector4?P.set(R.x,R.y,R.z,R.w):P.set(R,j,K,ee),Se.scissor(L.copy(P).multiplyScalar(Z).round())},this.getScissorTest=function(){return X},this.setScissorTest=function(R){Se.setScissorTest(X=R)},this.setOpaqueSort=function(R){U=R},this.setTransparentSort=function(R){B=R},this.getClearColor=function(R){return R.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(R=!0,j=!0,K=!0){let ee=0;if(R){let Y=!1;if(C!==null){const fe=C.texture.format;Y=fe===ov||fe===sv||fe===rv}if(Y){const fe=C.texture.type,_e=fe===ir||fe===Gs||fe===Bl||fe===Ws||fe===nv||fe===iv,Te=se.getClearColor(),Ce=se.getClearAlpha(),He=Te.r,Ge=Te.g,Oe=Te.b;_e?(p[0]=He,p[1]=Ge,p[2]=Oe,p[3]=Ce,F.clearBufferuiv(F.COLOR,0,p)):(v[0]=He,v[1]=Ge,v[2]=Oe,v[3]=Ce,F.clearBufferiv(F.COLOR,0,v))}else ee|=F.COLOR_BUFFER_BIT}j&&(ee|=F.DEPTH_BUFFER_BIT),K&&(ee|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Q,!1),n.removeEventListener("webglcontextrestored",$,!1),n.removeEventListener("webglcontextcreationerror",te,!1),Re.dispose(),he.dispose(),De.dispose(),Ze.dispose(),D.dispose(),oe.dispose(),ze.dispose(),Ve.dispose(),le.dispose(),S.dispose(),S.removeEventListener("sessionstart",bt),S.removeEventListener("sessionend",Ct),pn.stop()};function Q(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const R=ke.autoReset,j=We.enabled,K=We.autoUpdate,ee=We.needsUpdate,Y=We.type;lt(),ke.autoReset=R,We.enabled=j,We.autoUpdate=K,We.needsUpdate=ee,We.type=Y}function te(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ae(R){const j=R.target;j.removeEventListener("dispose",ae),Le(j)}function Le(R){Be(R),De.remove(R)}function Be(R){const j=De.get(R).programs;j!==void 0&&(j.forEach(function(K){le.releaseProgram(K)}),R.isShaderMaterial&&le.releaseShaderCache(R))}this.renderBufferDirect=function(R,j,K,ee,Y,fe){j===null&&(j=de);const _e=Y.isMesh&&Y.matrixWorld.determinant()<0,Te=Ov(R,j,K,ee,Y);Se.setMaterial(ee,_e);let Ce=K.index,He=1;if(ee.wireframe===!0){if(Ce=J.getWireframeAttribute(K),Ce===void 0)return;He=2}const Ge=K.drawRange,Oe=K.attributes.position;let tt=Ge.start*He,Mt=(Ge.start+Ge.count)*He;fe!==null&&(tt=Math.max(tt,fe.start*He),Mt=Math.min(Mt,(fe.start+fe.count)*He)),Ce!==null?(tt=Math.max(tt,0),Mt=Math.min(Mt,Ce.count)):Oe!=null&&(tt=Math.max(tt,0),Mt=Math.min(Mt,Oe.count));const Et=Mt-tt;if(Et<0||Et===1/0)return;ze.setup(Y,ee,Te,K,Ce);let gn,nt=Ie;if(Ce!==null&&(gn=w.get(Ce),nt=Ae,nt.setIndex(gn)),Y.isMesh)ee.wireframe===!0?(Se.setLineWidth(ee.wireframeLinewidth*we()),nt.setMode(F.LINES)):nt.setMode(F.TRIANGLES);else if(Y.isLine){let Ne=ee.linewidth;Ne===void 0&&(Ne=1),Se.setLineWidth(Ne*we()),Y.isLineSegments?nt.setMode(F.LINES):Y.isLineLoop?nt.setMode(F.LINE_LOOP):nt.setMode(F.LINE_STRIP)}else Y.isPoints?nt.setMode(F.POINTS):Y.isSprite&&nt.setMode(F.TRIANGLES);if(Y.isBatchedMesh)Y._multiDrawInstances!==null?nt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances):nt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)nt.renderInstances(tt,Et,Y.count);else if(K.isInstancedBufferGeometry){const Ne=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Jt=Math.min(K.instanceCount,Ne);nt.renderInstances(tt,Et,Jt)}else nt.render(tt,Et)};function St(R,j,K){R.transparent===!0&&R.side===Sn&&R.forceSinglePass===!1?(R.side=hn,R.needsUpdate=!0,oa(R,j,K),R.side=nr,R.needsUpdate=!0,oa(R,j,K),R.side=Sn):oa(R,j,K)}this.compile=function(R,j,K=null){K===null&&(K=R),m=he.get(K),m.init(j),x.push(m),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),R!==K&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(m.pushLight(Y),Y.castShadow&&m.pushShadow(Y))}),m.setupLights();const ee=new Set;return R.traverse(function(Y){const fe=Y.material;if(fe)if(Array.isArray(fe))for(let _e=0;_e<fe.length;_e++){const Te=fe[_e];St(Te,K,Y),ee.add(Te)}else St(fe,K,Y),ee.add(fe)}),x.pop(),m=null,ee},this.compileAsync=function(R,j,K=null){const ee=this.compile(R,j,K);return new Promise(Y=>{function fe(){if(ee.forEach(function(_e){De.get(_e).currentProgram.isReady()&&ee.delete(_e)}),ee.size===0){Y(R);return}setTimeout(fe,10)}Fe.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let At=null;function et(R){At&&At(R)}function bt(){pn.stop()}function Ct(){pn.start()}const pn=new yv;pn.setAnimationLoop(et),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(R){At=R,S.setAnimationLoop(R),R===null?pn.stop():pn.start()},S.addEventListener("sessionstart",bt),S.addEventListener("sessionend",Ct),this.render=function(R,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(j),j=S.getCamera()),R.isScene===!0&&R.onBeforeRender(g,R,j,C),m=he.get(R,x.length),m.init(j),x.push(m),ie.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ne.setFromProjectionMatrix(ie),q=this.localClippingEnabled,z=pe.init(this.clippingPlanes,q),_=Re.get(R,u.length),_.init(),u.push(_),S.enabled===!0&&S.isPresenting===!0){const fe=g.xr.getDepthSensingMesh();fe!==null&&mn(fe,j,-1/0,g.sortObjects)}mn(R,j,0,g.sortObjects),_.finish(),g.sortObjects===!0&&_.sort(U,B),ye=S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1,ye&&se.addToRenderList(_,R),this.info.render.frame++,z===!0&&pe.beginShadows();const K=m.state.shadowsArray;We.render(K,R,j),z===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=_.opaque,Y=_.transmissive;if(m.setupLights(),j.isArrayCamera){const fe=j.cameras;if(Y.length>0)for(let _e=0,Te=fe.length;_e<Te;_e++){const Ce=fe[_e];dr(ee,Y,R,Ce)}ye&&se.render(R);for(let _e=0,Te=fe.length;_e<Te;_e++){const Ce=fe[_e];Ai(_,R,Ce,Ce.viewport)}}else Y.length>0&&dr(ee,Y,R,j),ye&&se.render(R),Ai(_,R,j);C!==null&&(Pe.updateMultisampleRenderTarget(C),Pe.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(g,R,j),ze.resetDefaultState(),N=-1,A=null,x.pop(),x.length>0?(m=x[x.length-1],z===!0&&pe.setGlobalState(g.clippingPlanes,m.state.camera)):m=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function mn(R,j,K,ee){if(R.visible===!1)return;if(R.layers.test(j.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(j);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ne.intersectsSprite(R)){ee&&re.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ie);const _e=oe.update(R),Te=R.material;Te.visible&&_.push(R,_e,Te,K,re.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ne.intersectsObject(R))){const _e=oe.update(R),Te=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),re.copy(R.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),re.copy(_e.boundingSphere.center)),re.applyMatrix4(R.matrixWorld).applyMatrix4(ie)),Array.isArray(Te)){const Ce=_e.groups;for(let He=0,Ge=Ce.length;He<Ge;He++){const Oe=Ce[He],tt=Te[Oe.materialIndex];tt&&tt.visible&&_.push(R,_e,tt,K,re.z,Oe)}}else Te.visible&&_.push(R,_e,Te,K,re.z,null)}}const fe=R.children;for(let _e=0,Te=fe.length;_e<Te;_e++)mn(fe[_e],j,K,ee)}function Ai(R,j,K,ee){const Y=R.opaque,fe=R.transmissive,_e=R.transparent;m.setupLightsView(K),z===!0&&pe.setGlobalState(g.clippingPlanes,K),ee&&Se.viewport(E.copy(ee)),Y.length>0&&fr(Y,j,K),fe.length>0&&fr(fe,j,K),_e.length>0&&fr(_e,j,K),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function dr(R,j,K,ee){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[ee.id]===void 0&&(m.state.transmissionRenderTarget[ee.id]=new Or(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?fc:ir,minFilter:Rr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const fe=m.state.transmissionRenderTarget[ee.id],_e=ee.viewport||E;fe.setSize(_e.z,_e.w);const Te=g.getRenderTarget();g.setRenderTarget(fe),g.getClearColor(I),G=g.getClearAlpha(),G<1&&g.setClearColor(16777215,.5),ye?se.render(K):g.clear();const Ce=g.toneMapping;g.toneMapping=Qi;const He=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),m.setupLightsView(ee),z===!0&&pe.setGlobalState(g.clippingPlanes,ee),fr(R,K,ee),Pe.updateMultisampleRenderTarget(fe),Pe.updateRenderTargetMipmap(fe),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Oe=0,tt=j.length;Oe<tt;Oe++){const Mt=j[Oe],Et=Mt.object,gn=Mt.geometry,nt=Mt.material,Ne=Mt.group;if(nt.side===Sn&&Et.layers.test(ee.layers)){const Jt=nt.side;nt.side=hn,nt.needsUpdate=!0,Bf(Et,K,ee,gn,nt,Ne),nt.side=Jt,nt.needsUpdate=!0,Ge=!0}}Ge===!0&&(Pe.updateMultisampleRenderTarget(fe),Pe.updateRenderTargetMipmap(fe))}g.setRenderTarget(Te),g.setClearColor(I,G),He!==void 0&&(ee.viewport=He),g.toneMapping=Ce}function fr(R,j,K){const ee=j.isScene===!0?j.overrideMaterial:null;for(let Y=0,fe=R.length;Y<fe;Y++){const _e=R[Y],Te=_e.object,Ce=_e.geometry,He=ee===null?_e.material:ee,Ge=_e.group;Te.layers.test(K.layers)&&Bf(Te,j,K,Ce,He,Ge)}}function Bf(R,j,K,ee,Y,fe){R.onBeforeRender(g,j,K,ee,Y,fe),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(g,j,K,ee,R,fe),Y.transparent===!0&&Y.side===Sn&&Y.forceSinglePass===!1?(Y.side=hn,Y.needsUpdate=!0,g.renderBufferDirect(K,j,ee,Y,R,fe),Y.side=nr,Y.needsUpdate=!0,g.renderBufferDirect(K,j,ee,Y,R,fe),Y.side=Sn):g.renderBufferDirect(K,j,ee,Y,R,fe),R.onAfterRender(g,j,K,ee,Y,fe)}function oa(R,j,K){j.isScene!==!0&&(j=de);const ee=De.get(R),Y=m.state.lights,fe=m.state.shadowsArray,_e=Y.state.version,Te=le.getParameters(R,Y.state,fe,j,K),Ce=le.getProgramCacheKey(Te);let He=ee.programs;ee.environment=R.isMeshStandardMaterial?j.environment:null,ee.fog=j.fog,ee.envMap=(R.isMeshStandardMaterial?D:Ze).get(R.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&R.envMap===null?j.environmentRotation:R.envMapRotation,He===void 0&&(R.addEventListener("dispose",ae),He=new Map,ee.programs=He);let Ge=He.get(Ce);if(Ge!==void 0){if(ee.currentProgram===Ge&&ee.lightsStateVersion===_e)return Vf(R,Te),Ge}else Te.uniforms=le.getUniforms(R),R.onBuild(K,Te,g),R.onBeforeCompile(Te,g),Ge=le.acquireProgram(Te,Ce),He.set(Ce,Ge),ee.uniforms=Te.uniforms;const Oe=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=pe.uniform),Vf(R,Te),ee.needsLights=zv(R),ee.lightsStateVersion=_e,ee.needsLights&&(Oe.ambientLightColor.value=Y.state.ambient,Oe.lightProbe.value=Y.state.probe,Oe.directionalLights.value=Y.state.directional,Oe.directionalLightShadows.value=Y.state.directionalShadow,Oe.spotLights.value=Y.state.spot,Oe.spotLightShadows.value=Y.state.spotShadow,Oe.rectAreaLights.value=Y.state.rectArea,Oe.ltc_1.value=Y.state.rectAreaLTC1,Oe.ltc_2.value=Y.state.rectAreaLTC2,Oe.pointLights.value=Y.state.point,Oe.pointLightShadows.value=Y.state.pointShadow,Oe.hemisphereLights.value=Y.state.hemi,Oe.directionalShadowMap.value=Y.state.directionalShadowMap,Oe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Oe.spotShadowMap.value=Y.state.spotShadowMap,Oe.spotLightMatrix.value=Y.state.spotLightMatrix,Oe.spotLightMap.value=Y.state.spotLightMap,Oe.pointShadowMap.value=Y.state.pointShadowMap,Oe.pointShadowMatrix.value=Y.state.pointShadowMatrix),ee.currentProgram=Ge,ee.uniformsList=null,Ge}function Hf(R){if(R.uniformsList===null){const j=R.currentProgram.getUniforms();R.uniformsList=fl.seqWithValue(j.seq,R.uniforms)}return R.uniformsList}function Vf(R,j){const K=De.get(R);K.outputColorSpace=j.outputColorSpace,K.batching=j.batching,K.batchingColor=j.batchingColor,K.instancing=j.instancing,K.instancingColor=j.instancingColor,K.instancingMorph=j.instancingMorph,K.skinning=j.skinning,K.morphTargets=j.morphTargets,K.morphNormals=j.morphNormals,K.morphColors=j.morphColors,K.morphTargetsCount=j.morphTargetsCount,K.numClippingPlanes=j.numClippingPlanes,K.numIntersection=j.numClipIntersection,K.vertexAlphas=j.vertexAlphas,K.vertexTangents=j.vertexTangents,K.toneMapping=j.toneMapping}function Ov(R,j,K,ee,Y){j.isScene!==!0&&(j=de),Pe.resetTextureUnits();const fe=j.fog,_e=ee.isMeshStandardMaterial?j.environment:null,Te=C===null?g.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:cr,Ce=(ee.isMeshStandardMaterial?D:Ze).get(ee.envMap||_e),He=ee.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ge=!!K.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Oe=!!K.morphAttributes.position,tt=!!K.morphAttributes.normal,Mt=!!K.morphAttributes.color;let Et=Qi;ee.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Et=g.toneMapping);const gn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,nt=gn!==void 0?gn.length:0,Ne=De.get(ee),Jt=m.state.lights;if(z===!0&&(q===!0||R!==A)){const bn=R===A&&ee.id===N;pe.setState(ee,R,bn)}let st=!1;ee.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==Jt.state.version||Ne.outputColorSpace!==Te||Y.isBatchedMesh&&Ne.batching===!1||!Y.isBatchedMesh&&Ne.batching===!0||Y.isBatchedMesh&&Ne.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ne.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ne.instancing===!1||!Y.isInstancedMesh&&Ne.instancing===!0||Y.isSkinnedMesh&&Ne.skinning===!1||!Y.isSkinnedMesh&&Ne.skinning===!0||Y.isInstancedMesh&&Ne.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ne.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ne.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ne.instancingMorph===!1&&Y.morphTexture!==null||Ne.envMap!==Ce||ee.fog===!0&&Ne.fog!==fe||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==pe.numPlanes||Ne.numIntersection!==pe.numIntersection)||Ne.vertexAlphas!==He||Ne.vertexTangents!==Ge||Ne.morphTargets!==Oe||Ne.morphNormals!==tt||Ne.morphColors!==Mt||Ne.toneMapping!==Et||Ne.morphTargetsCount!==nt)&&(st=!0):(st=!0,Ne.__version=ee.version);let li=Ne.currentProgram;st===!0&&(li=oa(ee,j,Y));let aa=!1,hr=!1,vc=!1;const Ft=li.getUniforms(),bi=Ne.uniforms;if(Se.useProgram(li.program)&&(aa=!0,hr=!0,vc=!0),ee.id!==N&&(N=ee.id,hr=!0),aa||A!==R){Ft.setValue(F,"projectionMatrix",R.projectionMatrix),Ft.setValue(F,"viewMatrix",R.matrixWorldInverse);const bn=Ft.map.cameraPosition;bn!==void 0&&bn.setValue(F,re.setFromMatrixPosition(R.matrixWorld)),Ee.logarithmicDepthBuffer&&Ft.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ft.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),A!==R&&(A=R,hr=!0,vc=!0)}if(Y.isSkinnedMesh){Ft.setOptional(F,Y,"bindMatrix"),Ft.setOptional(F,Y,"bindMatrixInverse");const bn=Y.skeleton;bn&&(bn.boneTexture===null&&bn.computeBoneTexture(),Ft.setValue(F,"boneTexture",bn.boneTexture,Pe))}Y.isBatchedMesh&&(Ft.setOptional(F,Y,"batchingTexture"),Ft.setValue(F,"batchingTexture",Y._matricesTexture,Pe),Ft.setOptional(F,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Ft.setValue(F,"batchingColorTexture",Y._colorsTexture,Pe));const xc=K.morphAttributes;if((xc.position!==void 0||xc.normal!==void 0||xc.color!==void 0)&&xe.update(Y,K,li),(hr||Ne.receiveShadow!==Y.receiveShadow)&&(Ne.receiveShadow=Y.receiveShadow,Ft.setValue(F,"receiveShadow",Y.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(bi.envMap.value=Ce,bi.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&j.environment!==null&&(bi.envMapIntensity.value=j.environmentIntensity),hr&&(Ft.setValue(F,"toneMappingExposure",g.toneMappingExposure),Ne.needsLights&&kv(bi,vc),fe&&ee.fog===!0&&ce.refreshFogUniforms(bi,fe),ce.refreshMaterialUniforms(bi,ee,Z,V,m.state.transmissionRenderTarget[R.id]),fl.upload(F,Hf(Ne),bi,Pe)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(fl.upload(F,Hf(Ne),bi,Pe),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ft.setValue(F,"center",Y.center),Ft.setValue(F,"modelViewMatrix",Y.modelViewMatrix),Ft.setValue(F,"normalMatrix",Y.normalMatrix),Ft.setValue(F,"modelMatrix",Y.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const bn=ee.uniformsGroups;for(let _c=0,Bv=bn.length;_c<Bv;_c++){const Gf=bn[_c];Ve.update(Gf,li),Ve.bind(Gf,li)}}return li}function kv(R,j){R.ambientLightColor.needsUpdate=j,R.lightProbe.needsUpdate=j,R.directionalLights.needsUpdate=j,R.directionalLightShadows.needsUpdate=j,R.pointLights.needsUpdate=j,R.pointLightShadows.needsUpdate=j,R.spotLights.needsUpdate=j,R.spotLightShadows.needsUpdate=j,R.rectAreaLights.needsUpdate=j,R.hemisphereLights.needsUpdate=j}function zv(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,j,K){De.get(R.texture).__webglTexture=j,De.get(R.depthTexture).__webglTexture=K;const ee=De.get(R);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=K===void 0,ee.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,j){const K=De.get(R);K.__webglFramebuffer=j,K.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(R,j=0,K=0){C=R,b=j,T=K;let ee=!0,Y=null,fe=!1,_e=!1;if(R){const Ce=De.get(R);Ce.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(F.FRAMEBUFFER,null),ee=!1):Ce.__webglFramebuffer===void 0?Pe.setupRenderTarget(R):Ce.__hasExternalTextures&&Pe.rebindTextures(R,De.get(R.texture).__webglTexture,De.get(R.depthTexture).__webglTexture);const He=R.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(_e=!0);const Ge=De.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ge[j])?Y=Ge[j][K]:Y=Ge[j],fe=!0):R.samples>0&&Pe.useMultisampledRTT(R)===!1?Y=De.get(R).__webglMultisampledFramebuffer:Array.isArray(Ge)?Y=Ge[K]:Y=Ge,E.copy(R.viewport),L.copy(R.scissor),O=R.scissorTest}else E.copy(k).multiplyScalar(Z).floor(),L.copy(P).multiplyScalar(Z).floor(),O=X;if(Se.bindFramebuffer(F.FRAMEBUFFER,Y)&&ee&&Se.drawBuffers(R,Y),Se.viewport(E),Se.scissor(L),Se.setScissorTest(O),fe){const Ce=De.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce.__webglTexture,K)}else if(_e){const Ce=De.get(R.texture),He=j||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ce.__webglTexture,K||0,He)}N=-1},this.readRenderTargetPixels=function(R,j,K,ee,Y,fe,_e){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=De.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&_e!==void 0&&(Te=Te[_e]),Te){Se.bindFramebuffer(F.FRAMEBUFFER,Te);try{const Ce=R.texture,He=Ce.format,Ge=Ce.type;if(!Ee.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ee.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=R.width-ee&&K>=0&&K<=R.height-Y&&F.readPixels(j,K,ee,Y,me.convert(He),me.convert(Ge),fe)}finally{const Ce=C!==null?De.get(C).__webglFramebuffer:null;Se.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(R,j,K,ee,Y,fe,_e){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=De.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&_e!==void 0&&(Te=Te[_e]),Te){Se.bindFramebuffer(F.FRAMEBUFFER,Te);try{const Ce=R.texture,He=Ce.format,Ge=Ce.type;if(!Ee.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ee.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=R.width-ee&&K>=0&&K<=R.height-Y){const Oe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Oe),F.bufferData(F.PIXEL_PACK_BUFFER,fe.byteLength,F.STREAM_READ),F.readPixels(j,K,ee,Y,me.convert(He),me.convert(Ge),0),F.flush();const tt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);await FS(F,tt,4);try{F.bindBuffer(F.PIXEL_PACK_BUFFER,Oe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,fe)}finally{F.deleteBuffer(Oe),F.deleteSync(tt)}return fe}}finally{const Ce=C!==null?De.get(C).__webglFramebuffer:null;Se.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(R,j=null,K=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,R=arguments[1]);const ee=Math.pow(2,-K),Y=Math.floor(R.image.width*ee),fe=Math.floor(R.image.height*ee),_e=j!==null?j.x:0,Te=j!==null?j.y:0;Pe.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,_e,Te,Y,fe),Se.unbindTexture()},this.copyTextureToTexture=function(R,j,K=null,ee=null,Y=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,R=arguments[1],j=arguments[2],Y=arguments[3]||0,K=null);let fe,_e,Te,Ce,He,Ge;K!==null?(fe=K.max.x-K.min.x,_e=K.max.y-K.min.y,Te=K.min.x,Ce=K.min.y):(fe=R.image.width,_e=R.image.height,Te=0,Ce=0),ee!==null?(He=ee.x,Ge=ee.y):(He=0,Ge=0);const Oe=me.convert(j.format),tt=me.convert(j.type);Pe.setTexture2D(j,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,j.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,j.unpackAlignment);const Mt=F.getParameter(F.UNPACK_ROW_LENGTH),Et=F.getParameter(F.UNPACK_IMAGE_HEIGHT),gn=F.getParameter(F.UNPACK_SKIP_PIXELS),nt=F.getParameter(F.UNPACK_SKIP_ROWS),Ne=F.getParameter(F.UNPACK_SKIP_IMAGES),Jt=R.isCompressedTexture?R.mipmaps[Y]:R.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,Jt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Jt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Te),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ce),R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Y,He,Ge,fe,_e,Oe,tt,Jt.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Y,He,Ge,Jt.width,Jt.height,Oe,Jt.data):F.texSubImage2D(F.TEXTURE_2D,Y,He,Ge,Oe,tt,Jt),F.pixelStorei(F.UNPACK_ROW_LENGTH,Mt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Et),F.pixelStorei(F.UNPACK_SKIP_PIXELS,gn),F.pixelStorei(F.UNPACK_SKIP_ROWS,nt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ne),Y===0&&j.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(R,j,K=null,ee=null,Y=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,ee=arguments[1]||null,R=arguments[2],j=arguments[3],Y=arguments[4]||0);let fe,_e,Te,Ce,He,Ge,Oe,tt,Mt;const Et=R.isCompressedTexture?R.mipmaps[Y]:R.image;K!==null?(fe=K.max.x-K.min.x,_e=K.max.y-K.min.y,Te=K.max.z-K.min.z,Ce=K.min.x,He=K.min.y,Ge=K.min.z):(fe=Et.width,_e=Et.height,Te=Et.depth,Ce=0,He=0,Ge=0),ee!==null?(Oe=ee.x,tt=ee.y,Mt=ee.z):(Oe=0,tt=0,Mt=0);const gn=me.convert(j.format),nt=me.convert(j.type);let Ne;if(j.isData3DTexture)Pe.setTexture3D(j,0),Ne=F.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)Pe.setTexture2DArray(j,0),Ne=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,j.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,j.unpackAlignment);const Jt=F.getParameter(F.UNPACK_ROW_LENGTH),st=F.getParameter(F.UNPACK_IMAGE_HEIGHT),li=F.getParameter(F.UNPACK_SKIP_PIXELS),aa=F.getParameter(F.UNPACK_SKIP_ROWS),hr=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Et.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Et.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),F.pixelStorei(F.UNPACK_SKIP_ROWS,He),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge),R.isDataTexture||R.isData3DTexture?F.texSubImage3D(Ne,Y,Oe,tt,Mt,fe,_e,Te,gn,nt,Et.data):j.isCompressedArrayTexture?F.compressedTexSubImage3D(Ne,Y,Oe,tt,Mt,fe,_e,Te,gn,Et.data):F.texSubImage3D(Ne,Y,Oe,tt,Mt,fe,_e,Te,gn,nt,Et),F.pixelStorei(F.UNPACK_ROW_LENGTH,Jt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,st),F.pixelStorei(F.UNPACK_SKIP_PIXELS,li),F.pixelStorei(F.UNPACK_SKIP_ROWS,aa),F.pixelStorei(F.UNPACK_SKIP_IMAGES,hr),Y===0&&j.generateMipmaps&&F.generateMipmap(Ne),Se.unbindTexture()},this.initRenderTarget=function(R){De.get(R).__webglFramebuffer===void 0&&Pe.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Pe.setTextureCube(R,0):R.isData3DTexture?Pe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Pe.setTexture2DArray(R,0):Pe.setTexture2D(R,0),Se.unbindTexture()},this.resetState=function(){b=0,T=0,C=null,Se.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Df?"display-p3":"srgb",n.unpackColorSpace=it.workingColorSpace===hc?"display-p3":"srgb"}}class Ff{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=n}clone(){return new Ff(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class W2 extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class hl extends Zs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xl=new H,Yl=new H,ym=new gt,ho=new If,Ya=new pc,Tu=new H,Sm=new H;class Au extends Gt{constructor(e=new tn,n=new hl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Xl.fromBufferAttribute(n,r-1),Yl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Xl.distanceTo(Yl);e.setAttribute("lineDistance",new Wt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ya.copy(i.boundingSphere),Ya.applyMatrix4(r),Ya.radius+=s,e.ray.intersectsSphere(Ya)===!1)return;ym.copy(r).invert(),ho.copy(e.ray).applyMatrix4(ym);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,f=i.index,d=i.attributes.position;if(f!==null){const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let _=p,m=v-1;_<m;_+=c){const u=f.getX(_),x=f.getX(_+1),g=$a(this,e,ho,l,u,x);g&&n.push(g)}if(this.isLineLoop){const _=f.getX(v-1),m=f.getX(p),u=$a(this,e,ho,l,_,m);u&&n.push(u)}}else{const p=Math.max(0,o.start),v=Math.min(d.count,o.start+o.count);for(let _=p,m=v-1;_<m;_+=c){const u=$a(this,e,ho,l,_,_+1);u&&n.push(u)}if(this.isLineLoop){const _=$a(this,e,ho,l,v-1,p);_&&n.push(_)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function $a(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(Xl.fromBufferAttribute(o,r),Yl.fromBufferAttribute(o,s),n.distanceSqToSegment(Xl,Yl,Tu,Sm)>i)return;Tu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Tu);if(!(l<e.near||l>e.far))return{distance:l,point:Sm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}class j2 extends rn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const f=i[r],d=i[r+1]-f,p=(o-f)/d;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new ve:new H);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new H,r=[],s=[],o=[],a=new H,l=new gt;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new H)}s[0]=new H,o[0]=new H;let c=Number.MAX_VALUE;const f=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);f<=c&&(c=f,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(zt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,v))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(zt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Of extends ai{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new ve){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const f=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*f-p*h+this.aX,c=d*h+p*f+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class X2 extends Of{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function kf(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,f,h){let d=(o-s)/c-(a-s)/(c+f)+(a-o)/f,p=(a-o)/f-(l-o)/(f+h)+(l-a)/h;d*=f,p*=f,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const qa=new H,bu=new kf,Cu=new kf,Ru=new kf;class Y2 extends ai{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new H){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,f;this.closed||a>0?c=r[(a-1)%s]:(qa.subVectors(r[0],r[1]).add(r[0]),c=qa);const h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?f=r[(a+2)%s]:(qa.subVectors(r[s-1],r[s-2]).add(r[s-1]),f=qa),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(f),p);_<1e-4&&(_=1),v<1e-4&&(v=_),m<1e-4&&(m=_),bu.initNonuniformCatmullRom(c.x,h.x,d.x,f.x,v,_,m),Cu.initNonuniformCatmullRom(c.y,h.y,d.y,f.y,v,_,m),Ru.initNonuniformCatmullRom(c.z,h.z,d.z,f.z,v,_,m)}else this.curveType==="catmullrom"&&(bu.initCatmullRom(c.x,h.x,d.x,f.x,this.tension),Cu.initCatmullRom(c.y,h.y,d.y,f.y,this.tension),Ru.initCatmullRom(c.z,h.z,d.z,f.z,this.tension));return i.set(bu.calc(l),Cu.calc(l),Ru.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new H().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Mm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function $2(t,e){const n=1-t;return n*n*e}function q2(t,e){return 2*(1-t)*t*e}function K2(t,e){return t*t*e}function Po(t,e,n,i){return $2(t,e)+q2(t,n)+K2(t,i)}function Z2(t,e){const n=1-t;return n*n*n*e}function J2(t,e){const n=1-t;return 3*n*n*t*e}function Q2(t,e){return 3*(1-t)*t*t*e}function eT(t,e){return t*t*t*e}function Lo(t,e,n,i,r){return Z2(t,e)+J2(t,n)+Q2(t,i)+eT(t,r)}class Cv extends ai{constructor(e=new ve,n=new ve,i=new ve,r=new ve){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ve){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Lo(e,r.x,s.x,o.x,a.x),Lo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tT extends ai{constructor(e=new H,n=new H,i=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new H){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Lo(e,r.x,s.x,o.x,a.x),Lo(e,r.y,s.y,o.y,a.y),Lo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rv extends ai{constructor(e=new ve,n=new ve){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ve){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ve){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nT extends ai{constructor(e=new H,n=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new H){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new H){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pv extends ai{constructor(e=new ve,n=new ve,i=new ve){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ve){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Po(e,r.x,s.x,o.x),Po(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iT extends ai{constructor(e=new H,n=new H,i=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new H){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Po(e,r.x,s.x,o.x),Po(e,r.y,s.y,o.y),Po(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lv extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ve){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],f=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Mm(a,l.x,c.x,f.x,h.x),Mm(a,l.y,c.y,f.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ve().fromArray(r))}return this}}var Em=Object.freeze({__proto__:null,ArcCurve:X2,CatmullRomCurve3:Y2,CubicBezierCurve:Cv,CubicBezierCurve3:tT,EllipseCurve:Of,LineCurve:Rv,LineCurve3:nT,QuadraticBezierCurve:Pv,QuadraticBezierCurve3:iT,SplineCurve:Lv});class rT extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Em[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const f=l[c];i&&i.equals(f)||(n.push(f),i=f)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Em[r.type]().fromJSON(r))}return this}}class wm extends rT{constructor(e){super(),this.type="Path",this.currentPoint=new ve,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new Rv(this.currentPoint.clone(),new ve(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new Pv(this.currentPoint.clone(),new ve(e,n),new ve(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Cv(this.currentPoint.clone(),new ve(e,n),new ve(i,r),new ve(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Lv(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+c,n+f,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new Of(e,n,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const f=c.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ur extends tn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],h=[],d=[],p=[];let v=0;const _=[],m=i/2;let u=0;x(),o===!1&&(e>0&&g(!0),n>0&&g(!1)),this.setIndex(f),this.setAttribute("position",new Wt(h,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(p,2));function x(){const y=new H,b=new H;let T=0;const C=(n-e)/i;for(let N=0;N<=s;N++){const A=[],E=N/s,L=E*(n-e)+e;for(let O=0;O<=r;O++){const I=O/r,G=I*l+a,W=Math.sin(G),V=Math.cos(G);b.x=L*W,b.y=-E*i+m,b.z=L*V,h.push(b.x,b.y,b.z),y.set(W,C,V).normalize(),d.push(y.x,y.y,y.z),p.push(I,1-E),A.push(v++)}_.push(A)}for(let N=0;N<r;N++)for(let A=0;A<s;A++){const E=_[A][N],L=_[A+1][N],O=_[A+1][N+1],I=_[A][N+1];f.push(E,L,I),f.push(L,O,I),T+=6}c.addGroup(u,T,0),u+=T}function g(y){const b=v,T=new ve,C=new H;let N=0;const A=y===!0?e:n,E=y===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*E,0),d.push(0,E,0),p.push(.5,.5),v++;const L=v;for(let O=0;O<=r;O++){const G=O/r*l+a,W=Math.cos(G),V=Math.sin(G);C.x=A*V,C.y=m*E,C.z=A*W,h.push(C.x,C.y,C.z),d.push(0,E,0),T.x=W*.5+.5,T.y=V*.5*E+.5,p.push(T.x,T.y),v++}for(let O=0;O<r;O++){const I=b+O,G=L+O;y===!0?f.push(G,G+1,I):f.push(G+1,G,I),N+=3}c.addGroup(u,N,y===!0?1:2),u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dv extends wm{constructor(e){super(e),this.uuid=Ks(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new wm().fromJSON(r))}return this}}const sT={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=Iv(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,f,h,d,p;if(i&&(s=uT(t,e,s,n)),t.length>80*n){a=c=t[0],l=f=t[1];for(let v=n;v<r;v+=n)h=t[v],d=t[v+1],h<a&&(a=h),d<l&&(l=d),h>c&&(c=h),d>f&&(f=d);p=Math.max(c-a,f-l),p=p!==0?32767/p:0}return Ko(s,o,n,a,l,p,0),o}};function Iv(t,e,n,i,r){let s,o;if(r===ST(t,e,n,i)>0)for(s=e;s<n;s+=i)o=Tm(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=Tm(s,t[s],t[s+1],o);return o&&gc(o,o.next)&&(Jo(o),o=o.next),o}function zr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(gc(n,n.next)||xt(n.prev,n,n.next)===0)){if(Jo(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Ko(t,e,n,i,r,s,o){if(!t)return;!o&&s&&mT(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?aT(t,i,r,s):oT(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),Jo(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=lT(zr(t),e,n),Ko(t,e,n,i,r,s,2)):o===2&&cT(t,e,n,i,r,s):Ko(zr(t),e,n,i,r,s,1);break}}}function oT(t){const e=t.prev,n=t,i=t.next;if(xt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,f=r<s?r<o?r:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,d=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=f&&v.x<=d&&v.y>=h&&v.y<=p&&Es(r,a,s,l,o,c,v.x,v.y)&&xt(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function aT(t,e,n,i){const r=t.prev,s=t,o=t.next;if(xt(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,f=r.y,h=s.y,d=o.y,p=a<l?a<c?a:c:l<c?l:c,v=f<h?f<d?f:d:h<d?h:d,_=a>l?a>c?a:c:l>c?l:c,m=f>h?f>d?f:d:h>d?h:d,u=Id(p,v,e,n,i),x=Id(_,m,e,n,i);let g=t.prevZ,y=t.nextZ;for(;g&&g.z>=u&&y&&y.z<=x;){if(g.x>=p&&g.x<=_&&g.y>=v&&g.y<=m&&g!==r&&g!==o&&Es(a,f,l,h,c,d,g.x,g.y)&&xt(g.prev,g,g.next)>=0||(g=g.prevZ,y.x>=p&&y.x<=_&&y.y>=v&&y.y<=m&&y!==r&&y!==o&&Es(a,f,l,h,c,d,y.x,y.y)&&xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;g&&g.z>=u;){if(g.x>=p&&g.x<=_&&g.y>=v&&g.y<=m&&g!==r&&g!==o&&Es(a,f,l,h,c,d,g.x,g.y)&&xt(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;y&&y.z<=x;){if(y.x>=p&&y.x<=_&&y.y>=v&&y.y<=m&&y!==r&&y!==o&&Es(a,f,l,h,c,d,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function lT(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!gc(r,s)&&Nv(r,i,i.next,s)&&Zo(r,s)&&Zo(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),Jo(i),Jo(i.next),i=t=s),i=i.next}while(i!==t);return zr(i)}function cT(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&xT(o,a)){let l=Uv(o,a);o=zr(o,o.next),l=zr(l,l.next),Ko(o,e,n,i,r,s,0),Ko(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function uT(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=Iv(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(vT(c));for(r.sort(dT),s=0;s<r.length;s++)n=fT(r[s],n);return n}function dT(t,e){return t.x-e.x}function fT(t,e){const n=hT(t,e);if(!n)return e;const i=Uv(n,t);return zr(i,i.next),zr(n,n.next)}function hT(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const d=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=s&&d>i&&(i=d,r=n.x<n.next.x?n:n.next,d===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let f=1/0,h;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&Es(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(h=Math.abs(o-n.y)/(s-n.x),Zo(n,t)&&(h<f||h===f&&(n.x>r.x||n.x===r.x&&pT(r,n)))&&(r=n,f=h)),n=n.next;while(n!==a);return r}function pT(t,e){return xt(t.prev,t,e.prev)<0&&xt(e.next,t,t.next)<0}function mT(t,e,n,i){let r=t;do r.z===0&&(r.z=Id(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,gT(r)}function gT(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function Id(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function vT(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function Es(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function xT(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!_T(t,e)&&(Zo(t,e)&&Zo(e,t)&&yT(t,e)&&(xt(t.prev,t,e.prev)||xt(t,e.prev,e))||gc(t,e)&&xt(t.prev,t,t.next)>0&&xt(e.prev,e,e.next)>0)}function xt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function gc(t,e){return t.x===e.x&&t.y===e.y}function Nv(t,e,n,i){const r=Za(xt(t,e,n)),s=Za(xt(t,e,i)),o=Za(xt(n,i,t)),a=Za(xt(n,i,e));return!!(r!==s&&o!==a||r===0&&Ka(t,n,e)||s===0&&Ka(t,i,e)||o===0&&Ka(n,t,i)||a===0&&Ka(n,e,i))}function Ka(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Za(t){return t>0?1:t<0?-1:0}function _T(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Nv(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Zo(t,e){return xt(t.prev,t,t.next)<0?xt(t,e,t.next)>=0&&xt(t,t.prev,e)>=0:xt(t,e,t.prev)<0||xt(t,t.next,e)<0}function yT(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function Uv(t,e){const n=new Nd(t.i,t.x,t.y),i=new Nd(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Tm(t,e,n,i){const r=new Nd(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jo(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Nd(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ST(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Do{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Do.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Am(e),bm(i,e);let o=e.length;n.forEach(Am);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,bm(i,n[l]);const a=sT.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Am(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function bm(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class $l extends tn{constructor(e=new Dv([new ve(0,.5),new ve(-.5,-.5),new ve(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let f=0;f<e.length;f++)c(e[f]),this.addGroup(a,l,f),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(s,3)),this.setAttribute("uv",new Wt(o,2));function c(f){const h=r.length/3,d=f.extractPoints(n);let p=d.shape;const v=d.holes;Do.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,u=v.length;m<u;m++){const x=v[m];Do.isClockWise(x)===!0&&(v[m]=x.reverse())}const _=Do.triangulateShape(p,v);for(let m=0,u=v.length;m<u;m++){const x=v[m];p=p.concat(x)}for(let m=0,u=p.length;m<u;m++){const x=p[m];r.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let m=0,u=_.length;m<u;m++){const x=_[m],g=x[0]+h,y=x[1]+h,b=x[2]+h;i.push(g,y,b),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes;return MT(n,e)}static fromJSON(e,n){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=n[e.shapes[r]];i.push(o)}return new $l(i,e.curveSegments)}}function MT(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const r=t[n];e.shapes.push(r.uuid)}else e.shapes.push(t.uuid);return e}class sr extends tn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const f=[],h=new H,d=new H,p=[],v=[],_=[],m=[];for(let u=0;u<=i;u++){const x=[],g=u/i;let y=0;u===0&&o===0?y=.5/n:u===i&&l===Math.PI&&(y=-.5/n);for(let b=0;b<=n;b++){const T=b/n;h.x=-e*Math.cos(r+T*s)*Math.sin(o+g*a),h.y=e*Math.cos(o+g*a),h.z=e*Math.sin(r+T*s)*Math.sin(o+g*a),v.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(T+y,1-g),x.push(c++)}f.push(x)}for(let u=0;u<i;u++)for(let x=0;x<n;x++){const g=f[u][x+1],y=f[u][x],b=f[u+1][x],T=f[u+1][x+1];(u!==0||o>0)&&p.push(g,y,T),(u!==i-1||l<Math.PI)&&p.push(y,b,T)}this.setIndex(p),this.setAttribute("position",new Wt(v,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class at extends Zs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=av,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cm extends at{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class zf extends Gt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const Pu=new gt,Rm=new H,Pm=new H;class Fv{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nf,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Rm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rm),Pm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Pm),n.updateMatrixWorld(),Pu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Pu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Lm=new gt,po=new H,Lu=new H;class ET extends Fv{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),po.setFromMatrixPosition(e.matrixWorld),i.position.copy(po),Lu.copy(i.position),Lu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(Lu),i.updateMatrixWorld(),r.makeTranslation(-po.x,-po.y,-po.z),Lm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lm)}}class Ud extends zf{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ET}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class wT extends Fv{constructor(){super(new Sv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dm extends zf{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new wT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class TT extends zf{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Im{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(zt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lf);const Nm={type:"change"},Du={type:"start"},Um={type:"end"},Ja=new If,Fm=new Oi,AT=Math.cos(70*NS.DEG2RAD);class bT extends Vr{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:jr.ROTATE,MIDDLE:jr.DOLLY,RIGHT:jr.PAN},this.touches={ONE:Xr.ROTATE,TWO:Xr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",pe),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",pe),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Nm),i.update(),s=r.NONE},this.update=function(){const S=new H,Q=new kr().setFromUnitVectors(e.up,new H(0,1,0)),$=Q.clone().invert(),te=new H,ae=new kr,Le=new H,Be=2*Math.PI;return function(At=null){const et=i.object.position;S.copy(et).sub(i.target),S.applyQuaternion(Q),a.setFromVector3(S),i.autoRotate&&s===r.NONE&&O(E(At)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let bt=i.minAzimuthAngle,Ct=i.maxAzimuthAngle;isFinite(bt)&&isFinite(Ct)&&(bt<-Math.PI?bt+=Be:bt>Math.PI&&(bt-=Be),Ct<-Math.PI?Ct+=Be:Ct>Math.PI&&(Ct-=Be),bt<=Ct?a.theta=Math.max(bt,Math.min(Ct,a.theta)):a.theta=a.theta>(bt+Ct)/2?Math.max(bt,a.theta):Math.min(Ct,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(f,i.dampingFactor):i.target.add(f),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let pn=!1;if(i.zoomToCursor&&T||i.object.isOrthographicCamera)a.radius=k(a.radius);else{const mn=a.radius;a.radius=k(a.radius*c),pn=mn!=a.radius}if(S.setFromSpherical(a),S.applyQuaternion($),et.copy(i.target).add(S),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,f.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),f.set(0,0,0)),i.zoomToCursor&&T){let mn=null;if(i.object.isPerspectiveCamera){const Ai=S.length();mn=k(Ai*c);const dr=Ai-mn;i.object.position.addScaledVector(y,dr),i.object.updateMatrixWorld(),pn=!!dr}else if(i.object.isOrthographicCamera){const Ai=new H(b.x,b.y,0);Ai.unproject(i.object);const dr=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),pn=dr!==i.object.zoom;const fr=new H(b.x,b.y,0);fr.unproject(i.object),i.object.position.sub(fr).add(Ai),i.object.updateMatrixWorld(),mn=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;mn!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(mn).add(i.object.position):(Ja.origin.copy(i.object.position),Ja.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Ja.direction))<AT?e.lookAt(i.target):(Fm.setFromNormalAndCoplanarPoint(i.object.up,i.target),Ja.intersectPlane(Fm,i.target))))}else if(i.object.isOrthographicCamera){const mn=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),mn!==i.object.zoom&&(i.object.updateProjectionMatrix(),pn=!0)}return c=1,T=!1,pn||te.distanceToSquared(i.object.position)>o||8*(1-ae.dot(i.object.quaternion))>o||Le.distanceToSquared(i.target)>o?(i.dispatchEvent(Nm),te.copy(i.object.position),ae.copy(i.object.quaternion),Le.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",xe),i.domElement.removeEventListener("pointerdown",Ze),i.domElement.removeEventListener("pointercancel",w),i.domElement.removeEventListener("wheel",le),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",w),i.domElement.getRootNode().removeEventListener("keydown",Re,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",pe),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Im,l=new Im;let c=1;const f=new H,h=new ve,d=new ve,p=new ve,v=new ve,_=new ve,m=new ve,u=new ve,x=new ve,g=new ve,y=new H,b=new ve;let T=!1;const C=[],N={};let A=!1;function E(S){return S!==null?2*Math.PI/60*i.autoRotateSpeed*S:2*Math.PI/60/60*i.autoRotateSpeed}function L(S){const Q=Math.abs(S*.01);return Math.pow(.95,i.zoomSpeed*Q)}function O(S){l.theta-=S}function I(S){l.phi-=S}const G=function(){const S=new H;return function($,te){S.setFromMatrixColumn(te,0),S.multiplyScalar(-$),f.add(S)}}(),W=function(){const S=new H;return function($,te){i.screenSpacePanning===!0?S.setFromMatrixColumn(te,1):(S.setFromMatrixColumn(te,0),S.crossVectors(i.object.up,S)),S.multiplyScalar($),f.add(S)}}(),V=function(){const S=new H;return function($,te){const ae=i.domElement;if(i.object.isPerspectiveCamera){const Le=i.object.position;S.copy(Le).sub(i.target);let Be=S.length();Be*=Math.tan(i.object.fov/2*Math.PI/180),G(2*$*Be/ae.clientHeight,i.object.matrix),W(2*te*Be/ae.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(G($*(i.object.right-i.object.left)/i.object.zoom/ae.clientWidth,i.object.matrix),W(te*(i.object.top-i.object.bottom)/i.object.zoom/ae.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function Z(S){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function U(S){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function B(S,Q){if(!i.zoomToCursor)return;T=!0;const $=i.domElement.getBoundingClientRect(),te=S-$.left,ae=Q-$.top,Le=$.width,Be=$.height;b.x=te/Le*2-1,b.y=-(ae/Be)*2+1,y.set(b.x,b.y,1).unproject(i.object).sub(i.object.position).normalize()}function k(S){return Math.max(i.minDistance,Math.min(i.maxDistance,S))}function P(S){h.set(S.clientX,S.clientY)}function X(S){B(S.clientX,S.clientX),u.set(S.clientX,S.clientY)}function ne(S){v.set(S.clientX,S.clientY)}function z(S){d.set(S.clientX,S.clientY),p.subVectors(d,h).multiplyScalar(i.rotateSpeed);const Q=i.domElement;O(2*Math.PI*p.x/Q.clientHeight),I(2*Math.PI*p.y/Q.clientHeight),h.copy(d),i.update()}function q(S){x.set(S.clientX,S.clientY),g.subVectors(x,u),g.y>0?Z(L(g.y)):g.y<0&&U(L(g.y)),u.copy(x),i.update()}function ie(S){_.set(S.clientX,S.clientY),m.subVectors(_,v).multiplyScalar(i.panSpeed),V(m.x,m.y),v.copy(_),i.update()}function re(S){B(S.clientX,S.clientY),S.deltaY<0?U(L(S.deltaY)):S.deltaY>0&&Z(L(S.deltaY)),i.update()}function de(S){let Q=!1;switch(S.code){case i.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?I(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(0,i.keyPanSpeed),Q=!0;break;case i.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?I(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(0,-i.keyPanSpeed),Q=!0;break;case i.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?O(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(i.keyPanSpeed,0),Q=!0;break;case i.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?O(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(-i.keyPanSpeed,0),Q=!0;break}Q&&(S.preventDefault(),i.update())}function ye(S){if(C.length===1)h.set(S.pageX,S.pageY);else{const Q=Ve(S),$=.5*(S.pageX+Q.x),te=.5*(S.pageY+Q.y);h.set($,te)}}function we(S){if(C.length===1)v.set(S.pageX,S.pageY);else{const Q=Ve(S),$=.5*(S.pageX+Q.x),te=.5*(S.pageY+Q.y);v.set($,te)}}function F(S){const Q=Ve(S),$=S.pageX-Q.x,te=S.pageY-Q.y,ae=Math.sqrt($*$+te*te);u.set(0,ae)}function Ue(S){i.enableZoom&&F(S),i.enablePan&&we(S)}function Fe(S){i.enableZoom&&F(S),i.enableRotate&&ye(S)}function Ee(S){if(C.length==1)d.set(S.pageX,S.pageY);else{const $=Ve(S),te=.5*(S.pageX+$.x),ae=.5*(S.pageY+$.y);d.set(te,ae)}p.subVectors(d,h).multiplyScalar(i.rotateSpeed);const Q=i.domElement;O(2*Math.PI*p.x/Q.clientHeight),I(2*Math.PI*p.y/Q.clientHeight),h.copy(d)}function Se(S){if(C.length===1)_.set(S.pageX,S.pageY);else{const Q=Ve(S),$=.5*(S.pageX+Q.x),te=.5*(S.pageY+Q.y);_.set($,te)}m.subVectors(_,v).multiplyScalar(i.panSpeed),V(m.x,m.y),v.copy(_)}function ke(S){const Q=Ve(S),$=S.pageX-Q.x,te=S.pageY-Q.y,ae=Math.sqrt($*$+te*te);x.set(0,ae),g.set(0,Math.pow(x.y/u.y,i.zoomSpeed)),Z(g.y),u.copy(x);const Le=(S.pageX+Q.x)*.5,Be=(S.pageY+Q.y)*.5;B(Le,Be)}function De(S){i.enableZoom&&ke(S),i.enablePan&&Se(S)}function Pe(S){i.enableZoom&&ke(S),i.enableRotate&&Ee(S)}function Ze(S){i.enabled!==!1&&(C.length===0&&(i.domElement.setPointerCapture(S.pointerId),i.domElement.addEventListener("pointermove",D),i.domElement.addEventListener("pointerup",w)),!me(S)&&(Ie(S),S.pointerType==="touch"?We(S):J(S)))}function D(S){i.enabled!==!1&&(S.pointerType==="touch"?se(S):oe(S))}function w(S){switch(Ae(S),C.length){case 0:i.domElement.releasePointerCapture(S.pointerId),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",w),i.dispatchEvent(Um),s=r.NONE;break;case 1:const Q=C[0],$=N[Q];We({pointerId:Q,pageX:$.x,pageY:$.y});break}}function J(S){let Q;switch(S.button){case 0:Q=i.mouseButtons.LEFT;break;case 1:Q=i.mouseButtons.MIDDLE;break;case 2:Q=i.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case jr.DOLLY:if(i.enableZoom===!1)return;X(S),s=r.DOLLY;break;case jr.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(i.enablePan===!1)return;ne(S),s=r.PAN}else{if(i.enableRotate===!1)return;P(S),s=r.ROTATE}break;case jr.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(i.enableRotate===!1)return;P(S),s=r.ROTATE}else{if(i.enablePan===!1)return;ne(S),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Du)}function oe(S){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;z(S);break;case r.DOLLY:if(i.enableZoom===!1)return;q(S);break;case r.PAN:if(i.enablePan===!1)return;ie(S);break}}function le(S){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(S.preventDefault(),i.dispatchEvent(Du),re(ce(S)),i.dispatchEvent(Um))}function ce(S){const Q=S.deltaMode,$={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(Q){case 1:$.deltaY*=16;break;case 2:$.deltaY*=100;break}return S.ctrlKey&&!A&&($.deltaY*=10),$}function Re(S){S.key==="Control"&&(A=!0,i.domElement.getRootNode().addEventListener("keyup",he,{passive:!0,capture:!0}))}function he(S){S.key==="Control"&&(A=!1,i.domElement.getRootNode().removeEventListener("keyup",he,{passive:!0,capture:!0}))}function pe(S){i.enabled===!1||i.enablePan===!1||de(S)}function We(S){switch(ze(S),C.length){case 1:switch(i.touches.ONE){case Xr.ROTATE:if(i.enableRotate===!1)return;ye(S),s=r.TOUCH_ROTATE;break;case Xr.PAN:if(i.enablePan===!1)return;we(S),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Xr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ue(S),s=r.TOUCH_DOLLY_PAN;break;case Xr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Fe(S),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Du)}function se(S){switch(ze(S),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ee(S),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;Se(S),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;De(S),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Pe(S),i.update();break;default:s=r.NONE}}function xe(S){i.enabled!==!1&&S.preventDefault()}function Ie(S){C.push(S.pointerId)}function Ae(S){delete N[S.pointerId];for(let Q=0;Q<C.length;Q++)if(C[Q]==S.pointerId){C.splice(Q,1);return}}function me(S){for(let Q=0;Q<C.length;Q++)if(C[Q]==S.pointerId)return!0;return!1}function ze(S){let Q=N[S.pointerId];Q===void 0&&(Q=new ve,N[S.pointerId]=Q),Q.set(S.pageX,S.pageY)}function Ve(S){const Q=S.pointerId===C[0]?C[1]:C[0];return N[Q]}i.domElement.addEventListener("contextmenu",xe),i.domElement.addEventListener("pointerdown",Ze),i.domElement.addEventListener("pointercancel",w),i.domElement.addEventListener("wheel",le,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",Re,{passive:!0,capture:!0}),this.update()}}function CT(t){return parseInt(t.replace("#",""),16)}function Bn(t,e){const n=new je(t,e);return n.castShadow=!0,n.receiveShadow=!0,n}function $e(t,e,n,i,r=.75,s=0){return Bn(new ft(t,e,n),new at({color:i,roughness:r,metalness:s}))}function be(t,e,n,i,r){e.position.set(n,i,r),t.add(e)}function RT(t,e,n=0){const i=new Lt,r=.15,s=.12,o=.2,a=.55,l=.25,c=r+s;be(i,$e(t,r+s,e,6044958,.8),0,(r+s)/2,e/2),be(i,$e(t-.06,o,e-.06,15789544,.9),0,c+o/2,e/2);const f=.025,h=(v,_,m)=>{const u=new je(new ur(v,v,_,10),new at({color:m,roughness:.7}));return u.castShadow=!0,u};[[-t/2+.05,.05],[t/2-.05,.05],[-t/2+.05,e-.05],[t/2-.05,e-.05]].forEach(([v,_])=>be(i,h(f,r,2759176),v,r/2,_));const d=.08,p=c+o+d/2;if(n===0||n===180){const v=n===0?.04:e-.04,_=n===0?e-.035:.035,m=n===0?.04+d:e-.04-d,u=n===0?e/2+(e-.06)*.225:e/2-(e-.06)*.225,x=(t-.2)/2;be(i,$e(t,a,.08,3876112,.7),0,r+a/2,v),be(i,$e(t,l,.07,3876112,.7),0,r+l/2,_),be(i,$e(x,d,Math.min(.5,e*.15),16777215,.95),-(x/2+.02),p,m),be(i,$e(x,d,Math.min(.5,e*.15),16777215,.95),x/2+.02,p,m),be(i,$e(t-.1,o+.04,(e-.06)*.55,8366284,.9),0,c+o/2,u)}else{const v=n===90?t/2-.04:-t/2+.04,_=n===90?-t/2+.035:t/2-.035,m=n===90?t/2-.04-d:-t/2+.04+d,u=n===90?-(t-.06)*.225:(t-.06)*.225,x=(e-.2)/2;be(i,$e(.08,a,e,3876112,.7),v,r+a/2,e/2),be(i,$e(.07,l,e,3876112,.7),_,r+l/2,e/2),be(i,$e(Math.min(.5,t*.15),d,x,16777215,.95),m,p,e/2-(x/2+.02)),be(i,$e(Math.min(.5,t*.15),d,x,16777215,.95),m,p,e/2+(x/2+.02)),be(i,$e((t-.06)*.55,o+.04,e-.1,8366284,.9),u,c+o/2,e/2)}return i}function PT(t,e,n){const i=new Lt,r=.1,s=Math.min(e*.22,.26),o=e-s,a=.38,l=.52,c=Math.min(.13,t*.09),f=new qe(n).multiplyScalar(.6).getHex(),h=(_,m)=>new je(new ur(_,_,m,8),new at({color:2759176}));[[-t/2+.1,.1],[t/2-.1,.1],[-t/2+.1,e-.1],[t/2-.1,e-.1]].forEach(([_,m])=>be(i,h(.03,r),_,r/2,m)),be(i,$e(t,l,s,f,.8),0,r+a*.25+l/2,s/2),be(i,$e(t,a,o,n,.85),0,r+a/2,s+o/2);const d=a+l*.55;be(i,$e(c,d,e,f,.8),-(t/2-c/2),r+d/2,e/2),be(i,$e(c,d,e,f,.8),t/2-c/2,r+d/2,e/2);const p=t>1.5?3:2,v=(t-c*2-.04)/p;for(let _=0;_<p;_++){const m=-(t/2-c)+v/2+_*v;be(i,$e(v-.04,.13,o-.04,n,.9),m,r+a+.065,s+o/2)}return be(i,$e(t-c*2-.06,l*.65,.09,n,.9),0,r+a*.15+l*.33,s-.04),i}function LT(t){const e=new Lt,n=2.1,i=.07,r=.05;be(e,$e(i,n+i,i,9134912),-t/2,n/2,0),be(e,$e(i,n+i,i,9134912),t/2,n/2,0),be(e,$e(t+i*2,i,i,9134912),0,n,0),be(e,$e(t-.04,n-.02,r,12884588,.55),0,n/2,0);const s=t*.78;be(e,$e(s,n*.35,.012,10514496),0,n*.76,r/2+.006),be(e,$e(s,n*.4,.012,10514496),0,n*.3,r/2+.006);const o=new je(new sr(.022,10,10),new at({color:13938487,metalness:.9,roughness:.1}));be(e,o,t/2-.12,n*.46,r/2+.022);const a=new je(new ur(.007,.007,.09,8),new at({color:13938487,metalness:.9,roughness:.1}));return a.rotation.z=Math.PI/2,be(e,a,t/2-.165,n*.46,r/2+.022),e}function DT(t){const e=new Lt,n=1.15,i=.055,r=.1,s=.06,o=.12,a=new at({color:15593714,roughness:.65,metalness:.05}),l=new at({color:14475751,roughness:.55});be(e,new je(new ft(t+i*2,i,r),a),0,n+i/2,-r/2),be(e,new je(new ft(t+i*2,i,r),a),0,i/2,-r/2),be(e,new je(new ft(i,n+i*2,r),a),-(t/2+i/2),(n+i*2)/2,-r/2),be(e,new je(new ft(i,n+i*2,r),a),t/2+i/2,(n+i*2)/2,-r/2),be(e,new je(new ft(t,i,r*.7),a),0,n/2,-r/2);const c=t>1?2:1;c>1&&be(e,new je(new ft(i,n,r*.7),a),0,n/2,-r/2);const f=new Cm({color:11393264,transparent:!0,opacity:.25,roughness:.02,metalness:0,reflectivity:.8,transmission:.7,thickness:.01}),h=new Cm({color:13166840,transparent:!0,opacity:.18,roughness:.04,metalness:0,reflectivity:.9,transmission:.8,thickness:.01,side:Sn}),d=(t-i*(c+1))/c,p=n/2-i*1.5,v=n/2-i*1.5,_=n/2+i/2+p/2,m=i+v/2;for(let g=0;g<c;g++){const y=(g-(c-1)/2)*(d+i),b=new je(new ft(d,p,.008),f);b.position.set(y,_,-.001),e.add(b);const T=new je(new ft(d,p,.008),h);T.position.set(y,_,-r+.001),e.add(T);const C=new je(new ft(d,v,.008),f);C.position.set(y,m,-.001),e.add(C);const N=new je(new ft(d,v,.008),h);N.position.set(y,m,-r+.001),e.add(N);const A=new sa({color:16777215,transparent:!0,opacity:.18}),E=new je(new ft(d*.6,p*.12,.001),A);E.position.set(y-d*.1,_+p*.28,.001),e.add(E)}const u=new je(new ft(t+i*2+.04,s,o),l);u.position.set(0,s/2,o/2-.01),e.add(u);const x=new Ud(13954815,.5,3.5);return x.position.set(0,n/2,.8),e.add(x),e}function IT(t){const e=new Lt,n=t*.58,i=.06,r=.025;be(e,$e(t,n+r*2,i,1118481,.3,.5),0,(n+r*2)/2,0);const s=new at({color:664128,emissive:864352,emissiveIntensity:.6,roughness:.1,metalness:.2});be(e,new je(new ft(t-r*2,n,.01),s),0,(n+r*2)/2,i/2+.006);const o=new sa({color:1723008,transparent:!0,opacity:.4});for(let l=0;l<3;l++){const c=new je(new ft(t-r*2,.008,.001),o);c.position.set(0,n*.25+l*(n*.25),i/2+.008),e.add(c)}be(e,$e(.08,.18,.06,3355443,.5,.6),0,-.05,-i/2+.03);const a=new je(new sr(.008,8,8),new at({color:65280,emissive:43520,emissiveIntensity:3}));return be(e,a,t/2-.04,r,i/2+.005),e}function NT(t,e){const n=new Lt;be(n,$e(t,.05,e,10516554,.6),0,.73,e/2);const i=(r,s)=>new je(new ur(r,r,s,10),new at({color:7032622}));return[[-t/2+.06,.06],[t/2-.06,.06],[-t/2+.06,e-.06],[t/2-.06,e-.06]].forEach(([r,s])=>be(n,i(.025,.7),r,.35,s)),n}function UT(t,e){const n=new Lt;return be(n,$e(t,.04,e,8019002,.6),0,.74,e/2),be(n,$e(.04,.72,e,6044958),-t/2+.02,.36,e/2),be(n,$e(.04,.72,e,6044958),t/2-.02,.36,e/2),n}function FT(t,e,n){const i=new Lt,r=.44,s=(o,a)=>new je(new ur(o,o,a,8),new at({color:6044958}));return[[-t/2+.05,.05],[t/2-.05,.05],[-t/2+.05,e-.05],[t/2-.05,e-.05]].forEach(([o,a])=>be(i,s(.016,r),o,r/2,a)),be(i,$e(t,.06,e,n,.85),0,r+.03,e/2),be(i,$e(t,.42,.06,n,.85),0,r+.06+.21,.03),i}function OT(t,e){const n=new Lt,i=2;be(n,$e(t,i,e,8019002,.75),0,i/2,e/2);const r=(t-.04)/2;return[-(r/2+.01),r/2+.01].forEach(s=>{be(n,$e(r,i-.06,.025,10121296,.65),s,i/2,e+.012);const o=new je(new ur(.008,.008,.1,8),new at({color:13938487,metalness:.8}));o.rotation.x=Math.PI/2,be(n,o,s,i*.48,e+.025)}),n}function kT(t,e){const n=new Lt,i=Math.max(.5,Math.min(t,e)*1.8);be(n,$e(t,i,e,9139029,.7),0,i/2,e/2),be(n,$e(t-.02,i-.04,.02,10518624,.6),0,i/2,e+.01);const r=new je(new sr(.012,8,8),new at({color:13938487,metalness:.8,roughness:.2}));return be(n,r,0,i*.5,e+.022),n}function zT(){const t=new Lt,e=new at({color:1973806,roughness:.25,metalness:.7});be(t,new je(new ft(.11,.14,.018),e),0,0,0);const n=new at({color:3816010,roughness:.35,metalness:.55});be(t,new je(new ft(.028,.028,.06),n),0,-.025,.04);const i=new Lt;i.position.set(0,-.025,.075),i.rotation.x=Math.PI/4;const r=new at({color:1184287,roughness:.15,metalness:.8});i.add(new je(new ft(.12,.055,.038),r));const s=new at({color:9133302,emissive:8141549,emissiveIntensity:2.2,roughness:.05,metalness:.1}),o=new je(new ft(.1,.044,.005),s);o.position.set(0,0,.021),i.add(o);const a=new at({color:12891645,emissive:10980346,emissiveIntensity:1.5,roughness:.05});for(let f=-1;f<=1;f++)for(let h=-.5;h<=.5;h++){const d=new je(new sr(.0045,6,6),a);d.position.set(f*.033,h*.018,.023),i.add(d)}const l=new at({color:65416,emissive:56678,emissiveIntensity:5}),c=new je(new sr(.0065,8,8),l);return c.position.set(.048,.018,.021),i.add(c),t.add(i),t}function BT(t){const e=new Lt;return be(e,new je(new sr(.12,10,10),new at({color:16106915})),0,1.65,0),be(e,$e(.28,.65,.16,t),0,1.18,0),be(e,$e(.1,.62,.12,2899536),-.08,.58,0),be(e,$e(.1,.62,.12,2899536),.08,.58,0),e}function HT(t,e,n,i=.8){const r=new Lt;return be(r,$e(t,i,e,n,.75),0,i/2,e/2),r}function VT(t){const e=t.label.toLowerCase();return e.includes("tv")||e.includes("television")||e.includes("tele")}const GT=({room:t,objects:e,onClose:n})=>{const i=Je.useRef(null);return Je.useEffect(()=>{const r=i.current,s=r.clientWidth,o=r.clientHeight,a=new G2({antialias:!0});a.setSize(s,o),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.shadowMap.enabled=!0,a.shadowMap.type=Z0,a.setClearColor(527638),a.toneMapping=Q0,a.toneMappingExposure=1.15,r.appendChild(a.domElement);const l=new W2;l.fog=new Ff(527638,.04);const c=t.width/2,f=t.height/2,h=Math.max(t.width,t.height),d=new yn(50,s/o,.05,300);d.position.set(c+h*.6,h*.85,f+h*1.1),d.lookAt(c,.6,f);const p=new bT(d,a.domElement);p.target.set(c,.5,f),p.enableDamping=!0,p.dampingFactor=.06,p.minDistance=.5,p.maxDistance=80,p.maxPolarAngle=Math.PI/2-.01,p.update(),l.add(new TT(16774376,.55));const v=new Dm(16772829,1.05);v.position.set(c+4,9,f-4),v.castShadow=!0,v.shadow.mapSize.set(2048,2048);const _=Math.max(t.width,t.height)*1.5;v.shadow.camera.left=-_,v.shadow.camera.right=_,v.shadow.camera.top=_,v.shadow.camera.bottom=-_,v.shadow.camera.near=.1,v.shadow.camera.far=40,v.shadow.radius=4,l.add(v);const m=new Dm(12113151,.3);m.position.set(c-4,3,f+6),l.add(m);const u=new Ud(16773336,.6,t.width*2.5);u.position.set(c,2.5,f),l.add(u);const x=document.createElement("canvas");x.width=512,x.height=512;const g=x.getContext("2d");g.fillStyle="#b07840",g.fillRect(0,0,512,512),g.strokeStyle="#986030",g.lineWidth=1.5;for(let I=0;I<512;I+=80)g.beginPath(),g.moveTo(0,I),g.lineTo(512,I),g.stroke();g.strokeStyle="#a06838",g.lineWidth=.8;for(let I=0;I<512;I+=160)g.beginPath(),g.moveTo(I,0),g.lineTo(I,512),g.stroke(),g.beginPath(),g.moveTo(I+80,80),g.lineTo(I+80,240),g.stroke(),g.beginPath(),g.moveTo(I+80,320),g.lineTo(I+80,480),g.stroke();const y=new j2(x);y.wrapS=y.wrapT=zl,y.repeat.set(t.width*1.2,t.height*1.2);const b=2.8,T=new at({color:16117994,roughness:.9,side:Sn}),C=new at({color:16117994,roughness:.9,transparent:!0,opacity:.07,side:Sn}),N=new at({color:16777215,roughness:1,transparent:!0,opacity:.05});if(t.polygon&&t.polygon.length>=3){const I=new Dv;I.moveTo(t.polygon[0][0],t.polygon[0][1]);for(let B=1;B<t.polygon.length;B++)I.lineTo(t.polygon[B][0],t.polygon[B][1]);I.closePath();const G=new $l(I),W=Bn(G,new at({map:y,roughness:.55}));W.rotation.x=-Math.PI/2,W.position.y=0,l.add(W);const V=new $l(I),Z=Bn(V,N);Z.rotation.x=-Math.PI/2,Z.position.y=b,l.add(Z);const U=t.polygon;for(let B=0;B<U.length;B++){const[k,P]=U[B],[X,ne]=U[(B+1)%U.length],z=X-k,q=ne-P,ie=Math.sqrt(z*z+q*q);if(ie<.01)continue;const de=-z/ie>.5,ye=new Gn(ie,b),we=Bn(ye,de?C:T);we.position.set((k+X)/2,b/2,(P+ne)/2),we.rotation.y=-Math.atan2(q,z),l.add(we)}}else{const I=Bn(new Gn(t.width,t.height),new at({map:y,roughness:.55}));I.rotation.x=-Math.PI/2,I.position.set(c,0,f),l.add(I);const G=Bn(new Gn(t.width,b),T);G.position.set(c,b/2,0),l.add(G);const W=Bn(new Gn(t.height,b),T);W.rotation.y=Math.PI/2,W.position.set(0,b/2,f),l.add(W);const V=Bn(new Gn(t.height,b),T);V.rotation.y=-Math.PI/2,V.position.set(t.width,b/2,f),l.add(V);const Z=Bn(new Gn(t.width,b),C);Z.rotation.y=Math.PI,Z.position.set(c,b/2,t.height),l.add(Z);const U=Bn(new Gn(t.width,t.height),N);U.rotation.x=Math.PI/2,U.position.set(c,b,f),l.add(U);const B=new at({color:15261909,roughness:.8}),k=(P,X,ne,z,q)=>{const ie=Bn(new ft(P,.09,X),B);ie.position.set(ne,z,q),l.add(ie)};k(t.width,.02,c,.045,.01),k(t.width,.02,c,.045,t.height-.01),k(.02,t.height,.01,.045,f),k(.02,t.height,t.width-.01,.045,f)}function A(I,G){if(t.polygon&&t.polygon.length>=3){const V=t.polygon;let Z=0;for(let k=0;k<V.length;k++){const[P,X]=V[k],[ne,z]=V[(k+1)%V.length];Z+=P*z-ne*X}const U=Z>0;let B={x:I,z:0,ry:0,dist:1/0};for(let k=0;k<V.length;k++){const[P,X]=V[k],[ne,z]=V[(k+1)%V.length],q=ne-P,ie=z-X,re=Math.sqrt(q*q+ie*ie);if(re<.01)continue;let de=((I-P)*q+(G-X)*ie)/(re*re);de=Math.max(0,Math.min(1,de));const ye=P+de*q,we=X+de*ie,F=Math.sqrt((I-ye)**2+(G-we)**2);if(F<B.dist){const Ue=U?-ie:ie,Fe=U?q:-q,Ee=Math.atan2(Ue,Fe);B={x:ye,z:we,ry:Ee,dist:F}}}return B}return[{x:I,z:0,ry:0,dist:G},{x:I,z:t.height,ry:Math.PI,dist:t.height-G},{x:0,z:G,ry:Math.PI/2,dist:I},{x:t.width,z:G,ry:-Math.PI/2,dist:t.width-I}].reduce((V,Z)=>V.dist<Z.dist?V:Z)}for(const I of e){const G=CT(I.color),W=I.width,V=I.height;if(VT(I)){const B=Math.max(W,V),k=IT(B);k.traverse(z=>{z.isMesh&&(z.castShadow=!0,z.receiveShadow=!0)});const P=I.x+W/2,X=I.y+V/2,ne=A(P,X);k.position.set(ne.x,1.1,ne.z),k.rotation.y=ne.ry,l.add(k);continue}if(I.type==="door"||I.type==="window"){const B=I.type==="door"?LT(Math.max(W,V)):DT(Math.max(W,V));B.traverse(z=>{z.isMesh&&(z.castShadow=!0,z.receiveShadow=!0)});const k=I.x+W/2,P=I.y+V/2,X=I.type==="window"?.9:0,ne=A(k,P);B.position.set(ne.x,X,ne.z),B.rotation.y=ne.ry,l.add(B);continue}if(I.type==="radar"){const ne=I.x+W/2,z=I.y+V/2,q=A(ne,z),ie=q.dist<.5;let re=q.ry;!ie&&q.dist>.3&&(V>W*1.2?re=ne<t.width/2?Math.PI/2:-Math.PI/2:W>V*1.2&&(re=z<t.height/2?0:Math.PI));const de=new Lt;de.position.set(ie?q.x:ne,0,ie?q.z:z),de.rotation.y=re;const ye=zT();ye.position.set(0,2.2,ie?.01:0),de.add(ye);const we=new Float32Array([-2,.004,0,2,.004,0,2,.004,4,-2,.004,4]),F=new tn;F.setAttribute("position",new $n(we,3)),F.setIndex([0,1,2,0,2,3]),F.computeVertexNormals();const Ue=new sa({color:9133302,transparent:!0,opacity:.1,side:Sn,depthWrite:!1});de.add(new je(F,Ue));const Fe=new hl({color:11571455,transparent:!0,opacity:.65}),Ee=Pe=>{const Ze=new tn().setFromPoints(Pe.map(([D,w,J])=>new H(D,w,J)));return new Au(Ze,Fe)};de.add(Ee([[-2,.008,0],[-2,.008,4]])),de.add(Ee([[2,.008,0],[2,.008,4]])),de.add(Ee([[-2,.008,4],[2,.008,4]])),de.add(Ee([[-2,.008,0],[2,.008,0]])),[1,2,3].forEach((Pe,Ze)=>{const D=new hl({color:10980346,transparent:!0,opacity:.3-Ze*.07}),w=new tn().setFromPoints([new H(-2,.006,Pe),new H(2,.006,Pe)]);de.add(new Au(w,D))});const Se=new hl({color:14202110,transparent:!0,opacity:.35}),ke=new tn().setFromPoints([new H(0,2.2,.05),new H(0,.01,2.2)]);de.add(new Au(ke,Se));const De=new Ud(10181046,.8,3.5);De.position.set(0,2.2,.15),de.add(De),l.add(de);continue}let Z;switch(I.type){case"bed":Z=RT(W,V,I.rotation);break;case"sofa":Z=PT(W,V,G);break;case"wardrobe":Z=OT(W,V);break;case"table":Z=NT(W,V);break;case"desk":Z=UT(W,V);break;case"chair":Z=FT(W,V,G);break;case"cabinet":Z=kT(W,V);break;case"person":Z=BT(G);break;default:Z=HT(W,V,G);break}const U=new Lt;U.position.set(I.x+W/2,0,I.y+V/2),I.type!=="bed"&&(U.rotation.y=-(I.rotation*Math.PI)/180),Z.position.set(0,0,-V/2),U.add(Z),U.traverse(B=>{B.isMesh&&(B.castShadow=!0,B.receiveShadow=!0)}),l.add(U)}let E;const L=()=>{E=requestAnimationFrame(L),p.update(),a.render(l,d)};L();const O=new ResizeObserver(()=>{const I=r.clientWidth,G=r.clientHeight;d.aspect=I/G,d.updateProjectionMatrix(),a.setSize(I,G)});return O.observe(r),()=>{cancelAnimationFrame(E),O.disconnect(),p.dispose(),a.dispose(),r.contains(a.domElement)&&r.removeChild(a.domElement)}},[e,t]),M.jsx("div",{style:{position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.88)",backdropFilter:"blur(6px)"},children:M.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",width:"96vw",height:"93vh",borderRadius:20,overflow:"hidden",border:"1px solid rgba(255,255,255,0.09)",boxShadow:"0 32px 80px rgba(0,0,0,0.7)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",flexShrink:0,background:"rgba(8,13,22,0.98)",borderBottom:"1px solid rgba(255,255,255,0.07)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[M.jsx("div",{style:{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14},children:"⬡"}),M.jsxs("div",{children:[M.jsx("p",{style:{margin:0,fontSize:13,fontWeight:700,color:"#f1f5f9"},children:"3D Room View"}),M.jsxs("p",{style:{margin:0,fontSize:10,color:"#475569"},children:[t.width,"m × ",t.height,"m · ",e.length," objects · drag to rotate · scroll to zoom"]})]})]}),M.jsx("button",{onClick:n,style:{padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:600,color:"#94a3b8",cursor:"pointer",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",transition:"all 0.15s"},onMouseEnter:r=>{r.currentTarget.style.color="#f1f5f9",r.currentTarget.style.background="rgba(255,255,255,0.1)"},onMouseLeave:r=>{r.currentTarget.style.color="#94a3b8",r.currentTarget.style.background="rgba(255,255,255,0.05)"},children:"✕ Close"})]}),M.jsx("div",{ref:i,style:{flex:1,width:"100%"}})]})})},WT=({onConfirm:t,onCancel:e,dark:n})=>{const[i,r]=Je.useState(""),[s,o]=Je.useState(""),a=n?"#0d1117":"#ffffff",l=n?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",c=n?"#e2e8f0":"#0f172a",f=n?"#64748b":"#94a3b8",h=n?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.03)",d=n?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)";return M.jsx("div",{style:{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)"},children:M.jsxs("div",{style:{background:a,border:`1px solid ${l}`,borderRadius:16,padding:24,width:340,boxShadow:"0 24px 48px rgba(0,0,0,0.4)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[M.jsx("div",{style:{width:36,height:36,borderRadius:10,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"📥"}),M.jsxs("div",{children:[M.jsx("p",{style:{fontSize:14,fontWeight:600,color:c,margin:0},children:"Export Config"}),M.jsx("p",{style:{fontSize:11,color:f,margin:0,marginTop:2},children:"Enter device details before downloading"})]})]}),[{label:"Board ID",value:i,set:r,placeholder:"e.g. kc2505p004",type:"text"},{label:"Location",value:s,set:o,placeholder:"e.g. room1",type:"text"}].map(({label:p,value:v,set:_,placeholder:m,type:u})=>M.jsxs("div",{style:{marginBottom:14},children:[M.jsx("label",{style:{display:"block",fontSize:11,fontWeight:500,color:f,marginBottom:5},children:p}),M.jsx("input",{type:u,value:v,placeholder:m,onChange:x=>_(x.target.value),style:{width:"100%",background:h,border:`1px solid ${d}`,borderRadius:8,padding:"8px 12px",fontSize:13,color:c,outline:"none",fontFamily:"monospace",boxSizing:"border-box"}})]},p)),(i||s)&&M.jsxs("div",{style:{background:n?"rgba(0,0,0,0.4)":"rgba(0,0,0,0.04)",border:`1px solid ${d}`,borderRadius:8,padding:"10px 12px",fontFamily:"monospace",fontSize:11,color:f,lineHeight:1.8,marginBottom:16},children:[M.jsx("span",{style:{color:n?"#475569":"#94a3b8"},children:'"device_configs":'})," ","{",M.jsx("br",{}),M.jsxs("span",{style:{marginLeft:12,color:"#86efac"},children:['"board": "',i||"…",'"']}),",",M.jsx("br",{}),M.jsxs("span",{style:{marginLeft:12,color:"#86efac"},children:['"location": "',s||"…",'"']}),M.jsx("br",{}),"}"]}),M.jsxs("div",{style:{display:"flex",gap:8},children:[M.jsx("button",{onClick:e,style:{flex:1,padding:"9px 0",borderRadius:9,border:`1px solid ${d}`,background:"transparent",color:f,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"},children:"Cancel"}),M.jsx("button",{disabled:!i.trim()||!s.trim(),onClick:()=>t(i.trim(),s.trim()),style:{flex:1,padding:"9px 0",borderRadius:9,border:"none",background:!i.trim()||!s.trim()?"#374151":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontSize:12,fontWeight:600,cursor:!i.trim()||!s.trim()?"not-allowed":"pointer",opacity:!i.trim()||!s.trim()?.5:1,fontFamily:"inherit"},children:"↓ Download JSON"})]})]})})};async function jT(t){return new Promise((e,n)=>{const i=URL.createObjectURL(t),r=new Image;r.onload=()=>{const s=document.createElement("canvas");s.width=r.naturalWidth,s.height=r.naturalHeight,s.getContext("2d").drawImage(r,0,0),URL.revokeObjectURL(i),s.toBlob(a=>a?e(a):n(new Error("Canvas toBlob failed")),"image/jpeg",.92)},r.onerror=()=>{URL.revokeObjectURL(i),n(new Error("Image failed to load — try exporting as PNG/JPG from Preview"))},r.src=i})}const XT={room:{name:"Room",width:5.2,height:4.64},objects:[{type:"radar",label:"Device",x:.05,y:1.55,width:.15,height:.15,rotation:0},{type:"bed",label:"Bed",x:1.065,y:3.65,width:1.32,height:.91,rotation:0},{type:"door",label:"Room Door",x:3.38,y:.8,width:.9,height:.15,rotation:90},{type:"custom",label:"Passage",x:3.45,y:0,width:1.75,height:2.14,rotation:0},{type:"door",label:"Bathroom Door",x:3.38,y:2.5,width:.8,height:.15,rotation:90},{type:"custom",label:"Bathroom",x:3.45,y:2.14,width:1.75,height:2.5,rotation:0},{type:"door",label:"Entry Door",x:5.05,y:.5,width:.9,height:.15,rotation:90}]},YT=({dark:t,onImport:e,onCancel:n})=>{const[i,r]=Je.useState(null),[s,o]=Je.useState(null),[a,l]=Je.useState(!1),[c,f]=Je.useState(null),[h,d]=Je.useState(!1),p=Je.useRef(null),v=Je.useRef(null),_=Je.useRef(null),m=t?"#0d1117":"#ffffff",u=t?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)",x=t?"#e2e8f0":"#0f172a",g=t?"#64748b":"#94a3b8",y=t?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)",b=t?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",T=O=>O.type==="application/pdf"||/\.pdf$/i.test(O.name),C=O=>/\.dxf$/i.test(O.name);function N(O){if(r(O),f(null),T(O)||C(O))o(null);else{const I=URL.createObjectURL(O);o(I)}}const A=Je.useCallback(O=>{O.preventDefault(),d(!1);const I=O.dataTransfer.files[0];I&&N(I)},[]);async function E(){if(i){l(!0),f(null);try{const O=new FormData,I="https://radar-room-backend-48694572795.us-central1.run.app";if(C(i)){O.append("file",i);const G=await fetch(`${I}/api/import-dxf`,{method:"POST",body:O});if(!G.ok){const V=await G.json().then(Z=>Z.detail).catch(()=>G.statusText);throw new Error(V)}const W=await G.json();W.rooms&&W.rooms.length>0&&e({rooms:W.rooms})}else if(T(i)){O.append("file",i);const G=await fetch(`${I}/api/import-metaroom`,{method:"POST",body:O});if(!G.ok){const V=await G.json().then(Z=>Z.detail).catch(()=>G.statusText);throw new Error(V)}const W=await G.json();W.rooms&&W.rooms.length>0&&e({rooms:W.rooms})}else{const G=await jT(i);O.append("file",new File([G],"upload.jpg",{type:"image/jpeg"}));const W=await fetch(`${I}/api/import-image`,{method:"POST",body:O});if(!W.ok){const Z=await W.json().then(U=>U.detail).catch(()=>W.statusText);throw new Error(Z)}const V=await W.json();e(V.rooms?V:{rooms:[V]})}}catch(O){console.error("Import error:",O),f(O.message??"Something went wrong")}finally{l(!1)}}}const L=(c==null?void 0:c.toLowerCase().includes("credit"))||(c==null?void 0:c.toLowerCase().includes("billing"));return M.jsxs("div",{style:{position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)"},children:[M.jsxs("div",{style:{background:m,border:`1px solid ${u}`,borderRadius:18,padding:26,width:420,maxWidth:"95vw",boxShadow:"0 32px 64px rgba(0,0,0,0.5)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20},children:[M.jsx("div",{style:{width:38,height:38,borderRadius:11,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18},children:"🗺"}),M.jsxs("div",{children:[M.jsx("p",{style:{fontSize:14,fontWeight:700,color:x,margin:0},children:"Import Floor Plan"}),M.jsx("p",{style:{fontSize:11,color:g,margin:0,marginTop:2},children:"Upload an image, Metaroom PDF, or DXF to extract the layout"})]}),M.jsx("button",{onClick:n,style:{marginLeft:"auto",width:26,height:26,borderRadius:7,background:"transparent",border:`1px solid ${y}`,cursor:"pointer",color:g,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"},children:"✕"})]}),M.jsxs("div",{style:{display:"flex",gap:8,marginBottom:10},children:[M.jsx("button",{onClick:()=>{var O;return(O=p.current)==null?void 0:O.click()},style:{flex:1,padding:"10px 0",borderRadius:10,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${y}`,background:b,color:x,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:7},children:"🖼 Browse Image"}),M.jsx("button",{onClick:()=>{var O;return(O=v.current)==null?void 0:O.click()},style:{flex:1,padding:"10px 0",borderRadius:10,cursor:"pointer",fontFamily:"inherit",border:"1px solid rgba(139,92,246,0.4)",background:"rgba(139,92,246,0.08)",color:"#a78bfa",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:7},children:"📄 Browse PDF"}),M.jsx("button",{onClick:()=>{var O;return(O=_.current)==null?void 0:O.click()},style:{flex:1,padding:"10px 0",borderRadius:10,cursor:"pointer",fontFamily:"inherit",border:"1px solid rgba(16,185,129,0.4)",background:"rgba(16,185,129,0.08)",color:"#34d399",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:7},children:"📐 Browse DXF"})]}),M.jsx("input",{ref:p,type:"file",accept:"image/*,.heic,.heif",style:{display:"none"},onChange:O=>{var G;const I=(G=O.target.files)==null?void 0:G[0];I&&N(I)}}),M.jsx("input",{ref:v,type:"file",accept:".pdf",style:{display:"none"},onChange:O=>{var G;const I=(G=O.target.files)==null?void 0:G[0];I&&N(I)}}),M.jsx("input",{ref:_,type:"file",accept:".dxf",style:{display:"none"},onChange:O=>{var G;const I=(G=O.target.files)==null?void 0:G[0];I&&N(I)}}),M.jsx("div",{onDrop:A,onDragOver:O=>{O.preventDefault(),d(!0)},onDragLeave:()=>d(!1),style:{border:`2px dashed ${h?"#6366f1":y}`,borderRadius:12,background:h?"rgba(99,102,241,0.08)":b,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:90,transition:"all 0.15s",overflow:"hidden",padding:8},children:s?M.jsx("img",{src:s,alt:"preview",style:{maxWidth:"100%",maxHeight:180,objectFit:"contain",display:"block"}}):i&&C(i)?M.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[M.jsx("div",{style:{fontSize:32},children:"📐"}),M.jsx("p",{style:{fontSize:12,fontWeight:600,color:"#34d399",margin:0},children:i.name}),M.jsxs("p",{style:{fontSize:10,color:g,margin:0},children:["DXF File · ",(i.size/1024).toFixed(0)," KB — ready to import"]})]}):i&&T(i)?M.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[M.jsx("div",{style:{fontSize:32},children:"📄"}),M.jsx("p",{style:{fontSize:12,fontWeight:600,color:"#a78bfa",margin:0},children:i.name}),M.jsxs("p",{style:{fontSize:10,color:g,margin:0},children:["Metaroom PDF · ",(i.size/1024).toFixed(0)," KB — ready to import"]})]}):M.jsx("p",{style:{fontSize:11,color:g,margin:0},children:"or drag & drop a file here"})}),c&&M.jsx("div",{style:{marginTop:12,padding:"10px 12px",borderRadius:9,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",color:"#f87171",fontSize:11,lineHeight:1.6},children:L?M.jsxs(M.Fragment,{children:["No API credits. Add credits at ",M.jsx("strong",{children:"console.anthropic.com/settings/billing"})," — or use the button below."]}):c}),a&&M.jsxs("div",{style:{marginTop:12,padding:"10px 12px",borderRadius:9,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",display:"flex",alignItems:"center",gap:10},children:[M.jsx("div",{style:{width:14,height:14,borderRadius:"50%",border:"2px solid #6366f1",borderTopColor:"transparent",animation:"spin 0.7s linear infinite",flexShrink:0}}),M.jsx("p",{style:{fontSize:12,color:"#818cf8",margin:0},children:i&&C(i)?"Parsing DXF file…":i&&T(i)?"Parsing Metaroom PDF…":"Claude is reading and placing every room & object…"})]}),M.jsxs("div",{style:{display:"flex",gap:8,marginTop:14},children:[M.jsx("button",{onClick:n,disabled:a,style:{flex:1,padding:"9px 0",borderRadius:9,border:`1px solid ${y}`,background:"transparent",color:g,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"},children:"Cancel"}),M.jsx("button",{onClick:E,disabled:!i||a,style:{flex:2,padding:"9px 0",borderRadius:9,border:"none",background:!i||a?t?"#1e293b":"#e2e8f0":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:!i||a?g:"#fff",fontSize:12,fontWeight:700,cursor:!i||a?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.15s"},children:a?i&&C(i)?"Parsing DXF…":i&&T(i)?"Parsing…":"Extracting…":"✦ Extract & Import"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,margin:"14px 0"},children:[M.jsx("div",{style:{flex:1,height:1,background:y}}),M.jsx("span",{style:{fontSize:10,color:g},children:"OR"}),M.jsx("div",{style:{flex:1,height:1,background:y}})]}),M.jsx("button",{onClick:()=>e(XT),style:{width:"100%",padding:"10px 0",borderRadius:10,border:"1px solid rgba(251,191,36,0.35)",background:"rgba(251,191,36,0.08)",color:"#f59e0b",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8},onMouseEnter:O=>{O.currentTarget.style.background="rgba(251,191,36,0.15)"},onMouseLeave:O=>{O.currentTarget.style.background="rgba(251,191,36,0.08)"},children:"✏️ Load your sketch directly (3.45×4.64m · Bed · Device · Passage · Bathroom)"})]}),M.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})};function ot(t,e,n,i,r,s,o,a=0){return{id:t,type:e,label:n,x:i,y:r,width:s,height:o,color:{bed:"#4299e1",door:"#fbd38d",window:"#90cdf4",chair:"#b794f4",table:"#ed8936",cabinet:"#f6e05e",wardrobe:"#fc8181",custom:"#718096",radar:"#a78bfa",sofa:"#48bb78",desk:"#4fd1c5",person:"#f6ad55"}[e]??"#718096",rotation:a,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0}}const $T=[{id:"room_002",label:"Sample 1",area:"8.57 m²",config:{name:"Room 002",width:2.91,height:2.95},objects:[ot("r2_radar","radar","Radar",.82,.1,.08,.08),ot("r2_tv","custom","Television",1.01,.05,.89,.08),ot("r2_bed","bed","Bed",.85,.3,1.22,2),ot("r2_sg","cabinet","Storage",.54,2.41,.46,.44),ot("r2_tbl","table","Table",1.52,2.37,.73,.5),ot("r2_d1","door","Door (upper)",0,.23,.1,1.18),ot("r2_d2","door","Door (lower)",0,1.63,.1,1.3),ot("r2_d3","door","Door (right)",2.81,1.19,.1,.76),ot("r2_win","window","Window",.54,2.87,1.7,.08)]},{id:"space_003",label:"Sample 2",area:"17.11 m²",config:{name:"Space 003",width:5.41,height:3.16},objects:[ot("s3_radar","radar","Radar",2.65,2.95,.08,.08),ot("s3_c1","chair","Chair",1.62,.15,.56,.56),ot("s3_c2","chair","Chair",3.55,.4,.67,.46,45),ot("s3_sg1","cabinet","Storage",4.66,.14,.61,.26),ot("s3_sg2","cabinet","Storage",4.87,1.15,.39,.55),ot("s3_tbl","table","Table",.14,1.88,1.22,.97),ot("s3_tv","custom","Television",2.23,3.06,.96,.1),ot("s3_d1","door","Door (left)",0,1.06,.1,1.05),ot("s3_d2","door","Door (top-L)",1.8,0,1.63,.1),ot("s3_d3","door","Door (top-R)",3.65,0,.92,.1),ot("s3_win","window","Window",5.31,1.22,.1,1.14)]},{id:"morris_bedroom",label:"Sample 3",area:"16.25 m²",config:{name:"Morris bedroom",width:5.763,height:3.523,polygon:[[0,0],[5.763,0],[5.763,3.523],[2.224,3.523],[2.224,1.725],[0,1.725]]},objects:[ot("mb_radar","radar","KC",2.224,1.871,.046,.234),ot("mb_bed","bed","Bed",3.69,1.249,2.072,1.631),ot("mb_tv","custom","Television",2.395,2.176,.08,.872),ot("mb_sg","cabinet","Storage",2.224,2.111,.518,.877),ot("mb_tbl","table","Table",4.933,2.952,.83,.571),ot("mb_d1","door","Door area",3.549,0,1.699,.25),ot("mb_w1","window","Window area",4.056,3.273,.814,.25),ot("mb_w2","window","Window area",3.14,3.273,.782,.25)]}];function mo(){return Math.random().toString(36).slice(2,10)}function qT(t,e,n,i){const r=t.find(u=>u.type==="radar"),s=r?r.x+r.width/2:0,o=r?r.y+r.height/2:0,{nx:a,ny:l}=r?q0(r,i):{nx:0,ny:-1},c=-l,f=a,h=t.filter(u=>u.type==="bed"||u.type==="door");let d=0;const p=h.map(u=>{const g=[[u.x,u.y],[u.x+u.width,u.y],[u.x,u.y+u.height],[u.x+u.width,u.y+u.height]].map(([O,I])=>{const G=O-s,W=I-o;return[+(G*c+W*f).toFixed(3),+(G*a+W*l).toFixed(3)]}),y=g.map(O=>O[0]),b=g.map(O=>O[1]),T=Math.min(...y),C=Math.max(...y),N=Math.min(...b),A=Math.max(...b),L={name:u.type==="door"?`door${++d}`:"bed",top_left:[T,A],top_right:[C,A],bottom_left:[T,N],bottom_right:[C,N],margin_top:u.marginTop??0,margin_bottom:u.marginBottom??0,margin_left:u.marginLeft??0,margin_right:u.marginRight??0};return u.type==="bed"&&(L.top_height=.5,L.bottom_height=.5,L.right_width=.5,L.left_width=.5),L}),v=p.map(u=>u.name),_=v.filter(u=>u==="bed"),m=v.filter(u=>u.startsWith("door"));return{device_configs:{board:e,location:n},objects:p,state_machine:{objects:v},out_of_room_alerts:{objects:m},out_of_bed_alerts:{objects:_},"on_bed-toss":{objects:_},journey_mapping_time_taken:{objects:v},state_machine_v2:{objects:_},state_machine_flickering:{objects:_},near_edge_alerts:{objects:_}}}function KT(){return $T.map(t=>({id:t.id,label:t.label,area:t.area,room:{...t.config},objects:t.objects.map(e=>({...e})),selectedId:null,adjacentRooms:[]}))}function ZT(){const[t,e]=Je.useState(KT),[n,i]=Je.useState(0),[r,s]=Je.useState(!1),[o,a]=Je.useState(!1),[l,c]=Je.useState(!1),[f,h]=Je.useState(!0);function d(B){e(k=>k.map((P,X)=>X===n?{...P,...B}:P))}const p=t[n],{room:v,objects:_,selectedId:m,adjacentRooms:u}=p,x=_.find(B=>B.id===m)??null,g=_.find(B=>B.type==="radar")??null;function y(B){const k=Ps[B],P={id:mo(),type:B,label:k.label,x:Math.max(0,(v.width-k.defaultWidth)/2),y:Math.max(0,(v.height-k.defaultHeight)/2),width:k.defaultWidth,height:k.defaultHeight,color:k.color,rotation:0,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0};d({objects:[..._,P],selectedId:P.id})}function b(B,k){d({objects:_.map(P=>P.id===B?{...P,...k}:P)})}function T(B){d({objects:_.filter(k=>k.id!==B),adjacentRooms:u.filter(k=>k.doorId!==B),selectedId:null})}function C(B){return(B??[]).map(k=>{const P=k.type in Ps?k.type:"custom",X=Ps[P];return{id:mo(),type:P,label:k.label??X.label,x:+(k.x??0),y:+(k.y??0),width:+(k.width??X.defaultWidth),height:+(k.height??X.defaultHeight),color:X.color,rotation:k.rotation??0,marginTop:+(k.marginTop??0),marginBottom:+(k.marginBottom??0),marginLeft:+(k.marginLeft??0),marginRight:+(k.marginRight??0)}})}function N(B){if(B.rooms&&Array.isArray(B.rooms)){const k=B.rooms.map(P=>{const X=+(P.room.width??4),ne=+(P.room.height??4),z=(X*ne).toFixed(2)+" m²";return{id:mo(),label:P.room.name??"Imported Room",area:z,room:{name:P.room.name,width:X,height:ne,polygon:P.room.polygon},objects:C(P.objects),selectedId:null,adjacentRooms:[]}});e(P=>{const X=[...P,...k];return i(X.length-1),X}),c(!1);return}d({room:{name:B.room.name,width:B.room.width,height:B.room.height},objects:C(B.objects),selectedId:null,adjacentRooms:[]}),c(!1),s(!0)}function A(B,k,P,X,ne){const z=ne==="bathroom"?"Bathroom":ne==="passage"?"Passage":"Room",q={id:mo(),doorId:B,wall:k,name:z,roomType:ne,width:P,height:X};d({adjacentRooms:[...u,q]})}function E(B,k){d({adjacentRooms:u.map(P=>P.id===B?{...P,...k}:P)})}function L(B){d({adjacentRooms:u.filter(k=>k.id!==B)})}function O(B,k){a(!1);const P=qT(_,B,k,v),X=new Blob([JSON.stringify(P,null,2)],{type:"application/json"}),ne=URL.createObjectURL(X),z=document.createElement("a");z.href=ne,z.download=`${B}_${p.label.replace(/\s+/g,"_")}_config.json`,z.click(),URL.revokeObjectURL(ne)}function I(){const B=t.length+1,k={id:mo(),label:`Room ${String(B).padStart(3,"0")}`,area:"0 m²",room:{name:`Room ${B}`,width:4,height:4},objects:[],selectedId:null,adjacentRooms:[]};e(P=>[...P,k]),i(t.length)}function G(B){if(t.length===1)return;const k=t.filter((P,X)=>X!==B);e(k),i(Math.min(n,k.length-1))}function W(){const B=!f;h(B),document.documentElement.classList.toggle("dark",B)}const V=f?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)",Z=f?"rgba(13,17,23,0.97)":"rgba(255,255,255,0.97)",U=f?"#475569":"#94a3b8";return M.jsxs("div",{className:`flex flex-col h-screen overflow-hidden ${f?"dark":""}`,style:{background:f?"#0d1117":"#f8fafc",color:f?"#e2e8f0":"#0f172a"},children:[M.jsx("div",{className:"h-[2px] shrink-0",style:{background:"linear-gradient(90deg, #c8506b, #a03050, #c8506b)"}}),M.jsxs("header",{style:{background:Z,borderBottom:`1px solid ${V}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",height:52,flexShrink:0},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[M.jsx("div",{style:{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#c8506b,#a03050)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(200,80,107,0.45)",flexShrink:0},children:M.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",children:[M.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",fill:"rgba(255,255,255,0.15)"}),M.jsx("path",{d:"M8 8h3v8H8zM13 8h3v4h-3zM13 14h3v2h-3z",fill:"white"})]})}),M.jsxs("div",{children:[M.jsxs("p",{style:{margin:0,fontSize:14,fontWeight:700,letterSpacing:"-0.01em",color:f?"#f1f5f9":"#0f172a",fontFamily:"'Sora', sans-serif"},children:["Kubocare ",M.jsx("span",{style:{color:"#c8506b"},children:"Room Config"})]}),M.jsxs("p",{style:{margin:0,fontSize:10,color:U},children:[p.label," · ",_.length," objects · ",v.width," × ",v.height," m"]})]})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[M.jsx("button",{onClick:W,style:{width:32,height:32,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer",background:f?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",border:`1px solid ${V}`,transition:"all 0.15s"},children:f?"☀️":"🌙"}),_.length>0&&M.jsx("button",{onClick:()=>{window.confirm(`Clear all objects in ${p.label}?`)&&d({objects:[],selectedId:null})},style:{padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:500,color:U,cursor:"pointer",background:"transparent",border:`1px solid ${V}`,transition:"all 0.15s"},onMouseEnter:B=>{B.currentTarget.style.color="#f87171",B.currentTarget.style.borderColor="rgba(248,113,113,0.4)"},onMouseLeave:B=>{B.currentTarget.style.color=U,B.currentTarget.style.borderColor=V},children:"Clear"}),M.jsx("button",{onClick:()=>c(!0),style:{display:"flex",alignItems:"center",gap:5,padding:"5px 13px",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",background:f?"rgba(16,185,129,0.1)":"rgba(16,185,129,0.08)",color:"#10b981",border:"1px solid rgba(16,185,129,0.25)",transition:"all 0.15s"},children:"🗺 Import"}),M.jsx("button",{onClick:()=>s(!0),disabled:_.length===0,style:{display:"flex",alignItems:"center",gap:5,padding:"5px 13px",borderRadius:8,fontSize:11,fontWeight:600,cursor:_.length===0?"not-allowed":"pointer",opacity:_.length===0?.35:1,background:f?"rgba(6,182,212,0.1)":"rgba(6,182,212,0.08)",color:"#06b6d4",border:"1px solid rgba(6,182,212,0.25)",transition:"all 0.15s"},children:"⬡ 3D"}),M.jsx("button",{onClick:()=>a(!0),disabled:_.length===0,style:{display:"flex",alignItems:"center",gap:5,padding:"5px 16px",borderRadius:8,fontSize:11,fontWeight:700,cursor:_.length===0?"not-allowed":"pointer",opacity:_.length===0?.35:1,color:"#fff",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",boxShadow:_.length>0?"0 2px 12px rgba(99,102,241,0.45)":"none",border:"none",transition:"all 0.15s"},children:"↓ Export"})]})]}),M.jsxs("div",{style:{display:"flex",alignItems:"stretch",padding:"0 16px",background:Z,borderBottom:`1px solid ${V}`,flexShrink:0,overflowX:"auto",gap:4},children:[t.map((B,k)=>{const P=k===n;return M.jsxs("div",{style:{display:"flex",alignItems:"center",height:40,borderBottom:P?"2px solid #6366f1":"2px solid transparent",background:P?f?"rgba(99,102,241,0.1)":"rgba(99,102,241,0.07)":"transparent",borderRadius:"6px 6px 0 0",transition:"all 0.15s",flexShrink:0,cursor:"pointer"},onMouseEnter:X=>{P||(X.currentTarget.style.background=f?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.03)")},onMouseLeave:X=>{P||(X.currentTarget.style.background="transparent")},onClick:()=>i(k),children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,padding:"0 8px 0 14px"},children:[M.jsx("span",{style:{width:6,height:6,borderRadius:"50%",flexShrink:0,background:P?"#818cf8":f?"#334155":"#cbd5e1",boxShadow:P?"0 0 6px #6366f1":"none",transition:"all 0.15s"}}),M.jsx("span",{style:{fontSize:12,fontWeight:P?700:500,color:P?f?"#a5b4fc":"#4f46e5":U,whiteSpace:"nowrap"},children:B.label}),M.jsx("span",{style:{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:99,background:P?"rgba(99,102,241,0.2)":f?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",color:P?"#818cf8":U},children:B.objects.length})]}),t.length>1&&M.jsx("button",{onClick:X=>{X.stopPropagation(),G(k)},style:{width:18,height:18,marginRight:6,borderRadius:4,border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:P?"#94a3b8":U,flexShrink:0,transition:"all 0.12s"},onMouseEnter:X=>{X.currentTarget.style.background="rgba(248,113,113,0.18)",X.currentTarget.style.color="#f87171"},onMouseLeave:X=>{X.currentTarget.style.background="transparent",X.currentTarget.style.color=P?"#94a3b8":U},children:"✕"})]},B.id)}),M.jsx("button",{onClick:I,style:{height:40,padding:"0 12px",border:"none",background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:U,flexShrink:0,transition:"all 0.15s",borderBottom:"2px solid transparent"},onMouseEnter:B=>{B.currentTarget.style.color="#818cf8",B.currentTarget.style.background=f?"rgba(99,102,241,0.08)":"rgba(99,102,241,0.06)"},onMouseLeave:B=>{B.currentTarget.style.color=U,B.currentTarget.style.background="transparent"},title:"Add new room tab",children:"+"})]}),M.jsxs("div",{className:"flex flex-1 overflow-hidden",children:[M.jsx(Ry,{room:v,onRoomChange:B=>d({room:B}),onAdd:y,dark:f}),M.jsx("main",{className:"flex-1 relative overflow-hidden",children:M.jsx(Ay,{room:v,objects:_,selectedId:m,onSelect:B=>d({selectedId:B}),onUpdate:b,dark:f,adjacentRooms:u,radarObj:g},p.id)}),M.jsx(Py,{object:x,objects:_,room:v,dark:f,onUpdate:B=>m&&b(m,B),onDelete:()=>m&&T(m),onDeselect:()=>d({selectedId:null}),adjacentRooms:u,onAddAdjacentRoom:A,onUpdateAdjacentRoom:E,onRemoveAdjacentRoom:L,radarObj:g})]}),r&&M.jsx(GT,{room:v,objects:_,onClose:()=>s(!1)}),l&&M.jsx(YT,{dark:f,onImport:N,onCancel:()=>c(!1)}),o&&M.jsx(WT,{dark:f,onConfirm:O,onCancel:()=>a(!1)})]})}Iu.createRoot(document.getElementById("root")).render(M.jsx(ix.StrictMode,{children:M.jsx(ZT,{})}));
