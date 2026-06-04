export const successResponse = (
  res: any,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: any,
  statusCode: number,
  message: string,
  errors: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};