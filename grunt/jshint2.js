
module.exports = {
	server: {
		options: {
			jshintrc: '.jshintrc'
		},
		src: 'server/**/*.js'
	},
	client: {
		options: {
			jshintrc: 'client/.jshintrc'
		},
		src: ['client/**/*.js', '!client/components/**/*.js']
	}
};