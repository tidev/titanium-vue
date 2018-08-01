/* eslint-disable no-console */

import {
	CommentNode,
	InvisibleElement,
	TextNode,
	TitaniumElement,
	TitaniumElementRegistry
} from 'titanium-vdom';

const registry = TitaniumElementRegistry.getInstance();

export function createElement(tagName) {
	console.log(`{TitaniumVue} -> createElement(${tagName})`);
	if (registry.hasElement(tagName)) {
		const elementEntry = registry.getElement(tagName);
		return new TitaniumElement(tagName, elementEntry.resolveFactory(), elementEntry.meta);
	} else {
		return new InvisibleElement(tagName);
	}
}

export function createElementNS(namespace, tagName) {
	// console.log(`{TitaniumVue} -> createElementNS(${namespace}, ${tagName})`);
	throw new Error('createElementNS is not implemented.');
}

export function createTextNode(text) {
	// console.log(`{TitaniumVue} -> createTextNode(${text})`);
	return new TextNode(text);
}

export function createComment(text) {
	// console.log(`{TitaniumVue} -> createComment(${text})`);
	return new CommentNode(text);
}

export function appendChild(node, child) {
	console.log(`{TitaniumVue} -> appendChild(${node}, ${child})`);
	node.appendChild(child);
}

export function removeChild(node, child) {
	// console.log(`{TitaniumVue} -> removeChild(${node}, ${child})`);
	node.removeChild(child);
}

export function insertBefore(parentNode, newNode, referenceNode) {
	// console.log(`{TitaniumVue} -> insertBefore(${parentNode}, ${newNode}, ${referenceNode})`);
	parentNode.insertBefore(newNode, referenceNode);
}

export function parentNode(node) {
	// console.log(`{TitaniumVue} -> parentNode(${node}) -> ${node.parentNode}`);
	return node.parentNode;
}

export function nextSibling(node) {
	// console.log(`{TitaniumVue} -> nextSibling(${node}) -> ${node.nextSibling}`);
	return node.nextSibling;
}

export function tagName(elementNode) {
	// console.log(`{TitaniumVue} -> tagName(${elementNode}) -> ${elementNode.tagName}`);
	return elementNode.tagName;
}

export function setTextContent(node, text) {
	// console.log(`{TitaniumVue} -> setTextContent(${node}, ${text})`);
	node.nodeValue = text;
}

export function setStyleScope (node, scopeId) {
	node.setAttribute(scopeId, '');
}
