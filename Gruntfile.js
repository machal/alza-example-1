// Viz adresar `grunt/`, kde jsou konfigurace jednotlivych uloh

'use strict';


module.exports = function(grunt) {

  // Nacteme konfigurak
  var options = {
    pkg: grunt.file.readJSON('package.json')
  };

  // Nacteme vsechny grunt tasky a urychlime srandu
  require("jit-grunt")(grunt);

  // Merime rychlost behu uloh
  require('time-grunt')(grunt);


  grunt.initConfig({

    copy: {
      jquery_js: {
        files: [
          {
            src: 'node_modules/jquery/dist/jquery.js',
            dest: 'src/js/jquery.js'
          }
        ]
      },
      fancybox_js: {
        files: [
          {
            src: 'node_modules/fancybox/dist/js/jquery.fancybox.js',
            dest: 'src/js/jquery.fancybox.js'
          }
        ]
      },
      fancybox_img: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/fancybox/dist/img/',
            src: ['*.gif','*.png'],
            dest: 'dist/img/'
          }
        ]
      },
    },

    less: {
      default: {
        files: {
          'dist/css/index.css': 'src/less/index.less'
        },
        options: {
          sourceMap: true,
          sourceMapFilename: 'dist/css/index.css.map',
          sourceMapURL: 'index.css.map',
          sourceMapRootpath: './'
        }
      }
    },

    postcss: {
      default: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({ grid: true })
          ]
        },
        src: 'dist/css/index.css',
        dest: 'dist/css/index.css'
      }
    },

    browserSync: {
      dev: {
          bsFiles: {
              src : [
                'dist/css/*.css'
              ]
          },
          options: {
              watchTask: true,
              server: './'
          }
      }
    },

    prettier: {
      css: {
        src: ["src/less/**/*.less", "!src/less/lib/**/*"]
      },
      js: {
        src: ["Gruntfile.js", "src/js/*.js"]
      }
    },

    stylelint: {
      options: {
        syntax: "less"
      },
      src: ["src/less/**/*.less"]
    },

    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['js']
      }
    }
  });

  grunt.registerTask("css", ["less", "postcss"]);
  grunt.registerTask("default", ["copy", "css", "browserSync", "watch"]);
};
