<script lang="ts">
  import {
    ArrowRightOutline,
    ArrowUpRightFromSquareOutline,
  } from "flowbite-svelte-icons";
  import { art, type Product } from "$lib/science/content";
  import { withBase } from "$lib/paths";
  let { product }: { product: Product } = $props();
  const image = $derived(product.image ? art[product.image] : undefined);
</script>

{#snippet content()}
  {#if image}<div class="product-art">
      <img
        src={image.src}
        srcset={image.srcset}
        alt={image.alt}
        style:object-position={image.position}
        sizes="(max-width: 700px) calc(100vw - 40px), 425px"
        width="1536"
        height="1024"
        loading="lazy"
      />
    </div>{/if}
  <div class="product-copy">
    <p class="product-kind">{product.kind}</p>
    <h3>{product.title}</h3>
    <p class="product-description">{product.description}</p>
    <span class="product-action"
      >{product.action}{#if product.href}{#if product.href.startsWith("https:")}<ArrowUpRightFromSquareOutline
          />{:else}<ArrowRightOutline />{/if}{/if}</span
    >
  </div>
{/snippet}
<article class="product" class:unavailable={!product.href}>
  {#if product.href}<a href={withBase(product.href)}>{@render content()}</a
    >{:else}<div class="product-unavailable">{@render content()}</div>{/if}
</article>

<style>
  .product {
    min-width: 0;
  }
  a,
  .product-unavailable {
    display: flex;
    height: 100%;
    flex-direction: column;
    color: var(--ink);
  }
  .product-art {
    overflow: hidden;
    aspect-ratio: 3 / 2;
    background: #e8ede9;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  a:hover img {
    transform: scale(1.025);
  }
  .product-copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-block: 20px 4px;
    border-top: 1px solid var(--line);
  }
  .product-kind {
    color: #782f40;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 650;
    margin-bottom: 5px !important;
  }
  h3 {
    font-size: 27px;
    line-height: 1.25;
  }
  .product-description {
    font-size: 13px;
    line-height: 1.75;
    color: var(--muted);
    margin-block: 10px 15px !important;
    max-width: 370px;
  }
  .product-action {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: auto;
    font-size: 12px;
    font-weight: 600;
  }
  .product-action :global(svg) {
    width: 14px;
    height: 14px;
  }
  a:hover .product-action {
    color: #782f40;
  }
  .unavailable .product-action {
    color: var(--muted);
    font-weight: 450;
  }
</style>
