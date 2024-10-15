import interfacePrefix from './rules/interface-prefix';
import { name, version } from '../package.json';

export default {
    meta: {
        name,
        version,
    },
    rules: {
        'interface-prefix': interfacePrefix,
    },
};
