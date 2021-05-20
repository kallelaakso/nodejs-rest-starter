const schema = {
  cors: {
    allowedOrigins: {
      default: '',
      doc: "List of allowed origins",
      format: Array,
    },
    enabled: {
      default: true,
      doc: "Enable CORS",
      env: "ENABLE_CORS",
      format: Boolean,
    },
  },
  db: {
    host: {
      default: 'localhost',
      doc: "Database host name/IP",
      env: "PG_HOST",
      format: '*',
    },
    name: {
      default: 'local',
      doc: "Database name",
      env: "PG_DATABASE",
      format: String,
    },
    port: {
      default: 5432,
      doc: "Database port",
      env: "PG_PORT",
      format: Number,
    },
    password: {
      default: '',
      doc: "Database password",
      env: "PG_PASSWORD",
      format: String,
    },
    sync: {
      default: false,
      doc: "Use SSL in database connection",
      env: "PG_SSL",
      format: Boolean,
    },
    sync: {
      default: false,
      doc: "Run migration scripts automatically",
      env: "PG_SYNC",
      format: Boolean,
    },
    username: {
      default: 'local',
      doc: "Database username",
      env: "PG_USERNAME",
      format: String,
    }
  },
  env: {
    default: "development",
    doc: "The application environment",
    env: "NODE_ENV",
    format: ["production", "development", "test"],
  },
  forceSSL: {
    default: false,
    doc: "Force SSL or not",
    format: Boolean,
  }
};

module.exports = schema;