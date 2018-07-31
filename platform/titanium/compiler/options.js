import { genStaticKeys } from 'shared/util';

import { mustUseProp, isReservedTag, getTagNamespace } from '../util/index';
import modules from './modules/index';
import directives from './directives/index';
import { isUnaryTag, canBeLeftOpenTag } from './util';

export const baseOptions = {
	modules,
	directives,
	isUnaryTag,
	mustUseProp,
	canBeLeftOpenTag,
	isReservedTag,
	getTagNamespace,
	preserveWhitespace: false,
	staticKeys: genStaticKeys(modules)
};
