var s3 = require('config').Assets.s3;

module.exports = {
    options: {
        key: s3.key,
        secret: s3.secret,
        bucket: s3.bucket,
        access: 'public-read',
        headers: {
            // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
            'Cache-Control': 'max-age=630720000, public',
            'Expires': new Date(Date.now() + 63072000000).toUTCString()
        }
    },
    prod: {
        sync: [{
            src: 'build/**/*.{js,css,png,gif,jpg,jpeg}',
            rel: 'build',
            dest: 'build/'
        }]
    },
    prodgz: {
        sync: [{
            src: 'build/**/*.{js,css,png,gif,jpg,jpeg}',
            rel: 'build',
            dest: 'buildgz/',
            options: {
                gzip: true
            }
        }]
    }
};
