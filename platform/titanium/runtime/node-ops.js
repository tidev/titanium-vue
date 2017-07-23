/* eslint-disable no-console */

import NodeFactory from '../vdom/NodeFactory';

export function createElement(tagName) {
	console.log(`{TitaniumVue} -> createElement(${tagName})`);
	return NodeFactory.createElement(tagName);
}

export function createElementNS(namespace, tagName) {
	console.log(`{TitaniumVue} -> createElementNS(${namespace}, ${tagName})`);
	return NodeFactory.createElementNS(namespace, tagName);
}

export function createTextNode(text) {
	console.log(`{TitaniumVue} -> createTextNode(${text})`);
	return NodeFactory.createTextNode(text);
}

export function createComment(text) {
	console.log(`{TitaniumVue} -> createComment(${text})`);
	return NodeFactory.createComment(text);
}

export function appendChild(node, child) {
	console.log(`{TitaniumVue} -> appendChild(${node}, ${child})`);
	node.appendChild(child);
}

export function removeChild(node, child) {
	console.log(`{TitaniumVue} -> removeChild(${node}, ${child})`);
	node.removeChild(child);
}

export function insertBefore(parentNode, newNode, referenceNode) {
	console.log(`{TitaniumVue} -> insertBefore(${parentNode}, ${newNode}, ${referenceNode})`);
	parentNode.insertBefore(newNode, referenceNode);
}

export function parentNode(node) {
	console.log(`{TitaniumVue} -> parentNode(${node}) -> ${node.parentNode}`);
	return node.parentNode;
}

export function nextSibling(node) {
	console.log(`{TitaniumVue} -> nextSibling(${node}) -> ${node.nextSibling}`);
	return node.nextSibling;
}

export function tagName(elementNode) {
	console.log(`{TitaniumVue} -> tagName(${elementNode}) -> ${elementNode.tagName}`);
	return elementNode.tagName;
}

export function setTextContent(node, text) {
	console.log(`{TitaniumVue} -> setTextContent(${node}, ${text})`);
	node.setText(text);
}

export function setAttribute(node, key, val) {
	console.log(`{TitaniumVue} -> setAttribute(${node}, ${key}, ${val})`);
	node.setAttribute(key, val);
}
