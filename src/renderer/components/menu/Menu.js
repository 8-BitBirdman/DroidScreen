const pkg = require('../../../../package')
const remote = require('@electron/remote')
const { Menu, MenuItem } = remote

export default (vue) => (tray, ...items) => {
	const menu = new Menu()
	menu.append(new MenuItem({
		label: vue.$t('titleBar.document'),
		click: () => remote.shell.openExternal('https://github.com/8-BitBirdman/droidscreen')
	}))

	menu.append(new MenuItem({
		label: vue.$t('titleBar.checkForUpdates'),
		click: () => remote.shell.openExternal('https://github.com/8-BitBirdman/droidscreen/releases')
	}))

	menu.append(new MenuItem({
		label: vue.$t('titleBar.feedback'),
		click: () => remote.shell.openExternal('https://github.com/8-BitBirdman/droidscreen/issues')
	}))

	const about = []
	about.push(`name: ${pkg.name}`)
	about.push(`version: ${pkg.version}`)
	about.push(`homepage: ${pkg.homepage}`)
	about.push(`author: ${pkg.author}`)
	about.push(`license: ${pkg.license}`)
	about.push(`description: ${pkg.description}`)
	about.push(`node: ${process.versions.node}`)
	about.push(`chrome: ${process.versions.chrome}`)
	about.push(`electron: ${process.versions.electron}`)
	menu.append(new MenuItem({
		label: vue.$t('titleBar.about'),
		click: () => {
			vue.$alert(about.join('<br/>'), 'DroidScreen', {
				dangerouslyUseHTMLString: true,
			})
		}
	}))
	items.forEach(({ label, click }) => {
		menu.append(new MenuItem({ label: vue.$t(label), click }))
	})
	return menu
}
