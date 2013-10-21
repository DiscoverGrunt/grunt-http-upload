# grunt-http-upload

> Upload files through POST/PUT HTTP request

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
        url: 'http://<%= config.serverUrl %>/templates/?token=<%= config.apiKey %>',
        method: 'PUT'
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

A string value that is used to do something with whatever.

#### options.method
Type: `String`
Default value: `'POST'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  http_upload: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  http_upload: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - 2013-10-22: Initial release. Supports only multipart file uploads.
