function l(n,t){if(t<n)throw new RangeError(`randomBigInt: The range [${n.toString()},${t.toString()}] is empty.`);let e=t-n,{length:r}=e.toString(2),o=Math.ceil(r/8),a=BigInt(8-r%8);for(;;){let s=c(o),i=g(s)>>a;if(i<=e)return i+n}}function g(n){let t=0n;for(let e of n)t=(t<<8n)+BigInt(e);return t}function c(n){let t=new Uint8Array(n);if(typeof crypto>"u")for(let e=0;e<n;e+=1)t[e]=Math.floor(Math.random()*256);else crypto.getRandomValues(t);return t}export{l as a};
