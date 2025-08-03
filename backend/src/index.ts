import app from './app';
import { connectDB } from './db';

const PORT = process.env.PORT ;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error)=>{
  console.log(error)
})
