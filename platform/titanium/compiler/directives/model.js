import { addHandler, addAttr } from 'compiler/helpers';
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model';
import { NodeType } from 'titanium-vdom';

import { getViewMeta } from '../../util/registry';

export default function model (el, dir) {
	if (el.type === NodeType.Element) {
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
