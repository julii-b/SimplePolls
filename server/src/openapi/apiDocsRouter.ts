import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const apiDocsRouter = Router();

// Get current directory name:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Files containing openAPI annotations (safe for both /src and /dist):
const apis = [
  path.join(__dirname, '../routes/**/*.js'),
  path.join(__dirname, '../routes/**/*.ts'),
  path.join(__dirname, '*.ts'),
  path.join(__dirname, '*.js'),
];

// Swagger configuration to generate specification:
const openapiSpecification = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SimplePolls API',
      version: '1.0.0',
    },
  },
  apis: apis,
});

// Serve Swagger files and render Swagger UI page:
apiDocsRouter.use('/', swaggerUi.serve);
apiDocsRouter.get('/', swaggerUi.setup(openapiSpecification));

export default apiDocsRouter;
