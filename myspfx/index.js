'use strict';
// base generator scaffolding
const Generator = require('yeoman-generator');
// import SPFx generator - optional and not needed
const spfxYeoman = require('@microsoft/generator-sharepoint/lib/generators/app');
// import command-exists to check if yarn is installed
const commandExists = require('command-exists').sync;
// Add Color Support to Higlight steps in this generator
const chalk = require('chalk');

// Avoid conflict message
const fs = require('fs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    // Helper Method to highlight logging
    _custLog(logMessage) {
        this.log(
            chalk.bold.black.bgYellow('MySPFX: ') +
            chalk.black.bgYellow(logMessage)
        )
    }

    // Initialisation Generator + SPFx generator
    initializing() {

        this._custLog('Initialize Generator');

        // Fetch current package.json
        this.pkg = require('../package.json');

        // this.composeWith(
        //     require.resolve(`@microsoft/generator-sharepoint/lib/generators/app`), {
        //         'skip-install': true,
        //         'framework': 'none'
        //     }
        // );

    }

    prompt(){
        this._custLog('my Prompting:');

        this.composeWith(
            require.resolve(`../spfxextension2`), {}
        );

    }
    writing(){
        this.composeWith(
            require.resolve(`../spfxextension`), {}
        );

    }

}