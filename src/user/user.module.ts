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
import { UserRepository } from './repository/user.repository'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		RoleModule,
		BcryptModule
	],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository]
})
export class UserModule {}