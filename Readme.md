# Gaming Table


## What is this? 

This is a hacked together group of modules I've used to enable foundry gameplay using a gaming table hacked together with an IR Touch Frame glued to a shitty 42 inch television with half of an old gaming laptop duct taped to the back of it. My players use paper character sheets and roll physical dice, so this allows the GM to make use of foundry while giving the players an interactive map to move tokens around on. My players rarely use any functionality other than moving tokens, opening doors, and drawing templates.

## What modules are you ripping off?

Thank you for asking. This module is a mash up of pared down code from the following fantastic, complete modules:
- [TouchVTT](https://foundryvtt.com/packages/touch-vtt/)
  - I've ripped out the majority of this module, except for the framework that handles the basic touch event support.
  - Pan and Zoom are now handled by double clicking (for pan), triple clicking (for zoom in), and quad clicking (for zoom out). Pinching and swiping never worked for me. It's always been too jittery.
  - Don't forget to install the hack required for V11. [See hack here](https://github.com/Oromis/touch-vtt/issues/61#issuecomment-1723727061).
- [Gaming Table Player](https://foundryvtt.com/packages/gaming-table-player/)
  - Gaming table player gives GMs the ability to pan/zoom the players to a spot that they designate. Panning and zooming with this module isn't perfect on the client side, so this is there for when the players get tired of trying

## Well what did you contribute?

Other than refactoring some code used in the two projects above for my own sake, I've added the following features:

- Enlarge Buttons
  - This enlarges the control tools and adds some left margin to push them farther from the side of the screen. IR frames don't work well near the edges, and a 42" TV leaves a lot of room to spare
- Enlarge Doors
  - The Doors are pretty small OOTB, and a gaming table TV is usually zoomed out quite a bit. This makes them slightly larger to make tapping easier.
- Disable Character sheets
  - This was the biggest problem my players would have. Accidentally double clicking on your token and opening an unused character sheet was always a bad user experience. This kills that possibility. No more client side character sheets, no problem.

## Wait this doesn't work. What happen?

Somewhere in between V10 and V11 TouchVTT stopped working. Now whenever you click on a player you open their character sheet. There's a hack for this out right now, but it'll require you to alter the foundry.js code directly. This is a bad idea that you should definitely try 15 minutes before your session start. [See hack here](https://github.com/Oromis/touch-vtt/issues/61#issuecomment-1723727061).

## Why shouldn't I just use the modules you listed above?

You should.

## Why is this missing (insert feature here) from one of the above modules?

It's because I don't use it, or because it was creating a bad user experience for my players and I. I threw this together with over a year of experience, hang ups, and idiosyncrasies using my setup as a GM and player. It works for me but YMMV.

## What other modules you do you use to facilitate in person gaming?

I use a ton of modules, but, other than this one, there's only a few that are installed for improving the client experience:

- [Dice so Nice!](https://foundryvtt.com/packages/dice-so-nice/)
  - I let foundry handle all of the dice rolling, so this module does a good job at simulating the experience of me rolling behind a DM screen (or out in the open)
- [Close Player Art](https://foundryvtt.com/packages/close-player-art/)
  - This is invaluable if you like showing your players pictures of NPCs, Monsters, Settings, or anything else. They're able to take a look and you can close it for them when everyone finishes oooing and aaahing.
- [Hide Player UI](https://foundryvtt.com/packages/hide-player-ui/)
  - This is a big one. I hide everything except for the controls on the left side of the screen for the client VTT. Map real estate is the most important thing for the client. Honestly, the regular foundry UI isn't well designed for a TV anyway.
- [Carousel Combat Tracker](https://foundryvtt.com/packages/combat-tracker-dock)
  - This is a great replacement for the initiative tracker, since I hide it with Hide Player UI.
- [Monk's Player Settings](https://foundryvtt.com/packages/monks-player-settings/)
  - Updating settings on the TV isn't ideal. This circumvents that issue.
- [Drag Ruler](https://foundryvtt.com/packages/drag-ruler)
  - This is my player's favorite module. I'd recommend this for everyone.