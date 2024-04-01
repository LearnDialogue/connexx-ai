import 'dotenv/config';

const OPEN_API_KEY = process.env.OPEN_API_KEY;

module.exports = ({ config }) => {
  config.extra.OPEN_API_KEY = OPEN_API_KEY;
  return config;
};
