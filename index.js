const express = require('express');
const connectdb = require('./db/db');
connectdb();
const app =express();
const cors = require('cors');
app.use(cors())

  //routes
  app.use('/cred',require('./routes/cred'))
  app.use('/group',require('./routes/group'))
  app.use('/message',require('./routes/message'))
  app.use('/use',require('./routes/uses'))

app.listen(80,()=>{
    console.log('server running in http://127.0.0.1:80');
})