import { Titlebar, Color } from 'custom-electron-titlebar'
import getMenu from './Menu'
import Tray from './Tray'

export default vue => {
	const Menu = getMenu(vue)
	const tray = Tray(Menu)
	window.tray = tray
	let hideWhenClickingClose = false
	const config = vue.$store.get('config')
	if(config) {
		hideWhenClickingClose = config.hidden
	}
	new Titlebar({
		backgroundColor: Color.fromHex('#0d0d0d'),
		shadow: false,
		icon: `${__static}/icons/256x256.png`,
		maximizable: false,
		hideWhenClickingClose,
		menu: Menu(tray)
	})
}
