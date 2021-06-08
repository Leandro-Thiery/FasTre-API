const express = require('express');
const postRoutes = require('./routes/postRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is FasTre\'s API home route');
});

app.use('/api/v1/posts', postRoutes);

app.use('/api/v1/hospitals', hospitalRoutes);

app.use('/api/v1/user', userRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port ${port}`));
