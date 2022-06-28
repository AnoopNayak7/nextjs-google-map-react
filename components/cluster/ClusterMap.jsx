import React from "react";
import useSWR from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

const ClusterMap = () => {
  return (
    <div>
      <h1>Cluster data example</h1>
      <div style={{ width: "100%", height: "100vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAJrwFbK5IsGCBpQor90U540OSJ15CHXos" }}
          defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
          defaultZoom={10}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default ClusterMap;
