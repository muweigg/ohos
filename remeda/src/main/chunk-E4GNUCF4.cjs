"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _chunkZS4KPRNNcjs = require('./chunk-ZS4KPRNN.cjs');var _chunk7JY7BHWHcjs = require('./chunk-7JY7BHWH.cjs');function s(...r){return _chunk7JY7BHWHcjs.b.call(void 0, p,r)}function p(r,t,e){if(e<=0)return[];if(e>=r.length)return[...r];let n=r.slice(0,e);_chunkZS4KPRNNcjs.a.call(void 0, n,t);let u=r.slice(e);for(let i of u)_chunkZS4KPRNNcjs.b.call(void 0, n,t,i);return n}exports.a = s;