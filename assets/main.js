/* Μιχάλης Μερκούρης — portfolio · v5 (multi-page) */
(()=>{
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const root=document.documentElement, body=document.body;
const PAGES=[
  {file:'index.html',t:'Αρχική'},{file:'about.html',t:'Σχετικά'},{file:'services.html',t:'Υπηρεσίες'},
  {file:'work.html',t:'Έργα'},{file:'contact.html',t:'Επικοινωνία'}
];
const N=PAGES.length, cur=+body.dataset.page||0;
const EASE='cubic-bezier(.76,0,.24,1)', EASE2='cubic-bezier(.22,.8,.12,1)';
const ss={get(k){try{return JSON.parse(sessionStorage.getItem(k)||'null')}catch(e){return null}},
          set(k,v){try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}},
          del(k){try{sessionStorage.removeItem(k)}catch(e){}}};
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const sun='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const moon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';

/* ---------- theme ---------- */
let theme='dark'; try{theme=localStorage.getItem('mm-theme')||'dark'}catch(e){}
const applyTheme=()=>{root.dataset.scheme=theme;$$('.themeb').forEach(b=>{
  const ic=theme==='dark'?sun:moon;
  if(b.classList.contains('nb')){b.querySelector('.ti').innerHTML=ic;const sv=b.querySelector('.ti svg');sv.setAttribute('style','width:20px;height:20px;margin-left:14px;position:relative;z-index:2');b.querySelector('.lbl').textContent=theme==='dark'?'Light mode':'Dark mode'}
  else b.innerHTML=ic;
})};
applyTheme();
$$('.themeb').forEach(b=>b.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('mm-theme',theme)}catch(e){};applyTheme()}));

/* ---------- clock + greeting ---------- */
const fmt=new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Athens',hour:'2-digit',minute:'2-digit',hour12:false});
const days={Sun:'Κυριακή',Mon:'Δευτέρα',Tue:'Τρίτη',Wed:'Τετάρτη',Thu:'Πέμπτη',Fri:'Παρασκευή',Sat:'Σάββατο'};
const wdf=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Athens',weekday:'short'});
const tick=()=>{const now=new Date(),clk=$('#clk'),g=$('#greet');if(clk)clk.textContent=fmt.format(now);
  if(g){const w=wdf.format(now);g.textContent=w==='Sat'?'Να έχετε ένα όμορφο Σάββατο':'Να έχετε μια όμορφη '+days[w]}};
tick(); setInterval(tick,15000);

