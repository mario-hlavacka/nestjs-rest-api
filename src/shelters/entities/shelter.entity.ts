import { Contribution } from "src/contributions/entities/contribution.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Contribution, contribution => contribution.shelter)
    contributions: Contribution[]; 
}
