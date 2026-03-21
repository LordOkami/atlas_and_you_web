import { g as getDb } from './firebase-admin_CrVOOz53.mjs';
import { s as sendShippingNotification } from './email_BbMByje5.mjs';
import { FieldValue } from 'firebase-admin/firestore';

const PATCH = async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();
  const { send_shipping_email, ...updateData } = body;
  const db = getDb();
  await db.collection("orders").doc(id).update({
    ...updateData,
    updated_at: FieldValue.serverTimestamp()
  });
  if (send_shipping_email && updateData.status === "shipped") {
    const orderDoc = await db.collection("orders").doc(id).get();
    const order = { id: orderDoc.id, ...orderDoc.data() };
    await sendShippingNotification(order).catch(console.error);
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
