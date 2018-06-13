import { createCompiler } from 'compiler/index';

import { baseOptions } from './options';

const { compile, compileToFunctions } = createCompiler(baseOptions);

export { compile, compileToFunctions };
