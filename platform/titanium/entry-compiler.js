import { initializeTitaniumElements } from './util/registry';

initializeTitaniumElements();

export { parseComponent } from 'sfc/parser';
export { compile, compileToFunctions } from './compiler/index';
