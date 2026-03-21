import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_R-mCtSvX.mjs';
import { r as renderScript } from './script_CR0TixR0.mjs';
import { r as requireAdmin, $ as $$AdminLayout } from './auth_Bz7scp1I.mjs';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = await requireAdmin(Astro2.request);
  if (user instanceof Response) return user;
  let discounts = [];
  {
    discounts = [
      { id: "d1", code: "BIENVENIDA10", type: "percentage", value: 10, min_order_amount: null, used_count: 0, max_uses: null, valid_until: null, active: true },
      { id: "d2", code: "ENVIOGRATIS", type: "free_shipping", value: 0, min_order_amount: 30, used_count: 3, max_uses: null, valid_until: null, active: true }
    ];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Descuentos — Atlas&You", "currentPage": "descuentos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <div> <h2 class="text-xl font-bold text-stone-800">Códigos de descuento</h2> <p class="text-stone-400 text-sm">${discounts?.length || 0} códigos</p> </div> <button id="new-discount-btn" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nuevo código
</button> </div>  <div id="discount-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"> <div class="bg-white rounded-2xl p-6 w-full max-w-md"> <h3 class="font-bold text-stone-800 text-lg mb-4">Nuevo código de descuento</h3> <form id="discount-form" class="space-y-4"> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Código</label> <input type="text" name="code" required placeholder="VERANO20" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Tipo</label> <select name="type" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> <option value="percentage">% de descuento</option> <option value="fixed">Importe fijo (€)</option> <option value="free_shipping">Envío gratis</option> </select> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Valor (% o €)</label> <input type="number" name="value" min="0" step="0.01" value="10" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Pedido mínimo (€)</label> <input type="number" name="min_order_amount" min="0" step="0.01" placeholder="0" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Usos máximos</label> <input type="number" name="max_uses" min="1" placeholder="Sin límite" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Fecha expiración</label> <input type="date" name="valid_until" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div class="flex gap-3"> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2 rounded-lg text-sm">Crear código</button> <button type="button" id="cancel-discount" class="border border-stone-300 text-stone-600 font-medium px-5 py-2 rounded-lg text-sm">Cancelar</button> </div> </form> </div> </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">Código</th> <th class="px-6 py-3 text-left font-medium">Tipo</th> <th class="px-6 py-3 text-left font-medium">Valor</th> <th class="px-6 py-3 text-left font-medium">Usos</th> <th class="px-6 py-3 text-left font-medium">Expira</th> <th class="px-6 py-3 text-left font-medium">Estado</th> <th class="px-6 py-3"></th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${discounts?.map((d) => renderTemplate`<tr class="hover:bg-stone-50"> <td class="px-6 py-4 font-mono font-bold text-stone-900">${d.code}</td> <td class="px-6 py-4 text-stone-600"> ${d.type === "percentage" ? "Porcentaje" : d.type === "fixed" ? "Fijo" : "Envío gratis"} </td> <td class="px-6 py-4 font-medium text-stone-900"> ${d.type === "percentage" ? `${d.value}%` : d.type === "fixed" ? `${d.value}€` : "—"} </td> <td class="px-6 py-4 text-stone-500"> ${d.used_count || 0}${d.max_uses ? ` / ${d.max_uses}` : " / ∞"} </td> <td class="px-6 py-4 text-stone-400 text-xs"> ${d.valid_until ? new Date(d.valid_until).toLocaleDateString("es-ES") : "Sin límite"} </td> <td class="px-6 py-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${d.active ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`, "class")}> ${d.active ? "Activo" : "Inactivo"} </span> </td> <td class="px-6 py-4"> <button class="toggle-discount text-xs font-medium text-amber-700 hover:text-amber-800"${addAttribute(d.id, "data-id")}${addAttribute(d.active, "data-active")}> ${d.active ? "Desactivar" : "Activar"} </button> </td> </tr>`)} </tbody> </table> </div> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/descuentos/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/descuentos/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/descuentos/index.astro";
const $$url = "/admin/descuentos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
