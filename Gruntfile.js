module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/nextprot/src/nextprot.js'],
        dest: 'demo/dependencies.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: true,
          base: '.'
        }
      }
    },
    watch: {
      all: {
        options: {livereload: true},
        files: ['*.js']
      },
      handlebars: {
        files: 'templates/*.tmpl',
        tasks: ['handlebars:compile']
      }
    },
    handlebars: {
      compile: {
        src: 'templates/*.tmpl',
        dest: 'dist/compiled-templates.js',
        options: {
          namespace: "HBtemplates"
        }
      }
    }
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('concating', ['concat']);
  grunt.registerTask('hbs', ['handlebars:compile']);
  grunt.registerTask('serve', ['connect:server','watch']);

};
