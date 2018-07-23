(function() {
  const $notification = $('<div class="lc-notification"/>');

  $(document.body).append($notification);
  $notification.css('display', 'none');

  document.addEventListener('dragend', ev => {
    const { target } = ev;
    if (target.tagName === 'A' && target.href) {
      ev.preventDefault();
      const link = {
        link: target.href.toString(),
        title: target.textContent.toString()
      };
      browser.runtime.sendMessage({
        type: 'add-link',
        link
      });
      animateNotification(link);
    } else {
      browser.runtime.sendMessage({
        type: 'open-link',
        url: `https://duckduckgo.com/?q=${ev.dataTransfer.getData(
          'Text'
        )}&t=ffab&ia=answer`
      });
    }
  });

  function animateNotification(link) {
    $notification.text(`Added ${link.title}`);
    $notification.fadeIn('fast');
    timeoutSig = setTimeout(() => $notification.fadeOut('fast'), 2000);
  }
})();
