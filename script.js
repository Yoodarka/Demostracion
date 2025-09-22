// --- UTILIDADES ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// --- NAVEGACIÓN PRINCIPAL ---
function activateView(hash, scrollTargetId) {
  const targetViewId = hash === '#carta' ? '#carta' : '#experiencia';
  $$('.view').forEach(v => v.classList.remove('active'));
  $(targetViewId).classList.add('active');
  $('#menuMobile').classList.add('hidden');
  
  if (scrollTargetId) {
    setTimeout(() => {
      const targetElement = $(scrollTargetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('[data-nav]');
  const scrollBtn = e.target.closest('[data-scroll]');

  if (navBtn) {
    const navTo = navBtn.getAttribute('data-nav');
    const scrollTo = navBtn.getAttribute('data-scroll');
    location.hash = navTo;
    if (scrollTo) {
        sessionStorage.setItem('scrollTarget', scrollTo);
    }
  } else if (scrollBtn) {
    const scrollTo = scrollBtn.getAttribute('data-scroll');
    const el = document.querySelector(scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
$('#openMenu').addEventListener('click', () => $('#menuMobile').classList.toggle('hidden'));

window.addEventListener('hashchange', () => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    activateView(location.hash, scrollTarget);
    sessionStorage.removeItem('scrollTarget');
});
activateView(location.hash);


// --- CARRUSEL DE FONDO DEL HERO ---
function initHeroCarousel() {
    const container = $('#hero-bg-carousel');
    if (!container) return;

    const images = [
        'https://placehold.co/1920x1080/121828/F7CA24?text=Paisaje+Andino',
        'https://placehold.co/1920x1080/0038A8/FFFFFF?text=Costa+del+Pacífico',
        'https://placehold.co/1920x1080/26784A/FFFFFF?text=Amazonía+Exuberante'
    ];
    let currentIndex = 0;

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`;
        img.style.opacity = index === 0 ? '1' : '0';
        container.appendChild(img);
    });

    const slides = container.querySelectorAll('img');

    setInterval(() => {
        slides[currentIndex].style.opacity = '0';
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.opacity = '1';
    }, 5000);
}

// --- DATOS DE LA CARTA ---
const itemsCarta = [
  { id:'e1', cat:'Entradas', nombre:'Empanadas de viento', precio:3.5, desc:'Queso y azúcar glas', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Empanada' },
  { id:'e2', cat:'Entradas', nombre:'Bolón de verde', precio:4.0, desc:'Chicharrón o queso', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Bolón' },
  { id:'f1', cat:'Fuertes', nombre:'Encebollado', precio:8.5, desc:'Pescado, yuca y cebolla', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Encebollado' },
  { id:'f2', cat:'Fuertes', nombre:'Seco de chivo', precio:9.5, desc:'Cerveza y naranjilla', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Seco+de+Chivo' },
  { id:'f3', cat:'Fuertes', nombre:'Hornado', precio:9.0, desc:'Cerdo, mote y llapingacho', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Hornado' },
  { id:'p1', cat:'Postres', nombre:'Dulce de higos', precio:4.5, desc:'Queso fresco', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Higos+con+Queso' },
  { id:'b1', cat:'Bebidas', nombre:'Colada morada', precio:3.0, desc:'Especias y moras', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Colada+Morada' },
  { id:'b2', cat:'Bebidas', nombre:'Jugo de maracuyá', precio:2.8, desc:'Natural y fresco', imagen: 'https://placehold.co/800x600/121828/F7CA24?text=Jugo' },
];

// --- CARRUSEL DEL MENÚ ---
function initMenuCarousel() {
    const carousel = $('#menuCarousel');
    const prevBtn = $('#menu-prev');
    const nextBtn = $('#menu-next');
    if (!carousel || !prevBtn || !nextBtn) return;

    carousel.innerHTML = '';
    itemsCarta.forEach(p => {
        const card = document.createElement('div');
        card.className = 'group w-72 md:w-80 flex-none snap-start panel-soft rounded-2xl overflow-hidden transition hover:border-white/20';
        card.innerHTML = `
            <div class="p-4">
                <div class="rounded-xl overflow-hidden aspect-video">
                    <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="mt-4">
                    <div class="flex items-start justify-between gap-3">
                        <h3 class="font-bold text-lg">${p.nombre}</h3>
                        <span class="bg-black/40 border border-white/10 px-3 py-1 rounded-full text-sm">$${p.precio.toFixed(2)}</span>
                    </div>
                    <p class="text-white/70 text-sm mt-1">${p.desc}</p>
                </div>
                <div class="mt-4">
                    <button class="w-full px-3 py-2 rounded-lg bg-[rgb(var(--amarillo))] text-black font-semibold hover:bg-yellow-300 pedir-btn" data-id="${p.id}">
                        Añadir al pedido
                    </button>
                </div>
            </div>
        `;
        carousel.appendChild(card);
    });

    nextBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('div').offsetWidth + 24;
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = carousel.querySelector('div').offsetWidth + 24;
        carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
}

// --- ANIMACIONES DE SCROLL ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    $$('.reveal').forEach(el => observer.observe(el));
}

// --- TODO EL RESTO DEL CÓDIGO (CARRITO, GALERÍA, ETC.) ---
document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initMenuCarousel();
    initScrollAnimations();
    
    const modal = $('#modal'), modalContent = $('#modalContent');
    function openModal(content){ modalContent.innerHTML = content; modal.classList.remove('hidden'); modal.classList.add('flex'); }
    function closeModal(){ modal.classList.add('hidden'); modal.classList.remove('flex'); }
    $('#closeModal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
    window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

    document.addEventListener('click', (e)=>{
        const ver = e.target.closest('.ver-btn');
        const pedir = e.target.closest('.pedir-btn');
        if(ver){ const item = itemsCarta.find(x=>x.id===ver.dataset.id); openModal(`<img src="${item.imagen}" class="max-w-full max-h-[80vh] rounded-lg">`);}
        if(pedir){ const item = itemsCarta.find(x=>x.id===pedir.dataset.id); addToCart(item, 1);}
        const quick = e.target.closest('[data-quick]');
        if(quick){
            const cat = quick.getAttribute('data-quick');
            const sel = {'Entradas': $('#selEntradas'),'Fuertes': $('#selFuertes'),'Postres': $('#selPostres'),'Bebidas': $('#selBebidas'),}[cat];
            const qty = parseInt({'Entradas': $('#qtyEntradas').value,'Fuertes': $('#qtyFuertes').value,'Postres': $('#qtyPostres').value,'Bebidas': $('#qtyBebidas').value,}[cat] || '1', 10);
            const id = sel.value;
            const item = itemsCarta.find(x=>x.id===id);
            if(item) addToCart(item, Math.max(1, qty));
        }
    });

    function fillQuickSelects(){
      const cats = { Entradas: $('#selEntradas'), Fuertes: $('#selFuertes'), Postres: $('#selPostres'), Bebidas: $('#selBebidas') };
      Object.entries(cats).forEach(([cat, sel])=>{
        sel.innerHTML = '';
        itemsCarta.filter(i=>i.cat===cat).forEach(i=>{
          const opt = document.createElement('option');
          opt.value = i.id; opt.textContent = `${i.nombre} — $${i.precio.toFixed(2)}`;
          sel.appendChild(opt);
        });
      });
    }
    fillQuickSelects();

    let carrito = [];
    function showPedido(show){ $('#pedido').classList.toggle('hidden', !show); $('#pedido').classList.toggle('lg:block', show); }
    function addToCart(prod, qty){
      const found = carrito.find(x=>x.id===prod.id);
      if(found){ found.qty += qty; } else { carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, qty }); }
      updateCarrito(); showPedido(carrito.length>0);
      $('#pedido').scrollIntoView({behavior:'smooth', block:'start'});
    }
    function updateCarrito(){
      const ul = $('#carrito'); ul.innerHTML = '';
      carrito.forEach(item=>{
        const li = document.createElement('li');li.className = 'flex items-center justify-between gap-2';
        li.innerHTML = `<div class="text-sm"><p class="font-semibold">${item.nombre}</p><p class="text-white/70">$${item.precio.toFixed(2)} × ${item.qty}</p></div><div class="flex items-center gap-2"><button class="dec px-2 py-1 rounded-lg bg-white/10" aria-label="Reducir" data-id="${item.id}">−</button><button class="inc px-2 py-1 rounded-lg bg-white/10" aria-label="Aumentar" data-id="${item.id}">+</button><button class="rem px-2 py-1 rounded-lg bg-red-600/60 hover:bg-red-600" aria-label="Quitar" data-id="${item.id}">✕</button></div>`;
        ul.appendChild(li);
      });
      const subtotal = carrito.reduce((s,i)=> s + i.precio * i.qty, 0);
      const zona = (new FormData($('#formDomi'))).get('zona') || 'centro';
      const envio = zona==='centro' ? 0 : 1.5;
      $('#subtotal').textContent = `$${subtotal.toFixed(2)}`;$('#envio').textContent = `$${envio.toFixed(2)}`;$('#total').textContent = `$${(subtotal+envio).toFixed(2)}`;
      const disable = carrito.length===0;
      $('#formDomi').querySelector('button[type="submit"]').disabled = disable;$('#btnWhatsapp').disabled = disable;
    }
    $('#carrito').addEventListener('click', (e)=>{
      const id = (e.target.dataset && e.target.dataset.id) || null; if(!id) return;
      const idx = carrito.findIndex(x=>x.id===id); if(idx<0) return;
      if(e.target.classList.contains('inc')) carrito[idx].qty++; if(e.target.classList.contains('dec')) carrito[idx].qty = Math.max(1, carrito[idx].qty-1); if(e.target.classList.contains('rem')) carrito.splice(idx,1);
      updateCarrito(); showPedido(carrito.length>0);
    });
    $('#formDomi').addEventListener('change', updateCarrito);
    $('#formDomi').addEventListener('submit', (e)=>{
      e.preventDefault(); const data = new FormData(e.target);
      const msg = $('#domiMsg');
      msg.textContent = `¡Pedido confirmado! Entrega en ${data.get('direccion')}. Total ${$('#total').textContent}.`;
      msg.classList.remove('hidden'); carrito = []; updateCarrito(); showPedido(false); e.target.reset();
    });
    const galleryData = [
        { id:'g1', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Plato+Fuerte', title:'Platos fuertes' },{ id:'g2', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ceviche', title:'Ceviche fresco' },{ id:'g3', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Bebida', title:'Bebidas naturales' },{ id:'g4', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ambiente', title:'Nuestro ambiente' },{ id:'g5', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Detalles', title:'Cuidamos los detalles' },{ id:'g6', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Postre', title:'Postres caseros' },{ id:'g7', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ingredientes', title:'Ingredientes de calidad' },{ id:'g8', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Cocina', title:'Nuestra cocina' },
    ];
    function renderGallery(){
      const grid = $('#galleryGrid'); grid.innerHTML = '';
      galleryData.forEach(g=>{
        const tile = document.createElement('button'); tile.className = 'group relative rounded-2xl overflow-hidden panel-soft hover:border-white/20';
        tile.innerHTML = `<div class="aspect-square"><img src="${g.imagen}" alt="Imagen de marcador para ${g.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"></div><div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition"><p class="font-semibold text-white">${g.title}</p></div>`;
        tile.addEventListener('click', ()=> openModal(`<img src="${g.imagen}" alt="${g.title}" class="max-w-full max-h-[80vh] rounded-lg">`));
        grid.appendChild(tile);
      });
    }
    renderGallery();
    const slides = $$('.review-slide'); let startIndex = 0;
    function updateReviews(){ slides.forEach((el,i)=> el.classList.toggle('hidden', !(i>=startIndex && i<startIndex+3)));}
    $('#prevReview').addEventListener('click', ()=>{ startIndex = (startIndex - 1 + slides.length) % slides.length; updateReviews(); });
    $('#nextReview').addEventListener('click', ()=>{ startIndex = (startIndex + 1) % slides.length; updateReviews(); });
    updateReviews();
    $('#formOpinion').addEventListener('submit', (e)=>{ e.preventDefault(); e.target.reset(); $('#opMsg').classList.remove('hidden'); });
    $('#formReserva').addEventListener('submit', (e)=>{ e.preventDefault(); $('#reservaMsg').classList.remove('hidden'); });
    $('#year').textContent = new Date().getFullYear();
});
