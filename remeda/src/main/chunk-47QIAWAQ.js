import{a as d}from"./chunk-DH3BPT6T.js";import{a as u}from"./chunk-ENXBNJ36.js";function T(n,e){for(let r=Math.floor(n.length/2)-1;r>=0;r--)c(n,r,e)}function m(n,e,r){if(!u(n,1))return;let[t]=n;if(!(e(r,t)>=0))return n[0]=r,c(n,0,e),t}function c(n,e,r){let t=e;for(;t*2+1<n.length;){let i=t*2+1,o=r(n[t],n[i])<0?i:t,f=i+1;if(f<n.length&&r(n[o],n[f])<0&&(o=f),o===t)return;d(n,t,o),t=o}}export{T as a,m as b};