const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['Чашка кофе', 'Пицца', 'Банка пива', 'Печенька'],
    required: true,
  },
});

mongoose.model('Counter', CounterSchema);
