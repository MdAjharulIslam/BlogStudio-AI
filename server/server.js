import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import path from 'path';


const app = express();

const _dirname = path.resolve();

(async () => {
  await connectDB();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => res.send("API is working"));
  app.use('/api/admin', adminRouter);
  app.use('/api/blog',blogRouter);

  const PORT = process.env.PORT || 3000;



  app.use(express.static(path.join(_dirname, "/client/dist" )))
  app.get('*', (_,res)=>{
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
  })

  app.listen(PORT, () => {
    console.log("✅ Server is running on port", PORT);
  });
})();

export default app;
