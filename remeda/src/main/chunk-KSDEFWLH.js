import{a as r}from"./chunk-RAAYCPUM.js";function c(...e){return r(u,e)}function u(e,n){if(e===n||Object.is(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;if(e instanceof Map&&n instanceof Map)return s(e,n);if(e instanceof Set&&n instanceof Set)return f(e,n);let t=Object.keys(e);if(t.length!==Object.keys(n).length)return!1;for(let o of t){if(!Object.hasOwn(n,o))return!1;let{[o]:l}=e,{[o]:a}=n;if(l!==a||!Object.is(l,a))return!1}return!0}function s(e,n){if(e.size!==n.size)return!1;for(let[t,o]of e){let l=n.get(t);if(o!==l||!Object.is(o,l))return!1}return!0}function f(e,n){if(e.size!==n.size)return!1;for(let t of e)if(!n.has(t))return!1;return!0}export{c as a};