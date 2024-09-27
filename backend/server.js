const express = require('express');
const path = require('path');
const db = require('./database/db');
const cors= require('cors')
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({origin: 'http://localhost:5000'}));

app.use('/uploads', express.static('uploads', {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));


const routes = require('./routes/index'); 
app.use('/', routes);


let port= 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
