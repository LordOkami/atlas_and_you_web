import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const GET = async ({ url }) => {
  const code = url.searchParams.get("code")?.toUpperCase();
  if (!code) return new Response(JSON.stringify({ valid: false }), { headers: { "Content-Type": "application/json" } });
  {
    if (code === "BIENVENIDA10") return new Response(JSON.stringify({ valid: true, code, type: "percentage", value: 10, description: "10% de descuento" }), { headers: { "Content-Type": "application/json" } });
    if (code === "ENVIOGRATIS") return new Response(JSON.stringify({ valid: true, code, type: "free_shipping", value: 0, description: "Envío gratis" }), { headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ valid: false }), { headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
