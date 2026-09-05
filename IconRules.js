.pragma library

// Nerd Font glyph lookup for Hyprland toplevels, matched against the window
// class first and the window title second.
//
// ORDER MATTERS. Title-specific rules have to sit above the generic browser
// class rules, otherwise an Amazon or YouTube tab in Firefox resolves to the
// Firefox icon instead of its own.
//
// Icon map adapted from the `saif.workspaces` plugin by Saif Omar (MIT).
var rules = [
  // Apps and PWAs I want to evaluate first so they don't show the browser or terminal icon
  { pattern: ".*notion.*",                                                    icon: "" },
  { pattern: ".*gemini.*",                                                    icon: "󰪁" },
  { pattern: "Yazi:.*",                                                       icon: "" },
  { pattern: "brave-music\\.youtube.*|.*music\\.youtube.*",                   icon: "󰝚" },
  { pattern: "brave-youtube.*|.*youtube.*",                                   icon: "󰗃" },
  { pattern: "brave-omarchy.*",                                               icon: "\ue900" },
  { pattern: "org\\.omarchy\\.terminal|Omarchy",                              icon: "\ue900" },

  // Terminals & editors
  { pattern: ".*n?vim.*",                                                     icon: "󰷈" },
  { pattern: ".*micro",                                                       icon: "󰷈" },
  { pattern: ".*Omawrite",                                                    icon: "󰷈" },
  { pattern: "konsole",                                                       icon: "󰆍" },
  { pattern: "foot",                                                          icon: "󰆍" },
  { pattern: "kitty",                                                         icon: "󰆍" },
  { pattern: "alacritty",                                                     icon: "󰆍" },
  { pattern: "com.mitchellh.ghostty",                                         icon: "󰊠" },
  { pattern: "org.wezfurlong.wezterm",                                        icon: "󰆍" },
  { pattern: "VSCode|code-url-handler|code-oss|codium|codium-url-handler|VSCodium|code|Code", icon: "󰨞" },
  { pattern: "android-studio",                                                icon: "󰀴" },

  // Browsers
  { pattern: "firefox|org.mozilla.firefox|librewolf|floorp|mercury-browser|[Cc]achy-browser", icon: "󰈹" },
  { pattern: "zen",                                                           icon: "󰈹" },
  { pattern: "brave-origin-beta",                                             icon: "󰄛" },
  { pattern: "brave-origin",                                                  icon: "󰄛" },
  { pattern: "brave-browser|Brave-browser|Brave|brave",                       icon: "󰄛" },
  { pattern: "Chromium|Thorium|[Cc]hrome",                                    icon: "" },

  // Misc
  { pattern: "windows",                                                       icon: "" },
  { pattern: "ai.opencode.desktop|opencode",                                  icon: "" },
  { pattern: "org.jellyfin.JellyfinDesktop|jellyfin",                         icon: "󰼁" },
  { pattern: "chrome-claude.ai__-default|claude",                             icon: "󰭹" },
  { pattern: ".*github.*",                                                    icon: "󰊤" },
  { pattern: ".*reddit.*",                                                    icon: "󰑍" },
  { pattern: ".*ChatGPT.*",                                                   icon: "󰭹" },
  { pattern: ".*deepseek.*",                                                  icon: "󰭹" },
  { pattern: ".*qwen.*",                                                      icon: "󰭹" },
  { pattern: "brave-x.com.*",                                                 icon: "󰕄" },
  { pattern: ".*Tailscale",                                                   icon: "󱗼" },
  { pattern: "BambuStudio",                                                   icon: "󰹛" },
  { pattern: ".*cava.*",                                                      icon: "󱇅" },
  

  // Chat & mail
  { pattern: "discord|[Ww]ebcord|Vesktop",                                    icon: "󰙯" },


  // Office & docs
  { pattern: "libreoffice-writer",                                            icon: "󰈙" },
  { pattern: "libreoffice-calc",                                              icon: "󰧷" },
  { pattern: "libreoffice-startcenter",                                       icon: "󰏆" },

  // Media
  { pattern: "mpv",                                                           icon: "󰐹" },
  { pattern: "vlc",                                                           icon: "󰕼" },
  { pattern: ".*cmus.*",                                                      icon: "󰝚" },
  { pattern: "feishin",                                                       icon: "󰝚" },
  { pattern: ".*cliamp.*",                                                    icon: "󰝚" },
  { pattern: "gimp",                                                          icon: "" },

  // System & tools
  { pattern: "cake_wallet",                                                   icon: "󰠓" },
  { pattern: "feather",                                                       icon: "󰠓" },
  { pattern: "Exodus|exodus",                                                 icon: "󰠓" },
  { pattern: "com.transmissionbt.transmission.*",                             icon: "󰄠" },
  { pattern: "de.haeckerfelix.Fragments",                                     icon: "󰄠" },
  { pattern: "virt-manager|.virt-manager-wrapped|virtualbox manager|virtualbox", icon: "󰍺" },
  { pattern: "remmina",                                                       icon: "󰢹" },
  { pattern: "polkit-gnome-authentication-agent-1",                           icon: "󰒃" },
  { pattern: "nwg-look",                                                      icon: "󰔡" },
  { pattern: "[Pp]avucontrol|org.pulseaudio.pavucontrol",                     icon: "󰓃" },
  { pattern: "org.pipewire.Helvum",                                           icon: "󰓃" },
  { pattern: "Gparted",                                                       icon: "󰋊" },
  { pattern: "thunar|nemo",                                                   icon: "󰝰" },
  { pattern: "org.gnome.Nautilus|nautilus",                                   icon: "󰝰" },
  { pattern: "steam",                                                         icon: "󰓓" },
  { pattern: "emulator",                                                      icon: "󰄭" },
  { pattern: "rustdesk",                                                      icon: "󱈹" },
  { pattern: "org.kde.gwenview",                                              icon: "󰋩" },
  { pattern: "org.keepassxc.KeePassXC",                                       icon: "" },
  { pattern: "localsend",                                                     icon: "" },
  { pattern: "Vncviewer",                                                     icon: "󰍺" },
  { pattern: "PrusaSlicer|UltiMaker-Cura|OrcaSlicer",                         icon: "󰐫" }
]

var fallback = "󰘔"

// Rules are compiled once per QML engine rather than per render. `.pragma
// library` means one shared copy across all three bar instances.
var compiled = null

function patterns() {
  if (compiled) return compiled
  compiled = []
  for (var i = 0; i < rules.length; i++) {
    compiled.push({ re: new RegExp(rules[i].pattern, "i"), icon: rules[i].icon })
  }
  return compiled
}

// Browser titles churn constantly, so the cache is capped and dropped wholesale
// once it grows past the limit instead of tracking per-entry age.
var cache = {}
var cacheCount = 0
var cacheLimit = 500

function resolve(cls, title) {
  var key = cls + "" + title
  var hit = cache[key]
  if (hit !== undefined) return hit

  var set = patterns()
  var icon = fallback
  for (var i = 0; i < set.length; i++) {
    if (set[i].re.test(title) || set[i].re.test(cls)) {
      icon = set[i].icon
      break
    }
  }

  if (cacheCount >= cacheLimit) {
    cache = {}
    cacheCount = 0
  }
  cache[key] = icon
  cacheCount++
  return icon
}
