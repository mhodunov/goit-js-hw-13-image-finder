import {error} from '../../node_modules/@pnotify/core';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';

const bottomRightStack = {
  dir1: 'up',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'top',
  context: document.body,
};


export default function showError(errorMessage) {
  error({
    type: 'error',
    text: errorMessage,
    delay: 3000,
    closer: false,
    closerHover: true,
    sticker: false,
    addClass: 'notification',
    icon: false,
    width: '250px',
    stack: bottomRightStack,
  });
}