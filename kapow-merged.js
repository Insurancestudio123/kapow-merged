// kapow-merged.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Kapow Merged Script Loaded");

  const buttonSelector = ".lesson-footer__complete-button";
  const tallySelector = 'iframe[src*="tally.so"]';
  const filloutSelector = 'iframe[src*="fillout"]';

  function hideButton() {
    const button = document.querySelector(buttonSelector);
    if (button) button.style.display = "none";
  }

  function showButton() {
    const button = document.querySelector(buttonSelector);
    if (button) button.style.display = "block";
  }

  hideButton();
  const interval = setInterval(hideButton, 500);

  const observer = new MutationObserver(() => {
    const tallyIframe = document.querySelector(tallySelector);
    const filloutIframe = document.querySelector(filloutSelector);

    if (tallyIframe || filloutIframe) {
      console.log("🖼️ Detected iframe:", tallyIframe ? "Tally" : "Fillout");
      clearInterval(interval);

      window.addEventListener("message", (event) => {
        console.log("📩 Message received:", event.data);

        if (typeof event.data === "string" && event.data.includes("complete")) {
          console.log("✅ Tally form completed → showing button");
          showButton();
        }

        if (event.data?.type === "form_submit") {
          console.log("✅ Fillout form submitted → showing button");
          showButton();
        }
      });

      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
