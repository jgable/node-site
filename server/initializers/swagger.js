
var _ = require('lodash'),
    swagger = require('swagger-framework'),
    swaggerize = require('swaggerize'),
    config = require('config'),
    db = require('../models/db');

var initializer = {
    name: 'swagger',
    after: 'routes',

    configure: function (app) {
        var models = swaggerize(db.instance);

        var apiVersion = '1.0.0';
        var framework = swagger.Framework({
            apiVersion: apiVersion,
            basePath: 'http://' + config.Site.domain + '/api',
            info: {
                title: 'Node-Site',
                description: 'This is a sample server. You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.',
                termsOfServiceUrl: 'http://' + config.Site.domain + '/terms',
                // contact: 'api@' + config.Site.domain,
                license: 'MIT'
            },
            authorizations: {
                'tokenHeader': {
                    type: 'apiKey',
                    passAs: 'header',
                    keyname: 'x-token'
                }
            }
        });

        var loginApi = framework.api({
            apiVersion: apiVersion,
            path: '/login',
            description: 'Authenticate a user',
            consumes: ['application/json'],
            produces: ['application/json']
        });

        var loginResource = loginApi.resource({
            path: '/login',
            description: 'Authenticate a user'
        });

        loginResource.operation({
            'method': 'POST',
            'summary': 'Authenticate a user by username and password',
            'notes': 'Returns user information if successfully authenticated',
            'type': 'Authentication',
            'nickname': 'login',
            'consumes': ['application/json'],
            'produces': ['application/json'],
            'parameters': [{
                'name': 'username',
                'description': 'Username of the user to authenticate',
                'required': true,
                'type': 'string',
                'paramType': 'form'
            }, {
                'name': 'password',
                'description': 'Password of the user to authenticate',
                'required': true,
                'type': 'string',
                'paramType': 'form'
            }],
            'responseMessages': [{
                'code': 400,
                'message': 'Invalid Username supplied'
            }]
        });

        var validateResource = loginApi.resource({
            path: '/login/validate',
            description: 'Validate a user token'
        });
        validateResource.operation({
            'method': 'GET',
            'summary': 'Validate a user by token',
            'notes': 'Returns user information if token is valid',
            'type': 'LoginValidation',
            'nickname': 'validate',
            'produces': ['application/json'],
            'authorizations': {
                'tokenHeader': []
            },
            'parameters': [],
            'responseMessages': [{
                'code': 401,
                'message': 'Invalid token supplied'
            }]
        });
        
        // Specify the response for the /api/login request
        loginApi.model({
            id: 'Authentication',
            properties: {
                success: {
                    type: 'bool'
                },
                message: {
                    type: 'string'
                },
                user: {
                    type: 'User'
                }
            }
        });
        // Specify the response for the /api/login/validate request
        loginApi.model({
            id: 'LoginValidation',
            properties: {
                success: {
                    type: 'bool'
                },
                timestamp: {
                    type: 'integer'
                },
                user: {
                    type: 'User'
                }
            }
        });
        // Specify the comment user response structure
        loginApi.model({
            id: 'User',
            properties: _.pick(models.User.properties, 'id', 'username', 'token', 'createdAt', 'updatedAt')
        });

        // Serve the JSON representation of the docs
        app.use('/api/api-docs', framework.docs.dispatcher());

        // Serve the swagger-ui api explorer
        app.get('/api-docs', function (req, res) {
            res.render('api-docs', {
                layout: 'swagger',
                serverInfo: JSON.stringify({
                    url: 'http://' + config.Site.domain + '/api/api-docs'
                })
            });
        });
    }
};

module.exports = initializer;