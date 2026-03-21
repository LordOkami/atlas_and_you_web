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
  const s = {};
  {
    s.store_name = "Atlas&You";
    s.store_email = "hola@atlasandyou.es";
    s.free_shipping_threshold = "50";
    s.low_stock_threshold = "3";
    s.store_description = "Joyería artesanal única hecha con arcilla polimérica y resina.";
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Configuración — Atlas&You", "currentPage": "configuracion" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl"> <h2 class="text-xl font-bold text-stone-800 mb-6">Configuración general</h2> <form id="settings-form" class="space-y-6"> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">Datos de la tienda</h3> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Nombre de la tienda</label> <input type="text" name="store_name"${addAttribute(s.store_name || "Atlas&You", "value")} class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Email de contacto</label> <input type="email" name="store_email"${addAttribute(s.store_email || "", "value")} class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Teléfono de contacto</label> <input type="tel" name="store_phone"${addAttribute(s.store_phone || "", "value")} class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Instagram</label> <input type="text" name="instagram"${addAttribute(s.instagram || "", "value")} placeholder="@atlasandyou" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">Envío y pedidos</h3> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Envío gratis a partir de (€)</label> <input type="number" name="free_shipping_threshold"${addAttribute(s.free_shipping_threshold || "50", "value")} min="0" step="0.01" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Stock mínimo para alerta</label> <input type="number" name="low_stock_threshold"${addAttribute(s.low_stock_threshold || "3", "value")} min="1" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <label class="flex items-center gap-3 cursor-pointer"> <input type="checkbox" name="allow_out_of_stock_orders" class="w-4 h-4 rounded accent-amber-700"${addAttribute(s.allow_out_of_stock_orders === "true", "checked")}> <span class="text-sm text-stone-700">Permitir pedidos de productos sin stock (lista de espera)</span> </label> </div> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">SEO y metadatos</h3> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Descripción de la tienda</label> <textarea name="store_description" rows="3" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none">${s.store_description || "Joyería artesanal única hecha con arcilla polimérica y resina."}</textarea> </div> </div> <p id="settings-msg" class="text-green-600 text-sm hidden">✓ Configuración guardada</p> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
Guardar cambios
</button> </form> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/configuracion/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/configuracion/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/configuracion/index.astro";
const $$url = "/admin/configuracion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
