(function() {
  const dropZoneFragment = createDropZone();

  document.body.appendChild(dropZoneFragment);

  const DROP_ZONE_SELECTOR = '.dds-drop-area';
  const dropZone = document.querySelector(DROP_ZONE_SELECTOR);
  const dropHerePlaceholder = dropZone.querySelector('.dds-drop-here');
  const dropEmpty = dropZone.querySelector('.dds-drop-empty');
  const dropped = dropZone.querySelector('.dds-dropped');
  let timeout = 0;
  let dropHandled = false;

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  document.addEventListener(
    'dragstart',
    e => {
      if (isDraggableLink(e.target)) {
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify(serializeLink(e.target))
        );
        dragNotDropZone();
      }
    },
    { capture: true }
  );

  document.addEventListener('dragend', e => {
    preventDefault(e);
    if (!dropHandled) {
      reset();
    }
  });

  document.addEventListener('dragover', e => {
    if (isDropZone(e.target)) {
      preventDefault(e);
      dragDropZone();
    }
  });

  document.addEventListener('dragleave', e => {
    if (isDropZone(e.target)) {
      preventDefault(e);
      dragNotDropZone();
    }
  });

  document.addEventListener('drop', e => {
    if (isDropZone(e.target)) {
      preventDefault(e);
      handleDrop(e);
    }
  });

  function handleDrop(e) {
    const link = JSON.parse(e.dataTransfer.getData('text/plain'));
    browser.runtime.sendMessage({
      type: 'add-link',
      link
    });
    dropNotification();
    timeout = setTimeout(reset, 1000);
    dropHandled = true;
  }

  function isDraggableLink(el) {
    return el.matches('a');
  }

  function isDropZone(el) {
    return el === dropZone || el.closest(DROP_ZONE_SELECTOR);
  }

  function resetNotificationMarker() {
    toggleVisibleNotification(dropEmpty);
    dropZone.removeEventListener(resetNotificationMarker);
  }

  function reset() {
    dropZone.classList.remove('dds-drop-area-visible');
    dropZone.addEventListener('transitionend', resetNotificationMarker);
    dropHandled = false;
    clearTimeout(timeout);
    timeout = 0;
  }

  function dragNotDropZone() {
    toggleVisibleNotification(dropEmpty);
    dropZone.classList.add('dds-drop-area-visible');
  }

  function dragDropZone() {
    toggleVisibleNotification(dropHerePlaceholder);
  }

  function dropNotification() {
    toggleVisibleNotification(dropped);
  }

  function toggleVisibleNotification(el) {
    dropHerePlaceholder.classList.add('hidden');
    dropEmpty.classList.add('hidden');
    dropped.classList.add('hidden');

    el.classList.remove('hidden');
  }

  function serializeLink({ href, textContent }) {
    return {
      link: href.toString(),
      title: textContent.toString()
    };
  }

  function createDropZone() {
    const dropZoneHTML = `
<div class="dds-drop-area">
  <div class="dds-drop-here dds-notification-marker hidden">
    Drop to Save
  </div>
  <div class="dds-drop-empty dds-notification-marker hidden">
    Drag Here to Save
  </div>
  <div class="dds-dropped dds-notification-marker hidden">
    Saved!
  </div>

</div>`;
    return document.createRange().createContextualFragment(dropZoneHTML);
  }
})();
