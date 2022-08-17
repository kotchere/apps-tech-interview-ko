import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CardRow = ({label, value}) => (
	<Text style={styles.cardRow}>
		<Text style={styles.cardRowLabel}>{label}: </Text> {value}
	</Text>
);

const Card = ({isDarkMode, title, imdbrating, type, genre, poster}) => {
	return (
		<View style={[styles.card, isDarkMode && styles.cardDark]}>
			<Image source={{uri: poster}} style={styles.cardImage} />
			<CardRow label="Title" value={title} />
			<CardRow label="Rating" value={imdbrating} />
			<CardRow label="Type" value={type} />
			<CardRow label="Genre" value={genre} />
		</View>
	)
}

export default Card

const styles = StyleSheet.create({
	card: {
		padding: 16,
		marginHorizontal: 24,
		marginBottom: 8,
		borderColor: Colors.dark,
		borderWidth: 1,
		borderRadius: 4,
		color: Colors.light,
	},
	cardDark: {
		borderColor: Colors.lighter,
		color: Colors.dark,
		backgroundColor: Colors.light,
	},
	cardImage: {
		width: '30%',
		aspectRatio: 0.666,
		marginBottom: 10,
	},
	cardRow: {
		color: Colors.dark,
	},
	cardRowLabel: {
		fontWeight: '600',
	},
})