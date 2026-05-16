# Building DroidScreen

## Prerequisites

- **Node.js** 18 or 20
- **npm** 8+
- **macOS** 11 (Big Sur) or later — Apple Silicon (arm64)
- Xcode Command Line Tools: `xcode-select --install`

## Install Dependencies

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` required: some transitive deps lag behind Electron 28 peer ranges.

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
npm run pack:main
npm run pack:renderer
npx electron-builder --mac --arm64 --publish=never
```

Output:

```
build/
├── DroidScreen-1.5.1-arm64-mac.zip   # distributable archive
├── mac-arm64/
│   └── DroidScreen.app                # the actual app bundle (arm64)
└── builder-debug.yml
```

> **Note**: arm64-only build. For universal (Intel + Apple Silicon), add `--x64 --arm64` and ensure all native deps support both archs.

## Packaging Targets

By default DroidScreen builds only a **`.zip`** archive (DMG creation crashes on some macOS versions due to a perl issue in `dmg-builder`).

To re-enable DMG, edit `package.json`:

```json
"mac": {
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
- Confirm `nodeIntegration: true` and `contextIsolation: false` in `BrowserWindow` options (Electron 28 removed `enableRemoteModule`)
- Confirm `remote.initialize()` is called once, and `remote.enable(mainWindow.webContents)` is called before `loadURL`
