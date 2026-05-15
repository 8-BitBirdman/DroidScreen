# User Guide

## Installation

### From Release

1. Visit [Releases](https://github.com/8-BitBirdman/droidscreen/releases)
2. Download `DroidScreen-x.y.z-mac.zip`
3. Unzip and drag `DroidScreen.app` to `/Applications`
4. Right-click → **Open** the first time (Gatekeeper)

### Dependencies

DroidScreen requires `scrcpy` and `adb` on your `PATH`:

```bash
brew install scrcpy android-platform-tools
```

Verify:

```bash
which scrcpy   # → /opt/homebrew/bin/scrcpy
which adb      # → /opt/homebrew/bin/adb
adb --version  # → Android Debug Bridge version 1.x.x
```

If `scrcpy` is installed elsewhere, you can point DroidScreen to it via the **scrcpy path** field in Configuration.

---

## Connection Methods

### ⚡ Wireless (Android 11+)

The fastest path. No cable required, ever.

#### One-time pairing

1. On your phone:
   - **Settings → Developer Options → Wireless debugging → ON**
   - Tap **Pair device with pairing code**
   - Note the 6-digit code displayed
2. In DroidScreen:
   - Click **⚡ Quick Connect → Scan for Devices**
   - Your phone appears in the list
   - Click **Pair**, enter the 6-digit code
3. Device pairs and auto-connects. Subsequent connections skip pairing.

#### Reconnecting

After pairing, just:

1. Click **Scan for Devices**
2. Click **Connect** next to your device

> **Pairing data persists on the phone**, but the pairing port changes each time Wireless Debugging is toggled. If pairing previously succeeded but Connect fails, re-pair.

### 🔌 USB

The simplest path for Android 5–10.

1. Plug your phone into your Mac
2. Phone shows "Allow USB debugging?" — tap **Allow**
3. The device appears in DroidScreen automatically
4. Click **Open Selected Mirror**

### 🌐 Manual IP (Android 5–10 wireless)

Requires a one-time USB connection to enable wireless ADB.

1. Connect via USB
2. In Terminal: `adb tcpip 5555`
3. Disconnect cable
4. In DroidScreen, expand **▼ Manual IP connect**
5. Enter the phone's LAN IP (e.g. `192.168.1.42`)
6. Click **Open wireless connection**

---

## Configuration

All scrcpy options are exposed in the **Configuration** tab. Save your preferences once — they apply to every mirror you open.

### Essential Settings

| Field | Purpose |
|:------|:--------|
| **scrcpy path** | Override `scrcpy` binary location. Leave blank to use `PATH`. |
| **window title** | Custom title for the mirror window |
| **bit rate** | Higher = better quality + more bandwidth (default 8 Mbps) |
| **max size** | Cap longest dimension (e.g. 1920). `0` = native resolution |
| **max fps** | Cap framerate. `0` = unlimited |

### Recording

Toggle **record screen** to save the mirror as `.mkv`.

- **Open mirror when recording** — show the mirror window while recording
- **file path** — destination file (e.g. `~/Desktop/recording.mkv`)

### Window Behaviour

| Option | Effect |
|:-------|:-------|
| **Window always on top** | Mirror floats above other windows |
| **Display in full screen** | Open mirror fullscreen |
| **Show window border** | Show/hide window chrome |
| **Mirror's abscissa/ordinate position** | Pre-position mirror on screen |
| **Mirror height/width** | Pre-size mirror window |

### Advanced

- **rotation angle** — force orientation (0/90/180/270°)
- **cut screen** — show only a region of the device screen
- **Computer control** — disable to mirror without input
- **Show phone tap location** — visualize touches on the device
- **Rendering all frames** — lower latency, higher CPU
- **Turn off the lock screen** — keep device unlocked while mirroring
- **Automatically turn on connected devices** — mirror immediately on plug-in
- **Hide to system bar after exit** — minimize to tray instead of quitting

---

## Tray Menu

Right-click the **DroidScreen** menu bar item:

- **Document** — open this repository
- **Update** — check Releases page
- **Feedback** — report an issue
- **About** — version + build info
- **Hide** — hide the main window
- **Exit** — quit the app

---

## Tips

- **Multiple devices?** Use checkboxes to select several, then **Open the selected mirror** — opens one window per device.
- **Rename a device** — click its name in the device table to set an alias.
- **First-launch is slow** — Electron + scrcpy take a moment on first run; subsequent launches are instant.
- **Lag on 4K phones?** Lower **max size** to 1920 and **bit rate** to 4 Mbps.
- **Clipboard sync** — copy on phone + `⌘ C` in mirror window → Mac clipboard. Reverse: `⌘ V`.
