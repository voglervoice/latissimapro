module.exports = function(grunt){
    // Auto load
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			production: {
				options: {
					cleancss: true
				},
				files: {
					"web/assets/css/main.css": "dev/assets/less/main.less",
					"dev/assets/css/main.css": "dev/assets/less/main.less"
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "dev/assets/js",
					mainConfigFile: "dev/assets/js/main.js",
					out: "web/assets/js/main.js"
				}
			}
		},
		copy: {
			images: {
				cwd: 'dev/assets/imgs/',
				src: "**",
				dest: "web/assets/imgs/",
				expand: true
			},
			data: {
				cwd: 'dev/assets/datas/',
				src: "**",
				dest: "web/assets/datas/",
				expand: true
			},
			fonts: {
				cwd: 'dev/assets/fonts/',
				src: "**",
				dest: "web/assets/fonts/",
				expand: true
			},
			vendorsjs: {
				files: [{
					src: "dev/assets/js/vendors/require.min.js",
					dest: "web/assets/js/vendors/require.min.js"
				}, {
					src: "dev/assets/js/vendors/jquery-1.10.2.min.map",
					dest: "web/assets/js/vendors/jquery-1.10.2.min.map"
				}]
			},
			js: {
				cwd: 'dev/assets/js/',
				src: "**",
				dest: "web/assets/js/",
				expand: true
			},
			html: {
				files: [{
					src: "dev/index.php",
					dest: "web/index.php"
				}, {
					src: "dev/.htaccess",
					dest: "web/.htaccess"
				}]
			}
		},
		minjson: {
			compile: {
				files: {
					//'web/assets/datas/locales.json': 'dev/assets/datas/locales.json'
				}
			}
		},
		clean: {
			options: {
				force: true
			},
			web: [
				"web/*"
			]
		},
		watch: {
			less: {
				files: "dev/assets/less/*",
				tasks: "less",
				options: {
					event: ['all']
				}
			},
			js: {
				files: "dev/assets/js/**",
				tasks: "copy:js",
				options: {
					event: ['all']
				}
			},
			images: {
				files: "dev/assets/imgs/*",
				tasks: "copy:images",
				options: {
					event: ['all']
				}
			},
			fonts: {
				files: "dev/assets/fonts/*",
				tasks: "copy:fonts",
				options: {
					event: ['all']
				}
			},
			data: {
				files: "dev/assets/datas/*",
				tasks: "copy:data",
				options: {
					event: ['all']
				}
			},
			html: {
				files: [
					"dev/index.php",
					"dev/.htaccess"
				],
				tasks: ["copy:html"],
				options: {
					event: ['all']
				}
			}
		}
	});

	// Dev
	grunt.registerTask('dev', [
		"clean",
		"copy:images",
		"copy:fonts",
		"copy:data",
		"copy:js",
		"copy:html",
		"less",
		"watch"
	]);

	// Web
	grunt.registerTask('web', [
		"clean",
		"copy:images",
		"copy:fonts",
		"minjson",
		"copy:vendorsjs",
		"copy:html",
		"less",
		"requirejs"
	]);
};