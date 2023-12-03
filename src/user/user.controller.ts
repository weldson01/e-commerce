import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    @Post()
    async create(@Body() createUser:CreateUserDTO){
        return ({
            ...createUser, password: undefined
        })
    }
}
