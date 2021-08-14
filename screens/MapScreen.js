import React from 'react';
import {View, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import RideOptionsCard from '../components/RideOptionsCard';
import NavigateCard from '../components/NavigateCard';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const MapScreen = (props) => {
	const Stack = createStackNavigator();
	const navigation = useNavigation();
	return (
		<View>
			<TouchableOpacity
				style={tw`absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}
				onPress={() => navigation.navigate('HomeScreen')}
			>
				<Icon name='menu' size={18} />
			</TouchableOpacity>
			<View style={tw`h-1/2`}>
				<Map />
			</View>
			<View style={tw`h-1/2`}>
				<Stack.Navigator>
					<Stack.Screen name='NavigateCard' component={NavigateCard} options={{headerShown: false}} />
					<Stack.Screen name='RideOptionsCard' component={RideOptionsCard} options={{headerShown: false}} />
				</Stack.Navigator>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default MapScreen;
