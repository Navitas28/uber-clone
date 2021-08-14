import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination} from '../slices/navSlice';
import {useNavigation} from '@react-navigation/core';
import NavFavorites from './NavFavorites';
import {Icon} from 'react-native-elements';

const NavigateCard = (props) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, Anshul</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<GooglePlacesAutocomplete
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					placeholder='Where To ?'
					styles={{
						container: {flex: 0, backgroundColor: 'white', paddingTop: 20},
						textInput: {fontSize: 18, borderRadius: 5, backgroundColor: '#DDDDDF'},
						textInputContainer: {paddingHorizontal: 20, paddingBottom: 0},
					}}
					query={{key: GOOGLE_MAPS_KEY, language: 'en'}}
					enablePoweredByContainer={false}
					returnKeyType={'search'}
					minLength={2}
					fetchDetails={true}
					onPress={(data, details = null) => {
						dispatch(
							setDestination({
								location: details.geometry.location,
								description: data.description,
							}),
						);
						navigation.navigate('RideOptionsCard');
					}}
				/>
				<NavFavorites />
			</View>
			<View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
				<TouchableOpacity
					style={tw`flex flex-row justify-between bg-black px-4 py-3 rounded-full`}
					onPress={() => navigation.navigate('RideOptionsCard')}
				>
					<Icon name='car' type='font-awesome' color='white' size={16} />
					<Text style={tw`text-white text-center`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity style={tw`flex flex-row justify-between px-4 py-3 rounded-full`}>
					<Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
					<Text style={tw`text-center ml-2`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default NavigateCard;
