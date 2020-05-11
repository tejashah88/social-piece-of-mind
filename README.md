# social-piece-of-mind
A Chrome/Firefox extension that hides the "Active X ago" and read receipts from messenger.com to give you a peace of mind :)

## How does it work?
Essentially, it will search for target HTML elements and attempt to hide them as soon as you load messenger.com. Facebook doesn't like any particular modifications to it's own website and messenger.com, so a lot of the classes and element IDs are obfuscated by default. Luckily, thanks to the power of English, we can find our target nodes by looking for the presence of english keywords or people's names, and hide them that way.