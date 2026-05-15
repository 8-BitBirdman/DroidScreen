<div align="center">

<br/>

<img src="static/icons/256x256.png" width="128" height="128" alt="DroidScreen" />

# DroidScreen

### Mirror, control and record your Android device on macOS — wirelessly.

<br/>

[![License](https://img.shields.io/badge/license-Apache%202.0-3a7afe.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
[![Release](https://img.shields.io/github/v/release/8-BitBirdman/droidscreen?style=for-the-badge&color=67c23a)](https://github.com/8-BitBirdman/droidscreen/releases)
[![Platform](https://img.shields.io/badge/platform-macOS-1d1d1f?style=for-the-badge&logo=apple)](https://github.com/8-BitBirdman/droidscreen/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff6b6b?style=for-the-badge)](https://github.com/8-BitBirdman/droidscreen/pulls)

<br/>

**A modern, dark-themed GUI for [scrcpy](https://github.com/Genymobile/scrcpy) — built for macOS, designed for speed, paired in seconds.**

<sub>No cable. No setup hassle. Just scan, pair, mirror.</sub>

</div>

<br/>

---

## ✨ Highlights

<table>
<tr>
<td width="50%" valign="top">

### ⚡ Quick Connect
One-tap pairing for **Android 11+** wireless debugging.
Discover devices on your LAN via mDNS, pair with a 6-digit code, mirror in seconds.

### 🎨 Native Dark UI
A clean, modern dark theme with vibrancy effects.
Built for macOS, fits right into Big Sur and later.

### 🔌 Cable Optional
Plug in for instant detection or stay wireless forever.
Detects connected devices automatically.

</td>
<td width="50%" valign="top">

### 🎬 Full scrcpy Power
Record, crop, rotate, control bitrate, FPS, resolution.
All scrcpy options exposed through a clean form.

### ⌨️ Keyboard & Mouse
Type, click, swipe, copy/paste — your phone behaves like another window.

### 🛡️ Safe & Sandboxed
Input validation on every IPC call. No shell injection. No remote code paths.

</td>
</tr>
</table>

<br/>

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install scrcpy and adb (one-time setup)
brew install scrcpy android-platform-tools
```

> **Android 11+** users: enable **Wireless Debugging** in Developer Options.
> **Android 5–10** users: enable **USB Debugging** and use the cable on first connection.

### Install DroidScreen

Download the latest `.app` from [**Releases**](https://github.com/8-BitBirdman/droidscreen/releases) and drag it to `/Applications`.

Or build from source — see [Development](#-development) below.

<br/>

---

## 📱 Connecting Your Phone

### ⚡ Wireless (Android 11+) — _Recommended_

| Step | Action |
|:----:|:-------|
| 1 | Phone → **Settings → Developer Options → Wireless debugging → ON** |
| 2 | Open DroidScreen → click **Scan for Devices** |
| 3 | Tap **Pair**, enter the 6-digit code from your phone |
| 4 | Done — auto-connects and stays paired |

> 💡 _Same Wi-Fi network required. mDNS doesn't cross subnets._

### 🔌 USB

1. Plug your phone into your Mac
2. Authorize the debug prompt on your phone
3. Device appears automatically — click **Open Selected Mirror**

### 🌐 Manual IP (Legacy / Android ≤10)

1. Connect via USB once to enable `adb tcpip 5555`
2. Click **▼ Manual IP connect** at the bottom of Devices
3. Enter your phone's LAN IP → **Open wireless connection**

<br/>

---

## ⌨️ Shortcuts

> When the scrcpy mirror window has focus.

<details>
<summary><b>📋 Click to expand full shortcut reference</b></summary>

<br/>

| Action | macOS Shortcut |
|:-------|:--------------:|
| Switch fullscreen mode                   | `⌘ F` |
| Resize window to 1:1 (pixel-perfect)     | `⌘ G` |
| Resize window to remove black borders    | `⌘ X` · *Double-click* |
| Click on **HOME**                        | `⌃ H` · *Middle-click* |
| Click on **BACK**                        | `⌘ B` · *Right-click* |
| Click on **APP_SWITCH**                  | `⌘ S` |
| Click on **MENU**                        | `⌃ M` |
| **VOLUME UP**                            | `⌘ ↑` |
| **VOLUME DOWN**                          | `⌘ ↓` |
| **POWER**                                | `⌘ P` |
| Power on (when off)                      | *Right-click* |
| Turn device screen off (keep mirroring)  | `⌘ O` |
| Expand notification panel                | `⌘ N` |
| Collapse notification panel              | `⌘ ⇧ N` |
| Copy device clipboard → Mac              | `⌘ C` |
| Paste Mac clipboard → device             | `⌘ V` |
| Copy Mac clipboard → device              | `⌘ ⇧ V` |
| Enable/disable FPS counter (stdout)      | `⌘ I` |

</details>

<br/>

---

## ⚙️ Configuration

The **Configuration** tab exposes every scrcpy option:

| Setting | What it does |
|:--------|:-------------|
| **scrcpy path** | Override location (leave blank if `scrcpy` is in your `PATH`) |
| **Window title** | Custom title for the mirror window |
| **Record screen** | Save mirror to `.mkv` file (with optional live preview) |
| **Bit rate** | Video bitrate (default 8 Mbps — raise for better quality) |
| **Max size** | Cap longest dimension (e.g. 1920) — `0` = native |
| **Max FPS** | Cap framerate — `0` = unlimited |
| **Rotation** | Force 0° / 90° / 180° / 270° |
| **Crop** | Show only a region of the screen |
| **Window position/size** | Pre-position mirror window |
| **Always on top** | Pin mirror above other windows |
| **Borderless** | Hide window chrome |
| **Fullscreen** | Start fullscreen |
| **Show touches** | Visualize taps on the device |
| **Render expired frames** | Lower latency at cost of CPU |
| **Stay awake** | Prevent screen sleep while mirroring |
| **Auto-open** | Automatically mirror when device connects |
| **Hide on close** | Minimize to tray instead of quitting |

<br/>

---

## 🛠 Development

Built with **Electron 13 + Vue 2 + Element UI**, bundled by **Webpack**.

```bash
# Clone & install
git clone https://github.com/8-BitBirdman/droidscreen
cd droidscreen
npm install

# Dev mode (hot reload, devtools)
npm run dev

# Production build → build/mac/DroidScreen.app
npm run build

# Lint
npm run lint
```

### Project Structure

```
src/
├── main/                  # Electron main process
│   ├── index.js           # App lifecycle, IPC registration
│   ├── adb/               # ADB tracker, mDNS, pair, connect
│   └── scrcpy/            # scrcpy spawner with full arg builder
└── renderer/              # Vue app
    ├── components/
    │   ├── dashboard/     # Configuration & device Management
    │   ├── layout/        # Header / Footer
    │   └── menu/          # Tray + titlebar menus
    ├── lang/              # i18n (English)
    ├── plugins/           # Vue plugins (store, notify, openExternal)
    └── styles/            # Global SCSS + dark theme overrides
```

### Architecture

```
┌──────────────────┐  IPC   ┌──────────────────┐  spawn  ┌──────────┐
│  Renderer (Vue)  │ ◄────► │   Main (Node)    │ ──────► │  scrcpy  │
│   Management.vue │        │  adb / scrcpy    │         │   adb    │
└──────────────────┘        └──────────────────┘         └──────────┘
        │                            │
        │                            └─► adbkit (TCP)
        └─► @electron/remote (titlebar, menus)
```

<br/>

---

## 🔐 Security Notes

- **All IPC inputs validated** — addresses match `host:port`, codes are 6 digits
- **No shell interpolation** — uses `execFile`, not `exec`, for `adb` calls
- **Mac-only** by design — Windows/Linux paths and binaries removed
- **No telemetry. No tracking. No network calls** beyond your own LAN

<br/>

---

## 🐛 Troubleshooting

<details>
<summary><b>Phone not appearing when scanning</b></summary>

- Verify Wireless Debugging is **ON** (not just Developer Options enabled)
- Confirm Mac and phone are on the same Wi-Fi (mDNS won't traverse VLANs)
- Some routers block mDNS / multicast — try disabling **AP Isolation**
- Run `adb mdns services` in Terminal — if empty, it's a network issue, not the app
</details>

<details>
<summary><b>Pairing fails repeatedly</b></summary>

- The pairing code expires fast — enter it within ~30 seconds
- The pairing port changes every time you toggle Wireless Debugging — re-scan
- Make sure no other tool (Android Studio, Vysor) is holding the adb server
</details>

<details>
<summary><b>"scrcpy not found" error</b></summary>

- Confirm install: `which scrcpy` should print a path
- If installed but not found, set the **scrcpy path** explicitly in Configuration
- macOS apps inherit a limited `PATH` — Homebrew paths usually work via `fix-path`
</details>

<details>
<summary><b>Mirror window opens but is black/laggy</b></summary>

- Lower the bit rate or max size in Configuration
- Disable **Render expired frames**
- Check `~/Library/Logs/DroidScreen/` for scrcpy stdout
</details>

<br/>

---

## 🤝 Contributing

Pull requests welcome. For substantial changes, open an issue first to discuss direction.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Run `npm run lint` before committing
4. Open a PR with a clear description

<br/>

---

## 📜 Credits

- [**scrcpy**](https://github.com/Genymobile/scrcpy) by Genymobile — the engine that makes it all possible
- [**adbkit**](https://github.com/openstf/adbkit) — Node.js ADB client
- [**Electron**](https://electronjs.org) + [**Vue**](https://vuejs.org) + [**Element UI**](https://element.eleme.io)

<br/>

---

## 📃 License

[**Apache 2.0**](LICENSE)

<br/>

<div align="center">

**Made with ☕ for the Android-on-Mac crowd.**

If DroidScreen saves you a USB cable, consider giving it a ⭐

</div>
