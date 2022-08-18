/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React, { useCallback, useEffect, useRef, useState } from 'react'
import type {Node} from 'react'
import {
	Button,
	Dimensions,
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Card from './src/components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGrip, faList } from '@fortawesome/free-solid-svg-icons'

const API_BASE_URL = 'https://cs-title-fetcher.herokuapp.com'
const maxNumTitles = 500
const limit = 50
// const aspectRatio = 0.666
const spacer = 4
		
const App: () => Node = () => {
	// const {width: widthWindow, height: heightWindow} = Dimensions.get('window')
	const isDarkMode = useColorScheme() === 'dark'
	const [titles, setTitles] = useState([])
	const [offset, setOffset] = useState(0)
	const uiProps = {
		list: { num: 1, icon: faGrip, iconSize: 22 },
		grid: { num: 3, icon: faList, iconSize: 20 },
	}
	// const imageGridHeight = (((widthWindow - (spacer*2))/uiProps.grid.num) - (spacer*2))/aspectRatio
	const [uiType, setUiType] = useState('grid')
	const [topIndex, setTopIndex] = useState(0)
	const refList = useRef(null)
	console.log(isDarkMode)
	const bgColor = isDarkMode ? Colors.darker : Colors.lighter
	const fgColor = isDarkMode ? Colors.lighter : Colors.darker
	const styles = useStyles(fgColor, bgColor)

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

	const toggleView = () => {
		uiType == 'grid' ? setUiType('list') : setUiType('grid')
		// setTimeout(() => {
		// 	refList.current.scrollToIndex({index: topIndex, animated: true})	
		// }, 100);
	}

	const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
		setTopIndex(viewableItems[0].index)
	}, [])

	useEffect(() => {
		fetchTitles()
	}, [])

	const Header = () => {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Top Titles</Text>
				<TouchableOpacity
					onPress={toggleView}>
					<FontAwesomeIcon 
						icon={uiProps[uiType].icon} 
						color={fgColor} 
						size={uiProps[uiType].iconSize} 
					/>
				</TouchableOpacity>
			</View>
		)
	}
		
	return (
		<SafeAreaView
			style={styles.container}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<FlatList
				ref={refList}
				key={uiProps[uiType].num}
				ListHeaderComponent={Header}
				contentContainerStyle={styles.list}
				stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
				numColumns={uiProps[uiType].num}
				data={titles}
				renderItem={
					({item}) => 
						<Card 
							{...item} 
							columns={uiProps[uiType].num} 
							fgColor={fgColor}
							bgColor={bgColor}
						/>
				}
				keyExtractor={({id}) => id}
				removeClippedSubviews={true}
				windowSize={9}
				onEndReached={fetchTitles}
				onEndReachedThreshold={0.6}
				// onViewableItemsChanged={onViewableItemsChanged }
				// viewabilityConfig={{
				// 	itemVisiblePercentThreshold: 50
				// }}
				// getItemLayout={(data, index) => {
                //     return {
                //         length: 100, 
                //         offset: 100 * index, 
                //         index
                //     } 
                // }}
			/>
		</SafeAreaView>
	);
};

const useStyles = (fgColor, bgColor) => { 
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: bgColor,
		},
		list: {
			marginHorizontal: spacer,
		},
		header: {
			paddingHorizontal: 8,
			paddingVertical: 6,
			backgroundColor: bgColor,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		headerTitle: {
			color: fgColor,
			fontSize: 18,
			fontWeight: '700',
		},
	})
}

export default App
				