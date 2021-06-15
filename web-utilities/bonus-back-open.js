// Open all bonus packs in My.Games Armored Warfare inventory screen.
const popupParentClasses = ['ReactModalPortal', 'ReactModal__Overlay', 'ReactModal__Content', 'b-popup', 'b-popup__header'];
const popupCloseClass = 'b-popup__close';

(() => {
  "use strict";
  const popupContainer = document.querySelectorAll('.ReactModalPortal')?.[0];
  attachObserver(popupContainer);
})();

function attachObserver(objectToObserve) {
  const observer = createMutationObserver();
  const observerConfig = {childList: true};
  observer.observe(objectToObserve, observerConfig);
}

function createMutationObserver() {
  return new MutationObserver(function (mutations) {
    mutations.forEach(mutation => handleMutation(mutation))
  });
}

function handleMutation(mutation) {// https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
  // console.log('handleMutation', mutation);
  mutation.addedNodes.forEach(addedElement => {
    // console.log('handleMutation forEach', node);
    attemptToClose(addedElement);
    if (elementHasClass(addedElement, popupParentClasses)) {
      attachChildObserver(addedElement);
    }
  })
}

function attachChildObserver(element) {
  if (element && elementHasClass(element, popupParentClasses)) {
    attachObserver(element);
    element.childNodes?.forEach(childElement => {
      attachChildObserver(childElement);
    });
  }
}

function attemptToClose(element) {
  // console.log('attemptToClose', element);
  if (elementHasClass(element, popupParentClasses)) {
    // loop children
    element.childNodes?.forEach(childElement => attemptToClose(childElement));
  } else if (elementHasClass(element, popupCloseClass)) {// this is the close 'button'. click it to close.
    element.click();
    clickNextOpenButton();
  }
}

function elementHasClass(element, stringOrArray) {
  // console.log('elementHasClass', element, stringOrArray);
  let hasClass;
  if (element.classList) {
    if (Array.isArray(stringOrArray)) {
      hasClass = stringOrArray.filter(value => element.classList.contains(value)).length > 0;
    } else if (stringOrArray) {
      hasClass = element.classList.contains(stringOrArray);
    } else {
      hasClass = false;
    }
  } else {
    hasClass = false;
  }
  return hasClass;
}

function clickNextOpenButton() {
  setTimeout(() => {
    const openNextButtons = document.querySelectorAll('.b-my-cases__description > .b-button');
    if (openNextButtons && openNextButtons.length > 0) {
      openNextButtons[0].click();
    }
  }, 500);
}