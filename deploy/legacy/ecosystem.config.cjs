module.exports = {
  apps: ["backend", "frontend"].map(service => ({
    name: `vgg-${service}`, cwd: `./${service}`, script: "npm", args: "run start",
    env: { NODE_ENV: "production" }, instances: 1, autorestart: true,
    watch: false, max_memory_restart: "1G",
  })),
};
