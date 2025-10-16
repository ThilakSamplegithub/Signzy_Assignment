const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: [true, 'Customer ID (email) is required'],
      lowercase: true,
      trim: true,
    },
    orderdate: {
      type: Date,
      required: [true, 'Order date is required'],
    },
    value: {
      type: Number,
      required: [true, 'Order value is required'],
      min: [0, 'Order value cannot be negative'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model('Order', orderSchema);
module.exports = { User };
