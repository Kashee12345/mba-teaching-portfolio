(function(){
  var bar=document.getElementById('bar');
  function prog(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;if(bar)bar.style.width=(m>0?h.scrollTop/m*100:0)+'%';}
  addEventListener('scroll',prog,{passive:true});prog();
  var links=[].slice.call(document.querySelectorAll('nav.toc a[href^="#"]'));
  var secs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));});
  function spy(){var y=scrollY+120,c=0;for(var i=0;i<secs.length;i++){if(secs[i]&&secs[i].offsetTop<=y)c=i;}links.forEach(function(a,i){a.classList.toggle('on',i===c);});}
  addEventListener('scroll',spy,{passive:true});spy();
  // self-checks from JSON
  var data=document.getElementById('checks-data'),host=document.getElementById('checks');
  if(data&&host){
    var qs=JSON.parse(data.textContent);
    qs.forEach(function(q,qi){
      var d=document.createElement('div');d.className='check';
      var h='<div class="q">'+(qi+1)+'. '+q.q+'</div>';
      q.a.forEach(function(o,i){h+='<button class="opt" type="button" data-i="'+i+'">'+o+'</button>';});
      h+='<div class="fb" aria-live="polite"></div>';d.innerHTML=h;
      d.querySelectorAll('button.opt').forEach(function(b){b.addEventListener('click',function(){
        if(d.classList.contains('done'))return;d.classList.add('done');
        var i=+b.dataset.i;b.classList.add(i===q.c?'right':'wrong');
        d.querySelectorAll('button.opt')[q.c].classList.add('right');
        d.querySelector('.fb').innerHTML=(i===q.c?'<b>Correct.</b> ':'<b>Not quite.</b> ')+q.fb;
      });});
      host.appendChild(d);
    });
  }
  // glossary from JSON
  var g=document.getElementById('glossary-data'),gh=document.getElementById('glossary');
  if(g&&gh){var terms=JSON.parse(g.textContent),dl=document.createElement('dl');dl.className='glossary';
    terms.forEach(function(t){var dt=document.createElement('dt');dt.textContent=t.term;var dd=document.createElement('dd');dd.textContent=t.def;dl.appendChild(dt);dl.appendChild(dd);});gh.appendChild(dl);}
})();
