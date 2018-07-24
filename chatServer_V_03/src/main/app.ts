import  express from 'express'

import * as routes from '../routes/index';

const app = express();
app.use('/user', routes.UserRoute);
app.use('/group', routes.GroupRoute);
app.use('/message', routes.MessageRoute);
app.use('/validate', routes.ValidateRoute);


export default app;