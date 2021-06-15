// Open all bonus packs in My.Games Armored Warfare inventory screen.
(() => {
  "use strict";
  attachObserver();
})();

function attachObserver() {
  const observer = createMutationObserver();
  const observerConfig = {childList: true};
  const popupContainer = document.querySelectorAll('.ReactModalPortal')?.[0];
  observer.observe(popupContainer, observerConfig);
}

function createMutationObserver() {
  return new MutationObserver(function (mutations) {
    mutations.forEach(mutation => handleMutation(mutation))
  });
}

function handleMutation(mutation) {// https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
  console.log(`mutation: `, mutation);
}