const prefix = '[ERR]';

module.exports = function (err, req, res, next) {
  console.error(prefix, err.stack)
  res.status(500).send('Error! ' + err.message);
};