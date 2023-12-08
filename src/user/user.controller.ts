import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    async create(@Body() createUser:CreateUserDTO){
        return this.userService.createUser(createUser)
    }
    @Get()
    async findAll(){
        return this.userService.getAllUser()
    }
}
