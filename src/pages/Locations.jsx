
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/base";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export function Locations() {
    const [loc, setLoc] = useState({ lat: 31.9632, lng: 34.8041 })
    const defaultProps = {
        center: {
            lat: 31.9632,
            lng: 34.8041 
        },
        zoom: 11
    };
    const { lat, lng } = loc
    return (
        // Important! Always set the container height explicitly
        <section>
            <div style={{ height: '60vh', width: '60%', margin: '10px auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCcepevgXQ0DFmsXrdyecMV11LMtvFSoWs" }}
                    center={loc}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={lat}
                        lng={lng}
                        text="🏰"
                    />
                </GoogleMapReact>
            </div>
            <div className="location-btn flex justify-center">
                <button onClick={() => setLoc({ lat: 32.0853, lng: 34.7818 })}>Tel Aviv</button>
                <button onClick={() => setLoc({ lat: 32.7940, lng: 34.9896 })}>Haifa</button>
                <button onClick={() => setLoc({ lat: 31.9632, lng: 34.8041 })}>Rishon Lezion</button>
            </div>
        </section>
    );
}