import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import notFoundSrc from '../images/404.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { hexToRgb } from '../utils/HexToRgb'
import { toHoursAndMinutes } from '../utils/ToHoursAndMinutes'

const Card = (props) => {
	const styles = useStyles(props.fgColor, props.bgColor)

	const GenreTag = ({genre}) => {
		// limit to 3 elements
		const genres = genre.split(',').slice(0, 3)
		return (
			<View style={[styles.row, styles.tagContainer]}>
				{
					genres.map((item, index) => {
						return (
							<View style={styles.tag} key={index}>
								<Text style={styles.tagText}>{item}</Text>
							</View>
						)
					})
				}
			</View>
		)
	}

	return (
		<View style={[styles.container, {width: (100/props.columns) + '%'}]}>
			{ props.columns == 1 ? 
				<View style={[styles.card, styles.cardList, styles.row]}>
					<Image 
						defaultSource={notFoundSrc} 
						source={{ uri: props.poster }} 
						style={[styles.cardImage, styles.cardImageList]}
					/>
					<View style={styles.cardDetails}>
						<Text numberOfLines={1} style={styles.detailsTitle}>{props.title}</Text>
						<View style={styles.detailsRow}>
							<Text style={styles.baseText}>{props.year}</Text>
							<Text style={styles.baseText}>{props.rated}</Text>
							<Text style={styles.baseText}>{toHoursAndMinutes(parseFloat(props.runtime))}</Text>
							<Text style={[styles.type, styles.baseText]}>{props.type}</Text>
							<View style={styles.row}>
								<FontAwesomeIcon color={props.fgColor} icon={faStar}/>
								<Text style={styles.baseText}> {props.imdbrating}</Text>
							</View>
						</View>
						
						<Text numberOfLines={5} style={styles.detailsPlot}>{props.plot}</Text>
						
						<GenreTag genre={props.genre} />
					</View>
				</View>
			:
				<View style={styles.card}>
					<Image 
						defaultSource={notFoundSrc} 
						source={{ uri: props.poster }} 
						style={styles.cardImage}
					/>
				</View>
			}
		</View>
	)
}

export default memo(Card)

const useStyles = (fgColor, bgColor) => {
	return StyleSheet.create({
		container: {
			
		},
		baseText: {
			color: fgColor,
		},
		card: {
			padding: 4,
			borderRadius: 4,
			color: Colors.light,
		},
		cardList: {
			paddingBottom: 10,
			marginBottom: 10,
		},
		cardImage: {
			borderRadius: 4,
			aspectRatio: 0.666,
		},
		cardImageList: {
			height: 180,
		},
		row: {
			flexDirection: 'row',
		},
		type: {
			textTransform: 'capitalize',
		},
		cardDetails: {
			flex: 1,
			paddingLeft: 10,
			paddingRight: 5,
			height: 180,
		},
		detailsTitle: {
			color: fgColor,
			fontWeight: '700',
			fontSize: 16,
		},
		detailsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginVertical: 3,
			paddingBottom: 5,
			borderBottomColor: hexToRgb(fgColor, 0.05),
			borderBottomWidth: 1,
	
		},
		detailsPlot: {
			marginTop: 3,
			fontSize: 14,
			height: 100,
			color: fgColor,
		},
		tagContainer: {
			// flexWrap: 'wrap',
		},
		tag: {
			borderWidth: 1,
			borderColor: hexToRgb(fgColor, 0.3),
			borderRadius: 4,
			paddingVertical: 3,
			paddingHorizontal: 5,
			marginRight: 3,
		},
		tagText: {
			fontSize: 12,
			color: fgColor,
		}
	})
}