import { Shelter } from "src/shelters/entities/shelter.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contribution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    value: number;

    @ManyToOne(type => Shelter, shelter => shelter.contributions)
    shelter: Shelter;
}
