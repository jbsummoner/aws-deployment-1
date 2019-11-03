const sampleServiceFunc = async () => {
  const payload = 'Serviced';
  // eslint-disable-next-line no-console
  await console.log('Serviced');
  return payload;
};

module.exports = {
  sampleServiceFunc
};
