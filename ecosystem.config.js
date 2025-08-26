module.exports = {
  apps: [
    {
      name: 'yz-portal',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
