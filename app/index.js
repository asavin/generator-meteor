'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeteorGenerator = module.exports = function MeteorGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ bower: true, npm: false, skipInstall: options['skip-install'] });
  });
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
    name: 'bootstrap',
    message: 'Would you include Bootstrap for Less?',
    default: true
  },{
    type: 'confirm',
    name: 'ironRouter',
    message: 'Would you include Iron Router?',
    default: true
  }];

  this.prompt(prompts, function (answers) {
    this.bootstrap = answers.bootstrap;
    this.ironRouter = answers.ironRouter;
    cb();
  }.bind(this));
};

// generate the basic scaffolding for a Meteor project
MeteorGenerator.prototype.app = function app() {
  this.mkdir('client');
  this.mkdir('client/lib');
  this.mkdir('client/views');
  this.mkdir('lib');
  this.mkdir('server');
  this.mkdir('public');
  this.mkdir('private');
  this.mkdir('packages');
  this.mkdir('.meteor');

  this.copy('client/client.js', 'client/client.js');
  this.copy('client/lib/subscriptions.js', 'client/lib/subscriptions.js');
  this.copy('client/views/home.js', 'client/views/home.js');
  this.copy('lib/collections.js', 'lib/collections.js');
  this.copy('server/publications.js', 'server/publications.js');
  this.copy('server/server.js', 'server/server.js');
  this.copy('server/security.js', 'server/security.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};

MeteorGenerator.prototype.bower = function bower() {
  if (this.bootstrap) {
    this.log.writeln('Writing Bower Bootstrap Config');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  }
};

MeteorGenerator.prototype.rootin = function rootin() {
  if(this.ironRouter) {
    this.copy('client/views/iron-router/routes.js', 'client/routes.js');
    this.copy('client/views/iron-router/layout.html', 'client/views/layout.html');
    this.copy('_smart.json', 'smart.json');
    this.copy('client/views/iron-router/packages', '.meteor/packages');
  } else {
    this.copy('client/views/layout.html', 'client/views/layout.html');
    this.copy('.meteor/packages', '.meteor/packages');
  }

}