/* ---------- home: split name, build card ---------- */
$$('[data-split]').forEach(el=>{
  const txt=el.textContent; el.textContent='';
  [...txt].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;s.setAttribute('aria-hidden','true');el.appendChild(s)});
  if(el.classList.contains('o')){const d=document.createElement('span');d.className='dot';d.textContent='.';d.setAttribute('aria-hidden','true');el.appendChild(d)}
});
const cv=$('#cv');
if(cv){const sel=$('#sel'),cursorEl=$('#cur'),tgs=$$('[data-tg]',cv);let ti=1;
  const mv=()=>{const t=tgs[ti%tgs.length];if(!t.offsetWidth)return;
    const x=t.offsetLeft-6,y=t.offsetTop-6,w=t.offsetWidth+12,h=t.offsetHeight+12;
    Object.assign(sel.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
    $('#sel-l').textContent=t.dataset.tg;cursorEl.style.transform=`translate(${x+w-8}px,${y+h-6}px)`;ti++};
  mv(); setInterval(mv,2300);}

/* ---------- work: projects (demo) ---------- */
const P=[
 {t:'Theater Labs',c:'Web Design · WordPress',y:'2026',a:'a1',url:'https://theaterlabs.gr',
  d:'Νέα ιστοσελίδα για τα θεατρικά εργαστήρια Theater Labs, με έμφαση στα τμήματα, τις παραστάσεις και την εύκολη εγγραφή.',
  s:'<b>Λύση:</b> καθαρή δομή ανά τμήμα, έντονη τυπογραφία με θεατρικό χαρακτήρα και φόρμα ενδιαφέροντος σε κάθε σελίδα.',
  r:'Design & Development',tech:'WordPress · Elementor · Custom CSS'},
 {t:'Guitar Studies',c:'Redesign · UI/UX',y:'2026',a:'a2',url:'https://guitarstudies.gr',
  d:'Redesign για δάσκαλο κιθάρας: τα μαθήματα, τα επίπεδα και η κράτηση δοκιμαστικού μαθήματος σε πρώτο πλάνο.',
  s:'<b>Λύση:</b> ξεκάθαρη παρουσίαση μαθημάτων, mobile-first layout και CTA για επικοινωνία σε κάθε βήμα.',
  r:'UI/UX · Development',tech:'HTML · CSS · JS · WordPress'},
 {t:'Apergis Knitwear',c:'Redesign · Brand site',y:'2026',a:'a3',url:'#',
  d:'Ανανέωση ιστοσελίδας για οικογενειακή βιοτεχνία πλεκτών, που αναδεικνύει την παράδοση και την ποιότητα της παραγωγής.',
  s:'<b>Λύση:</b> ζεστή, «υφασμάτινη» αισθητική, μεγάλες εικόνες προϊόντων και η ιστορία της οικογένειας.',
  r:'Design & Development',tech:'WordPress · Elementor'},
 {t:'Mythos Flight Training',c:'Web Design · Aviation',y:'2026',a:'a4',url:'#',
  d:'Ιστοσελίδα για σχολή εκπαίδευσης πιλότων, με τα προγράμματα σπουδών, τον στόλο και τη διαδικασία εγγραφής.',
  s:'<b>Λύση:</b> σαφής διαδρομή «από το πρώτο μάθημα στο δίπλωμα» και εμφανή CTA για ενημέρωση.',
  r:'Design & Development',tech:'WordPress · Elementor · Custom code'},
 {t:'Genecon Energy',c:'Corporate site · Energy',y:'2026',a:'a5',url:'#',
  d:'Εταιρική ιστοσελίδα για εταιρεία ενέργειας, με παρουσίαση υπηρεσιών, έργων και τεχνογνωσίας.',
  s:'<b>Λύση:</b> επαγγελματική, «καθαρή» αισθητική που εμπνέει εμπιστοσύνη, με έμφαση στα έργα.',
  r:'Design & Development',tech:'WordPress · Elementor'},
 {t:'Lorem Ipsum',c:'Lorem · Ipsum',y:'2026',a:'a6',url:'#',
  d:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  s:'<b>Λύση:</b> ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
  r:'Lorem ipsum',tech:'Lorem · Ipsum · Dolor'}
];
const art=(p)=>`<div class="art ${p.a}"><div class="frame"><span class="tx"><b>${p.t}</b><u></u></span><s></s></div></div>`;
const grid=$('#grid');
if(grid) grid.innerHTML=P.map((p,i)=>`<button class="pj rv" style="--i:${i+2}" data-p="${i}" aria-label="${p.t}: λεπτομέρειες">
  ${art(p)}<span class="pill">${p.c}</span>
  <span class="meta"><span><span class="mono">${p.c} · ${p.y}</span><h3>${p.t}</h3></span><span class="go">${arrow}</span></span></button>`).join('');

/* stagger index for reveals */
$$('.rv').forEach((el,i)=>{if(!el.style.getPropertyValue('--i'))el.style.setProperty('--i',i)});

/* ---------- services: card spotlight ---------- */
$$('.sc').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));

/* ---------- menu indicator (slides between items) ---------- */
const dock=$('.dock'), ind=$('.ind'), navBtns=$$('.nb[data-nav]');
const mqDesk=matchMedia('(min-width:900px) and (min-height:600px)');
function placeInd(i,animate){
  const b=navBtns[i]; if(!b||!ind) return;
  const sv=b.querySelector('svg'), dr=dock.getBoundingClientRect(), r=sv.getBoundingClientRect();
  const desk=mqDesk.matches, w=desk?48:38, h=desk?48:38;
  const x=r.left-dr.left+r.width/2-w/2-dock.clientLeft, y=r.top-dr.top+r.height/2-h/2-dock.clientTop;
  ind.classList.toggle('no-t',!animate);
  Object.assign(ind.style,{width:w+'px',height:h+'px',left:x+'px',top:y+'px'});
  if(!animate){void ind.offsetWidth;ind.classList.remove('no-t')}
}
function markActive(i){
  navBtns.forEach((b,j)=>{b.classList.toggle('on',j===i);j===i?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});
  $$('#dots a').forEach((a,j)=>a.classList.toggle('on',j===i));
  const rn=$('#rnum'); if(rn) rn.textContent=String(i+1).padStart(2,'0');
}
// the slide already happened on the page we came from: start in place, no second movement
placeInd(cur,false);
if(document.fonts) document.fonts.ready.then(()=>placeInd(cur,false));
addEventListener('resize',()=>placeInd(cur,false));
mqDesk.addEventListener('change',()=>{setupMode();placeInd(cur,false)});

/* ---------- layout mode ---------- */
const sec=$('.pg'), inner=$('.pg-in');
let fp=false;
function setupMode(){fp=mqDesk.matches;body.classList.toggle('fp',fp)}
setupMode();

/* ---------- reveal ---------- */
function revealPage(){
  if(fp){sec.classList.add('in');return}
  // phones: reveal each block as it scrolls into view
  sec.classList.add('in-m');
  let batch=0,tm=null;
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;
      e.target.style.setProperty('--j',batch++);e.target.classList.add('vis');io.unobserve(e.target)});
    clearTimeout(tm);tm=setTimeout(()=>batch=0,120)},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('.rv',sec).forEach(el=>io.observe(el));
}

