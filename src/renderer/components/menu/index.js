import getMenu from './Menu'
import Tray from './Tray'

export default vue => {
	const Menu = getMenu(vue)
	const tray = Tray(Menu)
	window.tray = tray
}
