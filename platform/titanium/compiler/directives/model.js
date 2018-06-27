import { addHandler, addProp } from 'compiler/helpers';
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model';

import { getViewMeta, hasElement } from '../../util/registry';

export default function model (el, dir) {
	if (el.component) {
		genComponentModel(el, dir.value, dir.modifiers);
	} else if (!hasElement(el.tag))	{
		console.log(`genComponentModel ${el.tag}`);
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
		valueExpression = `$event.${props}.trim()`;
	}
	if (number) {
		valueExpression = `_n(${valueExpression})`;
	}

	let code = genAssignmentCode(value, valueExpression);
	addProp(el, prop, `(${value})`);
	addHandler(el, event, code, null, true);
}
