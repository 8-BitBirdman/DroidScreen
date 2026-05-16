const remote = require('@electron/remote')
const { Tray, getCurrentWindow, nativeImage } = remote
const window = getCurrentWindow()
const tray = new Tray(nativeImage.createEmpty())

export default Menu => {
	const menu = Menu(tray,{ label: 'tray.hide', click() { window.hide() } }, {
		label: 'tray.exit', click() {
			window.close()
		}
	})

	tray.setContextMenu(menu)
	tray.setTitle('DroidScreen')
	tray.setToolTip('DroidScreen')
	tray.on('right-click', () => {
		tray.popUpContextMenu(menu)
	})
	tray.on('click', () => {
		window.show()
	})
	return tray
}
