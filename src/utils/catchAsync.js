export default (fn) => (req, res, _next) => {
  fn(req, res, _next).catch(_next);
};
