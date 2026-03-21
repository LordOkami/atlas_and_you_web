import { g as getDb } from './firebase-admin_CrVOOz53.mjs';
import { FieldValue } from 'firebase-admin/firestore';

const POST = async ({ request }) => {
  const body = await request.json();
  const db = getDb();
  const ref = await db.collection("discount_codes").add({ ...body, used_count: 0, created_at: FieldValue.serverTimestamp() });
  return new Response(JSON.stringify({ id: ref.id }), { status: 201, headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
