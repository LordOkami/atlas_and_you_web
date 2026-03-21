import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_R-mCtSvX.mjs';
import { r as renderScript } from './script_CR0TixR0.mjs';
import { $ as $$StoreLayout } from './StoreLayout_CC5qn-t8.mjs';

const $$Carrito = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Tu carrito — Atlas&You" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto px-4 py-10"> <h1 class="text-3xl font-bold text-stone-900 mb-8">Tu carrito</h1> <div id="cart-empty" class="hidden text-center py-20 text-stone-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> <p class="text-xl font-medium mb-2">Tu carrito está vacío</p> <p class="text-sm mb-6">¡Descubre nuestras joyas artesanales!</p> <a href="/tienda" class="inline-block bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-3 rounded-full transition-colors">
Ir a la tienda
</a> </div> <div id="cart-content" class="hidden grid md:grid-cols-3 gap-8"> <!-- Lista de items --> <div class="md:col-span-2"> <div id="cart-items" class="space-y-4"></div> </div> <!-- Resumen --> <div> <div class="bg-white rounded-2xl border border-stone-200 p-6 sticky top-24"> <h2 class="font-bold text-stone-900 text-lg mb-6">Resumen</h2> <div class="space-y-3 text-sm"> <div class="flex justify-between"> <span class="text-stone-500">Subtotal</span> <span id="subtotal" class="font-medium">0,00€</span> </div> <div class="flex justify-between"> <span class="text-stone-500">Envío</span> <span class="text-stone-400">Calculado al pagar</span> </div> <div class="flex justify-between"> <span class="text-stone-500">IVA (21%)</span> <span id="tax" class="font-medium">0,00€</span> </div> <div class="border-t border-stone-200 pt-3 flex justify-between font-bold text-stone-900 text-base"> <span>Total</span> <span id="total">0,00€</span> </div> </div> <!-- Código descuento --> <div class="mt-6"> <label class="block text-xs font-medium text-stone-500 mb-2">Código de descuento</label> <div class="flex gap-2"> <input type="text" id="discount-code" placeholder="CODIGO" class="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase"> <button id="apply-discount" class="bg-stone-200 hover:bg-stone-300 text-stone-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
Aplicar
</button> </div> <p id="discount-msg" class="text-xs mt-1 hidden"></p> </div> <a href="/checkout" id="checkout-btn" class="mt-6 w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-4 rounded-xl text-center block transition-colors">
Proceder al pago
</a> <p class="text-xs text-stone-400 text-center mt-3">Pago seguro con Stripe</p> </div> </div> </div> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/carrito.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/carrito.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/carrito.astro";
const $$url = "/carrito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Carrito,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
