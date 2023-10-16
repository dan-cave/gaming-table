# Gaming Table


## What is this? 

This is a hacked together group of modules I've used to enable foundry gameplay using a gaming table hacked together with an IR Touch Frame glued to a shitty 42 inch television with half of an old gaming laptop duct taped to the back of it. My players use paper character sheets and roll physical dice, so this allows the GM to make use of foundry while giving the players an interactive map to move tokens around on. My players rarely use any functionality other than moving tokens, opening doors, and drawing templates.

## What modules are you ripping off?

Thank you for asking. This module is a mash up of pared down code from the following fantastic, complete modules:
- [TouchVTT]()
  - I've ripped out the majority of this module, except for the framework that handles the basic touch event support.
  - Pan and Zoom are now handled by double clicking (for pan), triple clicking (for zoom in), and quad clicking (for zoom out). Pinching and swiping never worked for me. It's always been too jittery
  - Don't forget to install the hack required for V11. [See hack here](https://github.com/Oromis/touch-vtt/issues/61#issuecomment-1723727061).
- [Gaming Table Player]()
  - Gaming table player gives GMs the ability to pan/zoom the players to a spot that they designate. Panning and zooming with this module isn't perfect on the client side, so this is there for when the players get tired of trying

## Wait this doesn't work. What happen?

Somewhere in between V10 and V11 TouchVTT stopped working. Now whenever you click on a player you open their character sheet. There's a hack for this out right now, but it'll require you to alter the foundry.js code directly. This is a bad idea that you should definitely try 15 minutes before your session start. [See hack here](https://github.com/Oromis/touch-vtt/issues/61#issuecomment-1723727061).

## Why shouldn't I just use the modules you listed above?

You should. 

## Why is this missing (insert feature here) from one of the above modules?

It's because I don't use it, or because it was creating a bad user experience for my players and I. I threw this together with over a year of experience, hang ups, and idiosyncrasies using my setup as a GM and player. It works for me but YMMV.