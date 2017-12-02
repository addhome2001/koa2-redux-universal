/* eslint-disable no-console */
import chokidar from 'chokidar';

module.exports = function watch(path) {
  const watcher = chokidar.watch(path, {
    ignored: /[\/\\]views[\/\\]/,
  });

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]server[\/\\]/.test(id)) {
          console.log(`Clearing ${id} module cache`);
          delete require.cache[id];
        }
      });
    });
  });
};
