import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name : "user",

})
export class User{
    @PrimaryGeneratedColumn({
        type:"int",
        name:"id",
    })
    id : number
    @Column('varchar',{
        length:100,
        name:'nombre'
    })
    nombre : string;
    @Column('varchar',{
        length:100,
        name: 'apellido'
    })
    apellido : string;
    @Column('varchar',{
        name: 'username'
    })
    username : string;
    @Column('varchar',{
        name: 'passcode'
    })
    passcode : string;
}
