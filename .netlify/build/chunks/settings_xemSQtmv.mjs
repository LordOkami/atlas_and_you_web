import { g as getDb } from './firebase-admin_CrVOOz53.mjs';

const POST = async ({ request }) => {
  const settings = await request.json();
  const db = getDb();
  const batch = db.batch();
  Object.entries(settings).forEach(([key, value]) => {
    const ref = db.collection("settings").doc(key);
    batch.set(ref, { value: String(value), updated_at: /* @__PURE__ */ new Date() }, { merge: true });
  });
  await batch.commit();
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
