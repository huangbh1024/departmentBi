import { createApp } from 'vue';
import { App } from './App';
import 'virtual:uno.css';
import '@unocss/reset/sanitize/sanitize.css';
import '@unocss/reset/sanitize/assets.css';

import { setRem } from './utils/ui';

setRem();
window.console.log('current browser:' + window.navigator.userAgent);
window.onresize = function () {
  setRem();
};
createApp(App).mount('#app');
