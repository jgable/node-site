module.exports = {
	scripts: {
		files: [{
			'build/js/jquery.min.map': 'client/components/jquery/dist/jquery.min.map'
		}, {
			expand: true,
			cwd: 'client/js/pages',
			src: '*.js',
			dest: 'build/js/pages',
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