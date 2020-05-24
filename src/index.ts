declare const chrome;

//
// Imports
//

import defaultSettings from './default-settings';
import { Settings } from './types';

//
// Variables
//

let pressedKeys = new Set<String>();
let settings: Settings;
let triggerKeyIsPressed = false;

//
// Init
//

loadSettings(() => {
  attachKeysListeners();
  attachWheelListener();
});

//
// Helpers
//

function attachKeysListeners() {
  window.addEventListener('keydown', event => {
    pressedKeys.add(event.code);
    triggerKeyIsPressed = pressedKeys.has(settings.triggerKey);
  });
  window.addEventListener('keyup', event => {
    pressedKeys.delete(event.code);
    triggerKeyIsPressed = pressedKeys.has(settings.triggerKey);
  });
}

function attachWheelListener() {
  if (settings.mode === Settings.Mode.OnTriggerKeyPressed)
    window.addEventListener('wheel', onWheelModeOnTriggerKeyPressed, { passive: false });
  else if (settings.mode === Settings.Mode.Always)
    window.addEventListener('wheel', onWheelModeAlways, { passive: false });
  else
    throw new Error(`Unknown mode '${settings.mode}'`);
}

function handleScroll(event: WheelEvent, speed: 'custom' | 'default') {
  event.preventDefault();

  const horizontalScroll = pressedKeys.has('ShiftLeft') || pressedKeys.has('ShiftRight');
  const scrollAmountCustom = (() => {
    /* when scrolling to the bottom or to the right, `event.deltaY` will be a positive int ; when scrolling to the top or
    to the left, it will be a negative int.
    During my tests `event.deltaX` never changed and was always `0`, but I think that's because my mouse has a
    unidirectional wheel, while some other mouses can be have a bidirectional wheel, that's why I'm checking it ‒ to
    [hopefully] support all possible use cases */

    if (speed === 'custom') {
      const scrollAmountDefault = (event.deltaY || event.deltaX);
      return scrollAmountDefault * settings.scrollSpeedMultiplier;
    }
    else
      return event.deltaY || event.deltaX;
  })();

  if (horizontalScroll)
    window.scrollBy(scrollAmountCustom, 0);
  else
    window.scrollBy(0, scrollAmountCustom);
}

function loadSettings(callback: () => void) {
  // load saved settings
  chrome.storage.sync.get(defaultSettings, savedSettings => {
    settings = savedSettings;
    callback();
  });

  // listen to changes
  chrome.storage.onChanged.addListener(changes => {
    if (changes.mode)
      settings.mode = changes.mode.newValue;
    if (changes.scrollSpeedMultiplier)
      settings.scrollSpeedMultiplier = changes.scrollSpeedMultiplier.newValue;
    if (changes.triggerKey)
      settings.triggerKey = changes.triggerKey.newValue;
  });
}

function onWheelModeAlways(event: WheelEvent) {
  if (triggerKeyIsPressed)
    handleScroll(event, 'default');
  else
    handleScroll(event, 'custom');
}

function onWheelModeOnTriggerKeyPressed(event: WheelEvent) {
  if (triggerKeyIsPressed)
    handleScroll(event, 'custom');
}