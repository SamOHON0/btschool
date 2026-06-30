/* ===========================================================
   BT School of Motoring — shared scripts
   Safe to load on every page; each block guards its elements.
   =========================================================== */

/* ===== NAV SCROLL ===== */
var nav=document.getElementById('nav');
if(nav){
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>10);});
}

/* ===== MOBILE MENU ===== */
var burger=document.getElementById('burger'),mobileMenu=document.getElementById('mobileMenu');
if(burger&&mobileMenu){
  burger.addEventListener('click',function(){burger.classList.toggle('open');mobileMenu.classList.toggle('open');});
  Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'),function(a){
    a.addEventListener('click',function(){burger.classList.remove('open');mobileMenu.classList.remove('open');});
  });
}

/* ===== FAQ ACCORDION ===== */
Array.prototype.forEach.call(document.querySelectorAll('.faq-item'),function(item){
  item.querySelector('.faq-q').addEventListener('click',function(){
    var open=item.classList.contains('open');
    Array.prototype.forEach.call(document.querySelectorAll('.faq-item'),function(i){
      i.classList.remove('open');i.querySelector('.faq-a').style.maxHeight=null;
    });
    if(!open){item.classList.add('open');var a=item.querySelector('.faq-a');a.style.maxHeight=a.scrollHeight+'px';}
  });
});

/* ===== REVEAL ===== */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';io.unobserve(e.target);}
  });
},{threshold:0.08});
Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'),function(el){io.observe(el);});

/* ===== YEAR ===== */
var yearEl=document.getElementById('year');
if(yearEl){yearEl.textContent=new Date().getFullYear();}

/* ===== CHATBOT ===== */
var chatBtn=document.getElementById('chatBtn');
if(chatBtn){
  var KB=[
    {keys:['price','cost','how much','rate','pricing','fee','euro'],reply:'A one hour driving lesson is 60 euro, and a 12 hour EDT package is 660 euro. Pre-tests are 60 euro (1hr) or 120 euro (2hr). Jeep and trailer lessons are 140 euro, truck lessons 170 euro. Call 087 127 8147 to book.'},
    {keys:['edt','essential','log book','logbook','sponsor'],reply:'Our 12 hour EDT package is 660 euro and covers all aspects of your Essential Driver Training. The official RSA EDT log book is 5 euro, and lessons are uploaded to the RSA portal. Richie may also act as your EDT sponsor.'},
    {keys:['pre-test','pretest','pre test','test prep','marking sheet'],reply:'We specialise in pre-tests with above average pass rates. A two hour pre-test (120 euro) is recommended and includes feedback with a completed pre-test marking sheet. Available in your car or ours.'},
    {keys:['book','booking','reserve','appointment','schedule','arrange'],reply:'To book, just call 087 127 8147 or 087 703 9072. Your first lesson can be taken whenever you wish, with no long-term commitment. Early booking is advised.'},
    {keys:['area','where','location','cover','celbridge','lucan','naas','tallaght','maynooth','clane','leixlip'],reply:'We serve Celbridge, Clane, Leixlip, Lucan, Maynooth and Dublin West, plus the test centres of Tallaght and Naas. Other Dublin test centres are covered by arrangement.'},
    {keys:['truck','hgv','rigid','career'],reply:'Truck lessons and assessments are 170 euro for two hour slots. Truck driving assessments are 150 euro (1.5hrs with a written report). We also do company driver assessments and contracts. Call 087 127 8147.'},
    {keys:['jeep','trailer','tow','be category'],reply:'Jeep and trailer lessons (BE category) are 140 euro for two hours, with full packages available. Own car, jeep and trailer lessons can be arranged on request.'},
    {keys:['car for test','test car','car hire','vehicle hire','supplied'],reply:'A car can be supplied for your driving test: 180 euro for car hire plus one hour beforehand, then 60 euro per additional hour. Terms and conditions apply, subject to availability.'},
    {keys:['cancel','reschedule','notice'],reply:'Cancelling a lesson is not an issue with 48 hours notice, which lets us offer the slot to another client.'},
    {keys:['insurance','discount','first ireland','drive first'],reply:'We have teamed up with First Ireland and Drive First to offer up to 20% discount on your first motor insurance policy after a course of lessons with us. Call 087 703 9072 to find out more.'},
    {keys:['nervous','anxious','automatic','refresher','night'],reply:'Yes, we cover nervous driver, refresher and night driving courses, plus manual and automatic tuition. Patient, encouraging instruction built around you. Call 087 127 8147.'},
    {keys:['hours','open','when','time'],reply:'We offer the flexibility of lessons when and where you want them. Call 087 127 8147 or 087 703 9072 to arrange a time that suits you.'},
    {keys:['hello','hi','hey'],reply:'Hi there! Welcome to BT School of Motoring. Ask me about lesson prices, EDT courses, pre-tests or the areas we cover.'}
  ];
  var FALLBACK='Best to speak to Richie directly on 087 127 8147 or 087 703 9072, or message us on WhatsApp below. He will be happy to help.';
  var chatWin=document.getElementById('chatWin'),chatClose=document.getElementById('chatClose'),
  chatBody=document.getElementById('chatBody'),chatChips=document.getElementById('chatChips'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend');
  var started=false;
  var CHIPS=['Lesson prices','EDT course','Pre-tests','Areas covered','Book a lesson'];
  function addMsg(text,who){
    var m=document.createElement('div');m.className='msg '+who;m.textContent=text;
    chatBody.appendChild(m);chatBody.scrollTop=chatBody.scrollHeight;
  }
  function renderChips(){
    chatChips.innerHTML='';
    CHIPS.forEach(function(c){
      var b=document.createElement('button');b.className='chip';b.textContent=c;
      b.addEventListener('click',function(){handle(c);});
      chatChips.appendChild(b);
    });
  }
  function reply(text){
    var t=text.toLowerCase();
    for(var i=0;i<KB.length;i++){
      for(var j=0;j<KB[i].keys.length;j++){
        if(t.indexOf(KB[i].keys[j])!==-1)return KB[i].reply;
      }
    }
    return FALLBACK;
  }
  function handle(text){
    addMsg(text,'user');
    setTimeout(function(){addMsg(reply(text),'bot');},350);
  }
  function openChat(){
    chatWin.classList.add('open');chatBtn.style.display='none';
    if(!started){
      started=true;
      addMsg('Hi there! Welcome to BT School of Motoring. How can we help you today?','bot');
      renderChips();
    }
  }
  chatBtn.addEventListener('click',openChat);
  chatClose.addEventListener('click',function(){chatWin.classList.remove('open');chatBtn.style.display='flex';});
  chatSend.addEventListener('click',function(){if(chatInput.value.trim()){handle(chatInput.value.trim());chatInput.value='';}});
  chatInput.addEventListener('keypress',function(e){if(e.key==='Enter'&&chatInput.value.trim()){handle(chatInput.value.trim());chatInput.value='';}});
}
