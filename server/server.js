import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./config/db.js";
import adminRoute from './routes/adminRoute.js';
import blogRoutes from './routes/blogRoutes.js';
 // Ensure the path to your db.js is correct

const app=express();

await connectDB(); // Ensure the database connection is established before starting the server

// Middleware
app.use(cors());
app.use(express.json());


// route
app.get('/', (req, res) => {
  res.send('APi is running....');
});

app.use('/api/admin',adminRoute);
app.use('/api/blogs',blogRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



export default app;