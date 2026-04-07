
import { useEffect, useState } from 'react';
import { Container, Box } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMapDetail from './components/SideMapDetails';
import { theme } from '~/theme';
import useCoordinates from '~/hooks/Dashboard/useCoordinates.js';
import AlaminosExpansion from '~/assets/TCT/Alaminos_Expansion.geojson?url';
import wellknown from 'wellknown'

const Dashboard = () => {
  const { ref, height } = useElementSize();
  const { backgroundColor } = theme.colors;
  const position = [14.32813493647682, 121.10421060280815];
  const [geoJson, setGeoJson] = useState(null);

  useEffect(() => {
    fetch(AlaminosExpansion)
      .then((res) => res.json())
      .then((data) => setGeoJson(data))
      .catch((err) => console.error('Error loading GeoJSON:', err));
  }, []);

  return (
    <Container
      ref={ref}
      style={{ height: 'calc(100vh - 60px)', backgroundColor: backgroundColor[0] }}
      p={0}
      fluid
    >
      <SideMapDetail backgroundColor={backgroundColor[0]} height={height} />

      <Box h={height}>
        <MapContainer
          center={position}
          zoom={12}
          scrollWheelZoom
          style={{ height: 'calc(100vh - 60px)', zIndex: 0 }}
        >
          <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />

          {geoJson && (
            <GeoJSON
              data={geoJson}
              style={{ color: 'red', weight: 2 }}
              onEachFeature={(feature, layer) => {
                console.log(geoJson.features[0].geometry.coordinates[0][0]);
                if (feature.properties?.name) {
                  layer.bindTooltip(feature.properties.name, {
                    permanent: true,
                    direction: 'right',
                    className: 'phase-label',
                  });
                }
              }}
            />
          )}
        </MapContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;

