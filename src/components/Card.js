import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CardRow = ({label, value}) => (
	<Text style={styles.cardRow}>
		<Text style={styles.cardRowLabel}>{label}: </Text> {value}
	</Text>
);

const Card = ({isDarkMode, title, imdbrating, type, genre, poster, width}) => {
	return (
		<View style={[styles.container, {width: width}]}>
			<View style={[styles.card, isDarkMode && styles.cardDark]}>
				<Image source={{ uri: poster }} style={ styles.cardImage } />
			</View>
		</View>
	)
}

export default Card

const styles = StyleSheet.create({
	container: {
		
	},
	card: {
		padding: 4,
		borderRadius: 4,
		color: Colors.light,
	},
	cardDark: {
		borderColor: Colors.lighter,
		color: Colors.dark,
		backgroundColor: Colors.light,
	},
	cardImage: {
		borderRadius: 4,
		aspectRatio: 0.666,
	},
	cardRow: {
		color: Colors.dark,
	},
	cardRowLabel: {
		fontWeight: '600',
	},
})