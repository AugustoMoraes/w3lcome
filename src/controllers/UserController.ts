import {Request, Response} from 'express'
import { getConnection, getCustomRepository, Like } from 'typeorm'
import { User } from '../models/User'
import {UserRepository} from '../repositories/UserRepository'
class UserController{
    
    async create(request: Request, response: Response){

        const {name, email, pictureURL} = request.body

        const userRepository = getCustomRepository(UserRepository)

        const user = userRepository.create({
            name,email,pictureURL
        })

        await userRepository.save(user)

        return response.status(201).json(user)
    }
    async search(request: Request, response: Response){
        
        const {name} = request.params

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.find({name: Like(`%${name}%`)})
        
        if(!user.length){
            return response.status(401).json({error: "Nenhum resultado Encontrado!"})
        }
        return response.status(201).json(user)

    }
    async listAll(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository)

        const listUser = await userRepository.find()

        return response.status(201).json(listUser)
    }
    async delete(request: Request, response: Response){

        const {id} = request.params

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne(id)

        if(!user){
            return response.status(401).json({error: "Nenhum resultado Encontrado!"})
        }
        
        await userRepository.delete(user)

        return response.status(201).json(user)
    }
    async update(request: Request, response: Response){
        const {name, email, pictureURL} = request.body
        const {id} = request.params
        
        await getConnection().createQueryBuilder().update(User)
                .set({
                    name, email, pictureURL
                })
                .where("id = :id", {id:id})
                .execute()
        return response.status(201).json({message: "Usuário Atualizado com sucesso"})
    }
}

export {UserController}