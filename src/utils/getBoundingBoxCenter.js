import L from 'leaflet';

export const getBoundingBoxCenter = (geometry) => {
  // Flatten the coordinates to handle Polygons and MultiPolygons
  const coords = geometry.coordinates.flat(Infinity);
  
  let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;

  // Iterate to find the bounding box
  for (let i = 0; i < coords.length; i += 2) { // GeoJSON is [lng, lat]
    const lng = coords[i];
    const lat = coords[i + 1];
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  return [(minLat + maxLat) / 2, (minLng + maxLng) / 2]; // Return [lat, lng] for Leaflet
};
