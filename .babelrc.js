const path = require('path');

const envPreset = [
    require.resolve('@babel/preset-env'),
    {
        modules: "commonjs",
        // We want Create React App to be IE 9 compatible until React itself
        // no longer works with IE 9
        targets: {
            ie: 9,
        },
        // Users cannot override this behavior because this Babel
        // configuration is highly tuned for ES5 support
        ignoreBrowserslistConfig: true,
        // If users import all core-js they're probably not concerned with
        // bundle size. We shouldn't rely on magic to try and shrink it.
        useBuiltIns: false,
    }
];

const reactPreset = [
    require.resolve('@babel/preset-react'),
    {
        development: false,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true
    }
];

// Strip flow types before any other transform, emulating the behavior
// order as-if the browser supported all of the succeeding features
// https://github.com/facebook/create-react-app/pull/5182
const flowStripTypesPlugin = require.resolve('@babel/plugin-transform-flow-strip-types');

// Experimental macros support. Will be documented after it's had some time
// in the wild.
const macrosPlugin = require.resolve('babel-plugin-macros');

// Necessary to include regardless of the environment because
// in practice some other transforms (such as object-rest-spread)
// don't work without it: https://github.com/babel/babel/issues/7215
const transformDestructuringPlugin = require.resolve('@babel/plugin-transform-destructuring');

// class { handleClick = () => { } }
// Enable loose mode to use assignment instead of defineProperty
// See discussion in https://github.com/facebook/create-react-app/issues/4263
const classPropertiesProposalPlugin = [
    require.resolve('@babel/plugin-proposal-class-properties'),
    {
        loose: true
    }
];

// The following two plugins use Object.assign directly, instead of Babel's
// extends helper. Note that this assumes `Object.assign` is available.
// { ...todo, completed: true }
const objectRestSpreadProposalPlugin = [
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    {
        useBuiltIns: true,
    }
];

// Remove PropTypes from production build
const removePropTypesPlugin = [
    require.resolve('babel-plugin-transform-react-remove-prop-types'),
    {
        mode: "wrap",
        ignoreFilenames: ['node_modules'],
    }
];

// Adds syntax support for import()
const syntaxDynamicImportPlugin = require.resolve('@babel/plugin-syntax-dynamic-import');

module.exports = {
    presets: [
        envPreset,
        reactPreset
    ],
    plugins: [
        flowStripTypesPlugin,
        macrosPlugin,
        transformDestructuringPlugin,
        classPropertiesProposalPlugin,
        objectRestSpreadProposalPlugin,
        removePropTypesPlugin,
        syntaxDynamicImportPlugin
    ]
};
