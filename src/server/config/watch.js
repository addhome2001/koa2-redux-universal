/* eslint-disable no-console */
import chokidar from 'chokidar';

module.exports = function watch(path) {
  const watcher = chokidar.watch(path);

  watcher.on('ready', () => {
    watcher.on('all', (e, source) => {
      console.log(`${source} had been changed.`);
      Object.keys(require.cache).forEach((id) => {
        if (/entryPoint/.test(id)) delete require.cache[id];
      });
    });
  });
};
