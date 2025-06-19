const cron = require('node-cron');

function setupCron(task) {
  cron.schedule('0 0 * * *', task, { timezone: 'Europe/London' });
}

module.exports = setupCron;
