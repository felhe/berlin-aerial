import { Map } from 'maplibre-gl';

/**
 * Sync the position of the `source` map to the `target` maps.
 */
function syncMapPosition(source: Map, targets: Map[]): void {
  const { center, zoom, bearing, pitch } = {
    center: source.getCenter(),
    zoom: source.getZoom(),
    bearing: source.getBearing(),
    pitch: source.getPitch(),
  };

  targets.forEach((target) => target.jumpTo({ center, zoom, bearing, pitch }));
}

/**
 * Synchronize multiple maps, ensuring movements on one map are reflected on others.
 * @param maps The list of map instances to synchronize.
 */
export function syncMaps(...maps: Map[]): () => void {
  if (maps.length < 2) {
    throw new Error('At least two maps are required to sync.');
  }

  if (maps.some((map) => !map)) {
    return () => {};
  }

  let isSyncing = false;

  const syncHandler = (source: Map) => {
    if (isSyncing) return;

    isSyncing = true;
    syncMapPosition(
      source,
      maps.filter((map) => map !== source),
    );
    isSyncing = false;
  };

  // Attach the sync event to each map
  maps.forEach((map) => map.on('move', () => syncHandler(map)));

  // Return a cleanup function to remove listeners
  return () => {
    maps.forEach((map) => {
      // Assuming a hypothetical `off` method to remove listeners
      map.on('move', () => syncHandler(map));
    });
  };
}
