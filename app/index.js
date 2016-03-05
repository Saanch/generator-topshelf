'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var guid = require('uuid');
var projectName = require('vs_projectname');
var _ = require('lodash');


module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('applicationName', { type: String, required: false, desc: 'the name of the application' });
    },
    initializing: function () {
        this.log(yosay('Welcome to the ' + chalk.yellow('Topshelf windows service') + ' generator!'));
        this.templatedata = {};
    },
    _buildTemplateData: function () {
        this.templatedata.namespace = projectName(this.applicationName);
        this.templatedata.applicationname = this.applicationName;
        this.templatedata.servicename = this.servicename;
        this.templatedata.serviceDisplayName = this.serviceDisplayName;
        this.templatedata.serviceDescription = this.serviceDescription;
        this.templatedata.companyname = this.companyname;
        this.templatedata.solutionguid = guid.v4();
        this.templatedata.projectguid = guid.v4();
        this.templatedata.assemblyguid = guid.v4();
        this.templatedata.coreclr = this.options.coreclr || false;
    },
    prompting: function () {
        if (!this.applicationName) {
            var done = this.async();
            var prompts = [
                {
                    name: 'applicationName',
                    message: 'What\'s the name of your Topshelf Windows service?',
                    default: 'SampleWindowsService'
                },
                {
                    name: 'serviceDisplayName',
                    message: 'What\'s the name of your Topshelf Windows service display?',
                    default: 'SampleWindowsService'
                },
                {
                    name: 'serviceDescription',
                    message: 'What\'s the description of your Topshelf Windows service?',
                    default: 'SampleWindowsService'
                },
                {
                    name: 'authorname',
                    message: 'Author name?',
                    default: 'Your Name'
                },
                {
                    name: 'companyname',
                    message: 'What\'s the name of your company name?',
                    default: 'MyCompany'
                }];
            this.prompt(prompts, function (props) {
                this.applicationName = props.applicationName;
                this.servicename = props.applicationName;
                this.serviceDisplayName = props.serviceDisplayName;
                this.serviceDescription = props.serviceDescription;
                this.authorname = props.authorname;
                this.companyname = props.companyname;
                this._buildTemplateData();
                done();
            }.bind(this));
        } else {
            this._buildTemplateData();
        }
    },
    configuring: function () {
    },
    default: function () {
    },
    writing: function () {
        this.sourceRoot(path.join(__dirname, './templates/projects'));
        this.sourceRoot(path.join(__dirname, '../templates/projects/console'));
        this.fs.copy(path.join(__dirname, '../templates/gitignore.txt'), this.applicationName + '/.gitignore');

        this.log(this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleApplication.sln'), this.applicationName + '.sln', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/_ConsoleProject.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/_Program.cs'), this.applicationName + '/Program.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/_SampleService.cs'), this.applicationName + '/SampleService.cs', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/_App.config'), this.applicationName + '/App.config', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/_packages.config'), this.applicationName + '/packages.config', this.templatedata);
        this.fs.copyTpl(this.templatePath('ConsoleProject/Properties/_AssemblyInfo.cs'), this.applicationName + '/' + 'Properties/AssemblyInfo.cs', this.templatedata);

        this.directory(this.templatePath('nuget'), '.nuget');
        },
    conflicts: function () {
    },
    install: function () {
    },
    end: function () {
        this.log('\r\n');
        this.log('Your project is now created, you can use Visula Studio to build the project.');
    }
});