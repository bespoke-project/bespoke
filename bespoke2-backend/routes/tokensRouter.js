// TODO: Modularizing the code ...
import { Router } from "express";
// import * as tokensController from "../controllers/tokensAPI.js";
// import { getTokenList as tokensController } from "../controllers/tokensAPI.js";
import { getTokenList } from "../controllers/tokensAPI.js";

const tokensRouter = Router();

// Hier wird der Routenteil definiert, der ab /tokens/ kommt. (Siehe server/index.js), also "Unterroutes"
tokensRouter.route('/').get('/tokens-t1', getTokenList);
//tokensRouter.route('/:id').get('/tokens-t1', tokensController.getTokenById);

// Fortsetzung folgt

export default tokensRouter

