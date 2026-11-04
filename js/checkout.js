(() => {
 "use strict";
 const box=document.getElementById("orders"),totalBox=document.getElementById("total"),countBox=document.getElementById("items-count");
 const safe=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const fmt=n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
 const cartKey="prime-burger-carrinho";
 let items=[];try{items=JSON.parse(localStorage.getItem(cartKey)||"[]");if(!Array.isArray(items))items=[]}catch(e){}
 function persist(){localStorage.setItem(cartKey,JSON.stringify(items))}
 function render(){
  box.innerHTML="";
  const qty=items.reduce((sum,item)=>sum+(Number(item.qty)||0),0);
  countBox.textContent=qty+" item"+(qty===1?"":"s");
  const subtotal=items.reduce((sum,item)=>sum+(Number(item.price)||0)*(Number(item.qty)||0),0);
  totalBox.textContent=fmt(subtotal);
  if(!items.length){box.innerHTML='<p>Seu carrinho está vazio.</p><a class="btn" href="index.html">Ver Cardápio</a>';return;}
  items.forEach((item,i)=>{
   const row=document.createElement("div");row.className="order";
   const addons=Object.entries(item.addons||{}).filter(([,v])=>v).map(([k,v])=>v+"× "+k).join(", ");
   row.innerHTML='<h3>'+safe(item.name)+'</h3><div class="extras">Refrigerante: '+safe(item.drink)+
    (addons?'<div>Adicionais: '+safe(addons)+'</div>':'')+(item.obs?'<div>Obs.: '+safe(item.obs)+'</div>':'')+
    '</div><div class="line"><strong>'+fmt(item.price)+'</strong><div class="quantity"><button type="button" data-i="'+i+'" data-dir="-1" aria-label="Retirar uma unidade">−</button><span>'+safe(item.qty)+'</span><button type="button" data-i="'+i+'" data-dir="1" aria-label="Adicionar uma unidade">+</button></div></div>';
   box.appendChild(row);
  });
 }
 box.addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(!b)return;const i=Number(b.dataset.i);items[i].qty=(Number(items[i].qty)||1)+Number(b.dataset.dir);if(items[i].qty<=0)items.splice(i,1);persist();render()});
 document.getElementById("clear").addEventListener("click",()=>{if(confirm("Esvaziar carrinho?")){items=[];persist();render()}});
 render();
})();