# Ultimate Workspaces (`io.github.alexllama.ultimate-workspaces`)

A standalone, highly customizable workspace icon plugin for **Omarchy Quattro** (powered by **Quickshell** and **Hyprland**). 

This plugin replaces generic workspace numbers on the Omarchy top bar with dynamic application indicators, combining system SVG/PNG desktop icons with a customizable fallback layer for text-based **Nerd Font** glyphs.

---

## Origins & Evolution

This plugin builds upon the structural widget foundation from [`lucasjr76.workspace-icons`](https://github.com/lucasjr76/workspace-icons) and incorporates the comprehensive Nerd Font glyph lookup engine (`IconRules.js`) adapted from [`io.github.thetrueferret.decent-workspaces`](https://github.com/thetrueferret/decent-workspaces).

It enhances the original logic by introducing dual-layer fallback rendering, dynamic window title matching, custom font glyph support, and prioritized handling for web applications and Progressive Web Apps (PWAs).

---

## Features

* **Dual-Layer Rendering**: Attempts to locate a native system icon theme SVG/PNG via standard `.desktop` entries first; if none is found, it seamlessly falls back to a custom Nerd Font text glyph.
* **Title & Class Matching**: Captures both window `class` and `title` to allow specific rules for dynamic windows (e.g., matching `Yazi:.*` titles or specific browser tabs).
* **PWA Isolation**: Correctly handles Brave Progressive Web Apps (such as YouTube, YouTube Music, Notion, etc.) so they display their specific icons instead of falling back to the generic browser icon.
* **Custom Font & Glyph Support**: Full support for custom Unicode escape sequences (such as `"\ue900"` for the Omarchy logo).
* **Native Omarchy Integration**: Provides click-to-focus behavior, scroll-to-switch workspace navigation, and a hover tooltip listing open applications.

---

## Architecture & Icon Resolution Process

The plugin resolves workspace icons through a multi-stage pipeline:

```text
Window (Class / Title)
       │
       ├── 1. System .desktop Lookup (lookupEntry)
       │      └── Icon= resolved via active system theme index.
       │
       └── 2. Nerd Font Fallback Layer (IconRules.js)
              └── If no system SVG exists (or if bypassed in iconSourceFor),
                  renders a Text element using class/title regex rules.

```

### Key Changes in `Widget.qml`

1. **Title Extraction**: Updated `appsByWorkspace` to store both `appId` (`class`) and `title` objects for active toplevels.
2. **Dual-Layer Slot Delegate**: Updated the bar delegate repeater to render an `Image` component for system icons and a `Text` component for Nerd Font glyphs.
3. **Bypass Logic**: `iconSourceFor(appObj)` returns `""` when a system icon is missing or when a specific app (e.g., terminal wrappers like Yazi) should skip SVG lookup and force text glyph rendering instead.

---

## Configuration (`IconRules.js`)

### PWA Match Priority & Order

Progressive Web Apps (PWAs) launched via Brave report unique class names (e.g., `brave-youtube.com__-Default`). In `IconRules.js`, these PWA regex patterns sit at the **top** of the `rules` list (above general browser entries) so that specific web app glyphs take precedence over generic browser icons:

```javascript
var rules = [
  // PWAs & Web Apps (Evaluated First)
  { pattern: "brave-music\\.youtube.*|.*music\\.youtube.*", icon: "󰝚" },
  { pattern: "brave-youtube.*|.*youtube.*",             icon: "󰗃" },
  { pattern: "brave-omarchy.*",                          icon: "\ue900" },
  { pattern: ".*notion.*",                               icon: "" },
  
  // Browsers (General Fallbacks)
  { pattern: "brave-browser|Brave-browser|Brave",        icon: "󰄛" },
  ...
]
```

---

## Desktop Entry Optimizations (`StartupWMClass`)

Linux bar widgets match open window classes back to `.desktop` files. Adding `StartupWMClass` ensures proper icon linking for PWAs and terminal-based tools without breaking launch scripts.

### Progressive Web Apps (PWAs)

Add `StartupWMClass` to your local `.desktop` file (e.g., `~/.local/share/applications/youtube.desktop`):

```ini
[Desktop Entry]
Version=1.0
Name=YouTube
Exec=omarchy-launch-webapp [https://youtube.com/](https://youtube.com/)
Terminal=false
Type=Application
Icon=youtube
StartupNotify=true
StartupWMClass=brave-youtube.com__-Default

```

---

## Requirements

* **Omarchy Quattro** (Omarchy 4 or newer).
* **Quickshell** with `Quickshell.Hyprland` and `QtQuick.Effects`.
* A **Nerd Font** installed on your system (e.g., JetBrainsMono Nerd Font) to render text glyph fallbacks properly.

---

## Installation

```bash
omarchy plugin add [https://github.com/alexllama/ultimate-workspaces.git](https://github.com/alexllama/ultimate-workspaces.git) --enable
omarchy plugin disable omarchy.workspaces   # optional: replace the stock widget

```

## Uninstallation

```bash
omarchy plugin remove ultimate-workspaces.git
omarchy plugin enable omarchy.workspaces     # restore the stock widget

```

---

## Settings

Settings can be adjusted inline on the widget's entry in `~/.config/omarchy/shell.json` or via **Setup > Plugins** in the Omarchy menu.

| Key | Default | Description |
| --- | --- | --- |
| `layout` | `beside` | `beside` = number then icons. `overlay` = icons drawn on top of the number. |
| `minWorkspaces` | `5` | Minimum workspaces always shown, even when empty. |
| `groupSpacing` | `10` | Gap between workspace groups in pixels. |
| `maxIcons` | `3` | Maximum distinct app icons drawn per workspace. |
| `iconSize` | `15` | Icon size in pixels. |
| `iconOpacity` | `100` | Icon opacity on the focused workspace (%). |
| `inactiveIconOpacity` | `80` | Icon opacity on inactive workspaces (%). |
| `iconGrayscale` | `inactive` | `inactive` = color only on active workspace, `always` = no color, `never` = always full color. |
| `showNumber` | `always` | `empty-only` hides workspace numbers once apps are present. |
| `numberScale` | `125` | Number size as a % of the bar font size. |
| `numberOpacityOccupied` | `100` | Number opacity when workspace has apps (%). |
| `numberOpacityEmpty` | `45` | Number opacity when workspace is empty (%). |
| `numberBold` | `true` | Draw workspace numbers in bold. |
| `unknownIcons` | `generic` | `generic` = fallback placeholder/glyph for unmapped apps, `hide` = display number only. |
| `hideEmpty` | `false` | Hide empty workspaces past `minWorkspaces`. |
| `scrollToSwitch` | `true` | Scroll over the widget to switch active workspaces. |

---

## License

MIT — see [LICENSE](https://www.google.com/search?q=LICENSE).
