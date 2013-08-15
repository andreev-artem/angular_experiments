module.exports = function(grunt) {

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            once: {
                options: {
                    keepalive: true,
                    configFile: 'karma.conf.js',
                    autoWatch: false,
                    singleRun: true
                }                
            },
            keep: {
                options: {
                    keepalive: true,
                    configFile: 'karma.conf.js',
                    autoWatch: true,
                    singleRun: false
                }                
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-karma');
};
