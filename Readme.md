# Gaming Table


## What is this? 

This is a hacked together group of modules I've used to enable foundry gameplay using a gaming table hacked together with an IR Touch Frame glued to a shitty 42 inch television with half of an old gaming laptop duct taped to the back of it. My players use paper character sheets and roll physical dice, so this allows the GM to make use of foundry while giving the players an interactive map to move tokens around on. My players rarely use any functionality other than moving tokens, opening doors, and drawing templates.

## What modules are you ripping off?

Thank you for asking. This module is a mash up of pared down code from the following fantastic, complete modules:
- [TouchVTT](https://foundryvtt.com/packages/touch-vtt/)
  - I've ripped out the majority of this module, except for the framework that handles the basic touch event support.
  - Pan and Zoom are now handled by double clicking (for pan), triple clicking (for zoom in), and quad clicking (for zoom out). Pinching and swiping never worked for me. It's always been too jittery.
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
- Long Touch to swap tools
  - This allows you to long press (default is the 500ms) to switch from select to ruler, or any other tool to select. My players almost only ever use those two tools, so that's why I picked those.
- Custom Mouse Interaction Manager
  - I really am unhappy that I had to do this, but I honestly had no choice. PixiJS dispatches TWO events for every touch interaction, which completely broke touch screen support and introduced a race condition that would make drag ruler fail randomly in an infuriating way. To make things worse, and believe me it did, V11 hides the ENTIRE MouseInteractionManager class behind private methods. I wept for days trying to figure out a way to get to those juicy internals, but I was left with this terrible hack.
  - The MouseInteractionManager is vital to foundry as an application (it's how the mouse works), and it is NOT a part of the stable foundry API. This has been tested using **Version 11.303**. It won't just "probably" break with an upgrade, it WILL break with an upgrade. 
  - The team developing foundry used to build their API to wag a virtual finger at anyone who wanted to override/wrap the MouseInteractionManager methods. Since V11 they decided to virtually lock it down. You've been warned. 

## Wait this doesn't work with my setup. What happen?

I can only verify this working for the two touch screen setups I have:

1. My Samsung Z fold 5 with mobile Firefox (using the main screen of course)
2. My garbage IR frame TV setup using Google Chrome.

This is my TV setup. If you're having issues with touch recognition (and you aren't on a unsupported version of foundry - currently v11 only) then you should cross-reference your setup with mine:

- 42" 4K TV. Cheap Walmart Onn brand crap. Currently the screen has glue all over it.
- [IR Touch frame](https://www.amazon.com/gp/product/B07RQH8BT4?ie=UTF8&th=1). I glued my touch frame on because it would keep popping off.
- Gaming laptop (screen and hinges removed "gently") taped to the bottom of the TV. It has a 1060 in it, and it's running windows 11 (not activated lol).
- Google chrome browser - Version 118.0.5993.118
  - I am NOT updating this browser unless I have to. Try to stay around the same build if possible.
  - I have dev-tools open (F12) and the "emulate touch" setting turned on. This trash IR frame registers touches as mouse events, so I had to get creative.
    - Don't forget to set your Dimensions to match your screen resolution

I have no clue if this'll work on apple devices. If I had to guess I'd assume not.

## Why shouldn't I just use the modules you listed above?

TouchVTT is broken using V11. I (or someone else) will port my god awful changes to touch-vtt sooner or later, but until then this is all you've got.

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
  - Half of the time I spent developing this module was devoted to getting drag ruler to work with touch screen in V11. It's that good of a module.