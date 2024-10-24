const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rulesRouter = require('./api/rules');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/rules', rulesRouter);

mongoose.connect('mongodb://localhost:27017/rule', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
