import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
// Aca se definen todas las funciones y su logica
@Injectable()
export class UserService {

        constructor(
            @InjectRepository(User)
            private userRepository : Repository<User>,
        ){}
            // funcion para retornar todos los usuarios
        public async usuarios() {
            return await this.userRepository
              .createQueryBuilder('user')
              .select()
              .getMany();
        }
        // funcion para crear un usuario
        public async CreandoUsuario(informacion: User){
            console.log ("informacion ingresada - ", informacion)   
            let info : any = {};
            info.nombre = informacion.nombre;
            info.apellido = informacion.apellido;
            info.username = informacion.username;
            info.passcode = informacion.passcode;
            console.log("Info Ingresada\nNombre: ",info.nombre,"Apellido: ",info.apellido)
            try {
                const infoGuardada = await this.userRepository.save(
                    info,
                    );
                    return {
                        statusCode : 200,
                        msg : 'usuario agregado',
                        data : info
                    };
    
            } catch (error) {
                return new BadRequestException(error);
            }
        }
        //  funcion para obtener un usuario especifico
        public async obtenerUnaUsuario(id) {
            return await this.userRepository
              .findOne({
                where: {
                  id: id,
                },
              })
              .then((respuesta) => {
                if (respuesta == null) {
                  return {
                    statusCode: 404,
                    msg: 'No existe el id solicitado.',
                  };
                } else {
                  return respuesta;
                }
              });
          }
          //funcion para editar un usuario
          public async EditarUsuario(id, informacionNueva: User) {
            try {
              let userAntigua: any = await this.obtenerUnaUsuario(id);
              userAntigua.nombre = informacionNueva.nombre;
              userAntigua.apellido = informacionNueva.apellido;
              userAntigua.username = informacionNueva.username;
              userAntigua.passcode = informacionNueva.passcode;
              console.log("informacion ingresada: ",informacionNueva)
              console.log("informacion antigua: ",userAntigua)
              return await this.userRepository
                .save(userAntigua)
                .then(async (resp) => {
                    if (resp.statusCode == 404) {
                        return {
                          statusCode: 404,
                          msg: 'No existe el id solicitado.',
                        };
                      } else {
                        return {
                          statusCode: 200,
                          msg: 'Usuario editado correctamente',
                          data: await this.obtenerUnaUsuario(id),
                        };
                      }
                    });
                } catch (error) {
                  return error;
                }
              }
              // funcion para eliminar un usuario
            public async EliminarUsuario(id) {
            let user: any = await this.obtenerUnaUsuario(id);
            return await this.userRepository
                .delete({
                id: id,
                })
                .then(async (resp) => {
                if (resp.affected > 0) {
                    console.log("eliminando",user)
                    return {
                    
                    statusCode: 200,
                    msg: 'Usuario eliminado correctamente.',
                    data: user,
                    };
                } else {
                    console.log("no eliminando")
                    return {
                    statusCode: 404,
                    msg: 'No se encontró el usuario solicitado.',
                    };
                }
                });
        }



}
