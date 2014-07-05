module.exports = {
	swagger: {
		files: {
			'.grunt/build/css/swagger-reset.css': [
				'client/swagger/less/reset.less'
			],
			'.grunt/build/css/swagger.css': [
				'client/swagger/less/screen.less'
			]
		}
	},
	all: {
		files: [{
			expand: true,
			cwd: 'client/less',
			src: '*.less',
			dest: '.grunt/build/css/',
			ext: '.css'
		}]
	}
};