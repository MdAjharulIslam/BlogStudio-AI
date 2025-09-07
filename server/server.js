import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';


const app = express();

(async () => {
  await connectDB();

  app.use(cors({
  origin: ["https://blog-studio-ai2.vercel.app"], // replace with your frontend URL
  credentials: true
}));

  app.use(express.json());

  app.get('/', (req, res) => res.send("API is working"));
  app.use('/api/admin', adminRouter);
  app.use('/api/blog',blogRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("✅ Server is running on port", PORT);
  });
})();

export default app;
