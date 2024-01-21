import { IsNotEmpty, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class IdParamDto {
	@IsUUID()
	@IsNotEmpty()
	@Type(() => String)
	@ApiProperty({
		type: 'string',
		format: 'uuid',
		required: true,
	})
	id: string
}