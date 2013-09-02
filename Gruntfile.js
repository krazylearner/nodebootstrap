module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var defaultConfig = {
    views     : 'views',
    viewssrc  : "views-src",
    pub       : 'public'
  };

  grunt.initConfig({
    config: defaultConfig,

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.pub %>/js/vendorscripts.min.js'
          ]
        }]
      },
      server: '.tmp'
    },

    jshint: {
      files: [
        'Gruntfile.js',
        '<%= config.pub %>/js/**/*.js'
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

//    uglify: {
//      my_target: {
//        files: {
//          '<%= config.pub %>/js/appscripts.min.js': [
//            '<%= config.pub %>/js/**/*.js',
//            '!<%= config.pub %>/js/appscripts.min.js'
//          ]
//        }
//      }
//    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          '<%= config.pub %>/js/**/*.js',
          '<%= config.pub %>/js/*.js',
          '!<%= config.pub %>/js/vendorscripts.min.js'
        ],
        dest: '<%= config.pub %>/js/vendorscripts.min.js'
      }
    },

    useminPrepare: {
      html: '<%= config.viewssrc %>/layout.handlebars',
      options: {
        dest: '<%= config.pub %>'
      }
    },

    usemin: {
      html: ['<%= config.views %>/{,*/}*.handlebars'],
      css: ['<%= config.pub %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= config.views %>']
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= config.pub %>/css/minified.css': [
            '<%= config.pub %>/css/{,*/}*.css',
            '<%= config.pub %>/bower_components/bootstrap/dist/css/bootstrap.min.css',
            '!<%= config.pub %>/css/minified.css'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.viewssrc %>',
          dest: '<%= config.views %>',
          src: [
            '**/*.handlebars'
          ]
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    //'test',
    'copy',
    'useminPrepare',
    'cssmin',
    //'uglify',
    'concat',
    'usemin'
  ]);

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['build']);
};