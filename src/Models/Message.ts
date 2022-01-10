import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinTable} from "typeorm";
import { User } from "./User";


@Entity()
export class Message extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    @ManyToOne(type => User, user => user.messages)
    user: User;

}