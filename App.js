/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React, { useEffect, useState } from 'react'
import type {Node} from 'react'
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Card from './src/components/Card'

const API_BASE_URL = 'https://cs-title-fetcher.herokuapp.com'
const maxNumTitles = 500
const limit = 50
		
const App: () => Node = () => {
	const isDarkMode = useColorScheme() === 'dark'
	const [titles, setTitles] = useState([])
	const [offset, setOffset] = useState(0)

	const fetchTitles = () => {
		const nextOffset = offset + limit
		// don't fetch if offset maximum reached
		if(nextOffset >= maxNumTitles) return

		fetch(`${API_BASE_URL}/api/titles?offset=${offset}&limit=${limit}`)
		.then(res => res.json())
		.then(({data}) => {
			setTitles(titles.concat(data))
			setOffset(nextOffset)
		})
	}

	useEffect(() => {
		fetchTitles()
	}, [])

	const Header = () => {
		return (
			<Text
				style={[
					styles.sectionTitle,
					{color: isDarkMode ? Colors.lighter : Colors.darker},
				]}>
				Top Titles
			</Text>
		)
	}
		
	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter },
			]}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<FlatList
				ListHeaderComponent={Header}
				contentContainerStyle={styles.list}
				stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
				numColumns={3}
				data={titles}
				renderItem={({item}) => <Card {...item} width={'33.33%'} isDarkMode={isDarkMode} />}
				keyExtractor={({id}) => id}
				onEndReached={fetchTitles}
				onEndReachedThreshold={0.6}
			/>
		</SafeAreaView>
	);
};
	
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		margin: 4,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		marginVertical: 16,
		paddingHorizontal: 24,
	},
});

export default App;
				