/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const errorHelper = () => {
    res.json({
      name: error.name || 'InternalServerError',
      status: error.status || 500,
      message: error.message || 'Internal server error'
    });
  };

  // Conditions
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return errorHelper();
  }
};

module.exports = errorHandler;
