import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { userEntity} from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>){}

    private users: userEntity[] = []

    async createUser(createUserDto: CreateUserDTO): Promise<userEntity>{
        const saltHash = 10

        const passwordHashed = await hash(createUserDto.password, saltHash)

        const user: userEntity = {...createUserDto, password: passwordHashed}

        this.userRepository.save({...user, password: passwordHashed})

        return ({...createUserDto, id: user.id, password: undefined})
    }

    async findUsers():Promise<userEntity[]>{
        return this.users;
    }

    async getAllUser():Promise<userEntity[]>{
        return await this.userRepository.find()
    }
}
