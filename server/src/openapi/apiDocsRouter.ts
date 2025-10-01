import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from '../config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const apiDocsRouter = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apis = [
  path.join(__dirname, '../routes/**/*.js'),
  path.join(__dirname, '../routes/**/*.ts'),
  path.join(__dirname, '*.ts'),
  path.join(__dirname, '*.js'),
];

const openapiSpecification = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SimplePolls API',
      version: '1.0.0',
    },
  },
  apis: apis, // files containing openAPI annotations
});

apiDocsRouter.use('/', swaggerUi.serve);
apiDocsRouter.get('/', swaggerUi.setup(openapiSpecification));

export default apiDocsRouter;
