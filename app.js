//Milestone 2
//Nibha Maharjan & Saurav Gautam
// Usecases Used : Add patient, search all patient, search one patient
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://api.3gpydlh.mongodb.net/', {
    dbName: 'RestAPI',
    user: 'nibha',
    pass: '8wYhpGFF3QKP5ofT',
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB is connected ');
  });

app.all('/test/:id', (req, res) => {
  // console.log(req.query);
  // console.log(req.query.name);
  // res.send(req.query);
  console.log(req.params);
  res.send(req.params);
});

//Getting Patient.route
const PatientRoute = require('./Routes/Patient.route');
app.use('/patient', PatientRoute);

//404 Error
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
