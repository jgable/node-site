module.exports = {
	swagger: {
		files: {
			'build/css/swagger-reset.css': [
				'client/swagger/less/reset.less'
			],
			'build/css/swagger.css': [
				'client/swagger/less/screen.less'
			]
		}
	},
	all: {
		files: [{
			expand: true,
			cwd: 'client/less',
			src: '*.less',
			dest: 'build/css/',
			ext: '.css'
		}]
	}
};