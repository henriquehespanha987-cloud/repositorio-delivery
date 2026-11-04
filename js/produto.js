(() => {
 "use strict";
 const product=document.body.dataset;
 const max=2, addOns={};
 const section=document.getElementById("add-ons");
 function count(){return Object.values(addOns).reduce((a,b)=>a+b,0)}
 function refresh(){
  const total=count();
  document.getElementById("addon-status").textContent=total+"/2";
  section.querySelectorAll(".addon").forEach(row=>{
   const qty=addOns[row.dataset.name]||0;
   row.querySelector(".qty").textContent=qty;
   row.querySelector(".decrease").disabled=qty===0;
   row.querySelector(".increase").disabled=total>=max;
  });
 }
 section.addEventListener("click",e=>{
  const btn=e.target.closest("button");if(!btn||btn.disabled)return;
  const row=btn.closest(".addon"),name=row.dataset.name;
  const prior=addOns[name]||0;
  const next=prior+(btn.classList.contains("increase")?1:-1);
  if(next<0||next>2||next>prior&&count()>=2)return;
  if(next===0)delete addOns[name];else addOns[name]=next;
  section.classList.remove("error");refresh();
 });
 refresh();
 const drinkOpts=document.querySelectorAll('input[name="refrigerante"]');
 drinkOpts.forEach(el=>el.addEventListener("change",()=>{document.getElementById("drink-status").textContent="1/1";document.getElementById("beverages").classList.remove("error")}));
 const obs=document.getElementById("obs");obs.addEventListener("input",()=>{document.getElementById("char-status").textContent=obs.value.length+"/140"});
 document.getElementById("add-cart").addEventListener("click",()=>{
  const drink=document.querySelector('input[name="refrigerante"]:checked');
  if(!drink){const section=document.getElementById("beverages");section.classList.add("error");section.scrollIntoView({behavior:"smooth",block:"center"});alert("Escolha um refrigerante para continuar.");return;}
  const cartKey="prime-burger-carrinho";
  const item={id:product.id,name:product.name,price:Number(product.price),qty:1,addons:{...addOns},drink:drink.value,obs:obs.value};
  let items=[];try{items=JSON.parse(localStorage.getItem(cartKey)||"[]");if(!Array.isArray(items))items=[]}catch(e){}
  items.push(item);
  try{localStorage.setItem(cartKey,JSON.stringify(items));window.location.href="../checkout.html#cart";}catch(e){alert("Não foi possível salvar o carrinho.")}
 });
})();