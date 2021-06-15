// Activate all gold in My.Games Armored Warfare inventory screen.
(() => {
  "use strict";
  let time = 0;
  const interval = 500;
  const goldText = ' gold';
  let goldTotal = 0;
  Array.prototype.forEach.call(document.getElementsByTagName("button"), function (element) {
    const innerHtml = element?.getInnerHTML();
    if ('Activate' === innerHtml) {
      const previousElement = element.previousElementSibling;
      const previousElementHtml = previousElement?.getInnerHTML()?.toLowerCase();
      const isActivateGoldButton = previousElement?.childElementCount === 0 && previousElementHtml?.includes(goldText);
      if (isActivateGoldButton) {
        const goldAmountString = previousElementHtml.substr(0, previousElementHtml.indexOf(goldText));
        const goldAmount = parseInt(goldAmountString);
        goldTotal += goldAmount;
        time += interval;
        const delay = time;
        // Run the clicks on a delay in order to not overload the server.
        setTimeout(() => {
          console.log(`${new Date().toISOString()} Click ${previousElementHtml}`)
          element.click();
        }, delay);
      }
    }
  });
  console.log(`Total Gold: ${goldTotal}`);
})();