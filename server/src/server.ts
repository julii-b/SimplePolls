import app from './app.js';
import config from './config/config.js';
import { startDbCleanupScheduler } from './services/dbCleanupService.js';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  startDbCleanupScheduler();
});
