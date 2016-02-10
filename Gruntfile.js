'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist',
        server: 'server.js'
    };

    grunt.initConfig({

        appConfig: appConfig,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= appConfig.dist %>/{,*/}*',
                        '!<%= appConfig.dist %>/.git{,*/}*'
                    ]
                }]
            }
        },

        copy: {
            dist: {
                cwd: '<%= appConfig.app %>',
                src: [ '**','!styles/**/*.css','!scripts/**/*.js' ],
                dest: '<%= appConfig.dist %>',
                expand: true
            },
            fonts: {
                files:[
                    {
                        //for bootstrap fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: '<%= appConfig.dist %>'
                    }, {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= appConfig.dist %>'
                    }
                ]
            }
        },

        useminPrepare: {
            html: '<%= appConfig.app %>/index.html',
            options: {
                dest: '<%= appConfig.dist %>'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // check all js files for errors
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['<%= appConfig.app %>/scripts/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            dist: {}
        },

        // take css files and minify
        cssmin: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 10
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        '<%= appConfig.dist %>/scripts/*.js',
                        '<%= appConfig.dist %>/styles/*.css'
                    ]
                }]
            }
        },

        usemin: {
            html: ['<%= appConfig.dist %>/*.html'],
            css: ['<%= appConfig.dist %>/styles/*.css'],
            options: {
                assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/styles']
            }
        },

        // watch css and js files and process the above tasks
        watch: {
            copy: {
                files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
                tasks: [ 'build' ]
            },
            scripts: {
                files: ['<%= appConfig.app %>/scripts/**/*.js'],
                tasks:[ 'build']
            },
            styles: {
                files: ['<%= appConfig.app %>/styles/**/*.css'],
                tasks:['build']
            }

        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: '<%= appConfig.server %>'
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('serve', [
        'build',
        'concurrent'
    ]);

    grunt.registerTask('default', ['build']);

};
