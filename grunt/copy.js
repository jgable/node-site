module.exports = {
	scripts: {
		files: [{
			'build/js/jquery.min.map': 'client/components/jquery/dist/jquery.min.map'
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