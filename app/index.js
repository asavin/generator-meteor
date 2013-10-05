'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeteorGenerator = module.exports = function MeteorGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(MeteorGenerator, yeoman.generators.Base);

MeteorGenerator.prototype.welcome = function welcome() {
  // welcome message
  console.log(this.yeoman);
};

MeteorGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'ironRouter',
    message: 'Would you include Iron Router?',
    default: true
  }];

  this.prompt(prompts, function (answers) {
    this.ironRouter = answers.ironRouter;
    cb();
  }.bind(this));
};

// generate the basic scaffolding for a Meteor project
MeteorGenerator.prototype.app = function app() {
  this.mkdir('client');
  this.mkdir('client/compatibility');
  this.mkdir('client/styles');
  this.mkdir('client/lib');
  this.mkdir('client/views');
  this.mkdir('lib');
  this.mkdir('server');
  this.mkdir('public');
  this.mkdir('public/fonts');
  this.mkdir('public/images');
  this.mkdir('private');
  this.mkdir('packages');
  this.mkdir('.meteor');

  this.copy('client/client.js', 'client/client.js');
  this.copy('client/styles/theme.css', 'client/styles/theme.css');
  this.copy('client/lib/subscriptions.js', 'client/lib/subscriptions.js');
  this.copy('client/views/home.js', 'client/views/home.js');
  this.copy('client/views/home.html', 'client/views/home.html');
  this.copy('lib/collections.js', 'lib/collections.js');
  this.copy('public/robots.txt', 'public/robots.txt');
  this.copy('server/publications.js', 'server/publications.js');
  this.copy('server/server.js', 'server/server.js');
  this.copy('server/security.js', 'server/security.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};

MeteorGenerator.prototype.rootin = function rootin() {
  if(this.ironRouter) {
    this.copy('client/routes.js', 'client/routes.js');
    this.copy('client/views/iron-router/layout.html', 'client/views/layout.html');
    this.copy('_smart.json', 'smart.json');
    this.copy('client/views/iron-router/packages', '.meteor/packages');
  } else {
    this.copy('client/views/layout.html', 'client/views/layout.html');
    this.copy('.meteor/packages', '.meteor/packages');
  }
};