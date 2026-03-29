const BACKEND_URL = process.env.BACKEND_API_URL || import.meta.env.BACKEND_API_URL || 'http://localhost:4000';

if (import.meta.env.PROD && BACKEND_URL.includes('localhost')) {
  console.error('WARNING: BACKEND_API_URL not configured for production');
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string; // Decimal as string from Phoenix
  compare_at_price: string | null;
  stock: number;
  weight_grams: number;
  images: string[];
  tags: string[];
  active: boolean;
  featured: boolean;
  sku: string | null;
  category: { id: string; name: string; slug: string } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  position: number;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  name: string;
  rate: string;
  estimated_days: string;
  free_from_amount: string | null;
}

export interface DiscountResult {
  valid: boolean;
  type?: string;
  value?: string;
  min_order_amount?: string;
  error?: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProducts(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.search) qs.set('search', params.search);
  if (params?.featured) qs.set('featured', 'true');
  const query = qs.toString();
  const data = await apiFetch<{ data: Product[] }>(
    `/api/v1/products${query ? `?${query}` : ''}`
  );
  return data.data;
}

export async function getProduct(slug: string): Promise<Product> {
  const data = await apiFetch<{ data: Product }>(
    `/api/v1/products/${slug}`
  );
  return data.data;
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiFetch<{ data: Category[] }>('/api/v1/categories');
  return data.data;
}

export async function calculateShipping(
  country: string,
  weight: number,
  total: number
): Promise<ShippingRate[]> {
  const data = await apiFetch<{ data: ShippingRate[] }>(
    `/api/v1/shipping/calculate?country=${encodeURIComponent(country)}&weight=${weight}&total=${total}`
  );
  return data.data;
}

export async function validateDiscount(
  code: string,
  subtotal: number
): Promise<DiscountResult> {
  const data = await apiFetch<{ data: DiscountResult }>(
    `/api/v1/discounts/validate?code=${encodeURIComponent(code)}&subtotal=${subtotal}`
  );
  return data.data;
}

export async function createCheckout(body: any): Promise<{ url: string }> {
  const data = await apiFetch<{ data: { url: string } }>(
    '/api/v1/checkout',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  return data.data;
}
