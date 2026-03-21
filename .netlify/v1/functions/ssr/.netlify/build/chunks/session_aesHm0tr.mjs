import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const POST = async ({ request }) => {
  {
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "fb_session=mock; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800"
      }
    });
  }
};
const DELETE = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "fb_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
