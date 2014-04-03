module.exports = {
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