// Express app setup and route wiring.
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Store API!');
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
