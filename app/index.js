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

MeteorGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'Would you include these splendid packages?',
    choices: [{
      name: 'Bootstrap 3 for Less',
      value: 'bootstrap3',
      checked: true
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.bootstrap = hasFeature('bootstrap');

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
  this.copy('client/views/layout.html', 'client/views/layout.html');
  this.copy('client/views/hello.js', 'client/views/hello.js');
  this.copy('lib/collections.js', 'lib/collections.js');
  this.copy('server/publications.js', 'server/publications.js');
  this.copy('server/server.js', 'server/server.js');
  this.copy('server/security.js', 'server/security.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/packages', '.meteor/packages');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('_smart.json', 'smart.json');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
  // Setup Bootstrap 3
  if (this.bootstrap3) {
 		console.log(chalk.green('Copying Bootstrap 3 Less'));
     this.mkdir('client/bower');
 	}
};

MeteorGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};
