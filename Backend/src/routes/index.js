import express from 'express';
import userRoutes from '../routes/userRoutes.js'
const routes = express();

routes.use('/user', userRoutes)

export default routes;