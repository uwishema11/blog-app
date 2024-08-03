export function successResponse(res, code, message, data = null) {
  return res.status(code).json({
    success: true,
    result: { message, data },
  });
}

export function handleError(res, statusCode, message) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
