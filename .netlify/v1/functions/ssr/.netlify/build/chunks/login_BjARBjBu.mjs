import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { h as renderHead, r as renderTemplate } from './ssr-function_R-mCtSvX.mjs';
import 'clsx';
import { r as renderScript } from './script_CR0TixR0.mjs';
/* empty css                 */

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const cookie = Astro2.request.headers.get("cookie") || "";
  if (cookie.includes("fb_session")) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin — Atlas&You</title>${renderHead()}</head> <body class="bg-stone-100 min-h-screen flex items-center justify-center"> <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"> <div class="text-center mb-8"> <h1 class="text-2xl font-bold text-stone-900">Atlas<span class="text-amber-700">&You</span></h1> <p class="text-stone-500 text-sm mt-1">Panel de administración</p> </div> <form id="login-form" class="space-y-4"> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Email</label> <input type="email" id="email" required class="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="admin@atlasandyou.es"> </div> <div> <label class="block text-sm font-medium text-stone-700 mb-1">Contraseña</label> <input type="password" id="password" required class="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <p id="error-msg" class="text-red-500 text-sm hidden"></p> <button type="submit" class="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition-colors">
Entrar
</button> </form> </div> ${renderScript($$result, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/login.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
