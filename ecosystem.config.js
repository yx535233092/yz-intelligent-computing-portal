module.exports = {
  apps: [
    {
      name: 'yz-portal-h3c',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 8001,
      },
    },
  ],
};
