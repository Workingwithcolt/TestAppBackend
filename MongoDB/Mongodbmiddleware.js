import { MongodbControllerFactory } from "../MongoDB/mongodbcontrollerfactory.js";

export const mongodbMiddleware = (req, res, next) => {
    req.locals = {}
    req.locals.controllerFactory = new MongodbControllerFactory();
    next();
};
