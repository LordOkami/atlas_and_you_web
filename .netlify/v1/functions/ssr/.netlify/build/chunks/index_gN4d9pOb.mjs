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
  let zones = [];
  {
    zones = [
      { id: "zone1", name: "España", countries: ["ES", "AD", "GI"], shipping_rates: [
        { id: "r1", carrier: "Correos", name: "Estándar", rate: 3.5, free_from_amount: 50, estimated_days: "3-5 días hábiles" },
        { id: "r2", carrier: "MRW", name: "Express 24h", rate: 6.9, free_from_amount: null, estimated_days: "1 día hábil" }
      ] },
      { id: "zone2", name: "Europa", countries: ["PT", "FR", "DE", "IT"], shipping_rates: [
        { id: "r3", carrier: "Correos", name: "Internacional", rate: 8.5, free_from_amount: 80, estimated_days: "7-15 días hábiles" }
      ] }
    ];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Envíos — Atlas&You", "currentPage": "envios" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <div> <h2 class="text-xl font-bold text-stone-800">Zonas y tarifas de envío</h2> <p class="text-stone-400 text-sm">Configura las opciones de envío para tus clientes</p> </div> <button id="new-zone-btn" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nueva zona
</button> </div>  <div id="zone-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"> <div class="bg-white rounded-2xl p-6 w-full max-w-md"> <h3 class="font-bold text-stone-800 text-lg mb-4">Nueva zona de envío</h3> <form id="zone-form" class="space-y-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Nombre de la zona</label> <input type="text" name="name" required placeholder="España peninsular" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Países (códigos ISO, separados por coma)</label> <input type="text" name="countries" placeholder="ES, AD, GI" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> <p class="text-xs text-stone-400 mt-1">Ejemplos: ES (España), PT (Portugal), FR (Francia), DE (Alemania)</p> </div> <div class="flex gap-3"> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2 rounded-lg text-sm">Crear zona</button> <button type="button" id="cancel-zone" class="border border-stone-300 text-stone-600 font-medium px-5 py-2 rounded-lg text-sm">Cancelar</button> </div> </form> </div> </div>  <div class="space-y-6"> ${zones?.map((zone) => renderTemplate`<div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="px-6 py-4 bg-stone-50 flex items-center justify-between border-b border-stone-200"> <div> <h3 class="font-bold text-stone-800">${zone.name}</h3> <p class="text-xs text-stone-400 mt-0.5">Países: ${zone.countries?.join(", ")}</p> </div> <button class="add-rate-btn text-amber-700 hover:text-amber-800 text-sm font-medium"${addAttribute(zone.id, "data-zone-id")}${addAttribute(zone.name, "data-zone-name")}>
+ Añadir tarifa
</button> </div> <table class="w-full text-sm"> <thead class="text-xs text-stone-400 uppercase"> <tr> <th class="px-6 py-2 text-left">Transportista</th> <th class="px-6 py-2 text-left">Nombre</th> <th class="px-6 py-2 text-left">Precio</th> <th class="px-6 py-2 text-left">Gratis desde</th> <th class="px-6 py-2 text-left">Plazo</th> <th class="px-6 py-2"></th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${zone.shipping_rates?.map((rate) => renderTemplate`<tr class="hover:bg-stone-50"> <td class="px-6 py-3 font-medium text-stone-800">${rate.carrier}</td> <td class="px-6 py-3 text-stone-600">${rate.name}</td> <td class="px-6 py-3 font-bold text-stone-900">${rate.rate.toFixed(2)}€</td> <td class="px-6 py-3 text-stone-500">${rate.free_from_amount ? `${rate.free_from_amount}€` : "—"}</td> <td class="px-6 py-3 text-stone-500">${rate.estimated_days || "—"}</td> <td class="px-6 py-3"> <button class="delete-rate text-stone-300 hover:text-red-500 text-xs"${addAttribute(rate.id, "data-rate-id")}>Eliminar</button> </td> </tr>`)} </tbody> </table> ${(!zone.shipping_rates || zone.shipping_rates.length === 0) && renderTemplate`<p class="px-6 py-6 text-center text-stone-400 text-sm">No hay tarifas en esta zona</p>`} </div>`)} ${(!zones || zones.length === 0) && renderTemplate`<div class="text-center py-20 text-stone-400"> <p class="text-lg font-medium mb-2">No hay zonas de envío</p> <p class="text-sm">Crea una zona para empezar a configurar los envíos</p> </div>`} </div>  <div id="rate-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"> <div class="bg-white rounded-2xl p-6 w-full max-w-md"> <h3 class="font-bold text-stone-800 text-lg mb-1">Nueva tarifa de envío</h3> <p id="rate-modal-zone" class="text-sm text-stone-400 mb-4"></p> <form id="rate-form" class="space-y-4"> <input type="hidden" name="zone_id" id="rate-zone-id"> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Transportista</label> <select name="carrier" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> <option>Correos</option> <option>MRW</option> <option>GLS</option> <option>SEUR</option> <option>DHL</option> <option>DPD</option> <option>Otro</option> </select> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Nombre del servicio</label> <input type="text" name="name" placeholder="Estándar" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Precio (€)</label> <input type="number" name="rate" required min="0" step="0.01" value="0" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Gratis desde (€)</label> <input type="number" name="free_from_amount" min="0" step="0.01" placeholder="50" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Plazo de entrega</label> <input type="text" name="estimated_days" placeholder="2-3 días hábiles" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div class="flex gap-3"> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-medium px-5 py-2 rounded-lg text-sm">Crear tarifa</button> <button type="button" id="cancel-rate" class="border border-stone-300 text-stone-600 font-medium px-5 py-2 rounded-lg text-sm">Cancelar</button> </div> </form> </div> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/envios/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/envios/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/envios/index.astro";
const $$url = "/admin/envios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
