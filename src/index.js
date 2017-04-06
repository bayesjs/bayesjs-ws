const fs = require('fs');
const path = require('path');
const { infer } = require('bayesjs');
const { json, send } = require('micro');

const htmlContent = fs
  .readFileSync(path.join(__dirname, 'index.html'))
  .toString();

module.exports = async (req, res) => {
  if (req.url !== '/') {
    return send(res, 404);
  }

  switch (req.method.toUpperCase()) {
    case 'GET': {
      return htmlContent;
    }
    case 'POST': {
      const payload = await json(req);
      return infer(payload.network, payload.nodes, payload.given);
    }
    default: {
      return send(res, 405);
    }
  }
};
