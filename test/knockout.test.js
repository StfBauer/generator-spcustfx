// Path
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

// Yeoman Testing utilities
const helper = require('yeoman-test');
const assert = require('yeoman-assert');

// SPFx Setup
const spfxGenerators = require('./spfx-gen');

describe('Knockout Test:', () => {

    const testDir = path.join(__dirname, '../testresult/');


    // test constrains
    // set web part configuration for current test
    const webPartConfig = {
        componentType: 'webpart',
        componentDescription: 'HelloWorld',
        componentName: 'helloworld',
        solutionName: 'HelloWorld2',
        environment: 'spo',
        framework: 'knockout'
    };

    // Setting up commin path
    var solutionFolder = path.join(testDir, webPartConfig.solutionName);
    var packageJson = path.join(solutionFolder, 'package.json');


    

    before(() => {
       

        return new Promise((resolve, reject) => {

            rimraf.sync(testDir);

            console.log('Does testfolder exists: ', fs.existsSync(solutionFolder));
            
            helper.setUpTestDirectory(path.join(__dirname, testDir));

            helper.run(path.join(__dirname, '../app'))
                .inDir(testDir)
                .withGenerators(
                    spfxGenerators
                )
                .withOptions(webPartConfig) // Mock options passed in
                .withLocalConfig({}) // mock local SPFx configuration
                .on('error', (err) => {
                    console.log('ERROR', err);
                    reject();
                })
                .on('end', () => {
                    resolve();
                });

        })

    });

    it('Knockout in package.json', (done) => {
        
        assert.fileContent(packageJson, /knockout/);

        done();
    })

    it('No React in package.json', (done) => {
        
        assert.noFileContent(packageJson, /react/);

        done();

    })

});