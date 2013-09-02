var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
    };

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var defaultConfig = {
    views     : 'views',
    viewssrc  : "views-src",
    pub       : 'public',
    dist      : 'public/dist'
  };

  grunt.initConfig({
    config: defaultConfig,
    watch: {
      livereload: {
        files: [
          //'<%= config.views %>/{,*/}*.handlebars',
          '{<%= config.pub %>}/css/**/*.*',
          '{<%= config.pub %>}/css/*.*',
          '{<%= config.pub %>}/js/**/*.*',
          '{<%= config.pub %>}/js/*.*',
          '<%= config.pub %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, configconfig.pub)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    jshint: {
      files: [
        'Gruntfile.js',
        '<%= config.pub %>/js/{,*/}*.js',
        '<%= config.pub %>/js/**/**/*.js'
      ],

      excludes: [],

      directives: {
        predef: [
          'jQuery',
          'module',
          'angular',
          'define',
          'require'
        ]
      },

      options: {
        strict: false,
        indent: 2
      }
    },

//    requirejs: {
//      compile: {
//        options: {
//          baseUrl: "dist/scripts",
//          name: "main",
//          mainConfigFile: "dist/js/require.config.js",
//          out: "dist/js/main.js"
//        }
//      }
//    },

    useminPrepare: {
      html: '<%= config.viewssrc %>/layout.handlebars',
      options: {
        dest: '<%= config.pub %>'
      }
    },

    usemin: {
      html: ['<%= config.views %>/{,*/}*.handlebars'],
      css: ['<%= config.pub %>/css/{,*/}*.css'],
      //basedir: '<%= config.views %>',
      options: {
        dirs: ['<%= config.views %>']
      }
    },


//    imagemin: {
//      dist: {
//        files: [{
//          expand: true,
//          cwd: '<%= config.pub %>/images',
//          src: '{,*/}*.{png,jpg,jpeg}',
//          dest: '<%= config.dist %>/images'
//        }]
//      }
//    },
//
    cssmin: {
      dist: {
        files: {
          '<%= config.pub %>/css/compiled.css': [
            '<%= config.pub %>/css/{,*/}*.css'
          ]
        }
      }
    },

//    htmlmin: {
//      dist: {
//        options: {
//          /*removeCommentsFromCDATA: true,
//           // https://github.com/config/grunt-usemin/issues/44
//           //collapseWhitespace: true,
//           collapseBooleanAttributes: true,
//           removeAttributeQuotes: true,
//           removeRedundantAttributes: true,
//           useShortDoctype: true,
//           removeEmptyAttributes: true,
//           removeOptionalTags: true*/
//        },
//        files: [{
//          expand: true,
//          cwd: '<%= config.pub %>',
//          src: ['*.html', 'views/*.handlebars'],
//          dest: '<%= config.dist %>'
//        }]
//      }
//    },

    cdnify: {
      dist: {
        html: ['<%= config.dist %>/*.html']
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/scripts',
          src: ['*.js', '{,*/}*.js'],
          dest: '<%= config.dist %>/scripts'
        }]
      },
      controllers: {
        expand: true,
        cwd: '<%= config.dist %>/scripts',
        src: ['**/**/controller.js'],
        dest: '<%= config.dist %>/scripts'
      },
      directives: {
        expand: true,
        cwd: '<%= config.dist %>/scripts',
        src: ['**/**/directive.js'],
        dest: '<%= config.dist %>/scripts'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/js/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= config.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.pub %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'images/{,*/}*.{gif,webp}',
            'scripts/{,*/}*.js',
            'scripts/**/**/*.*'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    //'test',
    'useminPrepare',
    //'imagemin',
    'cssmin',
    //'htmlmin',
    //'copy',
    //'ngmin',
    //'requirejs',
    //'cdnify',
    //'rev',
    'usemin'
  ]);

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['build']);
};