const { userService, awsService } = require('../services');

const getEntries = async (req, res, next) => {
  let users;
  try {
    users = await userService.getAll();

    return res.json({
      users
    });
  } catch (e) {
    return next(e);
  }
};

// eslint-disable-next-line consistent-return
const postEntry = async (req, res, next) => {
  const { email, phone } = await req.body;
  const { photos } = req.files;
  const status = 1;
  const issubscribed = 2;
  let payload;

  try {
    if (photos.length > 0) {
      res.json({
        msg: 'Only one photo'
      });
      // await photos.forEach(photo => {
      //   awsService.rawUpload(photo);
      //   awsService.postUpload(photo);
      // });
    } else {
      const { location: s3rawurl, filename } = await awsService.rawUpload(photos);

      const { location: s3finishedurl } = await awsService.postUpload(photos);
      const user = await {
        email,
        phone,
        filename,
        s3rawurl,
        s3finishedurl,
        status,
        issubscribed
      };

      payload = await userService.create(user);

      return res.json({
        ...payload
      });
    }
  } catch (e) {
    return next(e);
  }
};

const reset = async (req, res, next) => {
  try {
    const keys = await awsService.clearS3Buckets();
    const users = await userService.clear();

    return res.json({
      msg: 'App reset',
      users,
      keys
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getEntries,
  postEntry,
  reset
};
