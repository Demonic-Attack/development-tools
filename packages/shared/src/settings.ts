// import memoize from 'micro-memoize';
// import pm from 'picomatch';

// export const normalizeSettings = memoize(
//     (settings: ESLintReactSettings) => {
//         const additionalComponents = settings.additionalComponents ?? [];
//         return Data.struct<ESLintReactSettingsNormalized>({
//             ...settings,
//             additionalComponents: additionalComponents.map(component => ({
//                 ...component,
//                 attributes:
//                     component.attributes?.map(attr => ({
//                         ...attr,
//                         as: attr.as ?? attr.name,
//                     })) ?? [],
//                 re: pm.makeRe(component.name, { fastpaths: true }),
//             })),
//             components: additionalComponents.reduce((acc, component) => {
//                 const { name, as, attributes = [], selector } = component;
//                 if (!name || !as || selector || attributes.length > 0) return acc;
//                 if (!/^[\w-]+$/u.test(name)) return acc;
//                 return acc.set(name, as);
//             }, new Map<string, string>()),
//         });
//     },
//     { isEqual: shallowEqual },
// );
