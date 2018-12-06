import chokidar from 'chokidar';
import { configLogger } from '../core/utils/loggers';

module.exports = function useServerWatcher(path) {
  const watcher = chokidar.watch(path);

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        if (id.includes(path)) {
          configLogger.info(`Clearing ${id} module cache`);
          delete require.cache[id];
        }
      });
    });
  });
};
