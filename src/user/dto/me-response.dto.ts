import { ApiProperty } from '@nestjs/swagger'
import { ERole } from '../../common/enum/role.enum'
import { UserResponseDto } from './user-response.dto'

export class MeResponseDto extends UserResponseDto {
}