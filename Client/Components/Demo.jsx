import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { useSettingsContext } from '../Contexts/SettingsContext'
import commonStyles from '../commonStyles'
import { BASE_URL } from '../env'

const Demo = ({ demo = '', cubeSize = 3 }) => {
	const { settings, webViewKey } = useSettingsContext()
	const [isCubeLoading, setIsCubeLoading] = useState(true)
	let { U, F, R, L, B, D, cube } = settings

	return (
		<View style={[commonStyles.flex1]}>
			<View style={[commonStyles.flex1, {}]}>
				{isCubeLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<WebView
					source={{
						uri: `${BASE_URL}/rotate?cubesize=${cubeSize}&cubecolor=${cube.replace(
							'#',
							''
						)}&colors=${U.replace('#', '')}${D.replace(
							'#',
							''
						)}${F.replace('#', '')}${B.replace('#', '')}${L.replace(
							'#',
							''
						)}${R.replace('#', '')}${R.replace(
							'#',
							''
						)}&colorscheme=012345&speed=600}&bgcolor=e7f0f8&demo=${demo}`,
					}}
					key={webViewKey}
					scrollEnabled={false}
					bounces={false}
					overScrollMode={'never'}
					style={[styles.webview, { opacity: isCubeLoading ? 0 : 1 }]}
					onLoadStart={() => setIsCubeLoading(true)}
					onLoadEnd={() => setIsCubeLoading(false)}
				/>
			</View>
		</View>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	webview: {
		maxHeight: width * 1.49,
		margin: '15%',
		borderWidth: 3,
		borderColor: 'black',

		borderRadius: 1000,
	},
	buttonContainer: {
		position: 'relative',
		flexDirection: 'row',
	},
	algoText: {
		textAlign: 'center',
		fontSize: 16,
		width: '80%',
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		...commonStyles.cencen,
	},
})

export default Demo
