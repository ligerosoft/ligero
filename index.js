const styles = require.context(
  './src',
  true,
  /^\.\/[^_][\w-]+\/style\/index\.tsx?$/,
);

styles.keys().forEach(key => {
  let style = styles(key);
  if (style && style.default) {
    style = style.default;
  }

  const { match } = key.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
  if (match && match[1]) {
    exports[pascalCase(match[1])] = style;
  }
});

function pascalCase(name) {
  return (
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase())
  );
}

module.exports = require('./src');
