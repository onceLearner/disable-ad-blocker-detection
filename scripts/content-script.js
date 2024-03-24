function doMyStuffAfterLoad() {
    console.log("ready")
    const container = document.getElementsByClassName('dgEhJe6g');
    console.log(container)

    const body = document.body.style.overflow='scroll'
    waitForElement(".dgEhJe6g", () => {
        // Element-specific code here
        const popupWrapper = document.querySelector('.dgEhJe6g')?.parentElement;
        popupWrapper.remove()
        popupWrapper.style.display='none';
        document.body.parentElement.style.overflow="scroll";
        console.log(popupWrapper)
        document.body.style.overflow='scroll'
    });
  }
  
  if (document.readyState == "complete") {
    doMyStuffAfterLoad();
  } else {
    document.onreadystatechange = function() {
      if (document.readyState == "complete") {
        doMyStuffAfterLoad();
      }
    };
  }
  

  function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
      callback();
    } else {
      setTimeout(() => waitForElement(selector, callback), 50);
    }
  }