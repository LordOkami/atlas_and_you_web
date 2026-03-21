import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';
import { b as mockShippingRates } from './mock-data_B8-QzGzS.mjs';

async function calculateShipping(country, orderTotal, weightGrams) {
  return mockShippingRates;
}

const GET = async ({ url }) => {
  const country = url.searchParams.get("country") || "ES";
  const weight = parseFloat(url.searchParams.get("weight") || "0");
  const total = parseFloat(url.searchParams.get("total") || "0");
  try {
    const rates = await calculateShipping(country, total, weight);
    return new Response(JSON.stringify(rates), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
