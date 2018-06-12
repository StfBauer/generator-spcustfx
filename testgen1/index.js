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
            chalk.bold.black.bgYellow('TG1: ') +
            chalk.black.bgYellow(logMessage)
        )
    }

    // Initialisation Generator + SPFx generator
    initializing() {

        this._custLog('Initialize Generator');

    }

    // Prompt for user input for Custom Generator
    prompting() {
        this._custLog('Prompting');

        const prompts = [{
            type: 'confirm',
            name: 'cool',
            message: 'SPFX Extensions are awesome?'
        }];

        return this.prompt(prompts);

    }

    // adds additonal editor support in this case CSS Comb
    configuring(){
        this._custLog('Configuration');
    }

    // not used because of the dependencies of the SPFx file
    // Code was moved to Install
    writing(){
        this._custLog('Call writing');
    }

    install() {
        this._custLog('Call install');
    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end(){
        this._custLog('Call End');
    }

}