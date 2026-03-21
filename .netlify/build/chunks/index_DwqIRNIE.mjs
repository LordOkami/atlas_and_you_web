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
  let taxRates = [];
  {
    taxRates = [{ id: "es", name: "IVA España (21%)", country: "ES", rate_percentage: 21 }];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Impuestos — Atlas&You", "currentPage": "impuestos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <div> <h2 class="text-xl font-bold text-stone-800">Gestión de IVA</h2> <p class="text-stone-400 text-sm">Configura los tipos de IVA por país</p> </div> <button id="new-tax-btn" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
+ Nueva tasa
</button> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> <div class="bg-amber-50 border border-amber-200 rounded-xl p-5"> <h3 class="font-bold text-amber-900 mb-2">España — IVA estándar 21%</h3> <p class="text-amber-700 text-sm">Los precios en la tienda incluyen IVA. El 21% se aplica automáticamente a todos los pedidos nacionales.</p> </div> <div class="bg-stone-50 border border-stone-200 rounded-xl p-5"> <h3 class="font-bold text-stone-800 mb-2">OSS — Ventas intracomunitarias</h3> <p class="text-stone-500 text-sm">Para ventas a otros países de la UE, se aplica el IVA del país destino. Consulta con tu asesor fiscal cuando superes los 10.000€ anuales en ventas a la UE.</p> </div> </div>  <div id="tax-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"> <div class="bg-white rounded-2xl p-6 w-full max-w-sm"> <h3 class="font-bold text-stone-800 text-lg mb-4">Nueva tasa de IVA</h3> <form id="tax-form" class="space-y-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Nombre</label> <input type="text" name="name" required placeholder="IVA España" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Código de país (ISO)</label> <input type="text" name="country" required placeholder="ES" maxlength="2" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Tipo (%)</label> <input type="number" name="rate_percentage" required min="0" max="100" step="0.1" value="21" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div class="flex gap-3"> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2 rounded-lg text-sm">Crear</button> <button type="button" id="cancel-tax" class="border border-stone-300 text-stone-600 font-medium px-5 py-2 rounded-lg text-sm">Cancelar</button> </div> </form> </div> </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">País</th> <th class="px-6 py-3 text-left font-medium">Nombre</th> <th class="px-6 py-3 text-left font-medium">Tipo IVA</th> <th class="px-6 py-3"></th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${taxRates?.map((rate) => renderTemplate`<tr class="hover:bg-stone-50"> <td class="px-6 py-4 font-mono font-bold text-stone-900">${rate.country}</td> <td class="px-6 py-4 text-stone-700">${rate.name}</td> <td class="px-6 py-4 font-bold text-stone-900">${rate.rate_percentage}%</td> <td class="px-6 py-4"> <button class="delete-tax text-xs text-stone-300 hover:text-red-500"${addAttribute(rate.id, "data-id")}>Eliminar</button> </td> </tr>`)} </tbody> </table> ${(!taxRates || taxRates.length === 0) && renderTemplate`<p class="text-center py-10 text-stone-400 text-sm">No hay tasas configuradas. Se aplicará 21% por defecto.</p>`} </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/impuestos/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/impuestos/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/impuestos/index.astro";
const $$url = "/admin/impuestos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
