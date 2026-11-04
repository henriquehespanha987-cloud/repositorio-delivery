(() => {
 "use strict";
 // Contador visual: termina em zero, sem reiniciar automaticamente.
 const minute=document.getElementById("minutes"),second=document.getElementById("seconds");
 let remaining=25*60;
 if(minute&&second){
  const tick=()=>{
   minute.textContent=String(Math.floor(remaining/60)).padStart(2,"0");
   second.textContent=String(remaining%60).padStart(2,"0");
   if(remaining>0)remaining--;
  };
  tick();setInterval(tick,1000);
 }
 const cityEls=document.querySelectorAll("#localCidade");
 const stateEls=document.querySelectorAll("#localEstado");
 if(cityEls.length){
  fetch("https://ipwho.is/").then(r=>r.json()).then(data=>{
   if(data&&data.success&&data.city){
    cityEls.forEach(el=>el.textContent=data.city);
    stateEls.forEach(el=>el.textContent=data.region_code||"");
   }
  }).catch(()=>{});
 }
 // Não são geradas notificações de vendas simuladas.
})();