const fs = require('fs');
const path = require('path');
const {generateFromFile} = require("react-to-typescript-definitions");

const componentPath = path.join(__dirname, '../src', 'components');
const outPath = path.join(__dirname, '../lib');
generateFromDirectory('/');

function generateFromDirectory(currentPath) {
    let sourcePath = path.join(componentPath, currentPath);
    let destPath = path.join(outPath, currentPath);

    fs.readdirSync(sourcePath).forEach(name => {
        const fullPath = path.join(sourcePath, name);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            generateFromDirectory(path.join(currentPath, name));
        } else if (stat.isFile() && name.endsWith('.js')) {
            fs.mkdirSync(destPath, {recursive: true});
            const destFilePath = path.join(destPath, path.parse(name).name + ".d.ts");
            // Skip helpBlockStyle
            if (name === "helpBlockStyle.js") {
                return;
            }
            
            if (name === "index.js") {
                fs.copyFileSync(fullPath, destFilePath);
            } else {
                const dts = generateFromFile(null, fullPath);
                fs.writeFileSync(destFilePath, dts);
            }
        }
    });
}