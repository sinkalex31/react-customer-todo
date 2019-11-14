import React from 'react';
import { LatLngTuple } from 'leaflet';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import classes from './Map.module.scss';

interface IProps {
	point: LatLngTuple;
}

export const Map: React.FC<IProps> = (props) => (
	<LeafletMap className={classes.container} center={props.point} zoom={13}>
		<TileLayer
			attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Marker position={props.point} />
	</LeafletMap>
);
