import { Inject, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { UserEntity } from '@src/user/entity/user.entity'
import { render } from '@react-email/render'
import { VerifyEmailTemplate } from '@src/email/template/verify-email.template'
import { ReactElement } from 'react'
import { ConfigType } from '@nestjs/config'
import appConfig from '@src/common/config/app.config'

@Injectable()
export class EmailService {
	constructor(
		@Inject(MailerService)
		private mailerService: MailerService,
		@Inject(appConfig.KEY)
		private readonly appConfiguration: ConfigType<typeof appConfig>
	) {
	}

	async sendUserConfirmation(user: UserEntity, jwtToken: string) {
		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Welcome to our app! Confirm your Email.',
			html: render(VerifyEmailTemplate({
				username: user.email,
				token: jwtToken,
				applicationAddress: this.appConfiguration.address,
				redirectAddress: this.appConfiguration.redirect
			}) as ReactElement),
			context: {
				name: user.email
			}
		})
	}
}