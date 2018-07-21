"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var lit_extended_1 = require("lit-html/lib/lit-extended");
var s = function (sel) { return document.querySelector(sel); };
var sa = function (sel) { return document.querySelectorAll(sel); };
function ListItem(props) {
    return lit_extended_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n<li class=\"lc-item\">\n<a href=\"", "\" class=\"lc-link\" target=\"_blank\">\n<span class=\"lc-title\">", "</span>\n<i href=\"\" class=\"lc-checked fas fa-trash\" onclick=", "></i>\n</a>\n</li>\n"], ["\n<li class=\"lc-item\">\n<a href=\"", "\" class=\"lc-link\" target=\"_blank\">\n<span class=\"lc-title\">", "</span>\n<i href=\"\" class=\"lc-checked fas fa-trash\" onclick=",
        "></i>\n</a>\n</li>\n"])), props.item.link, props.item.title, function (e) {
        e.preventDefault();
        props.del();
    });
}
function List(props) {
    return lit_extended_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n<ul class=\"lc-list\">\n", "\n</ul>\n<div class=\"lc-actions\">\n<button class=\"lc-clipboard lc-btn-basic\" onclick=", ">Copy All</button>\n<button class=\"lc-clear lc-btn-basic\" onclick=", ">Clear</button>\n</div>\n"], ["\n<ul class=\"lc-list\">\n",
        "\n</ul>\n<div class=\"lc-actions\">\n<button class=\"lc-clipboard lc-btn-basic\" onclick=",
        ">Copy All</button>\n<button class=\"lc-clear lc-btn-basic\" onclick=", ">Clear</button>\n</div>\n"])), props.items.map(function (ln, idx) {
        return ListItem({ item: ln, del: function () { return props.clicked(idx); } });
    }), props.clipboard, props.clear);
}
browser.storage.sync.get({ links: [] }, function (res) {
    return update(res.links);
});
browser.storage.onChanged.addListener(function (values) { return update(values.links.newValue); });
var container = getContainer();
document.body.appendChild(container);
function getContainer() {
    return s('.lc-container');
}
function update(items) {
    if (items === void 0) { items = []; }
    var clicked = function (index) {
        return browser.runtime.sendMessage({ type: 'remove-link', index: index });
    };
    var clipboard = function () {
        var input = s('.lc-clipboard-input');
        if (!input) {
            return;
        }
        input.value = itemsToString(items);
        input.select();
        document.execCommand('copy');
    };
    var clear = function () { return browser.runtime.sendMessage({ type: 'clear-links' }); };
    var template = List({ items: items, clicked: clicked, clear: clear, clipboard: clipboard });
    lit_extended_1.render(template, container);
}
function itemsToString(items) {
    return items.map(function (it) { return it.link; }).join('\n');
}
var templateObject_1, templateObject_2;
