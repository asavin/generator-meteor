/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('meteor generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('meteor:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'client/client.js',
      'client/lib/subscriptions.js',
      'client/views/layout.html',
      'client/views/hello.js',
      'lib/collections.js',
      'server/publications.js',
      'server/server.js',
      'server/security.js',
      '.meteor/.gitignore',
      '.meteor/packages',
      '.meteor/release',
      '.gitignore',
      'smart.json',
      'LICENSE',
      'README.md',
      '.bowerrc',
      'bower.json'
    ];

    helpers.mockPrompt(this.app, {
      bootstrap: true
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
