// Utilidades
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Navegación entre vistas
function activateView(hash){
  const target = hash === '#carta' ? '#carta' : '#experiencia';
  $$('#experiencia, #carta').forEach(v => v.classList.remove('active'));
  $(target).classList.add('active');
  // Mostrar carrusel solo en Experiencia para diferenciar vistas
  const illus = document.getElementById('heroIllus');
  if (illus) {
    illus.classList.toggle('hidden', target === '#carta');
  }
  $('#menuMobile').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('click', (e)=>{
  const navBtn = e.target.closest('[data-nav]');
  const scrollBtn = e.target.closest('[data-scroll]');
  if(navBtn){
    const to = navBtn.getAttribute('data-nav');
    location.hash = to;
  }
  if(scrollBtn){
    const id = scrollBtn.getAttribute('data-scroll');
    const el = document.querySelector(id);
    if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
  }
});
$('#openMenu').addEventListener('click', ()=> $('#menuMobile').classList.toggle('hidden'));
window.addEventListener('hashchange', ()=> activateView(location.hash));
activateView(location.hash);

// Carrusel del héroe (tipo carrusel Instagram)
const heroSlides = [
  `
  <div class="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" class="w-3/4 drop-shadow-2xl">
      <defs>
        <radialGradient id="plateH" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="70%" stop-color="#eef2f4" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#d6e0e5" stop-opacity="0.9"/>
        </radialGradient>
        <linearGradient id="salsaH" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgb(247,202,24)"/>
          <stop offset="50%" stop-color="rgb(0,56,168)"/>
          <stop offset="100%" stop-color="rgb(206,17,38)"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#plateH)"/>
      <circle cx="100" cy="100" r="55" fill="#f6f8f9"/>
      <path d="M60,110 C75,85 90,125 110,95 C125,75 145,110 140,120 C120,150 80,145 60,110 Z" fill="url(#salsaH)" opacity="0.95"/>
      <g fill="#26784A">
        <circle cx="85" cy="105" r="3"></circle>
        <circle cx="120" cy="98" r="3"></circle>
        <circle cx="105" cy="120" r="3"></circle>
        <circle cx="95" cy="90" r="3"></circle>
      </g>
    </svg>
  </div>
  `,
  `
  <div class="relative w-full h-full rounded-3xl overflow-hidden">
    <svg viewBox="0 0 400 250" class="w-full h-full">
      <defs>
        <linearGradient id="mapgH" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#2d3b39"/>
          <stop offset="1" stop-color="#21302e"/>
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#mapgH)"/>
      <g stroke="#6bb3a7" stroke-width="6" opacity="0.35">
        <path d="M0,30 L400,60"></path>
        <path d="M0,140 L400,120"></path>
        <path d="M50,0 L80,250"></path>
        <path d="M280,0 L260,250"></path>
      </g>
      <rect x="160" y="90" width="80" height="60" fill="#e6965a" opacity="0.35" rx="6"/>
      <g transform="translate(200,120)">
        <path d="M0 -26 C14 -26 26 -14 26 0 C26 18 0 42 0 42 C0 42 -26 18 -26 0 C-26 -14 -14 -26 0 -26 Z" fill="#f7ca18"/>
        <circle cx="0" cy="-10" r="6" fill="#1b2321"/>
      </g>
    </svg>
  </div>
  `,
  `
  <div class="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 220 160" class="w-4/5">
      <defs>
        <linearGradient id="facade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0038A8"/>
          <stop offset="100%" stop-color="#001f66"/>
        </linearGradient>
      </defs>
      <rect x="20" y="40" width="180" height="90" rx="8" fill="url(#facade)"/>
      <rect x="35" y="55" width="60" height="45" rx="6" fill="#F7CA18"/>
      <rect x="115" y="55" width="70" height="60" rx="6" fill="#111827"/>
      <rect x="120" y="60" width="60" height="35" rx="4" fill="#F7CA18"/>
      <text x="110" y="120" font-size="10" fill="#F7CA18">Cóndor dorado</text>
    </svg>
  </div>
  `
];
let heroIndex = 0;
const heroFrame = document.getElementById('heroFrame');
const heroDots = document.getElementById('heroDots');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
function renderHero(){
  if(!heroFrame) return;
  heroFrame.innerHTML = heroSlides[heroIndex] || '';
  if(heroDots){
    heroDots.innerHTML = '';
    heroSlides.forEach((_,i)=>{
      const dot = document.createElement('span');
      dot.className = 'w-2 h-2 rounded-full ' + (i===heroIndex ? 'bg-white' : 'bg-white/40');
      dot.addEventListener('click', ()=>{ heroIndex = i; renderHero(); });
      heroDots.appendChild(dot);
    });
  }
}
if(heroPrev && heroNext){
  heroPrev.addEventListener('click', ()=>{ heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length; renderHero(); });
  heroNext.addEventListener('click', ()=>{ heroIndex = (heroIndex + 1) % heroSlides.length; renderHero(); });
  renderHero();
  setInterval(()=>{ if(document.getElementById('experiencia').classList.contains('active')) { heroIndex = (heroIndex + 1) % heroSlides.length; renderHero(); } }, 5000);
}

// Modal
const modal = $('#modal'), modalContent = $('#modalContent');
function openModal(content){ modalContent.innerHTML = content; modal.classList.remove('hidden'); modal.classList.add('flex'); }
function closeModal(){ modal.classList.add('hidden'); modal.classList.remove('flex'); }
$('#closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// SVG plato generador
const svgdish = (tone='#f7ca18') => `
  <svg viewBox="0 0 200 120" class="w-full h-32">
    <defs>
      <radialGradient id="pgrad" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="70%" stop-color="#eceff1"/>
        <stop offset="100%" stop-color="#cfd8dc"/>
      </radialGradient>
      <linearGradient id="fillg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${tone}"/>
        <stop offset="100%" stop-color="${tone}"/>
      </linearGradient>
    </defs>
    <g transform="translate(40,10)">
      <ellipse cx="60" cy="50" rx="60" ry="40" fill="url(#pgrad)"/>
      <ellipse cx="60" cy="50" rx="40" ry="25" fill="#f7f9fa"/>
      <path d="M25,60 Q60,30 95,55 Q80,70 60,65 Q40,68 25,60 Z" fill="url(#fillg)" opacity="0.95"/>
      <g fill="#26784A">
        <circle cx="50" cy="50" r="2.8"></circle>
        <circle cx="80" cy="45" r="2.8"></circle>
        <circle cx="65" cy="62" r="2.8"></circle>
      </g>
    </g>
  </svg>
`;

// Datos
// CÓDIGO ACTUALIZADO PARA LA CARTA (PLACEHOLDERS)
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

// Render Menú
// CÓDIGO ACTUALIZADO PARA RENDERIZAR EL MENÚ
function renderMenu(filtro='Todos'){
  const grid = $('#menuGrid');
  $$('.m-pill').forEach(b=>{
    const active = b.dataset.mfiltro === filtro;
    b.className = 'm-pill px-4 py-2 rounded-full ' + (active ? 'chip-active' : 'chip hover:bg-white/10');
  });
  const items = itemsCarta.filter(p => filtro==='Todos' ? true : (filtro==='Fuertes' ? p.cat==='Fuertes' : p.cat===filtro));
  grid.innerHTML = '';
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'group rounded-2xl overflow-hidden panel-soft hover:border-white/20 hover:bg-white/10 transition';
    card.innerHTML = `
      <div class="p-4">
        <div class="rounded-xl overflow-hidden aspect-video">
          <img src="${p.imagen}" alt="Imagen de marcador para ${p.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 class="font-bold text-lg">${p.nombre}</h3>
            <p class="text-white/70 text-sm">${p.desc}</p>
          </div>
          <span class="bg-black/40 border border-white/10 px-3 py-1 rounded-full text-sm">$${p.precio.toFixed(2)}</span>
        </div>
        <div class="mt-4 flex gap-2">
          <button class="px-3 py-2 rounded-lg bg-[rgb(var(--amarillo))] text-black font-semibold hover:bg-yellow-300 pedir-btn" data-id="${p.id}">
            Pedir a domicilio
          </button>
          <button class="px-3 py-2 rounded-lg bg-blue-600/40 hover:bg-blue-600/60 border border-white/10 text-sm ver-btn" data-id="${p.id}">
            Ver foto
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
$$('.m-pill').forEach(b=> b.addEventListener('click', ()=> renderMenu(b.dataset.mfiltro)));
document.addEventListener('click', (e)=>{
  const ver = e.target.closest('.ver-btn');
  const pedir = e.target.closest('.pedir-btn');
  if(ver){
    const item = itemsCarta.find(x=>x.id===ver.dataset.id);
    openModal(svgdish(item?.tone || '#f7ca18').replace('h-32','h-64'));
  }
  if(pedir){
    const item = itemsCarta.find(x=>x.id===pedir.dataset.id);
    addToCart(item, 1);
  }
  const quick = e.target.closest('[data-quick]');
  if(quick){
    const cat = quick.getAttribute('data-quick');
    const sel = {
      'Entradas': $('#selEntradas'),
      'Fuertes': $('#selFuertes'),
      'Postres': $('#selPostres'),
      'Bebidas': $('#selBebidas'),
    }[cat];
    const qty = parseInt({
      'Entradas': $('#qtyEntradas').value,
      'Fuertes': $('#qtyFuertes').value,
      'Postres': $('#qtyPostres').value,
      'Bebidas': $('#qtyBebidas').value,
    }[cat] || '1', 10);
    const id = sel.value;
    const item = itemsCarta.find(x=>x.id===id);
    if(item) addToCart(item, Math.max(1, qty));
  }
});
renderMenu('Todos');

// Llenar selects rápidos
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

// Carrito
let carrito = []; // {id, nombre, precio, qty}
function showPedido(show){ $('#pedido').classList.toggle('hidden', !show); }
function addToCart(prod, qty){
  const found = carrito.find(x=>x.id===prod.id);
  if(found){ found.qty += qty; } else { carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, qty }); }
  updateCarrito();
  showPedido(carrito.length>0);
  // Enfocar pedido
  $('#pedido').scrollIntoView({behavior:'smooth', block:'start'});
}
function updateCarrito(){
  const ul = $('#carrito');
  ul.innerHTML = '';
  carrito.forEach(item=>{
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between gap-2';
    li.innerHTML = `
      <div class="text-sm">
        <p class="font-semibold">${item.nombre}</p>
        <p class="text-white/70">$${item.precio.toFixed(2)} × ${item.qty}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="dec px-2 py-1 rounded-lg bg-white/10" aria-label="Reducir" data-id="${item.id}">−</button>
        <button class="inc px-2 py-1 rounded-lg bg-white/10" aria-label="Aumentar" data-id="${item.id}">+</button>
        <button class="rem px-2 py-1 rounded-lg bg-red-600/60 hover:bg-red-600" aria-label="Quitar" data-id="${item.id}">✕</button>
      </div>
    `;
    ul.appendChild(li);
  });
  const subtotal = carrito.reduce((s,i)=> s + i.precio * i.qty, 0);
  const zona = (new FormData($('#formDomi'))).get('zona') || 'centro';
  const envio = zona==='centro' ? 0 : 1.5;
  $('#subtotal').textContent = `$${subtotal.toFixed(2)}`;
  $('#envio').textContent = `$${envio.toFixed(2)}`;
  $('#total').textContent = `$${(subtotal+envio).toFixed(2)}`;
  const disable = carrito.length===0;
  $('#formDomi').querySelector('button[type="submit"]').disabled = disable;
  $('#btnWhatsapp').disabled = disable;
}
$('#carrito').addEventListener('click', (e)=>{
  const id = (e.target.dataset && e.target.dataset.id) || null;
  if(!id) return;
  const idx = carrito.findIndex(x=>x.id===id);
  if(idx<0) return;
  if(e.target.classList.contains('inc')) carrito[idx].qty++;
  if(e.target.classList.contains('dec')) carrito[idx].qty = Math.max(1, carrito[idx].qty-1);
  if(e.target.classList.contains('rem')) carrito.splice(idx,1);
  updateCarrito();
  showPedido(carrito.length>0);
});
$('#formDomi').addEventListener('change', updateCarrito);

// Geolocalización básica
$('#btnUbicacion').addEventListener('click', ()=>{
  const msg = $('#geoMsg');
  if(!navigator.geolocation){
    msg.textContent = 'Tu navegador no soporta ubicación.';
    return;
  }
  msg.textContent = 'Obteniendo ubicación...';
  navigator.geolocation.getCurrentPosition((pos)=>{
    const { latitude, longitude } = pos.coords;
    $('#direccion').value = `Ubicación actual: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} (añade referencia)`;
    msg.textContent = 'Ubicación añadida. Puedes agregar referencias.';
  }, (err)=>{
    msg.textContent = 'No se pudo obtener la ubicación. Revisa permisos.';
  }, { enableHighAccuracy: true, timeout: 10000 });
});

// Pedido submit + WhatsApp
$('#formDomi').addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const direccion = data.get('direccion');
  const zona = data.get('zona');
  const hora = data.get('hora') || 'próxima franja';
  const telefono = data.get('telefono');
  const total = $('#total').textContent;
  const detalle = carrito.map(i=> `${i.nombre} x${i.qty}`).join(', ');
  const msg = $('#domiMsg');
  msg.textContent = `¡Pedido confirmado! Entrega en ${direccion} (${zona}), ${hora}. Total ${total}. Detalle: ${detalle}. Te llamaremos al ${telefono} al llegar.`;
  msg.classList.remove('hidden');
  // Reset
  carrito = [];
  updateCarrito();
  showPedido(false);
  e.target.reset();
});

// WhatsApp prellenado (abre nueva pestaña)
$('#btnWhatsapp').addEventListener('click', ()=>{
  if(carrito.length===0) return;
  const total = $('#total').textContent;
  const detalle = carrito.map(i=> `${i.nombre} x${i.qty}`).join(', ');
  const direccion = $('#direccion').value || '(sin dirección)';
  const texto = encodeURIComponent(`Nuevo pedido - El Sabor Ecuatoriano\n${detalle}\nTotal: ${total}\nDirección: ${direccion}`);
  // Reemplaza 0000000000 por el número de tu equipo de pedidos si lo deseas
  const url = `https://wa.me/0000000000?text=${texto}`;
  window.open(url, '_blank');
});

