var n=/^(?:\.?(?<propName>[^.[\]]+)|\[(?<index>.+?)\])(?<rest>.*)$/u;function r(t){if(t.length===0)return[];let e=n.exec(t);return e?.groups===void 0?[t]:[e.groups.index??e.groups.propName,...r(e.groups.rest)]}export{r as a};