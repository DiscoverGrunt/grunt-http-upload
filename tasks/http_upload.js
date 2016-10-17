/*
 * grunt-http-upload
 * https://github.com/DiscoverGrunt/grunt-http-upload
 *
 * Copyright (c) 2013 Julien M
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var request = require('request');

  grunt.registerMultiTask('http_upload', 'Upload files through POST/PUT HTTP request', function() {

    // Tell Grunt this task is asynchronous.
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      rejectUnauthorized: true,
      method: 'POST',
      headers: {},
      url:    '',
      onComplete: function(data) {}
    });

    grunt.verbose.writeflags(options, 'Options');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // there should be only 1 file in source, but just to make sure...
      var filepath = f.src[0];
      var field    = f.dest;

      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.fail.warn('Source file "' + filepath + '" not found.');
        return false;
      }

      // get file size (necessary for multipart upload)
      fs.stat(filepath, function(err, stats) {
        if (err) {
          grunt.fail.warn('Error: ' + err);
          done(err);
        } else if (stats.isFile()) {
          var fileSize = stats.size;
          grunt.log.writeln('Uploading "' + filepath + '" as "' + field + '"');
          // build request data (because of dynamic key in data object)
          var reqData = options.data || {};
          reqData[field] = fs.createReadStream(filepath);
          // Build the HTTP request
          request({
            url:options.url,
            strictSSL: options.rejectUnauthorized,
            method: options.method,
            headers: options.headers,
            formData: reqData
          }, function optionalCallback(err, response, data) {
            if (err) {
              return grunt.fail.warn('Failed uploading (error code: ' + err + ')');
            }
            if (response !== null && response.statusCode >= 200 && response.statusCode < 300) {
              grunt.log.ok('Upload successful of "' + filepath + '" as "' + field + '" - ' + options.method + ' @ ' + options.url);
              options.onComplete(data);
            } else if (response !== null) {
              grunt.fail.warn('Failed uploading "' + filepath + '" as "' + field + '" (status code: ' + response.statusCode + ') - ' + options.method + ' @ ' + options.url);
            } else {
              grunt.fail.warn('Failed uploading "' + filepath + '" as "' + field + '" (status code: null) - ' + options.method + ' @ ' + options.url);
            }
            // callback once upload is done
            done(data);
          });
        }
      });
    });
  });
};
