import { c as createComponent } from './astro-component_CJ8D5auw.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, r as renderTemplate } from './ssr-function_R-mCtSvX.mjs';
import 'clsx';

const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  const img1 = product.images?.[0] || "";
  const img2 = product.images?.[1] || "";
  const isOnSale = product.compare_at_price && product.compare_at_price > product.price;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const discount = isOnSale ? Math.round((1 - product.price / product.compare_at_price) * 100) : 0;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/tienda/${product.slug}`, "href")} class="group block"> <!-- Image container — 4:5 portrait, no border-radius on image (editorial) --> <div class="relative overflow-hidden bg-stone-100" style="aspect-ratio:4/5;"> <!-- Primary image --> ${img1 ? renderTemplate`<img${addAttribute(img1, "src")}${addAttribute(product.name, "alt")}${addAttribute(`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${img2 ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"}`, "class")} loading="lazy">` : renderTemplate`<div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-200 flex items-center justify-center"> <svg class="w-12 h-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div>`} <!-- Secondary image (hover swap) --> ${img2 && renderTemplate`<img${addAttribute(img2, "src")}${addAttribute(`${product.name} — detalle`, "alt")} class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" loading="lazy">`} <!-- Out of stock overlay --> ${isOutOfStock && renderTemplate`<div class="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]"> <span class="text-[11px] font-semibold tracking-widest uppercase text-stone-500 border border-stone-300 px-3 py-1.5 bg-white">
Agotado
</span> </div>`} <!-- Sale badge --> ${isOnSale && !isOutOfStock && renderTemplate`<div class="absolute top-3 left-3"> <span class="text-[10px] font-semibold tracking-wider uppercase text-white px-2 py-1" style="background:#92400E;">
-${discount}%
</span> </div>`} <!-- Low stock --> ${isLowStock && renderTemplate`<div class="absolute bottom-3 left-3"> <span class="text-[10px] font-medium text-amber-800 bg-amber-50/90 px-2 py-1">
Solo ${product.stock} uds.
</span> </div>`} </div> <!-- Product info --> <div class="mt-3 space-y-1"> <h3 class="text-sm font-medium text-stone-800 group-hover:text-stone-600 transition-colors leading-snug" style="font-family:var(--font-sans);"> ${product.name} </h3> ${product.tags && product.tags.length > 0 && renderTemplate`<p class="text-[11px] text-stone-400 tracking-wide uppercase">${product.tags[0]}</p>`} <div class="flex items-baseline gap-2 pt-0.5"> <span class="text-sm font-medium text-stone-900">${product.price.toFixed(2)}€</span> ${isOnSale && renderTemplate`<span class="text-xs text-stone-400 line-through">${product.compare_at_price.toFixed(2)}€</span>`} </div> </div> </a>`;
}, "/Users/luis/lordokami/xabe/atlas_and_you_web/src/components/storefront/ProductCard.astro", void 0);

export { $$ProductCard as $ };
