"use strict";

var document = self.document = {
  parentNode: null,
  nodeType: 9,
  toString: function toString() {
    return "FakeDocument";
  }
};
var window = self.window = self;
var fakeElement = Object.create(document);
fakeElement.nodeType = 1;

fakeElement.toString = function () {
  return "FakeElement";
};

fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
fakeElement.ownerDocument = document;
document.head = document.body = fakeElement;
document.ownerDocument = document.documentElement = document;

document.getElementById = document.createElement = function () {
  return fakeElement;
};

document.createDocumentFragment = function () {
  return this;
};

document.getElementsByTagName = document.getElementsByClassName = function () {
  return [fakeElement];
};

document.getAttribute = document.setAttribute = document.removeChild = document.addEventListener = document.removeEventListener = function () {
  return null;
};

document.cloneNode = document.appendChild = function () {
  return this;
};

document.appendChild = function (child) {
  return child;
};

onmessage = function onmessage(e) {
  console.log(e);
  /*if(e.data == 'init') {
    	myInterval = setInterval("postMessage('');", 1000);
  } else {
     	clearInterval(myInterval);
  }*/
};
//# sourceMappingURL=odbcMSSQL.js.map
