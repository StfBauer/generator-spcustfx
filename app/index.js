'use strict';
// base generator scaffolding
const Generator = require('yeoman-generator');
// import SPFx generator - optional and not needed
const spfxYeoman = require('@microsoft/generator-sharepoint/package.json');
// import command-exists to check if yarn is installed
const commandExists = require('command-exists').sync;
// Avoid conflict message
const fs = require('fs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {
        // Fetch current package.json
        this.pkg = require('../package.json');

        this.spfx = this.composeWith(
            require.resolve(`@microsoft/generator-sharepoint/lib/generators/app`), {
                'skip-install': true,
                'framework': 'none'
            }
        );
    }

    prompting() {

    }

    _backupSPFXConfig() {

        // backup default gulp file;
        fs.rename(
            this.destinationPath('gulpfile.js'),
            this.destinationPath('gulpfile.spfx.js')
        );

    }

    _deployCustomConfig() {


    }

    _applyCustomConfig() {

        this._backupSPFXConfig();

        console.log(
            this.fs.exists(this.templatePath('gulpfile.js')),
            this.fs.exists(this.destinationPath('gulpfile.js'))
        );

        // copy new templates file
        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
        // copy static assets
        this.fs.copy(
            this.templatePath('config/copy-static-assets.json'),
            this.destinationPath('config/copy-static-assets.json')
        );

    }

    _addExternals() {

        // "handlebars": "./node_modules/handlebars/dist/handlebars.amd.min.js"
        // reading JSON
        let config = this.fs.readJSON(this.destinationPath('config/config.json'));

        // Add Handlebars entry
        config.externals.handlebars = "./node_modules/handlebars/dist/handlebars.amd.min.js";

        // writing json
        fs.writeFileSync(
            this.destinationPath('config/config.json'),
            JSON.stringify(config, null, 2));


    }

    _addEditorSupport() {

        this.fs.copy(
            this.templatePath('editor/.csscomb.json'),
            this.destinationPath('.csscomb.json')
        );
    }

    _addTypings() {

        // reading JSON
        let tsconfig = this.fs.readJSON(
            this.destinationPath('tsconfig.json')
        );

        // Add Handlebars entry
        tsconfig.compilerOptions.types.push('handlebars');

        // writing json
        fs.writeFileSync(
            this.destinationPath('tsconfig.json'),
            JSON.stringify(tsconfig, null, 2));


    }

    _writingSampleCode() {

        this.fs.copy(
            this.templatePath('sample/src/templates/HelloWorld.hbs'),
            this.destinationPath('src/webparts/templates/HelloWorld.hbs')
        )

    }

    _installNPMPackages() {

        // Spawn dev dependencies
        this.spawnCommand('npm', ['install',
            'handlebars-template-loader',
            'jquery',
            '--save-dev'
        ]);

        // Spawn dependencies
        this.spawnCommand('npm', [
            'install',
            'handlebars',
            '@types/handlebars',
            '--save'
        ]);

    }

    install() {

        // Apply Custom configuration
        this._applyCustomConfig();
        // Adding externals      
        this._addExternals();
        // add additional typings
        this._addTypings();
        // write Sample Code
        this._addEditorSupport();
        // write Sample Code
        this._writingSampleCode();
        // Install additional NPM Packages
        this._installNPMPackages();

        // const hasYarn = commandExists('yarn');
        // this.installDependencies({
        //     npm: !hasYarn,
        //     bower: false,
        //     yarn: hasYarn,
        //     skipMessage: this.options['skip-install-message'],
        //     skipInstall: this.options['skip-install']
        // });


    }

}
