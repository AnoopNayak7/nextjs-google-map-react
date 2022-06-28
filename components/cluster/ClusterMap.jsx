import React, { useState, useRef } from "react";
import useSWR from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

import { data } from "../../data/mapdata";

const Marker = ({ children }) => children;

const ClusterMap = () => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

  // const url= ""
  // const {} = useSWR()

  const mydata = data;
  // console.log("cccccc", mydata);

  const points = mydata.map((item) => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: item.id,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(item.lng), parseFloat(item.lat)],
    },
  }));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 55, maxZoom: 10 },
  });

  console.log("clusters", clusters);

  return (
    <div>
      <h1>Cluster data example</h1>
      <div style={{ width: "100%", height: "100vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{ lat: 59.955413, lng: 30.52 }}
          defaultZoom={5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return(
              <Marker key={cluster.id} lat={latitude} lng={longitude}>
                <div className="clusterMark">{pointCount} properties</div>
              </Marker>);
            }
            return (
              <Marker key={cluster.properties.id} lat={latitude} lng={longitude}>
                <button style={{ background: "none", border: "none" }}>
                  <img style={{width: "20px", height: "20px"}} src="https://img.icons8.com/color/48/000000/marker--v1.png" />
                </button>
              </Marker>
            );
          })}
          {/* {mydata.map((item) => (
            <Marker key={item.id} lat={item.lat} lng={item.lng}>
              <button style={{ background: "none", border: "none" }}>
                <img src="https://img.icons8.com/color/48/000000/marker--v1.png" />
              </button>
            </Marker>
          ))} */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default ClusterMap;
