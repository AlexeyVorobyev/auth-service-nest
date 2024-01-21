import { Inject } from '@nestjs/common'
import { Command, CommandRunner, Option } from 'nest-commander'
import { RoleRepository } from '../role/repository/role.repository'
import { UserRepository } from '@src/user/repository/user.repository'
import { Builder } from 'builder-pattern'
import { BcryptService } from '@src/bcrypt/bcrypt.service'
import { UserCreateDto } from '@src/user/dto/user-create.dto'
import { ERole } from '@src/common/enum/role.enum'
import { UserService } from '@src/user/user.service'


interface BasicCommandOptions {
	email: string,
	password: string
}

@Command({
	name: 'create-super-user',
	description: 'Initialize base roles in system'
})
export class CreateSuperUser extends CommandRunner {

	constructor(
		@Inject(UserService)
		private readonly userService: UserService,
	) {
		super()
	}

	async run(passedParam: string[], options?: BasicCommandOptions): Promise<void> {
		const userCreateDtoBuilder = Builder(UserCreateDto)
		userCreateDtoBuilder
			.email(options.email)
			.password(options.password)
			.roles([ERole.User, ERole.Moderator, ERole.Admin])
		await this.userService.create(userCreateDtoBuilder.build())
	}

	@Option({
		flags: '-email, --email [email]',
		description: 'Specify the email'
	})
	parseEmailString(val: string): string {
		return val
	}

	@Option({
		flags: '-password, --password [password]',
		description: 'Specify the password'
	})
	parsePasswordString(val: string): string {
		return val
	}
}