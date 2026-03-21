import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, r as renderTemplate, g as renderComponent } from './ssr-function_R-mCtSvX.mjs';
import { r as requireAdmin, $ as $$AdminLayout } from './auth_Bz7scp1I.mjs';
import 'clsx';
import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const $$StatsCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StatsCard;
  const { title, value, change, positive, icon } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white rounded-xl p-6 shadow-sm border border-stone-200"> <div class="flex items-center justify-between mb-4"> <span class="text-stone-500 text-sm font-medium">${title}</span> <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(icon, "d")}></path> </svg> </div> </div> <div class="text-3xl font-bold text-stone-900">${value}</div> ${change && renderTemplate`<p${addAttribute(`text-sm mt-1 ${positive ? "text-green-600" : "text-red-500"}`, "class")}> ${positive ? "↑" : "↓"} ${change} vs mes anterior
</p>`} </div>`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/components/admin/StatsCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = await requireAdmin(Astro2.request);
  if (user instanceof Response) return user;
  const now = /* @__PURE__ */ new Date();
  new Date(now.getFullYear(), now.getMonth(), 1);
  new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let monthRevenue = 0, todayCount = 0, pendingCount = 0, lowStockCount = 0;
  let recentOrders = [];
  let lowStockProducts = [];
  {
    monthRevenue = 347.5;
    todayCount = 2;
    pendingCount = 3;
    lowStockCount = 2;
    lowStockProducts = [
      { id: "3", name: "Colgante Hoja Verde", stock: 3 },
      { id: "7", name: "Pendientes Lavanda Seco", stock: 0 }
    ];
    recentOrders = [
      { id: "mock1", order_number: "AY-001", customer_name: "María García", customer_email: "maria@ejemplo.es", total: 34, status: "paid", created_at: { toDate: () => /* @__PURE__ */ new Date() } },
      { id: "mock2", order_number: "AY-002", customer_name: "Laura Martínez", customer_email: "laura@ejemplo.es", total: 52, status: "shipped", created_at: { toDate: () => new Date(Date.now() - 864e5) } }
    ];
  }
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  const statusLabels = {
    pending: "Pendiente",
    paid: "Pagado",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado"
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard — Atlas&You", "currentPage": "dashboard" }, { "default": async ($$result2) => renderTemplate`${renderTemplate`${maybeRenderHead()}<div class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-sm text-amber-800">
⚠️ Modo demo — datos de ejemplo. Configura Firebase en <code>.env</code> para datos reales.
</div>`}<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"> ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Ingresos este mes", "value": `${monthRevenue.toFixed(2)}€`, "icon": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Pedidos hoy", "value": todayCount.toString(), "icon": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Por preparar", "value": pendingCount.toString(), "icon": "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Stock bajo", "value": lowStockCount.toString(), "icon": "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" })} </div> <div class="grid xl:grid-cols-3 gap-6"> <div class="xl:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="px-6 py-4 border-b border-stone-200 flex items-center justify-between"> <h2 class="font-bold text-stone-800">Últimos pedidos</h2> <a href="/admin/pedidos" class="text-sm text-amber-700 hover:text-amber-800 font-medium">Ver todos →</a> </div> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">Pedido</th> <th class="px-6 py-3 text-left font-medium">Cliente</th> <th class="px-6 py-3 text-left font-medium">Total</th> <th class="px-6 py-3 text-left font-medium">Estado</th> <th class="px-6 py-3 text-left font-medium">Fecha</th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${recentOrders.map((order) => renderTemplate`<tr class="hover:bg-stone-50 transition-colors"> <td class="px-6 py-4"> <a${addAttribute(`/admin/pedidos/${order.id}`, "href")} class="font-medium text-amber-700 hover:text-amber-800">${order.order_number}</a> </td> <td class="px-6 py-4 text-stone-700">${order.customer_name}</td> <td class="px-6 py-4 font-medium text-stone-900">${order.total.toFixed(2)}€</td> <td class="px-6 py-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-stone-100 text-stone-600"}`, "class")}> ${statusLabels[order.status] || order.status} </span> </td> <td class="px-6 py-4 text-stone-400 text-xs"> ${new Date(order.created_at?.toDate?.() || order.created_at).toLocaleDateString("es-ES")} </td> </tr>`)} </tbody> </table> ${recentOrders.length === 0 && renderTemplate`<p class="text-center py-10 text-stone-400 text-sm">No hay pedidos todavía</p>`} </div> </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="px-6 py-4 border-b border-stone-200 flex items-center justify-between"> <h2 class="font-bold text-stone-800">Stock bajo</h2> <a href="/admin/productos" class="text-sm text-amber-700 hover:text-amber-800 font-medium">Gestionar →</a> </div> <div class="divide-y divide-stone-100"> ${lowStockProducts.map((product) => renderTemplate`<div class="px-6 py-4 flex items-center justify-between"> <p class="text-sm font-medium text-stone-800 truncate max-w-[150px]">${product.name}</p> <span${addAttribute(`text-xs font-bold px-2 py-1 rounded-full ${product.stock === 0 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`, "class")}> ${product.stock === 0 ? "Agotado" : `${product.stock} ud.`} </span> </div>`)} ${lowStockProducts.length === 0 && renderTemplate`<p class="px-6 py-10 text-center text-stone-400 text-sm">Todo el stock está bien</p>`} </div> </div> </div> ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
