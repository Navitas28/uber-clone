import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavorites from '../components/NavFavorites';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from '@env';
import {useDispatch} from 'react-redux';
import {setOrigin, setDestination} from '../slices/navSlice';

const HomeScreen = (props) => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: 'https://links.papareact.com/gzs'}} />
				<GooglePlacesAutocomplete
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					placeholder='Where From ?'
					styles={{container: {flex: 0}, textInput: {fontSize: 18}}}
					query={{key: GOOGLE_MAPS_KEY, language: 'en'}}
					enablePoweredByContainer={false}
					returnKeyType={'search'}
					minLength={2}
					fetchDetails={true}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							}),
						);
						dispatch(setDestination(null));
					}}
				/>
				<NavOptions />
				<NavFavorites />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'blue',
	},
});

export default HomeScreen;
