import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_R-mCtSvX.mjs';
import { $ as $$StoreLayout } from './StoreLayout_CC5qn-t8.mjs';
import { $ as $$ProductCard } from './ProductCard_Bxs82nsX.mjs';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';
import { a as mockProducts, m as mockCategories } from './mock-data_B8-QzGzS.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const categoria = Astro2.url.searchParams.get("categoria");
  const busqueda = Astro2.url.searchParams.get("q");
  let products = [];
  let categories = [];
  {
    categories = mockCategories;
    products = mockProducts.filter((p) => p.active);
    if (categoria) {
      const cat = mockCategories.find((c) => c.slug === categoria);
      if (cat) products = products.filter((p) => p.category_id === cat.id);
    }
    if (busqueda) {
      products = products.filter((p) => p.name.toLowerCase().includes(busqueda.toLowerCase()));
    }
  }
  const activeCategory = categories.find((c) => c.slug === categoria);
  const pageTitle = activeCategory ? `${activeCategory.name} — Atlas&You` : "Toda la colección — Atlas&You";
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": pageTitle }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div style="background:#FFFFFF;border-bottom:1px solid #E7E5E4;"> <div class="max-w-7xl mx-auto px-6 py-12"> <!-- Breadcrumb --> <nav class="flex items-center gap-2 text-[11px] font-medium tracking-wide uppercase text-stone-400 mb-6"> <a href="/" class="hover:text-stone-700 transition-colors">Inicio</a> <span>/</span> <span class="text-stone-700">${activeCategory ? activeCategory.name : "Tienda"}</span> </nav> <!-- Title + search --> <div class="flex flex-col md:flex-row md:items-end justify-between gap-6"> <div> <h1 class="font-serif text-4xl md:text-5xl text-stone-900" style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;"> ${activeCategory ? activeCategory.name : "Toda la colección"} </h1> <p class="text-stone-400 text-sm mt-2">${products.length} ${products.length === 1 ? "pieza" : "piezas"}</p> </div> <!-- Search --> <form method="get" action="/tienda" class="w-full md:w-72"> ${categoria && renderTemplate`<input type="hidden" name="categoria"${addAttribute(categoria, "value")}>`} <div class="relative"> <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> <input type="text" name="q"${addAttribute(busqueda || "", "value")} placeholder="Buscar joyas..." class="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 bg-stone-50 outline-none focus:border-stone-400 focus:bg-white transition-colors" style="border-radius:0;"> </div> </form> </div> <!-- Category pills --> <div class="flex flex-wrap gap-2 mt-8"> <a href="/tienda" class="inline-flex items-center px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-150"${addAttribute(!categoria ? "background:#1C1917;color:#FFFFFF;" : "background:transparent;color:#78716C;border:1px solid #E7E5E4;", "style")}>
Todo
</a> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/tienda?categoria=${cat.slug}`, "href")} class="inline-flex items-center px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-150 hover:border-stone-400"${addAttribute(categoria === cat.slug ? "background:#1C1917;color:#FFFFFF;" : "background:transparent;color:#78716C;border:1px solid #E7E5E4;", "style")}> ${cat.name} </a>`)} </div> </div> </div>  <div class="max-w-7xl mx-auto px-6 py-14"> ${products.length > 0 ? renderTemplate`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })}`)} </div>` : renderTemplate`<div class="flex flex-col items-center justify-center py-28 text-center"> <div class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6"> <svg class="w-7 h-7 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <h2 class="font-serif text-2xl text-stone-700 mb-2" style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;">
Sin resultados
</h2> <p class="text-sm text-stone-400 mb-6">Prueba con otra categoría o término de búsqueda</p> <a href="/tienda" class="text-[11px] font-medium tracking-widest uppercase text-stone-600 hover:text-stone-900 transition-colors border-b border-stone-300">
Ver toda la colección
</a> </div>`} </div> ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/tienda/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/tienda/index.astro";
const $$url = "/tienda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
