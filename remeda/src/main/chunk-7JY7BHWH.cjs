"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var T={asc:(r,n)=>r>n,desc:(r,n)=>r<n};function m(r,n){let[e,...o]=n;if(!s(e)){let t=u(...o);return r(e,t)}let a=u(e,...o);return t=>r(t,a)}function R(r,[n,e,...o]){let a,t;return s(e)?(a=n,t=[e,...o]):(a=e,t=[n,...o]),m((...i)=>r(...i,a),t)}function u(r,n,...e){let o=typeof r=="function"?r:r[0],a=typeof r=="function"?"asc":r[1],{[a]:t}=T,i=n===void 0?void 0:u(n,...e);return(y,c)=>{let l=o(y),p=o(c);return t(l,p)?1:t(p,l)?-1:_nullishCoalesce(_optionalChain([i, 'optionalCall', _ => _(y,c)]), () => (0))}}function s(r){if(d(r))return!0;if(typeof r!="object"||!Array.isArray(r))return!1;let[n,e,...o]=r;return d(n)&&typeof e=="string"&&e in T&&o.length===0}var d=r=>typeof r=="function"&&r.length===1;exports.a = m; exports.b = R;