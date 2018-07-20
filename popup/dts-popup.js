parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"SP/d":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultTemplateFactory=r,exports.render=o;const e=exports.templateCaches=new Map,t=exports.html=((e,...t)=>new n(e,t,"html")),s=exports.svg=((e,...t)=>new i(e,t,"svg"));class n{constructor(e,t,s,n=V){this.strings=e,this.values=t,this.type=s,this.partCallback=n}getHTML(){const e=this.strings.length-1;let t="",s=!0;for(let n=0;n<e;n++){const e=this.strings[n];t+=e;const i=h(e);t+=(s=i>-1?i<e.length:s)?a:l}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}exports.TemplateResult=n;class i extends n{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,s=t.firstChild;return t.removeChild(s),y(t,s.firstChild),e}}function r(t){let s=e.get(t.type);void 0===s&&(s=new Map,e.set(t.type,s));let n=s.get(t.strings);return void 0===n&&(n=new m(t,t.getTemplateElement()),s.set(t.strings,n)),n}function o(e,t,s=r){const n=s(e);let i=t.__templateInstance;if(void 0!==i&&i.template===n&&i._partCallback===e.partCallback)return void i.update(e.values);i=new b(n,e.partCallback,s),t.__templateInstance=i;const o=i._clone();i.update(e.values),C(t,t.firstChild),t.appendChild(o)}exports.SVGTemplateResult=i;const l=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${l}--\x3e`,u=new RegExp(`${l}|${a}`),c=/[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;function h(e){const t=e.lastIndexOf(">");return e.indexOf("<",t+1)>-1?e.length:t}class p{constructor(e,t,s,n,i){this.type=e,this.index=t,this.name=s,this.rawName=n,this.strings=i}}exports.TemplatePart=p;const d=exports.isTemplatePartActive=(e=>-1!==e.index);class m{constructor(e,t){this.parts=[],this.element=t;const s=this.element.content,n=document.createTreeWalker(s,133,null,!1);let i=-1,r=0;const o=[];let a,h;for(;n.nextNode();){i++,a=h;const t=h=n.currentNode;if(1===t.nodeType){if(!t.hasAttributes())continue;const s=t.attributes;let n=0;for(let e=0;e<s.length;e++)s[e].value.indexOf(l)>=0&&n++;for(;n-- >0;){const n=e.strings[r],o=c.exec(n)[1],l=s.getNamedItem(o),a=l.value.split(u);this.parts.push(new p("attribute",i,l.name,o,a)),t.removeAttribute(l.name),r+=a.length-1}}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(l)<0)continue;const s=t.parentNode,n=e.split(u),a=n.length-1;r+=a;for(let e=0;e<a;e++)s.insertBefore(""===n[e]?document.createComment(""):document.createTextNode(n[e]),t),this.parts.push(new p("node",i++));s.insertBefore(""===n[a]?document.createComment(""):document.createTextNode(n[a]),t),o.push(t)}else if(8===t.nodeType&&t.nodeValue===l){const e=t.parentNode,s=t.previousSibling;null===s||s!==a||s.nodeType!==Node.TEXT_NODE?e.insertBefore(document.createComment(""),t):i--,this.parts.push(new p("node",i++)),o.push(t),null===t.nextSibling?e.insertBefore(document.createComment(""),t):i--,h=a,r++}}for(const e of o)e.parentNode.removeChild(e)}}exports.Template=m;const x=exports.getValue=((e,t)=>_(t)?(t=t(e),g):null===t?void 0:t),f=exports.directive=(e=>(e.__litDirective=!0,e)),_=e=>"function"==typeof e&&!0===e.__litDirective,g=exports.noChange={};exports.directiveValue=g;const v=e=>null===e||!("object"==typeof e||"function"==typeof e);class N{constructor(e,t,s,n){this.instance=e,this.element=t,this.name=s,this.strings=n,this.size=n.length-1,this._previousValues=[]}_interpolate(e,t){const s=this.strings,n=s.length-1;let i="";for(let r=0;r<n;r++){i+=s[r];const n=x(this,e[t+r]);if(n&&n!==g&&(Array.isArray(n)||"string"!=typeof n&&n[Symbol.iterator]))for(const e of n)i+=e;else i+=n}return i+s[n]}_equalToPreviousValues(e,t){for(let s=t;s<t+this.size;s++)if(this._previousValues[s]!==e[s]||!v(e[s]))return!1;return!0}setValue(e,t){if(this._equalToPreviousValues(e,t))return;const s=this.strings;let n;2===s.length&&""===s[0]&&""===s[1]?(n=x(this,e[t]),Array.isArray(n)&&(n=n.join(""))):n=this._interpolate(e,t),n!==g&&this.element.setAttribute(this.name,n),this._previousValues=e}}exports.AttributePart=N;class T{constructor(e,t,s){this.instance=e,this.startNode=t,this.endNode=s,this._previousValue=void 0}setValue(e){if((e=x(this,e))!==g)if(v(e)){if(e===this._previousValue)return;this._setText(e)}else e instanceof n?this._setTemplateResult(e):Array.isArray(e)||e[Symbol.iterator]?this._setIterable(e):e instanceof Node?this._setNode(e):void 0!==e.then?this._setPromise(e):this._setText(e)}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_setNode(e){this._previousValue!==e&&(this.clear(),this._insert(e),this._previousValue=e)}_setText(e){const t=this.startNode.nextSibling;e=void 0===e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._setNode(document.createTextNode(e)),this._previousValue=e}_setTemplateResult(e){const t=this.instance._getTemplate(e);let s;this._previousValue&&this._previousValue.template===t?s=this._previousValue:(s=new b(t,this.instance._partCallback,this.instance._getTemplate),this._setNode(s._clone()),this._previousValue=s),s.update(e.values)}_setIterable(e){Array.isArray(this._previousValue)||(this.clear(),this._previousValue=[]);const t=this._previousValue;let s=0;for(const n of e){let e=t[s];if(void 0===e){let n=this.startNode;if(s>0){n=t[s-1].endNode=document.createTextNode(""),this._insert(n)}e=new T(this.instance,n,this.endNode),t.push(e)}e.setValue(n),s++}if(0===s)this.clear(),this._previousValue=void 0;else if(s<t.length){const e=t[s-1];t.length=s,this.clear(e.endNode.previousSibling),e.endNode=this.endNode}}_setPromise(e){this._previousValue=e,e.then(t=>{this._previousValue===e&&this.setValue(t)})}clear(e=this.startNode){C(this.startNode.parentNode,e.nextSibling,this.endNode)}}exports.NodePart=T;const V=exports.defaultPartCallback=((e,t,s)=>{if("attribute"===t.type)return new N(e,s,t.name,t.strings);if("node"===t.type)return new T(e,s,s.nextSibling);throw new Error(`Unknown part type ${t.type}`)});class b{constructor(e,t,s){this._parts=[],this.template=e,this._partCallback=t,this._getTemplate=s}update(e){let t=0;for(const s of this._parts)s?void 0===s.size?(s.setValue(e[t]),t++):(s.setValue(e,t),t+=s.size):t++}_clone(){const e=this.template.element.content.cloneNode(!0),t=this.template.parts;if(t.length>0){const s=document.createTreeWalker(e,133,null,!1);let n=-1;for(let e=0;e<t.length;e++){const i=t[e],r=d(i);if(r)for(;n<i.index;)n++,s.nextNode();this._parts.push(r?this._partCallback(this,i,s.currentNode):void 0)}}return e}}exports.TemplateInstance=b;const y=exports.reparentNodes=((e,t,s=null,n=null)=>{let i=t;for(;i!==s;){const t=i.nextSibling;e.insertBefore(i,n),i=t}}),C=exports.removeNodes=((e,t,s=null)=>{let n=t;for(;n!==s;){const t=n.nextSibling;e.removeChild(n),n=t}});
},{}],"XwwT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EventPart=exports.PropertyPart=exports.BooleanAttributePart=exports.extendedPartCallback=exports.svg=exports.html=exports.render=void 0;var e=require("../lit-html.js");Object.defineProperty(exports,"render",{enumerable:!0,get:function(){return e.render}});const t=exports.html=((t,...s)=>new e.TemplateResult(t,s,"html",n)),s=exports.svg=((t,...s)=>new e.SVGTemplateResult(t,s,"svg",n)),n=exports.extendedPartCallback=((t,s,n)=>{if("attribute"===s.type){if("on-"===s.rawName.substr(0,3)){const e=s.rawName.slice(3);return new a(t,n,e)}const l=s.name.substr(s.name.length-1);if("$"===l){const r=s.name.slice(0,-1);return new e.AttributePart(t,n,r,s.strings)}if("?"===l){const e=s.name.slice(0,-1);return new r(t,n,e,s.strings)}return new i(t,n,s.rawName,s.strings)}return(0,e.defaultPartCallback)(t,s,n)});class r extends e.AttributePart{setValue(t,s){const n=this.strings;if(2!==n.length||""!==n[0]||""!==n[1])throw new Error("boolean attributes can only contain a single expression");{const n=(0,e.getValue)(this,t[s]);if(n===e.noChange)return;n?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}}exports.BooleanAttributePart=r;class i extends e.AttributePart{setValue(t,s){const n=this.strings;let r;this._equalToPreviousValues(t,s)||((r=2===n.length&&""===n[0]&&""===n[1]?(0,e.getValue)(this,t[s]):this._interpolate(t,s))!==e.noChange&&(this.element[this.name]=r),this._previousValues=t)}}exports.PropertyPart=i;class a{constructor(e,t,s){this.instance=e,this.element=t,this.eventName=s}setValue(t){const s=(0,e.getValue)(this,t);s!==this._listener&&(null==s?this.element.removeEventListener(this.eventName,this):null==this._listener&&this.element.addEventListener(this.eventName,this),this._listener=s)}handleEvent(e){"function"==typeof this._listener?this._listener.call(this.element,e):"function"==typeof this._listener.handleEvent&&this._listener.handleEvent(e)}}exports.EventPart=a;
},{"../lit-html.js":"SP/d"}],"2X5j":[function(require,module,exports) {
"use strict";var n=t(['\n<li class="lc-item">\n<a href="','" class="lc-link" target="_blank">\n<span class="lc-title">','</span>\n<i href="" class="lc-checked fas fa-trash" onclick=',"></i>\n</a>\n</li>\n"],['\n<li class="lc-item">\n<a href="','" class="lc-link" target="_blank">\n<span class="lc-title">','</span>\n<i href="" class="lc-checked fas fa-trash" onclick=',"></i>\n</a>\n</li>\n"]),e=t(['\n<ul class="lc-list">\n','\n</ul>\n<div class="lc-actions">\n<button class="lc-clipboard lc-btn-basic" onclick=','>Copy All</button>\n<button class="lc-clear lc-btn-basic" onclick=',">Clear</button>\n</div>\n"],['\n<ul class="lc-list">\n','\n</ul>\n<div class="lc-actions">\n<button class="lc-clipboard lc-btn-basic" onclick=','>Copy All</button>\n<button class="lc-clear lc-btn-basic" onclick=',">Clear</button>\n</div>\n"]);function t(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("lit-html/lib/lit-extended"),l=function(n){return document.querySelector(n)},i=function(n){return document.querySelectorAll(n)};function r(e){return c.html(n,e.item.link,e.item.title,function(n){n.preventDefault(),e.del()})}function a(n){return c.html(e,n.items.map(function(e,t){return r({item:e,del:function(){return n.clicked(t)}})}),n.clipboard,n.clear)}browser.storage.sync.get({links:[]},function(n){return u(n.links)}),browser.storage.onChanged.addListener(function(n){return u(n.links.newValue)});var s=o();function o(){return l(".lc-container")}function u(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=a({items:n,clicked:function(n){return browser.runtime.sendMessage({type:"remove-link",index:n})},clear:function(){return browser.runtime.sendMessage({type:"clear-links"})},clipboard:function(){var e=l(".lc-clipboard-input");e&&(e.value=d(n),e.select(),document.execCommand("copy"))}});c.render(e,s)}function d(n){return n.map(function(n){return n.link}).join("\n")}document.body.appendChild(s);
},{"lit-html/lib/lit-extended":"XwwT"}]},{},["2X5j"], null)
//# sourceMappingURL=/dts-popup.map