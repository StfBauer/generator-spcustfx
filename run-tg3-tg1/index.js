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
            chalk.bold.black.bgYellow('run-tg3-tg1: ') +
            chalk.black.bgYellow(logMessage)
        )
    }

    // Initialisation Generator + SPFx generator
    initializing() {

        this._custLog('Test Run for testgen1 followed by testgen2:');

        // Fetch current package.json
        this.pkg = require('../package.json');

        this._custLog('my Prompting:');
        // Run thrne testgen2 first
        this._custLog("Compose with testgen3")
        this.composeWith(
            require.resolve(`../testgen3`), {}
        );


        // Run testgen1 first
        this._custLog("Compose with testgen1")
        this.composeWith(
            require.resolve(`../testgen1`), {}
        );

    }

    prompt() {
    }
    writing() {

    }

}