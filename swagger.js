const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Calendar',
    description: 'My calendar api',
  },
  host: 'localhost:3000',
//   host: 'wk2-project.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);