module.exports = {
  apps: [
    {
      name: 'yz-portal-tianjing',
      script: 'npm',
      args: 'start',
      env_file: '.env.production',
      env: {
        NODE_ENV: 'production',
        PORT: 8002,
      },
    },
  ],
};