// Galería
// CÓDIGO ACTUALIZADO PARA LA GALERÍA (PLACEHOLDERS)
const galleryData = [
  { id:'g1', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Plato+Fuerte', title:'Platos fuertes' },
  { id:'g2', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ceviche', title:'Ceviche fresco' },
  { id:'g3', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Bebida', title:'Bebidas naturales' },
  { id:'g4', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ambiente', title:'Nuestro ambiente' },
  { id:'g5', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Detalles', title:'Cuidamos los detalles' },
  { id:'g6', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Postre', title:'Postres caseros' },
  { id:'g7', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Ingredientes', title:'Ingredientes de calidad' },
  { id:'g8', imagen: 'https://placehold.co/600x600/121828/F7CA24?text=Cocina', title:'Nuestra cocina' },
];
// CÓDIGO ACTUALIZADO PARA RENDERIZAR LA GALERÍA
function renderGallery(){
  const grid = $('#galleryGrid');
  grid.innerHTML = '';
  galleryData.forEach(g=>{
    const tile = document.createElement('button');
    tile.className = 'group relative rounded-2xl overflow-hidden panel-soft hover:border-white/20';
    tile.innerHTML = `
      <div class="aspect-square">
        <img src="${g.imagen}" alt="Imagen de marcador para ${g.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      </div>
      <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition">
        <p class="font-semibold text-white">${g.title}</p>
      </div>
    `;
    tile.addEventListener('click', ()=> openModal(`<img src="${g.imagen}" alt="${g.title}" class="max-w-full max-h-[80vh] rounded-lg">`));
    grid.appendChild(tile);
  });
}
renderGallery();

// Opiniones carrusel
const slides = $$('.review-slide');
let startIndex = 0;
function updateReviews(){
  slides.forEach((el,i)=> el.classList.toggle('hidden', !(i>=startIndex && i<startIndex+3)));
}
$('#prevReview').addEventListener('click', ()=>{ startIndex = (startIndex - 1 + slides.length) % slides.length; updateReviews(); });
$('#nextReview').addEventListener('click', ()=>{ startIndex = (startIndex + 1) % slides.length; updateReviews(); });
updateReviews();

// Agregar opinión
$('#formOpinion').addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = data.get('nombre') || 'Anónimo';
  const rating = data.get('rating') || '⭐️⭐️⭐️⭐️';
  const comentario = data.get('comentario') || '';
  const card = document.createElement('div');
  card.className = 'review-slide panel-soft p-6 rounded-2xl hidden';
  card.innerHTML = `
    <p class="text-lg">“${comentario.replace(/"/g,'&quot;')}”</p>
    <div class="mt-4 flex items-center justify-between">
      <span class="text-white/70">${nombre}</span>
      <span>${rating}</span>
    </div>
  `;
  $('#opiniones .grid').appendChild(card);
  slides.push(card);
  $('#opMsg').classList.remove('hidden');
  e.target.reset();
  updateReviews();
});

// Reservas (demo local)
$('#formReserva').addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = data.get('nombre');
  const fecha = data.get('fecha');
  const hora = data.get('hora');
  const personas = data.get('personas');
  const tel = data.get('telefono');
  const msg = $('#reservaMsg');
  msg.textContent = `¡Gracias, ${nombre}! Tu mesa para ${personas} queda reservada el ${fecha} a las ${hora}. Te llamaremos al ${tel}.`;
  msg.classList.remove('hidden');
  // WhatsApp prellenado (configura tu número)
  const mensajeWA = encodeURIComponent(`Reserva - El Sabor Ecuatoriano\nNombre: ${nombre}\nPersonas: ${personas}\nFecha: ${fecha}\nHora: ${hora}\nTel: ${tel}`);
  const urlWA = `https://wa.me/?text=${mensajeWA}`;
  window.open(urlWA, '_blank');
});

// Poblado inicial de Menú y año
$('#year').textContent = new Date().getFullYear();

