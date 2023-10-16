import initClientTools from './client-tools';
import initGmTools from './gm-tools';
import registerSettings from './settings';

Hooks.on('init', () => {
  registerSettings();
});

initGmTools();
initClientTools();