/* ---------- page transitions (soft) ---------- */
let busy=false, modalOpen=false;
function leave(i){
  if(busy||i<0||i>=N||i===cur) return;
  busy=true;
  const dir=i>cur?1:-1;
  ss.set('mm-pt',{to:i,dir,t:Date.now()});
  dock.classList.add('nav-go');             // fold any open hover label so nothing pops on the next page
  placeInd(i,true);                         // pill glides to the new item
  navBtns[cur]&&navBtns[cur].classList.remove('on'); // old icon fades back to grey as the pill leaves
  setTimeout(()=>markActive(i),190);        // icon colours swap once the pill is under them
  try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}
  inner.animate([{opacity:1,transform:'none',filter:'blur(0)'},{opacity:0,transform:`translateY(${-dir*14}px)`,filter:'blur(3px)'}],
    {duration:420,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
  setTimeout(()=>{location.href=PAGES[i].file},470);
}
function enter(){
  const came=root.classList.contains('pt-on'); ss.del('mm-pt');
  if(!came){revealPage();return}
  requestAnimationFrame(()=>{root.classList.remove('pt-on');revealPage()});
}
enter();
addEventListener('pageshow',e=>{if(e.persisted){busy=false;dock.classList.remove('nav-go');inner.getAnimations().forEach(a=>a.cancel());markActive(cur);placeInd(cur,false)}});

// internal links
document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-nav]'); if(!a) return;
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
  e.preventDefault(); const i=+a.dataset.nav; if(i===cur){return} leave(i);
});

/* ---------- desktop: one wheel step = one page ---------- */
let ignoreUntil=0;
addEventListener('wheel',e=>{
  if(!fp||modalOpen) return;
  const now=performance.now(), dir=e.deltaY>0?1:-1;
  if(Math.abs(e.deltaY)<3) return;
  const over=inner.scrollHeight-inner.clientHeight>40;
  const canDown=over&&inner.scrollTop+inner.clientHeight<inner.scrollHeight-2, canUp=over&&inner.scrollTop>2;
  if(!busy&&now>ignoreUntil&&((dir>0&&canDown)||(dir<0&&canUp))) return; // let long content scroll first
  e.preventDefault();
  if(busy||now<ignoreUntil){ignoreUntil=Math.max(ignoreUntil,now+180);return}
  ignoreUntil=now+1200; leave(cur+dir);
},{passive:false});
addEventListener('keydown',e=>{
  if(modalOpen){if(e.key==='Escape')closeM();if(e.key==='ArrowRight')stepM(1);if(e.key==='ArrowLeft')stepM(-1);return}
  if(!fp||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  if(['ArrowDown','PageDown'].includes(e.key)){e.preventDefault();leave(cur+1)}
  if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();leave(cur-1)}
});

/* ---------- work: modal ---------- */
const M=$('#modal'); let mi=0,lastFocus=null;
function fillM(){
  const p=P[mi];
  $('#m-art').outerHTML=art(p).replace('class="art','id="m-art" class="art');
  $('#m-cat').textContent=p.c+' · '+p.y; $('#m-title').textContent=p.t;
  $('#m-desc').textContent=p.d; $('#m-sol').innerHTML=p.s;
  $('#m-kv').innerHTML=`<div><span class="mono">Ρόλος</span><b>${p.r}</b></div><div><span class="mono">Χρονιά</span><b>${p.y}</b></div><div class="full"><span class="mono">Τεχνολογίες</span><b>${p.tech}</b></div>`;
  const l=$('#m-live'); l.href=p.url; l.style.opacity=p.url==='#'?.5:1;
  $('#m-count').textContent=String(mi+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0');
  $('.sh-info').animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:600,easing:EASE2});
}
function openM(i){mi=i;fillM();lastFocus=document.activeElement;M.classList.add('open');modalOpen=true;setTimeout(()=>$('.ibtn.x',M).focus(),300)}
function closeM(){M.classList.remove('open');modalOpen=false;lastFocus&&lastFocus.focus()}
function stepM(d){mi=(mi+d+P.length)%P.length;fillM()}
if(M&&grid){
  grid.addEventListener('click',e=>{const b=e.target.closest('.pj');if(b)openM(+b.dataset.p)});
  $$('[data-close]',M).forEach(b=>b.addEventListener('click',closeM));
  $('#m-prev').onclick=()=>stepM(-1); $('#m-next').onclick=()=>stepM(1);
}

/* ---------- contact: form (demo) ---------- */
const form=$('#form');
if(form) form.addEventListener('submit',e=>{
  e.preventDefault(); let ok=true;
  [['#f-n',v=>v.trim().length>1],['#f-e',v=>/^\S+@\S+\.\S+$/.test(v)],['#f-m',v=>v.trim().length>3]].forEach(([s,t])=>{
    const f=$(s),bad=!t(f.value); f.closest('.fld').classList.toggle('err',bad); if(bad&&ok){f.focus();ok=false}
  });
  $('#ok').classList.toggle('show',ok); if(ok) e.target.reset();
});
})();
