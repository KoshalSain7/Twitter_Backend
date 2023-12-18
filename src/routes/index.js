import express from 'express';

import v1routes from './v1/index.js';

const route = express.Router();
route.use('/v1', v1routes);

export default route;