# DroidScreen Documentation

> Complete reference for users and contributors.

## Table of Contents

- [User Guide](./user-guide.md) — Installation, connection, configuration
- [Architecture](./architecture.md) — How DroidScreen is structured
- [IPC Reference](./ipc-reference.md) — Main ↔ Renderer message contract
- [Building](./building.md) — Local builds, packaging, distribution
- [Contributing](./contributing.md) — How to propose changes

## At a Glance

DroidScreen is an Electron + Vue 2 wrapper around [scrcpy](https://github.com/Genymobile/scrcpy) tailored for macOS. It adds:

- Wireless device discovery via mDNS (`adb mdns services`)
- One-tap pairing for Android 11+ (`adb pair`)
- Automatic device tracking via `adbkit`
- Persistent device aliases via `localstorage`
- A dark UI built on Element UI

## Project Layout

```
droidscreen/
├── src/
│   ├── main/         Node-side Electron entry, ADB & scrcpy spawners
│   └── renderer/     Vue app — UI, state, IPC senders
├── static/icons/     Tray and window icons
├── .electron-vue/    Webpack configs (main + renderer)
├── build/            Output of `npm run build`
└── docs/             You are here
```
