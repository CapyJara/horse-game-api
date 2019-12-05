module.exports = () => { 
  const getIpInfoMiddleware = (req, _, next) => {
    req.ipInfo = {
      range: [1100616832, 1100616959],
      country: 'US',
      region: 'WA',
      eu: '0',
      timezone: 'America/Los_Angeles',
      city: 'Kalama',
      ll: [46.0112, -122.8166],
      metro: 820,
      area: 20
    };
    next();
  };
  return {
    getIpInfoMiddleware
  };
};
