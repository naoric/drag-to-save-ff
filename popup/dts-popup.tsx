import { html, render } from 'lit-html/lib/lit-extended';
declare var browser: any;

const s = (sel: string) => document.querySelector(sel);
const sa = (sel: string) => document.querySelectorAll(sel);

interface LinkItem {
  link: string;
  title: string;
}

interface ListItemProps {
  item: LinkItem;
  del: () => void;
}

interface ListProps {
  items: LinkItem[];
  clicked: (idx: number) => void;
  clear: () => void;
  clipboard: () => void;
}

interface LinkStorage {
  links: LinkItem[];
}

function ListItem(props: ListItemProps) {
  return html`
<li class="lc-item">
<a href="${props.item.link}" class="lc-link" target="_blank">
<span class="lc-title">${props.item.title}</span>
<i href="" class="lc-checked fas fa-trash" onclick=${(e: any) => {
    e.preventDefault();
    props.del();
  }}></i>
</a>
</li>
`;
}

function List(props: ListProps) {
  return html`
<ul class="lc-list">
${props.items.map((ln, idx) =>
    ListItem({ item: ln, del: () => props.clicked(idx) })
  )}
</ul>
<div class="lc-actions">
<button class="lc-clipboard lc-btn-basic" onclick=${
    props.clipboard
  }>Copy All</button>
<button class="lc-clear lc-btn-basic" onclick=${props.clear}>Clear</button>
</div>
`;
}

browser.storage.sync.get({ links: [] }, (res: LinkStorage) =>
  update(res.links)
);

browser.storage.onChanged.addListener(
  (values: { links: { newValue: LinkItem[] } }) => update(values.links.newValue)
);

const container = getContainer()!;
const addCurrent = s('.lc-add-current')!;
document.body.appendChild(container);

addCurrent.addEventListener('click', e => {
  browser.tabs
    .query({ active: true })
    .then(([tab]: any) => {
      const { url: link, title } = tab;
      const linkToSave = { link, title };
      browser.runtime.sendMessage({
        type: 'add-link',
        link: linkToSave
      });
    })
    .catch(console.log);

  e.preventDefault();
});

function getContainer() {
  return s('.lc-container');
}

function update(items: LinkItem[] = []) {
  const clicked = (index: number) =>
    browser.runtime.sendMessage({ type: 'remove-link', index });
  const clipboard = () => {
    const input: HTMLInputElement = s(
      '.lc-clipboard-input'
    ) as HTMLInputElement;
    if (!input) {
      return;
    }
    input.value = itemsToString(items);
    input.select();
    document.execCommand('copy');
  };

  const clear = () => browser.runtime.sendMessage({ type: 'clear-links' });

  const template = List({ items, clicked, clear, clipboard });
  render(template, container);
}

function itemsToString(items: LinkItem[]) {
  return items.map(it => it.link).join('\n');
}
