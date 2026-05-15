# Building DroidScreen

## Prerequisites

- **Node.js** 16 or 18 (electron-vue tooling is finicky on 20+)
- **npm** 8+
- **macOS** 10.15 or later
- Xcode Command Line Tools: `xcode-select --install`

## Install Dependencies

```bash
npm install
```

This will also run `npm run lint:fix` as a `postinstall` hook.

## Development

```bash
npm run dev
```

- Renderer dev server starts on `http://localhost:9080`
- Electron launches with hot reload on renderer changes
- Main process changes require a manual app restart (Ctrl+R won't help)

DevTools are commented out by default — uncomment in `src/main/index.js`:

```js
mainWindow.webContents.openDevTools()
```

## Production Build

```bash
npm run build
```

Output:

```
build/
├── DroidScreen-1.5.1.zip          # distributable archive
├── mac/
│   └── DroidScreen.app             # the actual app bundle
├── builder-debug.yml
└── icons/
```

## Packaging Targets

By default DroidScreen builds only a **`.zip`** archive (DMG creation crashes on some macOS versions due to a perl issue in `dmg-builder`).

To re-enable DMG, edit `package.json`:

```json
"mac": {
  "icon": "build/icons/icon.icns",
  "target": ["zip", "dmg"]
}
```

## Code Signing & Notarization

Not configured by default. To sign:

1. Add an Apple Developer ID Application certificate to your Keychain
2. Set in `package.json` under `build.mac`:

```json
"identity": "Developer ID Application: Your Name (TEAMID)",
"hardenedRuntime": true,
"gatekeeperAssess": false,
"entitlements": "build/entitlements.mac.plist",
"entitlementsInherit": "build/entitlements.mac.plist"
```

3. For notarization, install `electron-notarize` and add an `afterSign` hook.

Refer to the [electron-builder docs](https://www.electron.build/code-signing) for the full flow.

## Linting

```bash
npm run lint        # check
npm run lint:fix    # auto-fix
```

ESLint config lives in `.eslintrc.js`. Vue files are linted via `eslint-plugin-vue`.

## Common Build Issues

### `node-sass` errors

We replaced `node-sass` with `sass` (Dart). If you see `node-sass` errors, delete `node_modules` and `package-lock.json`, then `npm install` again.

### `perl` error during DMG step

This is a known macOS issue with `dmg-builder` on newer Perl versions. The `.app` bundle is still built successfully — only the DMG packaging fails. Use the `.zip` target instead.

### `chokidar` deprecation warnings

Webpack 4 ships an old `chokidar`. We override it via `package.json > overrides`. Requires npm 8+.

### Renderer fails to load `@electron/remote`

- Confirm it's installed: `npm ls @electron/remote`
- Confirm `nodeIntegration: true` and `enableRemoteModule: true` in `BrowserWindow` options
- Confirm `remoteMain.enable(mainWindow.webContents)` is called before `loadURL`
