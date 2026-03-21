import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_R-mCtSvX.mjs';
import { r as requireAdmin, $ as $$AdminLayout } from './auth_Bz7scp1I.mjs';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = await requireAdmin(Astro2.request);
  if (user instanceof Response) return user;
  let rawOrders = [];
  {
    rawOrders = [
      { customer_email: "maria@ejemplo.es", customer_name: "María García", customer_phone: "+34 600 000 000", total: 37.5, created_at: /* @__PURE__ */ new Date() },
      { customer_email: "laura@ejemplo.es", customer_name: "Laura Martínez", customer_phone: null, total: 52, created_at: new Date(Date.now() - 864e5) },
      { customer_email: "maria@ejemplo.es", customer_name: "María García", customer_phone: "+34 600 000 000", total: 18, created_at: new Date(Date.now() - 1728e5) }
    ];
  }
  const customerMap = /* @__PURE__ */ new Map();
  rawOrders.forEach((order) => {
    const existing = customerMap.get(order.customer_email);
    if (existing) {
      existing.total_orders++;
      existing.total_spent += order.total;
      const orderDate = order.created_at?.toDate?.() || new Date(order.created_at);
      const existingDate = existing.last_order?.toDate?.() || new Date(existing.last_order);
      if (orderDate > existingDate) {
        existing.last_order = order.created_at;
      }
    } else {
      customerMap.set(order.customer_email, {
        email: order.customer_email,
        name: order.customer_name,
        phone: order.customer_phone,
        total_orders: 1,
        total_spent: order.total,
        last_order: order.created_at
      });
    }
  });
  const uniqueCustomers = Array.from(customerMap.values()).sort((a, b) => b.total_spent - a.total_spent);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Clientes — Atlas&You", "currentPage": "clientes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-6"> <h2 class="text-xl font-bold text-stone-800">Clientes</h2> <p class="text-stone-400 text-sm">${uniqueCustomers.length} clientes</p> </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">Cliente</th> <th class="px-6 py-3 text-left font-medium">Pedidos</th> <th class="px-6 py-3 text-left font-medium">Total gastado</th> <th class="px-6 py-3 text-left font-medium">Último pedido</th> <th class="px-6 py-3 text-left font-medium">Acciones</th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${uniqueCustomers.map((customer) => renderTemplate`<tr class="hover:bg-stone-50"> <td class="px-6 py-4"> <p class="font-medium text-stone-800">${customer.name}</p> <p class="text-stone-400 text-xs">${customer.email}</p> </td> <td class="px-6 py-4 text-stone-700">${customer.total_orders}</td> <td class="px-6 py-4 font-bold text-stone-900">${customer.total_spent.toFixed(2)}€</td> <td class="px-6 py-4 text-stone-400 text-xs"> ${new Date(customer.last_order?.toDate?.() || customer.last_order).toLocaleDateString("es-ES")} </td> <td class="px-6 py-4"> <a${addAttribute(`/admin/pedidos?cliente=${customer.email}`, "href")} class="text-amber-700 hover:text-amber-800 text-xs font-medium">
Ver pedidos →
</a> </td> </tr>`)} </tbody> </table> ${uniqueCustomers.length === 0 && renderTemplate`<p class="text-center py-16 text-stone-400 text-sm">No hay clientes todavía</p>`} </div> </div> ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/clientes/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/clientes/index.astro";
const $$url = "/admin/clientes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
