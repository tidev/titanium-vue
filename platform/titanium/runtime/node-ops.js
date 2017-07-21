/* eslint-disable no-console */

import CommentNode from '../vdom/CommentNode';
import ElementNode from '../vdom/ElementNode';
import TextNode from '../vdom/TextNode';

export function createElement(tagName) {
	console.log(`{TitaniumVue} -> createElement(${tagName})`);
	return new ElementNode(tagName);
}

export function createElementNS(namespace, tagName) {
	console.log(`{TitaniumVue} -> createElementNS(${namespace}#${tagName})`);
	return new ElementNode(`${namespace}:${tagName}`);
}

export function createTextNode(text) {
	console.log(`{TitaniumVue} -> createTextNode(${text})`);
	return new TextNode(text);
}

export function createComment(text) {
	console.log(`{TitaniumVue} -> createComment(${text})`);
	return new CommentNode(text);
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
	console.log(`{TitaniumVue} -> parentNode(${node})`);
	return node.parentNode;
}

export function nextSibling(node) {
	console.log(`{TitaniumVue} -> pextSibling(${node})`);
	return node.nextSibling;
}

export function tagName(elementNode) {
	console.log(`{TitaniumVue} -> tagName(${elementNode})`);
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
