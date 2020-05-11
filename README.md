# social-piece-of-mind
A Chrome/Firefox extension that hides the active status and read receipts from messenger.com to give you a peace of mind.

## How to use
Simply go to messenger.com and the extension will work automatically! If you want to disable the hiding features at any point in time, follow the instructions below.

### Chrome/Brave
Right-click the extension icon and select 'Options', which will take you to the options page.

### Firefox
Go to `about:addons`, click on 'Social Piece of Mind', and then click on 'Preferences', which will take you to the options page.

## How to install

### Chrome/Brave

#### Automatic way
1. Click this link: https://chrome.google.com/webstore/detail/social-piece-of-mind/cgmeljdnedndmglgmmbmjcbfjpohpalg
2. Click 'Add to (Chrome/Brave)' to install

#### Manual way
1. Go to the [Releases](https://github.com/tejashah88/social-piece-of-mind/releases) page and download the .zip file.
2. Extract the zip file
3. Go to `chrome://extensions` or `brave://extensions`, toggle 'Developer Mode if it's not enabled, and click 'Load Unpacked Extension'
4. Select the extracted folder and install

### Firefox
1. Go to the [Releases](https://github.com/tejashah88/social-piece-of-mind/releases) page and download the .xpi file.
2. Go to `about:addons`, click on the gear icon, and click 'Install Add-on from file...'
3. Locate the file and install

## How does it work?
Essentially, it will search for target HTML elements and attempt to hide them as soon as you load messenger.com. Facebook doesn't like any particular modifications to it's own website and messenger.com, so a lot of the classes and element IDs are obfuscated by default. Luckily, thanks to the power of English, we can find our target nodes by looking for the presence of english keywords or people's names, and hide them that way.