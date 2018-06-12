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

        // Run then test generator 1
        this._custLog("Compose with testgen1")
        this.composeWith(
            require.resolve(`../testgen1`), {}
        );

        // Run first the SharePoint Generator
        this._custLog("Compose with @microsoft/sharepoint");
        this.composeWith(
            require.resolve(`@microsoft/generator-sharepoint/lib/generators/app`), {
                'skip-install': true,
                'framework': 'none',
                'nested': true
            }
        );

    }

    prompt(){
        this._custLog('my Prompting:');


    }
    writing(){
        this._custLog('my Writing:');
    }

}