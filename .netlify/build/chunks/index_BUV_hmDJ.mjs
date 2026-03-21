import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderTemplate, g as renderComponent, e as addAttribute } from './ssr-function_R-mCtSvX.mjs';
import { r as requireAdmin, $ as $$AdminLayout } from './auth_Bz7scp1I.mjs';
import 'clsx';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';
import { m as mockCategories, a as mockProducts } from './mock-data_B8-QzGzS.mjs';

const $$StockBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StockBadge;
  const { stock } = Astro2.props;
  return renderTemplate`${stock === 0 && renderTemplate`${maybeRenderHead()}<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Agotado</span>`}${stock > 0 && stock <= 3 && renderTemplate`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Stock bajo (${stock})</span>`}${stock > 3 && renderTemplate`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">${stock} en stock</span>`}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/components/admin/StockBadge.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = await requireAdmin(Astro2.request);
  if (user instanceof Response) return user;
  let products = [];
  let categoryMap = {};
  {
    products = mockProducts;
    categoryMap = Object.fromEntries(mockCategories.map((c) => [c.id, c.name]));
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos — Atlas&You", "currentPage": "productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <div> <h2 class="text-xl font-bold text-stone-800">Productos</h2> <p class="text-stone-400 text-sm">${products?.length || 0} productos en total</p> </div> <a href="/admin/productos/nuevo" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nuevo producto
</a> </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">Producto</th> <th class="px-6 py-3 text-left font-medium">Categoría</th> <th class="px-6 py-3 text-left font-medium">Precio</th> <th class="px-6 py-3 text-left font-medium">Stock</th> <th class="px-6 py-3 text-left font-medium">Estado</th> <th class="px-6 py-3 text-left font-medium">Acciones</th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${products?.map((product) => renderTemplate`<tr class="hover:bg-stone-50 transition-colors"> <td class="px-6 py-4"> <div class="flex items-center gap-3"> <div class="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0"> ${product.images?.[0] && renderTemplate`<img${addAttribute(product.images[0], "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover">`} </div> <div> <p class="font-medium text-stone-800">${product.name}</p> <p class="text-stone-400 text-xs">${product.sku || "—"}</p> </div> </div> </td> <td class="px-6 py-4 text-stone-500">${categoryMap[product.category_id] || "—"}</td> <td class="px-6 py-4 font-medium text-stone-900">${product.price.toFixed(2)}€</td> <td class="px-6 py-4">${renderComponent($$result2, "StockBadge", $$StockBadge, { "stock": product.stock })}</td> <td class="px-6 py-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.active ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`, "class")}> ${product.active ? "Activo" : "Inactivo"} </span> ${product.featured && renderTemplate`<span class="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
Destacado
</span>`} </td> <td class="px-6 py-4"> <div class="flex items-center gap-2"> <a${addAttribute(`/admin/productos/${product.id}`, "href")} class="text-amber-700 hover:text-amber-800 text-xs font-medium">Editar</a> <a${addAttribute(`/tienda/${product.slug}`, "href")} target="_blank" class="text-stone-400 hover:text-stone-600 text-xs">Ver →</a> </div> </td> </tr>`)} </tbody> </table> ${(!products || products.length === 0) && renderTemplate`<div class="text-center py-16 text-stone-400"> <p class="text-lg font-medium mb-2">No hay productos</p> <a href="/admin/productos/nuevo" class="text-amber-700 hover:text-amber-800 text-sm font-medium">Crear el primer producto →</a> </div>`} </div> </div> ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/productos/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/productos/index.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
