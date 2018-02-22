import chokidar from 'chokidar';
import { configLogger } from '../utils/loggers';

module.exports = function watch(path) {
  const watcher = chokidar.watch(path, {
    ignored: /[\/\\]views[\/\\]/,
  });

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]server[\/\\]/.test(id)) {
          configLogger.info(`Clearing ${id} module cache`);
          delete require.cache[id];
        }
      });
    });
  });
};
