var wndw=window, w=wndw,W=Window, doc=document;
w.debg=console.log,w.info=console.info,w.warn=console.warn,w.err=console.error,w.lS=localStorage;
Object.assign(Window.prototype,{
	mean_val(a,b){return(a+b)/2},
	toggleAtt(el,a){el.hasAttribute(a)?el.removeAttribute(a):el.setAttribute(a,'')},
	rmAtt(el,a){el.removeAttribute(a)},
	addAtt(el,a,v){if(!el.hasAttribute(a))el.setAttribute(a,v)},
	formatTime(s){s|=0;var h=s/3600|0,m=s/60%60|0,z=s%60,p=n=>(n<10?'0':'')+n;return(h?p(h)+':':'')+p(m)+':'+p(z)}
});
w.fT=W.prototype.formatTime;
(function(){if(!Object.prototype.isEmpty){Object.defineProperty(Object.prototype, 'isEmpty',{value:function(){return Object.keys(this).length===0},enumerable:false,configurable:true,writable:true})}})();
Object.assign(String.prototype,{
	capitalize(){return this.split(/[_-]/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')},
	format(){return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(m, n){if(m==="{{"){ return "{"; }if(m==="}}"){ return "}"}return arguments[n]})}}
);
const att=(el,a)=>{return el?.getAttribute(a)},
hasAtt=(el,a)=>{return el?.hasAttribute(a)},
hasAttStartWith=(el,p)=>{for(let a of el.attributes){if(a.name.startsWith(p))return true}return false},
updateAtts=(el,nAtts)=>{for(var [a,v] of Object.entries(nAtts))el.setAttribute(a,v)},
uAtts=updateAtts,
findEls=(el,s)=>{return typeof el==='string'?doc.querySelectorAll(el):el?.querySelectorAll(s)},
findEl=(el,s)=>{return typeof el==='string'?doc.querySelector(el):el.querySelector(s)},
setAtt=(el,a,v)=>{if(el&&typeof el.setAttribute==='function'&&el instanceof Element)return el?.setAttribute(a,v)},
setAtts=(el,obj)=>{Object.entries(obj).forEach(([k,v])=>{el.setAttribute(k,v)})},
setAttsX=(el,obj)=>{
	Object.entries(obj).forEach(([k,v])=>{
		const o3d=el.object3D, cmp=el.components;
		if(o3d&&(new Set(['position', 'rotation', 'scale']).has(k))){const target=o3d[k];if(target&&typeof v==='object'){Object.entries(v).forEach(([axis, val])=>{if(axis in target)target[axis]=val})}return}
		if(k==='material'){const m=el.getObject3D&&el.getObject3D('mesh');if(m&&m.material&&typeof v==='object'){if('map' in v){m.material.map=v.map;m.material.needsUpdate=true}Object.entries(v).forEach(([prop, val])=>{if(prop !=='map'&&prop in m.material){if(m.material[prop] instanceof THREE.Color&&typeof val==='string'){m.material[prop].set(val)} else{m.material[prop]=val}m.material.needsUpdate=true}});return}}
		if(k==='geometry'&&cmp.geometry&&typeof v==='object'){Object.entries(v).forEach(([prop, val])=>{if(cmp.geometry.data[prop] !==val){cmp.geometry.data[prop]=val;cmp.geometry.updateProperties()}});return}
		if(k==='class'&&typeof v==='string'){el.className=v;return}
		if(k==='style'&&typeof v==='object'){Object.assign(el.style,v);return}
		el.setAttribute(k,v)
	})
},
on=(el,evt,fn,opt)=>{if(!el)return;if(el.addEventListener){el.addEventListener(evt,fn,opt);setAtt(el,'data-has-listener','1')}},
off=(el,evt,fn,opt)=>{if(!el)return;if(el.removeEventListener){el.removeEventListener(evt,fn,opt);rmAtt(el,'data-has-listener','1')}},
createEl=(t,d=doc)=>{return d.createElement(t)},
copyArray=(a,b)=>{var i;a.length=b.length;for(i=0;i<b.length;i++){a[i]=b[i]}},/** Copy contents of an array to another without allocating new array. (no deep copying, because always deepCopy alocates new memory address for nested objects/arrays)*/
get_a_r=(el)=>{if(!el){return w.innerWidth/w.innerHeight}return el.offsetWidth/el.offsetHeight};

w.showEl=el=>{if(!el?.classList)return;el.classList.remove("hidden");if(getComputedStyle(el).display=="none")el.style.removeProperty("display")}
w.showEls=els=>{els.forEach(el=>{w.showEl(el)})}
w.hideEl=el=>{if(!el?.classList)return;el.classList.add("hidden")}
w.hideEls=els=>{els.forEach(el=>{w.hideEl(el)})}
w.toggleShow=elOrEls=>{let t=el=>{if(!el?.classList)return;if(el.classList.contains("hidden")||getComputedStyle(el).display=="none")w.showEl(el);else w.hideEl(el)};(elOrEls instanceof NodeList||Array.isArray(elOrEls)?elOrEls:[elOrEls]).forEach(t)}

escapeHTML=str=>{return str?.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")}
(()=>{
	toClsSfx=i=> i.toFixed(1).replace('.0','').replace(/\./g,'\\.');
	cCS=(prf='')=>{let css='';for(let i=0.5;i<=12;i+=0.5){let cls=prf+'col'+toClsSfx(i);css+=`.`+cls+`{width:${(i/12)*100}%}`}return css}
	cMobileOverride=()=>{let clsList=[];for(let i=0.5;i<=12;i +=0.5){let sfx=toClsSfx(i);clsList.push(`.col${sfx}`,`.tab_col${sfx}`,`.desk_col${sfx}`)}return `${clsList.join(',')}{width:100%}`}
	cMobCols=()=>{let css='';for(let i=0.5; i <=12; i +=0.5){let cls='mob_col'+toClsSfx(i);css+=`.${cls}{width:${(i/12)*100}%}`}return css}
	cS=createEl('style');
	cS.textContent=`${cCS()}@media(min-width:1441px){${cCS('desk_')}}@media(min-width:481px)and(max-width:992px){${cCS('tab_')}}@media(max-width:480px){${cMobileOverride()}${cMobCols()}}@media print{${cCS('prnt_')}}`;
	cS.id='cols_styles';
	doc.head.appendChild(cS);
})();
