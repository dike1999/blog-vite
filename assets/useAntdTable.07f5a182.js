var W=Object.defineProperty;var I=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var T=(e,t,a)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,k=(e,t)=>{for(var a in t||(t={}))$.call(t,a)&&T(e,a,t[a]);if(I)for(var a of I(t))M.call(t,a)&&T(e,a,t[a]);return e};import{r as o,n as R,o as A,p as H,q as D,v as w,K as E,w as J,C as _,x as F,W as G,y as V,z as q,D as B,s as Q}from"./index.5e1275c5.js";var K=o.exports.forwardRef(function(e,t){var a,n=e.prefixCls,r=n===void 0?"rc-switch":n,i=e.className,C=e.checked,S=e.defaultChecked,s=e.disabled,x=e.loadingIcon,h=e.checkedChildren,v=e.unCheckedChildren,m=e.onClick,b=e.onChange,l=e.onKeyDown,c=R(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),d=A(!1,{value:C,defaultValue:S}),p=H(d,2),g=p[0],y=p[1];function f(u,O){var z=g;return s||(z=u,y(z),b==null||b(z,O)),z}function L(u){u.which===E.LEFT?f(!1,u):u.which===E.RIGHT&&f(!0,u),l==null||l(u)}function N(u){var O=f(!g,u);m==null||m(O,u)}var j=D(r,i,(a={},w(a,"".concat(r,"-checked"),g),w(a,"".concat(r,"-disabled"),s),a));return o.exports.createElement("button",Object.assign({},c,{type:"button",role:"switch","aria-checked":g,disabled:s,className:j,ref:t,onKeyDown:L,onClick:N}),x,o.exports.createElement("span",{className:"".concat(r,"-inner")},g?h:v))});K.displayName="Switch";var U=globalThis&&globalThis.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]]);return a},P=o.exports.forwardRef(function(e,t){var a,n=e.prefixCls,r=e.size,i=e.loading,C=e.className,S=C===void 0?"":C,s=e.disabled,x=U(e,["prefixCls","size","loading","className","disabled"]);J("checked"in x||!("value"in x),"Switch","`value` is not a valid prop, do you mean `checked`?");var h=o.exports.useContext(_),v=h.getPrefixCls,m=h.direction,b=o.exports.useContext(F),l=v("switch",n),c=o.exports.createElement("div",{className:"".concat(l,"-handle")},i&&o.exports.createElement(q,{className:"".concat(l,"-loading-icon")})),d=D((a={},w(a,"".concat(l,"-small"),(r||b)==="small"),w(a,"".concat(l,"-loading"),i),w(a,"".concat(l,"-rtl"),m==="rtl"),a),S);return o.exports.createElement(G,{insertExtraNode:!0},o.exports.createElement(K,V({},x,{prefixCls:l,className:d,disabled:s||i,ref:t,loadingIcon:c})))});P.__ANT_SWITCH=!0;P.displayName="Switch";var Z=P;function ee({requestUrl:e="",queryParams:t=null,columns:a=[],isAdmin:n=!0}){const[r,i]=o.exports.useState(!1),[C,S]=o.exports.useState([]),[s,x]=o.exports.useState({current:1,pageSize:10,totoal:0});function h(c){const d=k(k({page:s.current,pageSize:s.pageSize},t),c);Q.get(e,{params:d}).then(p=>{const{page:g,pageSize:y}=d,{count:f,rows:L}=p;if(f>0&&f>y){const N=Math.ceil(f/y);if(N<g)return h({page:N})}return s.current=g,s.total=f,x(k({},s)),S(L),i(!1),!0}).catch(p=>{console.log("fetchDataList error: ",d,p),i(!1)})}async function v(c){i(!0),h(c)}B(v);async function m(c){try{i(!0),await c(),h()}catch(d){console.log("updateList error: ",d),i(!1)}}function b(c,d,p){JSON.stringify(d)==="{}"&&JSON.stringify(p)==="{}"&&v({page:c.current})}function l(c){v(k({page:1},c))}return{tableProps:{className:n?"admin-table":"",rowKey:"id",loading:r,columns:a,dataSource:C,pagination:{current:s.current,pageSize:s.pageSize,total:s.total,showTotal:c=>`\u5171 ${c} \u6761`},onChange:b},dataList:C,updateList:o.exports.useCallback(m,[s,t]),onSearch:o.exports.useCallback(l,[s,t]),setLoading:o.exports.useCallback(i,[])}}export{Z as S,ee as u};
