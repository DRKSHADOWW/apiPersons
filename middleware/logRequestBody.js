module.exports = (req, res, next) => {
    if (req.method === 'POST') {
      console.log(`Request body: ${JSON.stringify(req.body)}`);
    }
    next();
  }