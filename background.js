browser.runtime.onMessage.addListener(notify);

const MsgTypes = {
  addLink: 'add-link',
  clearLinks: 'clear-links',
  removeLink: 'remove-link'
};

function notify(msg) {
  switch (msg.type) {
    case MsgTypes.addLink:
      addLink(msg.link);
      break;
    case MsgTypes.clearLinks:
      clearLinks();
      break;
    case MsgTypes.removeLink:
      removeLink(msg.index);
      break;
    case MsgTypes.getLinks:
  }
}

function addLink(link) {
  browser.storage.sync.get({ links: [] }).then(results => {
    if (results.links) {
      results.links.push(link);
    } else {
      results.links = [link];
    }
    browser.storage.sync.set(results);
  });
}

function removeLink(idx) {
  browser.storage.sync.get({ links: [] }).then(results => {
    results.links = results.links
      .slice(0, idx)
      .concat(results.links.slice(idx + 1));
    browser.storage.sync.set(results);
  });
}

function clearLinks() {
  browser.storage.sync.clear();
}
