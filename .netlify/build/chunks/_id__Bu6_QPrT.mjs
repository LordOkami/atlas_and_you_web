import { g as getDb } from './firebase-admin_CrVOOz53.mjs';

const DELETE = async ({ params }) => {
  await getDb().collection("shipping_rates").doc(params.id).delete();
  return new Response(null, { status: 204 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
