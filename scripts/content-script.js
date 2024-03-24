if (document.readyState == "complete") {
  doMyStuffAfterLoad();
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      doMyStuffAfterLoad();
    }
  };
}

// since observer.disconnect() caused the extension to stop working, let's embrace an async/wait approach.
async function waitForElementAvailability(selector) {
  while (!document.querySelector(selector)) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  console.log("Caught!")
  return document.querySelector(selector);
}

async function waitForBodyOverflowHidden() {
  while (document.body.style.overflow!=='hidden') {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  document.body.style.overflow='scroll';
  document.body.parentElement.style.overflow='scroll';
  return ;
}


async function doMyStuffAfterLoad() {
  const element = await waitForElementAvailability(".dgEhJe6g")
  const popupWrapper = element.parentElement;
  popupWrapper.remove()
  // in case remove() didnt' work
  popupWrapper.style.display = 'none';
  waitForBodyOverflowHidden();
}

// For future ref:
// For memory leaks concerns( since we don't disconnect the observer), let's go for the async wait apprach.
function ObserveElementAvailability(selector, callback) {
  const observer = new MutationObserver( function(mutations) {

    if (document.querySelector(selector)) {
      console.log("Observer Caught it!")
      // disconnecting the observer seems to break our work, 
      //I think the website ties to re-inject it many times.
      // observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}