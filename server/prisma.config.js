const { defineConfig } = require('@prisma/config');

module.exports = defineConfig({
  datasource: {
    provider: 'mysql',
    url: process.env.DATABASE_URL,
  },
});
