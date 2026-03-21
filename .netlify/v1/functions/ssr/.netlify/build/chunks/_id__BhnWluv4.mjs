import { g as getDb } from './firebase-admin_CrVOOz53.mjs';

const PATCH = async ({ params, request }) => {
  const body = await request.json();
  await getDb().collection("discount_codes").doc(params.id).update(body);
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
};
const DELETE = async ({ params }) => {
  await getDb().collection("discount_codes").doc(params.id).delete();
  return new Response(null, { status: 204 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
