import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public name?: string;

    @Column({ type: "text", nullable: true })
    public description?: string;
}

export default User;