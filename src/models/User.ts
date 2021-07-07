import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
class User{

    @PrimaryGeneratedColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    pictureURL: string
    
}

export {User}