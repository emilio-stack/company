const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Company API',
    description: 'A REST API for a company',
  },
  host: '',
  schemes: ['https', 'http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
