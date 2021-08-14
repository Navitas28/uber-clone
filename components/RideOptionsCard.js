import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity, FlatList, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../slices/navSlice';

const data = [
	{id: '123', title: 'UberX', multiplier: 1, image: 'https://links.papareact.com/3pn'},
	{id: '456', title: 'Uber XL', multiplier: 1.2, image: 'https://links.papareact.com/5w8'},
	{id: '789', title: 'Uber LUX', multiplier: 1.75, image: 'https://links.papareact.com/7pf'},
];

const SURGE_CHARGE_RATE = 1.5;
const RideOptionsCard = (props) => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity style={tw`absolute top-3 p-3 rounded-full left-5`} onPress={() => navigation.navigate('NavigateCard')}>
					<Icon name='chevron-left' type='font-awesome' size={12} />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({item}) => (
					<TouchableOpacity
						style={tw`flex-row justify-between items-center px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
						onPress={() => setSelected(item)}
					>
						<Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: item.image}} />
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{item.title}</Text>
							<Text>{travelTimeInformation?.duration.text}</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat('en-us', {style: 'currency', currency: 'INR'}).format(
								(travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100,
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>

			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
					<Text style={tw`text-center text-white text-xl`}> Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default RideOptionsCard;
