import { addHandler, addAttr, addProp } from 'compiler/helpers';
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model';

import { getViewMeta, hasElement } from '../../util/registry';

export default function model (el, dir) {
	if (el.component) {
		genComponentModel(el, dir.value, dir.modifiers);
	} else if (!hasElement(el.tag))	{
		genComponentModel(el, dir.value, dir.modifiers);
	} else {
		genDefaultModel(el, dir.value, dir.modifiers);
	}
}

function genDefaultModel (el, value, modifiers) {
	const { trim, number } = modifiers || {};
	const { prop, event } = getViewMeta(el.tag).model;

	let valueExpression = `$event.${prop}`;
	if (trim) {
		valueExpression = `$event.${prop}.trim()`;
	}
	if (number) {
		valueExpression = `_n(${valueExpression})`;
	}

	let code = genAssignmentCode(value, valueExpression);
	addAttr(el, prop, value);
	addProp(el, prop, `(${value})`);
	addHandler(el, event, code, null, true);
}
