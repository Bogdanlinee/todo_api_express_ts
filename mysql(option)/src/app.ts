import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import mysql from 'mysql';
// import { connect } from './db/db';

dotenv.config();

const app = express();
const port = 5000;


var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'test',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM `tasks`', (err, result, field) => {
  console.log(err);
  console.log(result);
  // console.log(result[1]['lastname']);
  // console.log(field);
});

// // app routes
// import tasksRouterV1 from './v1/routes/tasksRoutes';
// import authRouterV1 from './v1/routes/authRoutes';
// import tasksRouterV2 from './v2/routes/router';

// app.use(morgan('tiny'));
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded());

// // tasks router
// app.use('/api/v1', authRouterV1);
// app.use('/api/v1/items', tasksRouterV1);
// app.use('/api/v2/router', tasksRouterV2);
// app.all('*', async (req, res) => {
//   res.status(404).send('Can not find the page.');
// });

(async function () {
  try {
    if (process.env.MONGO_URI) {
      // await connect(process.env.MONGO_URI);
      app.listen(port, () => console.log('server is running'));
    } else {
      throw Error('No connection to database');
    }
  } catch (error) {
    console.log(error);
  }
})()