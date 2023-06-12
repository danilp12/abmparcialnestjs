import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
// Aca van todas las rutas del servidor con sus funciones
@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}
    @Get("/usuarios")
    listarusuarios(){
        return this.userservice.usuarios()
    }
    @Post("/Creandousuario")
    crearusuario(@Body() informacion){
        return this.userservice.CreandoUsuario(informacion)
        
    }
    @Get("usuario/:id")
    listarunusuario(@Param("id")id){
        return this.userservice.obtenerUnaUsuario(id)
    }
    @Put("/EditarUsuario/:id")
    editarusuario(@Param("id")id,@Body() body){
        return this.userservice.EditarUsuario(id,body)
    }
    @Delete("/eliminarusuario/:id")
    eliminarusuario(@Param("id")id){
        return this.userservice.EliminarUsuario(id)
    }
}
