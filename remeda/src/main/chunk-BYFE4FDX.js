import{a as y}from"./chunk-IEE7G5JG.js";import{a as o,c as a}from"./chunk-ANXBDSUI.js";function d(...e){return y(f,e)}function f(e){if(e.length===0)return a;let n=new Map;for(let r of e)n.set(r,(n.get(r)??0)+1);return r=>{let t=n.get(r);return t===void 0||t===0?{done:!1,hasNext:!0,next:r}:(n.set(r,t-1),o)}}export{d as a};
