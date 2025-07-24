const sendSuccessResponse = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });

const sendErrorResponse = (res, message, status = 500) =>
  res.status(status).json({ success: false, data: message });

module.exports = { sendSuccessResponse, sendErrorResponse };
