import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {selectDestination, selectOrigin, setTravelTimeInformation} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env';

const Map = (props) => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;

		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {edgePadding: {top: 50, right: 50, bottom: 50, left: 50}});
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`,
			)
				.then((res) => res.json())
				.then((data) => {
					dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
					console.log('🕵️‍♂️ 🥷🏻 : ==> file: Map.js : ==> line 31 : ==> data.rows[0].elements[0]', data.rows[0].elements[0]);
				});
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_KEY]);
	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType={'mutedStandard'}
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					lineDashPattern={[0]}
					origin={{latitude: origin.location.lat, longitude: origin.location.lng}}
					destination={{latitude: destination.location.lat, longitude: destination.location.lng}}
					apikey={GOOGLE_MAPS_KEY}
					strokeWidth={3}
					strokeColor='black'
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{latitude: origin.location.lat, longitude: origin.location.lng}}
					title={'Origin'}
					description={origin.description}
					identifier='origin'
				/>
			)}

			{destination?.location && (
				<Marker
					coordinate={{latitude: destination.location.lat, longitude: destination.location.lng}}
					title={'destination'}
					description={destination.description}
					identifier='destination'
				/>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({});

export default Map;
