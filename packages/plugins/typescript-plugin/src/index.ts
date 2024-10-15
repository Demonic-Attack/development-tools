import { name, version } from '../package.json';

import interfacePrefix from './rules/interface-prefix';

export default {
    meta: {
        name,
        version,
    },
    rules: {
        'interface-prefix': interfacePrefix,
    },
};
