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
  const statusFilter = Astro2.url.searchParams.get("status") || "";
  let orders = [];
  {
    orders = [
      { id: "mock1", order_number: "AY-001", customer_name: "María García", customer_email: "maria@ejemplo.es", total: 34, status: "paid", created_at: /* @__PURE__ */ new Date() },
      { id: "mock2", order_number: "AY-002", customer_name: "Laura Martínez", customer_email: "laura@ejemplo.es", total: 52, status: "shipped", created_at: new Date(Date.now() - 864e5) }
    ];
    if (statusFilter) orders = orders.filter((o) => o.status === statusFilter);
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
  const filters = [
    { value: "", label: "Todos" },
    { value: "paid", label: "Por preparar" },
    { value: "shipped", label: "Enviados" },
    { value: "delivered", label: "Entregados" },
    { value: "cancelled", label: "Cancelados" }
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pedidos — Atlas&You", "currentPage": "pedidos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between mb-6"> <div> <h2 class="text-xl font-bold text-stone-800">Pedidos</h2> <p class="text-stone-400 text-sm">${orders?.length || 0} pedidos</p> </div> </div>  <div class="flex gap-2 mb-6 flex-wrap"> ${filters.map((f) => renderTemplate`<a${addAttribute(f.value ? `/admin/pedidos?status=${f.value}` : "/admin/pedidos", "href")}${addAttribute(`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === f.value ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"}`, "class")}> ${f.label} </a>`)} </div> <div class="bg-white rounded-xl border border-stone-200 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead class="bg-stone-50 text-stone-500 text-xs uppercase"> <tr> <th class="px-6 py-3 text-left font-medium">Pedido</th> <th class="px-6 py-3 text-left font-medium">Cliente</th> <th class="px-6 py-3 text-left font-medium">Total</th> <th class="px-6 py-3 text-left font-medium">Estado</th> <th class="px-6 py-3 text-left font-medium">Fecha</th> <th class="px-6 py-3 text-left font-medium">Acción</th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${orders?.map((order) => renderTemplate`<tr class="hover:bg-stone-50 transition-colors"> <td class="px-6 py-4 font-medium text-amber-700"> <a${addAttribute(`/admin/pedidos/${order.id}`, "href")} class="hover:text-amber-800">${order.order_number}</a> </td> <td class="px-6 py-4"> <p class="font-medium text-stone-800">${order.customer_name}</p> <p class="text-stone-400 text-xs">${order.customer_email}</p> </td> <td class="px-6 py-4 font-bold text-stone-900">${order.total.toFixed(2)}€</td> <td class="px-6 py-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-stone-100 text-stone-600"}`, "class")}> ${statusLabels[order.status] || order.status} </span> </td> <td class="px-6 py-4 text-stone-400 text-xs"> ${new Date(order.created_at?.toDate?.() || order.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })} </td> <td class="px-6 py-4"> <a${addAttribute(`/admin/pedidos/${order.id}`, "href")} class="text-amber-700 hover:text-amber-800 text-xs font-medium">Ver detalles →</a> </td> </tr>`)} </tbody> </table> ${(!orders || orders.length === 0) && renderTemplate`<p class="text-center py-16 text-stone-400 text-sm">No hay pedidos ${statusFilter ? "con este estado" : "todavía"}</p>`} </div> </div> ` })}`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/pedidos/index.astro", void 0);

const $$file = "/Users/luis/lordokami/xabe/atlas_and_you_web/src/pages/admin/pedidos/index.astro";
const $$url = "/admin/pedidos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
