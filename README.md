# grunt-http-upload [![NPM version](https://badge.fury.io/js/grunt-http-upload.png)](http://badge.fury.io/js/grunt-http-upload)

> Upload files through POST/PUT HTTP request, using [Restler](https://github.com/danwrong/restler), the only Node library known to work flawlessly with multipart file uploads.
So now you can push a zip `/dist` through your CMS' API!

## Getting Started
This plugin requires Grunt `>=0.4.0` (and is ready for Grunt 1.0).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt grunt-http-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-http-upload');
```

## The "http_upload" task

### Overview
In your project's Gruntfile, add a section named `http_upload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  http_upload: {
    your_target: {
      options: {
        url: 'http://example.com/template/123/?token=<%= config.apiKey %>',
        method: 'PUT',
        rejectUnauthorized: false,
        headers: {
          'Authorization': 'Token <%= your_token_here %>'
        },
        data: {
          someKey: 'some value'
        },
        onComplete: function(data) {
            console.log('Response: ' + data);
        }
      },
      src: '<%= yeoman.dist %>/dist.zip',
      dest: 'myField'
    },
  },

})
```

### Options

#### options.url
Type: `String`
Default value: `''`

This is the full URL to which you can upload a file.
You can append some variables, like an API token.

#### options.method
Type: `String`
Default value: `'POST'`

The HTTP method to use to upload the file.
Look in the API documentation you want to use, this is usually POST or PUT.

#### options.rejectUnauthorized
Type: `Boolean`
Default value: `true`

Verify the server certificate and will fail if it is not valid.
Set to false if you need to bypass the SSL verification.

#### options.data
Type: `Object`
Default value: `{}`

Any form data fields to be sent in addition to the file upload

#### options.headers
Type: `Object`
DefaultValue: `{}`

Headers to send along with your HTTP request. For example, a lot of API require the Authentication to be sent through the Headers.

#### options.onComplete
Type: `Function`
DefaultValue: `function(data) {}`

Callback used to process server's response. For example, when server returns id of uploaded file you need to process afterwards.

#### src
Type: `String`
Default value: `''`

The local path of the file you wish to upload, using the current working directory as a reference.
You can upload only 1 file at a time.

#### dest
Type: `String`
Default value: `''`

The field name of the file to be uploaded, on the API side.

### Usage Examples

#### Default Options
In this example, the default POST method is used to upload the local picture `./images/status.jpg` to Basecamp. Their API can be accessed through the URL `https://basecamp.com` (using Basic Auth). When creating an attachment in Basecamp, the "dest" field name is not important, so you can set it to anything (`img` in this case).
`method` is set to "POST", but could have been omitted as this is the default value.
The `onComplete` method is then used to display API's response.

```js
grunt.initConfig({
  http_upload: {
    basecamp: {
      options: {
        url: 'https://user:pwd@basecamp.com/99999999/api/v1/attachments.json',
        method: 'POST',
        onComplete: function(data) {
            console.log('Response: ' + data);
        }
      },
      src: 'images/status.jpg',
      dest: 'img'
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

You should fork this repo, and issue a Pull Request with your proposed changes.

### Roadmap ideas
For now the upload is limited to 1 file per target. This could change if I find a scenario needing it.

## Release History
- 0.3.0 - 2016-10-18: Use [Request](https://github.com/request/request) instead of [Restler](https://github.com/danwrong/restler), which throws some [deprecation warning](https://github.com/DiscoverGrunt/grunt-http-upload/issues/12) on Node >= 6.0.0, and its project page seems dead. Request seems a pretty good alternative anyway.
- 0.2.0 - 2016-03-01: Straight bump to 0.2.0 with updated Restler (3.4.0) dependency and Grunt 1.0 compatibility. Yo.
- 0.1.8 - 2015-01-12: Happy New Year! Now gives more information on unknown error (like when there's no connectivity), rather than `null` (PR from [Marcus](https://github.com/marcusds)).
- 0.1.7 - 2014-12-30: Add onComplete as an optional callback function used to process server's response (PR from [Remigiusz Jackowski](https://github.com/remiq)).
- 0.1.6 - 2014-10-13: Add rejectUnauthorized option to bypass SSL certificate verification (PR from [GODDET](https://github.com/GODDET)).
- 0.1.4/0.1.5 - 2014-05-25: Upload success on all 2XX codes (PR from [Shane Smith](http://github.com/shanesmith)) + Fix.
- 0.1.3 - 2014-05-14: Added a headers option to send HTTP headers (PR from [Andrey Okonetchnikov](http://github.com/okonet)).
- 0.1.2 - 2014-04-03: Updated Restler to latest (3.2.0) version.
- 0.1.1 - 2014-04-03: Added a data option to pass other form data in addition to the uploaded file (PR from [Micah Condon](http://github.com/mcondon)).
- 0.1.0 - 2013-10-30: Initial release. Supports only 1 multipart file upload.
