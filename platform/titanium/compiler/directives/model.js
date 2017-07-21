import { addHandler, addAttr } from 'compiler/helpers';
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model';
import VirtualDomNode from '../../vdom/VirtualDomNode';
import { getViewMeta } from '../../element-registry';

export default function model (el, dir) {
	if (el.type === VirtualDomNode.NODE_TYPE_ELEMENT) {
		genDefaultModel(el, dir.value, dir.modifiers);
	} else {
		genComponentModel(el, dir.value, dir.modifiers);
	}
}

function genDefaultModel (el, value, modifiers) {
	const { trim, number } = modifiers || {};
	const { prop, event } = getViewMeta(el.tag).model;

	let valueExpression = `$event.target.attr.value${trim ? '.trim()' : ''}`;
	if (number) {
		valueExpression = `_n(${valueExpression})`;
	}

	const code = genAssignmentCode(value, valueExpression);
	addAttr(el, prop, `(${value})`);
	addHandler(el, event, code, null, true);
}
