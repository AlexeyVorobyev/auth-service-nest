import { Inject } from '@nestjs/common'
import { Command, CommandRunner, Option } from 'nest-commander'
import { Builder } from 'builder-pattern'
import { UserService } from '@modules/user/user.service'
import { UserCreateDto } from '@modules/user/dto/user-create.dto'
import { ERole } from '@modules/common/enum/role.enum'

interface BasicCommandOptions {
	email: string,
	password: string
}

@Command({
	name: 'create-super-user',
	description: 'Initialize super user in a system'
})
export class CreateSuperUserCommand extends CommandRunner {

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