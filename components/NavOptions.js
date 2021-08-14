import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slices/navSlice';
const data = [
	{
		id: '123',
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen',
	},
	{id: '456', title: 'Order Food', image: 'https://links.papareact.com/28w', screen: 'EatScreen'},
];

const NavOptions = (props) => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);
	return (
		<View>
			<FlatList
				keyExtractor={(item) => item.id}
				data={data}
				horizontal
				renderItem={({item}) => (
					<TouchableOpacity
						style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
						disabled={!origin}
						onPress={() => navigation.navigate(item.screen)}
					>
						<View style={tw`${!origin && 'opacity-20'}`}>
							<Image style={{width: 120, height: 120, resizeMode: 'contain'}} source={{uri: item.image}} />
							<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
							<Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} type='antdesign' color='white' name='arrowright' />
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default NavOptions;
