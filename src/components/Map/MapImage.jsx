import {
  Box,
  Skeleton,
  Paper,
  Text,
  Title,
  Stack,
  Group,
  Transition,
} from "@mantine/core";
import { useParams } from "react-router";
import { MapContainer, TileLayer, GeoJSON, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useShowSubdivided from "~/hooks/Setup/SubdividedProjects/useShowSubdivided";
import wkt from 'wellknown';
import ErrorElement from "../ErrorElement";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const LEGEND_ITEMS = [
  { color: '#66b7ba', label: 'Lots', type: 'fill' },
  { color: '#e6f3f3', label: 'Lines', type: 'line' },
  { color: 'white', label: 'Blocks', type: 'line', borderColor: '#ccc' },
  { color: 'gray', label: 'Roads', type: 'fill', borderColor: '#333' },
  { color: 'white', label: 'Labels', type: 'line', borderColor: '#ccc' },
];

const LegendSwatch = ({ color, type, borderColor }) => (
  <Box
    style={{
      width: 18,
      height: 18,
      borderRadius: type === 'fill' ? 4 : 2,
      backgroundColor: type === 'fill' ? color : 'transparent',
      border: `2.5px solid ${borderColor ?? color}`,
      flexShrink: 0,
    }}
  />
);

const MapLegend = ({ styles, colorCodedLayers }) => {
  // Build dynamic color-coded lot statuses from colorCodedLayers if provided
  const dynamicItems = colorCodedLayers?.length
    ? [...new Map(colorCodedLayers.map(l => [l.color, l])).values()].map(l => ({
      color: l.color,
      label: l.label ?? l.status ?? 'Lot',
      type: 'fill',
      count: colorCodedLayers.filter(layer => layer.color === l.color).length,
    }))
    : [];

  const allItems = dynamicItems.length ? dynamicItems : LEGEND_ITEMS;

  return (
    <Paper
      shadow="md"
      radius="md"
      p="sm"
      style={{
        ...styles,
        position: 'absolute',
        top: 22,
        left: 12,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(6px)',
        minWidth: 160,
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Text fw={700} size="xs" mb={6} c="dark.6" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Legend
      </Text>
      <Stack gap={5}>
        {allItems.map((item) => (
          <Group key={item.label} gap={8} wrap="nowrap">
            <LegendSwatch color={item.color} type={item.type} borderColor={item.borderColor} />
            <Text size="xs" c="dark.5">
              {item.label} {item.count !== undefined && <Text component="span" fw={600}>({item.count})</Text>}
            </Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};

const MapImage = ({
  coords = [14.09663, 121.095515],
  project,
  zoom = 16,
  scrollWheelZoom = false,
  dragging = false,
  doubleClickZoom = false,
  boxZoom = false,
  touchZoom = false,
  zoomControl = false,
  onEachFeature = (feature, layer) => (feature, layer),
  colorCodedLayers = null
}) => {

  const isMobile = useMediaQuery('(max-width: 768px)')
  const { data, isLoading, isError, error, isSuccess } = useShowSubdivided(project);
  const [layers, setLayers] = useState();
  const [layersKey, setLayersKey] = useState(0);
  const [labelLayers, setLabelLayers] = useState();
  const [blockLayers, setBlockLayers] = useState();

  useEffect(() => {
    if (isSuccess && data.body?.LOTS.length > 0) {
      const geoJsonDataLots = {
        type: "FeatureCollection",
        features: data?.body?.LOTS?.map((line) => {
          let layerColor = '#002526';
          if (colorCodedLayers && colorCodedLayers.length > 0) {
            const layer = colorCodedLayers.find((item) => item.qgs_fid === line.qgs_fid);
            if (layer?.color) {
              layerColor = layer.color;
            }
          }
          return {
            type: "Feature",
            properties: {
              tct_project: line.tct_project,
              qgs_fid: line.qgs_fid,
              blk: line.blk,
              lot: line.lot,
              color: layerColor
            },
            geometry: wkt.parse(line.geom), // ✨ Parse WKT to GeoJSON
          }
        }),
      };
      // Convert API response to GeoJSON using wellknown
      const geoJsonDataLabels = {
        type: "FeatureCollection",
        features: data?.body?.LABELS?.map((line) => ({
          type: "Feature",
          properties: {
            tct_project: line.tct_project,
            qgs_fid: line.qgs_fid,
          },
          geometry: wkt.parse(line.geom), // ✨ Parse WKT to GeoJSON
        })),
      };

      //blocks
      const geoJsonDataBlocks = {
        type: "FeatureCollection",
        features: data?.body?.BLOCKS?.map((line) => ({
          type: "Feature",
          properties: {
            tct_project: line.tct_project,
            qgs_fid: line.qgs_fid,
          },
          geometry: wkt.parse(line.geom), // ✨ Parse WKT to GeoJSON
        })),
      }
      setLayers(geoJsonDataLots);
      setLabelLayers(geoJsonDataLabels);
      setBlockLayers(geoJsonDataBlocks);
      setLayersKey(Date.now());
    }
  }, [isSuccess, colorCodedLayers, data])


  if (isLoading) {
    return <Skeleton h={"100%"} />
  }

  if (isError) {
    const errorMessage = error.response.data?.message ?? error.message;
    return <ErrorElement>{errorMessage}</ErrorElement>
  }


  // Convert API response to GeoJSON using wellknown
  const geoJsonDataLines = {
    type: "FeatureCollection",
    features: data?.body?.LINES?.map((line) => ({
      type: "Feature",
      properties: {
        tct_project: line.tct_project,
        qgs_fid: line.qgs_fid,
      },
      geometry: wkt.parse(line.geom), // ✨ Parse WKT to GeoJSON
    })),
  };

  // Convert API response to GeoJSON using wellknown
  const geoJsonDataRoads = {
    type: "FeatureCollection",
    features: data?.body?.ROADS?.map((line) => ({
      type: "Feature",
      properties: {
        tct_project: line.tct_project,
        qgs_fid: line.qgs_fid,
      },
      geometry: wkt.parse(line.geom), // ✨ Parse WKT to GeoJSON
    })),
  };




  return (
    <Box h="100%" w="100%" pt={10} style={{ position: 'relative' }} >
      {colorCodedLayers && colorCodedLayers.length > 0 && (
        <Transition
          mounted={!isMobile}
          transition={"fade"}
          duration="200"
        >
          {(styles) => (
            <MapLegend styles={styles} colorCodedLayers={colorCodedLayers} />
          )}

        </Transition>
      )}
      <MapContainer
        center={coords}
        zoom={zoom}
        maxZoom={20}
        scrollWheelZoom={scrollWheelZoom}   // disable mouse wheel zoom
        dragging={dragging}          // disable panning (dragging)
        doubleClickZoom={doubleClickZoom}   // disable double-click zoom
        boxZoom={boxZoom}           // disable shift + drag zoom
        touchZoom={touchZoom}         // disable pinch zoom (mobile)
        zoomControl={zoomControl}       // hide + / - zoom buttons
        keyboard={false}          // disable keyboard zoom
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution="Map Developed:PAU &copy; Google Maps"
        />
        <GeoJSON
          data={geoJsonDataLines}
          style={() => ({ color: '#e6f3f3', weight: 1.5 })}
        />

        {layers && (
          <GeoJSON
            key={`lots-${layersKey}`}
            data={layers}
            onEachFeature={onEachFeature}
            style={(feature) => ({ color: '#66b7ba', weight: 0.5, stroke: 2, fillColor: feature.properties.color, fillOpacity: 0.8, borderColor: 'white' })}
          />
        )}
        {labelLayers && (
          <GeoJSON
            key={`labels-${layersKey}`}
            data={labelLayers}
            style={{ color: 'white', weight: 1 }}
          />

        )}
        {blockLayers && (
          <GeoJSON
            key={`block-${layersKey}`}
            data={blockLayers}
            style={{ color: 'white', weight: 2 }}
          />
        )}


        <GeoJSON
          data={geoJsonDataRoads}
          style={() => ({ color: 'black', weight: 1, fillOpacity: 0.8, fillColor: 'gray' })}
        />
      </MapContainer>
    </Box>
  )
}

export default MapImage;
