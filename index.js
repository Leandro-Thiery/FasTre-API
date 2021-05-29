const express = require('express');
const postRoutes = require('./routes/postRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome Home');
});

app.use('/api/v1/post', postRoutes);

app.use('/api/v1/hospital', hospitalRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port ${port}`));
