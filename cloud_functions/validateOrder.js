function evaluateOrder(order) {
  if (!order || !order.medicine) {
    return { approved: false, reason: "Invalid order data" };
  }

  if (order.medicine.prescription_required && !order.prescription_provided) {
    return { approved: false, reason: "Prescription required" };
  }

  if (order.medicine.stock_quantity < order.quantity) {
    return { approved: false, reason: "Insufficient stock" };
  }

  return { approved: true, reason: "Order is safe to proceed" };
}

// Google Cloud Function wrapper
exports.validateOrder = (req, res) => {
  try {
    const decision = evaluateOrder(req.body);
    res.status(200).json(decision);
  } catch (error) {
    res.status(400).json({
      approved: false,
      reason: "Malformed request"
    });
  }
};

