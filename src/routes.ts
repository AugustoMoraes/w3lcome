import {Router} from 'express'

import {UserController} from './controllers/UserController'

const routes = Router()

const userController = new UserController

routes.post('/user', userController.create)
routes.post('/user/:id', userController.update)
routes.get('/user', userController.listAll)
routes.get('/user/:name', userController.search)
routes.delete('/user/:id', userController.delete)
export {routes}