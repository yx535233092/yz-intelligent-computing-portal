module.exports = {
  apps: [
    {
      name: 'h3c-portal',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
