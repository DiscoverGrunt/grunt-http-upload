# grunt-http-upload [![NPM version](https://badge.fury.io/js/grunt-http-upload.png)](http://badge.fury.io/js/grunt-http-upload)

> Upload files through POST/PUT HTTP request, using [Restler](https://github.com/danwrong/restler), the only Node library known to work flawlessly with multipart file uploads.
So now you can push a zip `/dist` through your CMS' API!

## Need Help?
If you wonder how to install or use this plugin, or even Grunt itself, you should check out our ["Discover Grunt" book](http://www.discovergrunt.com).

It starts at the very beginning (including how to properly set-up your command-line on Windows and Mac OS X), and goes beyond the official [Getting Started](http://gruntjs.com/getting-started) guide.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-http-upload --save-dev
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
        headers: {
          'Authorization': 'Token <%= your_token_here %>'
        },
        data: {
          someKey: 'some value'
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

#### options.data
Type: `Object`
Default value: `{}`

Any form data fields to be sent in addition to the file upload

#### options.headers
Type: `Object`
DefaultValue: `{}`

Headers to send along with your HTTP request. For example, a lot of API require the Authentication to be sent through the Headers.

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

```js
grunt.initConfig({
  http_upload: {
    basecamp: {
      options: {
        url: 'https://user:pwd@basecamp.com/99999999/api/v1/attachments.json',
        method: 'POST'
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
Also, it is not possible to add additional payload (no custom data).

## Release History
- 0.1.4/0.1.5 - 2014-05-25: Upload success on all 2XX codes (PR from [Shane Smith](http://github.com/shanesmith)) + Fix.
- 0.1.3 - 2014-05-14: Added a headers option to send HTTP headers (PR from [Andrey Okonetchnikov](http://github.com/okonet)).
- 0.1.2 - 2014-04-03: Updated Restler to latest (3.2.0) version.
- 0.1.1 - 2014-04-03: Added a data option to pass other form data in addition to the uploaded file (PR from [Micah Condon](http://github.com/mcondon)).
- 0.1.0 - 2013-10-30: Initial release. Supports only 1 multipart file upload.
