

const requireUser =((req, res, next) => {
    if (!req.user) {
      res.send({
        name: "unauthorized Error",
        message: "You must be logged in to perform this action",
        error: 'unauthorizedError'
      });
      return;
    }
    next();
}) 

module.exports = requireUser;
