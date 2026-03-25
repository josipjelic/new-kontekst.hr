/**
 * Express error-handling middleware (must be registered last).
 * @param {Error & { status?: number; statusCode?: number }} err
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }
  const status = err.statusCode ?? err.status ?? 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
}
