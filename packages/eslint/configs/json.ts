// import { JSON_FILES } from '../constants';
// import { eslintJsonPlugin } from '../plugins';
// import type { IOptionsFiles, IOptionsOverrides, TFlatConfigItem } from '../types';
// import { interopDefault } from '../utils';

// const json = async (options: IOptionsFiles & IOptionsOverrides = {}): Promise<TFlatConfigItem[]> => {
//     const {
//         files = [
//             ...JSON_FILES,
//         ],
//         overrides = {},
//     } = options;

//     const parserJsonc = await interopDefault(import('jsonc-eslint-parser'));

//     return [
//         {
//             name: 'json/setup',
//             plugins: {
//                 ['json']: eslintJsonPlugin,
//             },
//         },
//         // {
//             // name: 'json/rules',
//             // files,
//             // languageOptions: {
//             //     parser: parserJsonc,
//             // },
//             // rules: {
//             //     'json/no-duplicate-keys': 'error',
//             //     'json/no-empty-keys': 'error',
//             //     ...overrides,
//             // },
//             {
//               files,
//               language: "json/json",
//               rules: {
//                 "json/no-duplicate-keys": "error",
//                 'json/no-empty-keys': 'error',
//               },
//             },

//             // lint JSONC files
//             {
//               files: ["**/*.jsonc", ".vscode/*.json"],
//               language: "json/jsonc",
//               ...eslintJsonPlugin.configs.recommended,
//             },

//             // lint JSON5 files
//             {
//               files: ["**/*.json5"],
//               language: "json/json5",
//               ...eslintJsonPlugin.configs.recommended as any,
//             },
//         // },
//     ];
// };

// export { json };
