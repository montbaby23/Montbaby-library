
const pages=[
 'assets/mata/mata-cover.png',
 'assets/mata/mata-01.png','assets/mata/mata-02.png','assets/mata/mata-03.png',
 'assets/mata/mata-04.png','assets/mata/mata-05.png','assets/mata/mata-06.png','assets/mata/mata-07.png'
];
let current=parseInt(localStorage.getItem('montbaby_mata_page')||'0',10);
const reader=document.getElementById('reader');
const pageImg=document.getElementById('pageImg');
const pageCount=document.getElementById('pageCount');
const dots=document.getElementById('dots');

function render(){
  current=Math.max(0,Math.min(current,pages.length-1));
  pageImg.src=pages[current];
  pageCount.textContent=`${current+1} / ${pages.length}`;
  localStorage.setItem('montbaby_mata_page',current);
  dots.innerHTML=pages.map((_,i)=>`<span class="dot ${i===current?'active':''}"></span>`).join('');
}
function openReader(){reader.classList.add('show');reader.setAttribute('aria-hidden','false');render();document.body.style.overflow='hidden'}
function closeReader(){reader.classList.remove('show');reader.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function nextPage(){if(current<pages.length-1){current++;render()}}
function prevPage(){if(current>0){current--;render()}}
function toggleFullscreen(){document.fullscreenElement?document.exitFullscreen():reader.requestFullscreen?.()}
function showPaywall(title){document.getElementById('payTitle').textContent=title;document.getElementById('paywall').classList.add('show')}
function closePaywall(){document.getElementById('paywall').classList.remove('show')}

let sx=0;
pageImg.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});
pageImg.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(dx<-45)nextPage();if(dx>45)prevPage()},{passive:true});

let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').hidden=false});
document.getElementById('installBtn').addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
render();
