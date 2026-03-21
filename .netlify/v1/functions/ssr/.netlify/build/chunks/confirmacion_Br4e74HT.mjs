import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_R-mCtSvX.mjs';
import { r as renderScript } from './script_CR0TixR0.mjs';
import { $ as $$StoreLayout } from './StoreLayout_CC5qn-t8.mjs';

const $$Confirmacion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Confirmacion;
  const sessionId = Astro2.url.searchParams.get("session_id");
  if (!sessionId) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Pedido confirmado — Atlas&You" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto px-4 py-20 text-center"> <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-3xl font-bold text-stone-900 mb-3">¡Pedido confirmado!</h1> <p class="text-stone-500 text-lg mb-8">
Gracias por tu compra. Recibirás un email de confirmación en breve con todos los detalles de tu pedido.
</p> <div class="bg-amber-50 rounded-2xl p-6 mb-8 text-left"> <h2 class="font-bold text-stone-800 mb-3">¿Qué pasa ahora?</h2> <ol class="space-y-2 text-stone-600 text-sm"> <li class="flex gap-3"> <span class="w-6 h-6 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> <span>Recibirás un email con la confirmación de tu pedido</span> </li> <li class="flex gap-3"> <span class="w-6 h-6 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> <span>Prepararemos tu pedido artesanalmente (1-2 días)</span> </li> <li class="flex gap-3"> <span class="w-6 h-6 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> <span>Te enviaremos el número de seguimiento cuando se envíe</span> </li> </ol> </div> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/tienda" class="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-3 rounded-full transition-colors">
Seguir comprando
</a> <a href="/" class="border border-stone-300 hover:border-stone-400 text-stone-700 font-semibold px-8 py-3 rounded-full transition-colors">
Volver al inicio
</a> </div> </div> ${renderScript($$result2, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/checkout/confirmacion.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/checkout/confirmacion.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/checkout/confirmacion.astro";
const $$url = "/checkout/confirmacion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Confirmacion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
