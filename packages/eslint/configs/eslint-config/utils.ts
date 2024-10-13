import type { TFlatConfigItem } from '../../types';

const getRulesByConfigName = (configName: string, configs: TFlatConfigItem[]) =>
    configs
        .filter((config: TFlatConfigItem) => config.name === configName && config.rules)
        .map((config: TFlatConfigItem) => config.rules)
        .reduce(
            (accumulator: TFlatConfigItem['rules'], rules: TFlatConfigItem['rules']) => ({ ...accumulator, ...rules }),
            {},
        );

export { getRulesByConfigName };
