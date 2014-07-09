node-site
=========

My current default Node site template for spinning up prototypes and other awesome sites.

### Features

- Bootstrap styles with LESS
- Sequelize ORM with sqlite, mysql or postgres
- Passport Local with Sequelize backend
- Sequelize session storage
- Login, Register and Forgot Password functionality
- Mailgun integration
- Logging with Winston
- LiveReload CSS and JavaScript support
- Zero downtime support with [naught](https://github.com/andrewrk/naught)
- Production ready asset pipeline with minification and asset hashing
- Ember with ES6 module transpilation

### Configuration

Uses [node-config](https://github.com/lorenwest/node-config) for configurations.  Here are the default options:

```yaml
Site:
  domain: 'node-site.com'

Database:
  name: site-db
  user: user
  pass: pass
  server:
    dialect: sqlite
    storage: site-db.sqlite

Mail:
  domain: node-site.mailgun.org
  transport: SMTP
  server:
    service: Mailgun
    auth:
      user: postmaster@node-site.mailgun.org
      # Using quotes here because strings that lead with numbers cause dedent parsing error
      pass: "123MyPassword"
```

Most likely you will want to change these values on a per site basis.  You can do so by editing the `config/defaults.yaml` file directly or creating your own `config/local.yaml` configuration, e.g.

```yaml
Database:
  name: my-db
  user: myuser
  pass: mypass

Mail:
  domain: mydomain.com
  auth:
    user: myuser@mydomain.com
    pass: "mysmtppassword"
```

### TODO

See the [issues page](https://github.com/jgable/node-site/issues) for planned improvements.

### License

Copyright 2014 Jacob Gable, MIT License, No Attribution Required.