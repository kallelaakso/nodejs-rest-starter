# Node REST API Starter with TypeScript

TypeScript NodeJS REST API starter including:
* Boilerplate for REST API with decorators
* Convict for configuration management
* PostgreSQL support
* TypeORM for database connection, typing & migration
* CORS & SSL support
* Docker configuration for development

This is made for my personal use. Not tested in high traffic production.

# Initial setup

```
npm install
npm run swagger
```

# Development
```
npm run dev
```

# Build
```
npm run build
```

## Docker build and run
```
npm run build
docker-compose up -d
```

## Credits

Modified and extended from vrudikov's awesome boilerplate: https://github.com/vrudikov/typescript-rest-boilerplate