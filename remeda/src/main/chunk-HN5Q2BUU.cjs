"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _chunk4CZEVLYKcjs = require('./chunk-4CZEVLYK.cjs');function o(...e){return _chunk4CZEVLYKcjs.a.call(void 0, s,e)}function s(e,n){if(n<1)throw new RangeError(`chunk: A chunk size of '${n.toString()}' would result in an infinite array`);if(e.length===0)return[];if(n>=e.length)return[[...e]];let i=Math.ceil(e.length/n),u=new Array(i);if(n===1)for(let[r,t]of e.entries())u[r]=[t];else for(let r=0;r<i;r+=1){let t=r*n;u[r]=e.slice(t,t+n)}return u}exports.a = o;
