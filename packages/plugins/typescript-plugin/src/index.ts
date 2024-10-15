import { name, version } from '../package.json';

import { allRules } from './rules';

export default {
    meta: {
        name,
        version,
    },
    rules: {
        ...allRules,
    },
};
