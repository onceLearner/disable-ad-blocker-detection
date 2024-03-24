if (document.readyState == "complete") {
  doMyStuffAfterLoad();
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      doMyStuffAfterLoad();
    }
  };
}

function ObserveElementAvailability(selector, callback) {
  const observer = new MutationObserver(mutations => {
    console.log("new")

    if (document.querySelector(selector)) {
      console.log("Caught!")
      // disconnecting the observer seems to break our work, 
      //I think the website ties to re-inject it many times.
      // observer.disconnect();
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}


function doMyStuffAfterLoad() {
  ObserveElementAvailability(".dgEhJe6g", () => {
    // Element-specific code here
    const popupWrapper = document.querySelector('.dgEhJe6g')?.parentElement;
    popupWrapper.remove()
    // in case remove() didnt' work
    popupWrapper.style.display = 'none';

    document.body.parentElement.style.overflow = "scroll";
    document.body.style.overflow = 'scroll'
  });
}