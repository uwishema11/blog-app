import app from './app.js';
import sequelize from './database/config/db.js';

const PORT = 3000;
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.log('Unable to connect to the database', error);
  }
};

connectToDatabase();
app.listen(PORT, () => console.log(`Server is learning on port ${PORT}`));
