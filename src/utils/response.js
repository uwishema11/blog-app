export function successResponse(res, code, message, data = null) {
   res.status(code).json({
    success: true,
    result: { message, data },
  });
}

export function handleError(res, statusCode, message) {
   res.status(statusCode).json({
    success: false,
    message,
  });
}
