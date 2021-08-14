import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Icon} from 'react-native-elements';

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: 'Brigade Lake Front, Seetharamplaya - Hoodi Road, Near SAP Labs, EPIP Zone, Whitefield, Bengaluru, Karnataka, India',
	},
	{
		id: '456',
		icon: 'briefcase',
		location: 'Work',
		destination: 'Dell International Provate Ltd, Krishnappa Garden, C V Raman Nagar, Bengaluru, Karnataka, India',
	},
];

const NavFavorites = (props) => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => <View style={[tw`bg-gray-200`, {height: 0.5}]} />}
			renderItem={({item}) => (
				<TouchableOpacity style={tw`flex-row items-center p-5`}>
					<Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`} type='ionicon' color='white' size={18} name={item.icon} />
					<View>
						<Text style={tw`font-semibold text-lg`}>{item.location}</Text>
						<Text style={tw`text-gray-500`}>{item.destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

const styles = StyleSheet.create({});

export default NavFavorites;
