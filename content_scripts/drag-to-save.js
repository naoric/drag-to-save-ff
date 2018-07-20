(function() {
  const $check = $('<i class="fas fa-check lc-added lc-hidden"/>');

  $(document.body).append($check);

  document.addEventListener("dragend", ev => {
    const { target } = ev;
    if (target.tagName === "A" && target.href) {
      ev.preventDefault();
      browser.runtime.sendMessage({
        type: "add-link",
        link: {
          link: target.href.toString(),
          title: target.textContent.toString()
        }
      });
      animateAdd(ev);
    }
  });

  function animateAdd(e) {
    const x = e.screenX;
    const y = e.screenY;

    $check.css({
      left: x,
      top: y - 100
    });

    $check.animate(
      {
        top: "-=50",
        opacity: 1
      },
      () => $check.removeAttr("style")
    );
  }
})();
