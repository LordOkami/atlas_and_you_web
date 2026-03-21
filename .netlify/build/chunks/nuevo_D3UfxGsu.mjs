import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_R-mCtSvX.mjs';
import { r as renderScript } from './script_CR0TixR0.mjs';
import { r as requireAdmin, $ as $$AdminLayout } from './auth_Bz7scp1I.mjs';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';
import { m as mockCategories } from './mock-data_B8-QzGzS.mjs';

const $$Nuevo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Nuevo;
  const user = await requireAdmin(Astro2.request);
  if (user instanceof Response) return user;
  let categories = [];
  {
    categories = mockCategories;
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuevo producto — Atlas&You", "currentPage": "productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl"> <div class="flex items-center gap-3 mb-6"> <a href="/admin/productos" class="text-stone-400 hover:text-stone-600">← Volver</a> <h2 class="text-xl font-bold text-stone-800">Nuevo producto</h2> </div> <form id="product-form" class="space-y-6"> <!-- Info básica --> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">Información básica</h3> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Nombre del producto *</label> <input type="text" name="name" required class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Descripción</label> <textarea name="description" rows="4" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Categoría</label> <select name="category_id" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> <option value="">Sin categoría</option> ${categories?.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}>${cat.name}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">SKU / Referencia</label> <input type="text" name="sku" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Etiquetas (separadas por coma)</label> <input type="text" name="tags" placeholder="arcilla, pendientes, floral" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <!-- Precio y stock --> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">Precio y stock</h3> <div class="grid grid-cols-3 gap-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Precio (€) *</label> <input type="number" name="price" required min="0" step="0.01" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Precio tachado (€)</label> <input type="number" name="compare_at_price" min="0" step="0.01" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Stock *</label> <input type="number" name="stock" required min="0" value="1" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Peso (gramos, para calcular envío)</label> <input type="number" name="weight_grams" min="0" value="50" class="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <!-- Imágenes (URLs Cloudinary) --> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-4"> <h3 class="font-semibold text-stone-700">Imágenes</h3> <p class="text-xs text-stone-400">Sube las imágenes a Cloudinary y pega las URLs aquí. La primera imagen será la principal.</p> <div id="image-inputs" class="space-y-2"> <div class="flex gap-2"> <input type="url" name="images[]" placeholder="https://res.cloudinary.com/..." class="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <button type="button" id="add-image" class="text-sm text-amber-700 hover:text-amber-800 font-medium">+ Añadir otra imagen</button> </div> <!-- Opciones --> <div class="bg-white rounded-xl border border-stone-200 p-6 space-y-3"> <h3 class="font-semibold text-stone-700">Opciones de visibilidad</h3> <label class="flex items-center gap-3 cursor-pointer"> <input type="checkbox" name="active" checked class="w-4 h-4 rounded accent-amber-700"> <span class="text-sm text-stone-700">Producto activo (visible en la tienda)</span> </label> <label class="flex items-center gap-3 cursor-pointer"> <input type="checkbox" name="featured" class="w-4 h-4 rounded accent-amber-700"> <span class="text-sm text-stone-700">Destacar en la página de inicio</span> </label> </div> <p id="form-error" class="text-red-500 text-sm hidden"></p> <div class="flex gap-3"> <button type="submit" class="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
Crear producto
</button> <a href="/admin/productos" class="border border-stone-300 hover:border-stone-400 text-stone-600 font-medium px-6 py-3 rounded-xl transition-colors">
Cancelar
</a> </div> </form> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/productos/nuevo.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/productos/nuevo.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/productos/nuevo.astro";
const $$url = "/admin/productos/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nuevo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
