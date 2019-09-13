const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const parse = require('react-docgen').parse;
const chokidar = require('chokidar');

const excludedComponents = [
    'Content',
    'Layout',
    'Login',
    'Form'
];

const excludedFormComponents = [
    'Radio'
];

const paths = {
    componentDocs: path.join(__dirname, '../src', 'docs', 'components'),
    formDocs: path.join(__dirname, '../src', 'docs', 'forms'),
    components: path.join(__dirname, '../src', 'components'),
    form: path.join(__dirname, '../src', 'components', 'Form'),
    componentDataOutput: path.join(__dirname, '../', 'componentData.js'),
    formDataOutput: path.join(__dirname, '../', 'formData.js')
};

const enableWatchMode = process.argv.slice(2) == '--watch';
if (enableWatchMode) {
    // Regenerate component metadata when components or examples change.
    chokidar.watch([paths.componentDocs, paths.formDocs, paths.components]).on('change', function(event, path) {
        generate(paths);
    });
} else {
    // Generate component metadata
    generate(paths);
}

function generate(paths) {
    const componentDataErrors = [];
    const componentData = getDirectories(paths.components)
        .filter(componentName => excludedComponents.indexOf(componentName) === -1)
        .map(function(componentName) {
        try {
            return getComponentData(paths, componentName);
        } catch(error) {
            componentDataErrors.push('An error occurred while attempting to generate metadata for ' + componentName + '. ' + error);
        }
    });

    const formDataErrors = [];
    const formData = (function() {
        const content = readFile(path.join(paths.form, 'Form.js'));
        const info = parse(content);
        return {
            name: 'Form',
            description: info.description,
            props: info.props,
            examples: getFormUsageExampleData(paths.formDocs),
            components: getDirectories(paths.form)
                .filter(componentName => excludedFormComponents.indexOf(componentName) === -1)
                .map(function(componentName) {
                    try {
                        return getFormComponentData(paths, componentName);
                    } catch(error) {
                        formDataErrors.push('An error occurred while attempting to generate metadata for ' + componentName + '. ' + error);
                    }
                })
        };
    })();

    writeFile(paths.componentDataOutput, "module.exports = /* eslint-disable */ " + JSON.stringify(componentDataErrors.length ? componentDataErrors : componentData));
    writeFile(paths.formDataOutput, "module.exports = /* eslint-disable */ " + JSON.stringify(formDataErrors.length ? formDataErrors : formData));
}

function getFormComponentData(paths, componentName) {
    const content = readFile(path.join(paths.form, componentName, componentName + '.js'));
    const info = parse(content);
    return {
        name: componentName,
        description: info.description,
        props: info.props,
        examples: getExampleData(path.join(paths.formDocs, 'components'), componentName)
    }
}

function getComponentData(paths, componentName) {
    const content = readFile(path.join(paths.components, componentName, componentName + '.js'));
    const info = parse(content);
    return {
        name: componentName,
        description: info.description,
        props: info.props,
        examples: getExampleData(paths.componentDocs, componentName)
    }
}

function getFormUsageExampleData(formDocsPath) {
    const examples = getFormUsageExampleFiles(formDocsPath);
    return examples.map(function(file) {
        const filePath = path.join(formDocsPath, 'examples', file);
        const content = readFile(filePath);
        const info = parse(content);
        return {
            // By convention, component name should match the filename.
            // So remove the .js extension to get the component name.
            name: file.slice(0, -3),
            description: info.description,
            code: content
        };
    });
}

function getExampleData(examplesPath, componentName) {
    const examples = getExampleFiles(examplesPath, componentName);
    return examples.map(function(file) {
        const filePath = path.join(examplesPath, componentName, 'examples', file);
        const content = readFile(filePath);
        const info = parse(content);
        return {
            // By convention, component name should match the filename.
            // So remove the .js extension to get the component name.
            name: file.slice(0, -3),
            description: info.description,
            code: content
        };
    });
}

function getFormUsageExampleFiles(formDocsPath) {
    let exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(formDocsPath, 'examples'));
    } catch(error) {
        console.log(chalk.red(`No form usage examples found.`));
    }

    return exampleFiles;
}

function getExampleFiles(examplesPath, componentName) {
    let exampleFiles = [];
    try {
        exampleFiles = getFiles(path.join(examplesPath, componentName, 'examples'));
    } catch(error) {
        console.log(chalk.red(`No examples found for ${componentName}.`));
    }
    return exampleFiles;
}

function getDirectories(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
        return fs.statSync(path.join(filepath, file)).isDirectory();
    });
}

function getFiles(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
        return fs.statSync(path.join(filepath, file)).isFile();
    });
}

function writeFile(filepath, content) {
    fs.writeFile(filepath, content, function (err) {
        err ? console.log(chalk.red(err)) : console.log(chalk.green("Component data saved."));
    });
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}