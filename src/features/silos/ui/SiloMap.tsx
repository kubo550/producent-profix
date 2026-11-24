'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import {
  Circle,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import type { Coordinates } from '../domain';
import type { SiloDto } from '../dto';
import { useShowAllSilosRequest } from './showAllSilos';

export type MapDraft = Coordinates & { accuracyM: number | null };

type Props = {
  silos: SiloDto[];
  selectedId: string | null;
  draft: MapDraft | null;
  /** Silo being edited is hidden; its draft marker stands in for it. */
  hiddenId: string | null;
  fallbackCenter: Coordinates;
  onSelect: (id: string) => void;
  /** Long-press / right-click on the map, or drag of the draft marker. */
  onPick: (position: Coordinates) => void;
};

function pinIcon(variant: 'default' | 'stale' | 'selected' | 'draft', label?: string) {
  return L.divIcon({
    className: '',
    html: `<span class="silo-pin silo-pin--${variant}" ${label ? `aria-label="${label}"` : ''}></span>`,
    iconSize: [28, 36],
    iconAnchor: [14, 34],
  });
}

const ICONS = {
  default: pinIcon('default'),
  stale: pinIcon('stale'),
  selected: pinIcon('selected'),
  draft: pinIcon('draft', 'Nowa pozycja silosu'),
};

function MapEvents({ onPick }: Pick<Props, 'onPick'>) {
  // Leaflet emits `contextmenu` for right-click and for long-press on touch screens.
  useMapEvents({
    contextmenu: (e) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });
  return null;
}

const ALL_SILOS_MAX_ZOOM = 16;

function silosBounds(silos: SiloDto[]) {
  return silos.length ? L.latLngBounds(silos.map((s) => [s.lat, s.lng] as [number, number])).pad(0.2) : null;
}

function ShowAllController({ silos }: { silos: SiloDto[] }) {
  const map = useMap();
  useShowAllSilosRequest(() => {
    const bounds = silosBounds(silos);
    if (bounds) map.flyToBounds(bounds, { maxZoom: ALL_SILOS_MAX_ZOOM, duration: 0.6 });
  });
  return null;
}

/** Leaflet only listens to window resize; the panel resizes the map container on its own. */
function ContainerResizeSync() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

/** Primitive props, so the effect re-runs only when the target actually moves. */
function FocusController({ lat, lng }: { lat: number | undefined; lng: number | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (lat === undefined || lng === undefined) return;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [lat, lng, map]);
  return null;
}

export default function SiloMap({
  silos,
  selectedId,
  draft,
  hiddenId,
  fallbackCenter,
  onSelect,
  onPick,
}: Props) {
  // First render only: later changes must not yank the viewport around.
  const [initialBounds] = useState(() => silosBounds(silos));

  const focus = draft ?? silos.find((s) => s.id === selectedId);

  return (
    <MapContainer
      className="h-full w-full"
      {...(initialBounds
        ? { bounds: initialBounds, maxZoom: ALL_SILOS_MAX_ZOOM }
        : { center: [fallbackCenter.lat, fallbackCenter.lng], zoom: 9 })}
      zoomControl={false}
      attributionControl
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Mapa">
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelita">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri, Maxar, Earthstar Geographics"
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {silos
        .filter((s) => s.id !== hiddenId)
        .map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={s.id === selectedId ? ICONS.selected : s.stale ? ICONS.stale : ICONS.default}
            title={s.name}
            alt={s.name}
            eventHandlers={{ click: () => onSelect(s.id) }}
          />
        ))}

      {draft && (
        <>
          {draft.accuracyM !== null && (
            <Circle
              center={[draft.lat, draft.lng]}
              radius={draft.accuracyM}
              pathOptions={{ className: 'silo-accuracy' }}
            />
          )}
          <Marker
            position={[draft.lat, draft.lng]}
            icon={ICONS.draft}
            draggable
            zIndexOffset={1000}
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = (e.target as L.Marker).getLatLng();
                onPick({ lat, lng });
              },
            }}
          />
        </>
      )}

      <MapEvents onPick={onPick} />
      <ContainerResizeSync />
      <ShowAllController silos={silos} />
      <FocusController lat={focus?.lat} lng={focus?.lng} />
    </MapContainer>
  );
}
