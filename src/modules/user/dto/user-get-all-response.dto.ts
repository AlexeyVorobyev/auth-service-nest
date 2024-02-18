import { GetAllResponseDto } from '../../common/dto/get-all-response.dto'
import { UserResponseDto } from './user-response.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UserGetAllResponseDto extends GetAllResponseDto<UserResponseDto> {
	@ApiProperty({
		description: 'List of entities',
		type: [UserResponseDto]
	})
	list: UserResponseDto[]
}