<script lang="ts">
  import { onMount } from "svelte";
  import maplibregl from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  type PageViewLocation = {
    key: string;
    label: string;
    lat?: number;
    lon?: number;
    views: number;
    visitors: number;
    lastSeen: string;
  };

  type PageViewSummary = {
    totalViews: number;
    updatedAt: string | null;
    locations: PageViewLocation[];
  };

  type PageViewMapVariant = "sidebar" | "hub";

  type LocationFeatureProperties = {
    label: string;
    views: number;
    visitors: number;
    lastSeen: string;
  };

  type MarkerPosition = {
    key: string;
    x: number;
    y: number;
    size: number;
    location: PageViewLocation;
  };

  const EMPTY_SUMMARY: PageViewSummary = {
    totalViews: 0,
    updatedAt: null,
    locations: [],
  };
  const MINI_MAP_STYLE = {
    version: 8,
    sources: {
      openmaptiles: {
        type: "vector",
        url: "https://tiles.openfreemap.org/planet",
      },
    },
    layers: [
      {
        id: "visitor-map-land",
        type: "background",
        paint: {
          "background-color": "#d5ddd8",
        },
      },
      {
        id: "visitor-map-water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        paint: {
          "fill-color": "#f0f3f1",
        },
      },
      {
        id: "visitor-map-glacier",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["==", ["get", "subclass"], "glacier"],
        paint: {
          "fill-color": "#f8fafc",
          "fill-opacity": 0.78,
        },
      },
    ],
  } as maplibregl.StyleSpecification;
  const WORLD_BOUNDS: maplibregl.LngLatBoundsLike = [
    [-180, -60],
    [180, 80],
  ];
  const SOURCE_ID = "page-view-locations";
  const HIT_LAYER_ID = "page-view-location-hitboxes";
  const CIRCLE_LAYER_ID = "page-view-location-circles";
  const PAGE_VIEW_API_BASE = (
    import.meta.env.VITE_PAGE_VIEW_API_BASE ?? ""
  ).replace(/\/$/, "");
  const PAGE_VIEW_API_ENABLED = PAGE_VIEW_API_BASE.length > 0;

  let { variant = "sidebar" }: { variant?: PageViewMapVariant } = $props();
  let summary: PageViewSummary = $state(EMPTY_SUMMARY);
  let loading = $state(true);
  let failed = $state(false);
  let mapFailed = $state(false);
  let mapReady = $state(false);
  let mapContainer: HTMLDivElement | undefined = $state(undefined);
  let miniMap: maplibregl.Map | undefined;
  let mapHandlersBound = false;
  let markerPositions: MarkerPosition[] = $state([]);
  let visitorPopup: maplibregl.Popup | undefined;
  let visitorPopupPersistent = false;

  let locationsWithPosition: PageViewLocation[] = $derived(
    summary.locations.filter(
      (location) =>
        Number.isFinite(location.lat) && Number.isFinite(location.lon),
    ),
  );
  $effect(() => {
    if (mapReady) {
      renderLocations(locationsWithPosition);
      syncMarkerOverlay();
    }
  });

  onMount(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    initMiniMap();
    if (mapContainer && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resizeAndResetWorldView();
      });
      resizeObserver.observe(mapContainer);
    }
    void trackAndLoad();

    async function trackAndLoad(): Promise<void> {
      if (!PAGE_VIEW_API_ENABLED) {
        loading = false;
        return;
      }
      try {
        const response = await fetch(
          `${PAGE_VIEW_API_BASE}/api/pageViews/track`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: window.location.pathname,
            }),
            keepalive: true,
          },
        );
        if (!response.ok) {
          throw new Error(`Page view tracking failed: ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          summary = normalizeSummary(data);
        }
      } catch (error) {
        try {
          const response = await fetch(
            `${PAGE_VIEW_API_BASE}/api/pageViews/summary?t=${Date.now()}`,
          );
          if (!response.ok) {
            throw new Error(`Page view summary failed: ${response.status}`);
          }
          const data = await response.json();
          if (!cancelled) {
            summary = normalizeSummary(data);
          }
        } catch (summaryError) {
          if (!cancelled) {
            failed = true;
          }
        }
      } finally {
        if (!cancelled) {
          loading = false;
        }
      }
    }

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      visitorPopup?.remove();
      miniMap?.remove();
      miniMap = undefined;
    };
  });

  function initMiniMap(): void {
    if (!mapContainer) {
      return;
    }

    try {
      miniMap = new maplibregl.Map({
        container: mapContainer,
        style: MINI_MAP_STYLE,
        center: [0, 12],
        zoom: -1,
        minZoom: -2,
        maxZoom: 3,
        attributionControl: false,
        interactive: true,
        fadeDuration: 0,
        pitchWithRotate: false,
        dragRotate: false,
        maxPitch: 0,
        renderWorldCopies: false,
      });
      miniMap.scrollZoom.disable();
      miniMap.boxZoom.disable();
      miniMap.dragPan.disable();
      miniMap.dragRotate.disable();
      miniMap.keyboard.disable();
      miniMap.doubleClickZoom.disable();
      miniMap.touchZoomRotate.disable();
      miniMap.on("load", () => {
        mapReady = true;
        resizeAndResetWorldView();
        renderLocations(locationsWithPosition);
        syncMarkerOverlay();
      });
      miniMap.on("error", () => {
        mapFailed = true;
      });
    } catch (error) {
      mapFailed = true;
    }
  }

  function normalizeSummary(value: unknown): PageViewSummary {
    const data = value as Partial<PageViewSummary>;
    return {
      totalViews: Number(data.totalViews || 0),
      updatedAt: data.updatedAt || null,
      locations: Array.isArray(data.locations) ? data.locations : [],
    };
  }

  function formatCount(value: number): string {
    return new Intl.NumberFormat("en-US", {
      notation: value >= 1000 ? "compact" : "standard",
      maximumFractionDigits: value >= 1000 ? 1 : 0,
    }).format(value);
  }

  function locationFeatureCollection(
    locations: PageViewLocation[],
  ): GeoJSON.FeatureCollection<GeoJSON.Point, LocationFeatureProperties> {
    return {
      type: "FeatureCollection",
      features: locations.map((location) => ({
        type: "Feature",
        properties: {
          label: location.label,
          views: location.views,
          visitors: location.visitors || 0,
          lastSeen: location.lastSeen,
        },
        geometry: {
          type: "Point",
          coordinates: [location.lon || 0, location.lat || 0],
        },
      })),
    };
  }

  function renderLocations(locations: PageViewLocation[]): void {
    if (!miniMap || !mapReady || !miniMap.isStyleLoaded()) {
      return;
    }

    const data = locationFeatureCollection(locations);
    const existingSource = miniMap.getSource(SOURCE_ID) as
      maplibregl.GeoJSONSource | undefined;
    if (existingSource) {
      existingSource.setData(data);
    } else {
      miniMap.addSource(SOURCE_ID, {
        type: "geojson",
        data,
      });
      miniMap.addLayer({
        id: HIT_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-color": "#dc2626",
          "circle-opacity": 0.01,
          "circle-radius": 10,
        },
      } as maplibregl.LayerSpecification);
      miniMap.addLayer({
        id: CIRCLE_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        layout: {
          "circle-sort-key": ["get", "views"],
        },
        paint: {
          "circle-color": "#dc2626",
          "circle-opacity": 0.82,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.2,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "views"],
            1,
            2.8,
            10,
            4.4,
            100,
            6.2,
          ],
        },
      } as maplibregl.LayerSpecification);
      bindMapPointEvents();
      syncMarkerOverlay();
    }
  }

  function resizeAndResetWorldView(): void {
    if (
      !miniMap ||
      !mapContainer ||
      mapContainer.clientWidth === 0 ||
      mapContainer.clientHeight === 0
    ) {
      return;
    }
    miniMap.resize();
    if (mapReady) {
      resetWorldView();
      syncMarkerOverlay();
    }
  }

  function resetWorldView(): void {
    if (!miniMap) {
      return;
    }
    miniMap.fitBounds(WORLD_BOUNDS, {
      padding: 0,
      duration: 0,
    });
  }

  function syncMarkerOverlay(): void {
    if (!miniMap || !mapReady || !mapContainer) {
      return;
    }
    const mapInstance = miniMap;

    const width = mapContainer.clientWidth;
    const height = mapContainer.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    markerPositions = locationsWithPosition
      .map((location) => {
        const projected = mapInstance.project([
          location.lon || 0,
          location.lat || 0,
        ]);
        if (!Number.isFinite(projected.x) || !Number.isFinite(projected.y)) {
          return null;
        }
        if (
          projected.x < -16 ||
          projected.x > width + 16 ||
          projected.y < -16 ||
          projected.y > height + 16
        ) {
          return null;
        }
        return {
          key: location.key,
          x: projected.x,
          y: projected.y,
          size: markerSize(location.views),
          location,
        };
      })
      .filter((marker): marker is MarkerPosition => marker !== null);
  }

  function markerSize(views: number): number {
    if (views <= 1) {
      return 7;
    }
    if (views <= 10) {
      return 8;
    }
    return 9;
  }

  function visitorPopupHtml(location: PageViewLocation): string {
    return `<div class="visitor-popup">
			<div class="visitor-popup-title">${escapeHtml(location.label || "Unknown")}</div>
			<div>${formatCount(location.views)} views${location.visitors > 0 ? ` / ${formatCount(location.visitors)} visitors` : ""}</div>
			<div>Last seen: ${escapeHtml(formatDate(location.lastSeen))}</div>
		</div>`;
  }

  function showVisitorPopup(
    location: PageViewLocation,
    persistent = true,
  ): void {
    if (
      !miniMap ||
      !Number.isFinite(location.lat) ||
      !Number.isFinite(location.lon)
    ) {
      return;
    }

    visitorPopup?.remove();
    visitorPopupPersistent = persistent;
    visitorPopup = new maplibregl.Popup({
      closeButton: persistent,
      closeOnClick: persistent,
      maxWidth: "220px",
      offset: 8,
    })
      .setLngLat([location.lon || 0, location.lat || 0])
      .setHTML(visitorPopupHtml(location))
      .addTo(miniMap);
  }

  function closeHoverVisitorPopup(): void {
    if (visitorPopupPersistent) {
      return;
    }
    visitorPopup?.remove();
    visitorPopup = undefined;
  }

  function bindMapPointEvents(): void {
    if (!miniMap || mapHandlersBound) {
      return;
    }
    mapHandlersBound = true;

    miniMap.on("mouseenter", HIT_LAYER_ID, () => {
      if (miniMap) {
        miniMap.getCanvas().style.cursor = "pointer";
      }
    });
    miniMap.on("mouseleave", HIT_LAYER_ID, () => {
      if (miniMap) {
        miniMap.getCanvas().style.cursor = "";
      }
    });
    miniMap.on("click", HIT_LAYER_ID, (event) => {
      const feature = event.features?.[0];
      const coordinates = (feature?.geometry as GeoJSON.Point | undefined)
        ?.coordinates;
      if (!miniMap || !feature?.properties || !coordinates) {
        return;
      }
      const properties = feature.properties as Record<
        string,
        string | number | undefined
      >;
      const visitors = Number(properties.visitors || 0);
      const views = Number(properties.views || 0);
      visitorPopup?.remove();
      visitorPopupPersistent = true;
      visitorPopup = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: true,
        maxWidth: "220px",
      })
        .setLngLat([coordinates[0], coordinates[1]])
        .setHTML(
          `<div class="visitor-popup">
						<div class="visitor-popup-title">${escapeHtml(String(properties.label || "Unknown"))}</div>
						<div>${formatCount(views)} views${visitors > 0 ? ` / ${formatCount(visitors)} visitors` : ""}</div>
						<div>Last seen: ${escapeHtml(formatDate(String(properties.lastSeen || "")))}</div>
					</div>`,
        )
        .addTo(miniMap);
    });
  }

  function escapeHtml(value: string): string {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatDate(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "unknown";
    }
    return parsed.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
</script>

{#snippet mapCanvas()}
  <div
    class="visitor-map relative overflow-hidden border-y border-stone-200 bg-slate-100"
  >
    <div bind:this={mapContainer} class="h-full w-full"></div>
    <div class="pointer-events-none absolute inset-0">
      {#each markerPositions as marker (marker.key)}
        <button
          type="button"
          class="visitor-map-marker pointer-events-auto"
          aria-label={`Visitor location: ${marker.location.label}`}
          title={marker.location.label}
          style={`left:${marker.x}px; top:${marker.y}px; --marker-size:${marker.size}px;`}
          onclick={(event) => {
            event.stopPropagation();
            showVisitorPopup(marker.location);
          }}
          onmouseenter={() => {
            showVisitorPopup(marker.location, false);
          }}
          onmouseleave={() => {
            closeHoverVisitorPopup();
          }}
          onfocus={() => {
            showVisitorPopup(marker.location, false);
          }}
          onblur={() => {
            closeHoverVisitorPopup();
          }}
        ></button>
      {/each}
    </div>
    {#if mapFailed}
      <div
        class="absolute inset-0 grid place-items-center bg-slate-50 text-xs text-stone-500"
      >
        Map unavailable
      </div>
    {/if}
  </div>
{/snippet}

{#if variant === "hub"}
  <section
    class="visitor-map-panel visitor-map-panel--hub"
    aria-label="Global readership"
  >
    <div class="visitor-map-card">
      <div class="visitor-map-card-header">
        <span>Global readership</span>
        {#if loading}<span aria-label="Loading visitor count">...</span>
        {:else if PAGE_VIEW_API_ENABLED && !failed}<strong
            >{formatCount(summary.totalViews)} visits</strong
          >{/if}
      </div>

      <div class="visitor-map-frame">
        {@render mapCanvas()}
      </div>

      <div class="visitor-map-caption">
        <span
          >{failed || !PAGE_VIEW_API_ENABLED
            ? "Statistics unavailable"
            : "Approximate locations"}</span
        >
        <span
          ><a href="https://openfreemap.org/" target="_blank" rel="noreferrer"
            >OpenFreeMap</a
          >
          /
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer">OSM</a
          ></span
        >
      </div>
    </div>
  </section>
{:else}
  <div
    class="visitor-map-panel visitor-map-panel--sidebar mt-5 border-t border-stone-200 pt-4 pb-5"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <div class="text-sm font-semibold text-stone-800">Visitor map</div>
      </div>
      <div class="text-right">
        <div class="text-lg font-semibold leading-none text-stone-900">
          {loading ? "..." : formatCount(summary.totalViews)}
        </div>
        <div class="mt-1 text-[0.68rem] uppercase tracking-wide text-stone-500">
          total views
        </div>
      </div>
    </div>

    <div class="visitor-map-frame mt-3">
      {@render mapCanvas()}
    </div>

    {#if failed}
      <div class="mt-2 text-xs text-stone-500">Visitor map unavailable</div>
    {/if}
  </div>
{/if}

<style>
  .visitor-map-panel--sidebar .visitor-map-frame {
    margin-inline: -20px;
  }
  .visitor-map-panel--sidebar .visitor-map {
    height: 12rem;
  }
  .visitor-map-panel--hub {
    min-width: 0;
    align-self: start;
  }
  .visitor-map-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding-bottom: 10px;
    color: #626a6b;
    font-size: 11px;
  }
  .visitor-map-card-header > span:first-child {
    font-weight: 650;
    text-transform: uppercase;
  }
  .visitor-map-card-header strong {
    color: #4b5650;
    font-size: 10px;
    font-weight: 500;
  }
  .visitor-map-panel--hub .visitor-map {
    height: 108px;
    border: 0;
    background: #f0f3f1;
    border-radius: 2px;
  }
  .visitor-map-caption {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-top: 7px;
    color: #727c76;
    font-size: 8px;
    line-height: 1.5;
  }
  .visitor-map-caption a:hover {
    text-decoration: underline;
  }
  .visitor-map :global(.maplibregl-control-container) {
    display: none;
  }
  .visitor-map :global(.maplibregl-popup-content) {
    border-radius: 4px;
    box-shadow: 0 4px 20px rgb(20 30 25 / 12%);
    color: #444b46;
    font-size: 11px;
    line-height: 1.5;
    padding: 9px 11px;
  }
  .visitor-map :global(.visitor-popup-title) {
    color: #26352b;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .visitor-map-marker {
    position: absolute;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
    border: 0;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    padding: 0;
    z-index: 4;
  }
  .visitor-map-marker::before {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--marker-size, 8px);
    height: var(--marker-size, 8px);
    content: "";
    transform: translate(-50%, -50%);
    border: 1.5px solid #fff;
    border-radius: 50%;
    background: #b04b46;
    box-shadow: 0 0 0 2px rgb(176 75 70 / 13%);
  }
  .visitor-map-marker:focus-visible::before {
    outline: 2px solid #963b36;
    outline-offset: 3px;
  }
  @media (max-width: 1180px) {
    .visitor-map-panel--sidebar .visitor-map-frame {
      margin-inline: -16px;
    }
  }
  @media (max-width: 767px) {
    .visitor-map-panel--sidebar {
      margin-top: 1rem;
      padding-top: 0.85rem;
      padding-bottom: 0.75rem;
    }
    .visitor-map-panel--sidebar .visitor-map-frame {
      margin-inline: -12px;
    }
    .visitor-map-panel--sidebar .visitor-map {
      height: 8.75rem;
    }
  }
</style>
