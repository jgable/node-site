module.exports = {
	scripts: {
		files: [{
			'build/js/jquery.min.map': 'client/components/jquery/dist/jquery.min.map'
		}, {
			expand: true,
			cwd: 'client/js',
			src: '*.js',
			dest: 'build/js/',
		}]
	},
	images: {
		files: [{
			expand: true,
			cwd: 'client/img',
			src: '*',
			dest: 'build/img/',
		}]
	}
};