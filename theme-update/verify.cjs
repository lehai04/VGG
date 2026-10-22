const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/theme.js', 'utf8');
function setup(saved, dark, blocked=false) {
  const events={}, win={}, root={dataset:{}}, system={matches:dark,addEventListener:(k,f)=>system.change=f};
  let button;
  const storage={getItem:()=>{if(blocked)throw Error();return saved;},setItem:(k,v)=>{if(blocked)throw Error();saved=v;}};
  vm.runInNewContext(source,{document:{documentElement:root,addEventListener:(k,f)=>events[k]=f,createElement:()=>button={setAttribute(k,v){this[k]=v;},addEventListener(k,f){this[k]=f;}},body:{appendChild(){}}},window:{matchMedia:()=>system,addEventListener:(k,f)=>win[k]=f},localStorage:storage});
  events.DOMContentLoaded();
  return {root,button,system,win,saved:()=>saved};
}
let a=setup(null,true); assert.equal(a.root.dataset.theme,'dark');
a.button.click(); assert.equal(a.root.dataset.theme,'light'); assert.equal(a.saved(),'light'); assert.equal(a.button['aria-pressed'],'false');
a.system.matches=true; a.system.change(); assert.equal(a.root.dataset.theme,'light');
assert.equal(setup(a.saved(),true).root.dataset.theme,'light');
a.win.storage({key:'masterTechAcademy.theme',newValue:'dark'}); assert.equal(a.root.dataset.theme,'dark');
a.win.storage({key:null,newValue:null}); assert.equal(a.root.dataset.theme,'dark');
let b=setup('invalid',false); assert.equal(b.root.dataset.theme,'light'); b.system.matches=true;b.system.change();assert.equal(b.root.dataset.theme,'dark');
let c=setup(null,false,true);c.button.click();assert.equal(c.root.dataset.theme,'dark');
console.log('PASS: system preference, toggle, persistence, reload, cross-tab sync, invalid/blocked storage.');
