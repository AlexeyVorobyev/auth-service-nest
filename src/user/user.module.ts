import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entity/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { BcryptService } from '../bcrypt/bcrypt.service'
import { RoleService } from '../role/role.service'
import { RoleEntity } from '../role/entity/role.entity'
import { RoleModule } from '../role/role.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		RoleModule,
		BcryptModule
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}