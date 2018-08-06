(function() {
  const dropZoneFragment = createDropZone();

  document.body.appendChild(dropZoneFragment);

  const DROP_ZONE_SELECTOR = '.dds-drop-area';
  const ACTIVE_DROP_DISTANCE_THRESHOLD = 190;

  const dropZone = document.querySelector(DROP_ZONE_SELECTOR);
  const dropHerePlaceholder = dropZone.querySelector('.dds-drop-here');
  const dropEmpty = dropZone.querySelector('.dds-drop-empty');
  const dropped = dropZone.querySelector('.dds-dropped');

  let timeout = 0;
  let dropHandled = false;
  let dropZoneMiddlePoint = 0;

  function preventDefault(e) {
    e.preventDefault();
  }

  document.addEventListener('dragstart', e => {
    if (isDraggableLink(e.target)) {
      dropZoneMiddlePoint = dropBoxMiddlePoint();
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify(serializeLink(e.target))
      );
      dropZoneGlimpse();
    }
  });

  document.addEventListener('dragend', e => {
    if (!dropHandled && isDraggableLink(e.target)) {
      preventDefault(e);
      // if (isDraggableLink(e.target)) {
      //   browser.runtime.sendMessage({
      //     type: 'open-link',
      //     url: extractDataFromEvent(e).link
      //   });
      // }
      reset();
    }
  });

  document.addEventListener('dragover', e => {
    if (isDropZone(e.target)) {
      preventDefault(e);
      dragDropZone();
    }
    dragMovementHandler(e);
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

  function dragMovementHandler(e) {
    if (isNearDropZone(e)) {
      dragNotDropZone();
    } else {
      dropZoneGlimpse();
    }
  }

  function dropZoneGlimpse() {
    dropZone.classList.remove('dds-drop-area-visible');
    dropZone.classList.add('dds-drop-area-glimpse');
  }

  function hideDropZone() {
    dropZone.classList.remove('dds-drop-area-visible', 'dds-drop-area-glimpse');
    dropZone.addEventListener('transitionend', resetNotificationMarker);
  }

  function isNearDropZone(e) {
    const { x, y } = dropZoneMiddlePoint;
    const distance = Math.hypot(x - e.clientX, y - e.clientY);
    return distance < ACTIVE_DROP_DISTANCE_THRESHOLD;
  }

  function dropBoxMiddlePoint() {
    const { clientWidth } = document.documentElement;
    return { x: clientWidth / 2, y: 0 };
  }

  function handleDrop(e) {
    const link = extractDataFromEvent(e);
    browser.runtime.sendMessage({
      type: 'add-link',
      link
    });
    dropNotification();
    timeout = setTimeout(reset, 1000);
    dropHandled = true;
  }

  function extractDataFromEvent(e) {
    return JSON.parse(e.dataTransfer.getData('text/plain'));
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
    hideDropZone();
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
