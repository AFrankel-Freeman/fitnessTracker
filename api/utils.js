

const requireUser =((req, res, next) => {
    if (!req.user) {
      res.send({
        name: "unauthorized Error",
        message: "You must be logged in to perform this action",
        error: 'unauthorizedError'
      });
    }
    next();
}) 

module.exports = requireUser;
