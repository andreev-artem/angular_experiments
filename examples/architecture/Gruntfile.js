module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            html2js: {
                files: 'app/js/lib/ui/templates/**/*.html',
                tasks: 'html2js:widgets'
            },
            index: {
                files: ['app/js/**/*.js', 'app/index.html.tmpl'],
                tasks: 'index:dev'
            },
            less: {
                files: ['app/less/**/*.less'],
                tasks: 'less:dev'
            }
        },

        html2js: {
            widgets : [ 'app/js/lib/ui/templates/**/*.html' ]
        },

        index: {
            dev: [ 'app/js/**/*.js'],
            prod: []
        },

        concat: {
            dev: {},
            prod: {
                src: ['app/js/**/*.js'],
                dest: 'app/build.js'
            }
        },
        
        uglify: {
            options: {
                mangle: false
            },
            dev: {},
            prod: {
                files: {
                    'app/build.min.js': ['app/build.js']
                }
            }
        },

        clean: {
            dev: [],            
            prod: ['app/build.js']
        },

        less: {
            options: {
                paths: ['app/less']
            },
            dev: {
                files: {
                    'app/css/app.css': ['app/less/app.less']
                }
            },
            prod: {
                files: {
                    'app/css/app.css': ['app/less/app.less']
                }
            }
        },

        karma: {
            once: {
                options: {
                    keepalive: true,
                    configFile: 'config/karma.conf.js',
                    autoWatch: false,
                    singleRun: true
                }
            },
            keep: {
                options: {
                    keepalive: true,
                    configFile: 'config/karma.conf.js',
                    autoWatch: true,
                    singleRun: false
                }
            }
        }
    });

    var TPL = 'angular.module("<%=file%>", []).run(function($templateCache) {\n'
            + '  $templateCache.put("<%=file%>",\n    "<%=content%>");\n'
            + '});\n';

    var escapeContent = function(content) {
        return content.replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
    };

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');


    grunt.registerMultiTask('html2js', 'Generate js version of html templates for widgets.',
            function() {
                var files = grunt._watch_changed_files || grunt.file.expand(this.data);

                files.forEach(function(file) {
                    grunt.file.write(file + '.js', grunt.template.process(TPL, {
                        data: {
                            file : file.replace(/^app\//,''),
                            content : escapeContent(grunt.file.read(file))
                            }
                        }));
                });
            });

    grunt.registerMultiTask('index', 'Create index.html',
            function() {
                var files = grunt.file.expand(this.data);
                var now = new Date().getTime();
                var scripts_str = '', styles_str = '';
                var tpl = grunt.file.read('app/index.html.tmpl');

                if(this.target == 'dev') {

                    files.forEach(function(file) {
                        file = file.replace(/^app\//, '');
                        scripts_str += '<script src="' + file + '?bust=' + now + '"></script>' + "\n";
                    });
                }
                else if(this.target == 'prod') {
                    scripts_str = '<script src="build.min.js?bust=' + now + '"></script>' + "\n";
                }

                grunt.file.write('app/index.html', grunt.template.process(tpl, {
                    data: {
                        scripts: scripts_str,
                        app_module: 'app'
                    }
                }));
                console.log('File "index.html" created.');

                scripts_str += '<script src="//code.angularjs.org/1.1.5/angular-mocks.js"></script>';


                grunt.file.write('app/index_mock.html', grunt.template.process(tpl, {
                    data: {
                        scripts: scripts_str,
                        app_module: 'app-mocked'
                    }
                }));
                console.log('File "index_mock.html" created.');
            });

    grunt.registerTask('default', ['html2js:widgets', 'concat:dev', 'index:dev', 'uglify:dev', 'less:dev']);
    
    grunt.registerTask('staging', ['html2js:widgets', 'concat:prod', 'index:prod',
                                   'uglify:prod', 'less:prod']);
    
    grunt.registerTask('prod', ['html2js:widgets', 'concat:prod', 'index:prod',
                                'uglify:prod', 'less:prod']);
};
