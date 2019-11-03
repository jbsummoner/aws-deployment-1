const { server, app } = require('./server');

async function main() {
  const port = app.get('port');
  const webAddress = app.get('webAddress');
  await server.listen(port, webAddress, () => {
    console.log(
      `[EXPRESS]: Server running at: ${server.address().address}:${server.address().port}`
    );
  });
}

main();
