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
  var rest = require('restler');

  grunt.registerMultiTask('http_upload', 'Upload files through POST/PUT HTTP request', function() {

    // Tell Grunt this task is asynchronous.
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      method: 'POST',
      headers: {},
      url:    ''
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
          reqData[field] = rest.file(filepath, null, fileSize, null, null);
          // HTTP request
          rest.request(options.url, {
            method: options.method,
            headers: options.headers,
            multipart: true,
            data: reqData
          }).on('complete', function(data, response) {
            if (response.statusCode => 200 && response.statusCode < 300) {
              grunt.log.ok('Upload successful of "' + filepath + '" as "' + field + '" - ' + options.method + ' @ ' + options.url);
            } else {
              grunt.fail.warn('Failed uploading "' + filepath + '" as "' + field + '" (status code: ' + response.statusCode + ') - ' + options.method + ' @ ' + options.url);
            }
            // callback once upload is done
            done(data);
          });
        }
      });
    });
  });
};
