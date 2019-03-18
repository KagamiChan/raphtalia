module.exports = {
  apps: [
    {
      name: 'app',
      script: 'src/index.ts',
      instances: 1,
      autorestart: true,
      watch: true,
    },
  ],
}
