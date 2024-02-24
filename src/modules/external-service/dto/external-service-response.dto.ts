import { ApiProperty } from '@nestjs/swagger'

export class ExternalServiceResponseDto {
    @ApiProperty({
        description: 'ID of external service',
        example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
    })
    id: string

    @ApiProperty({
        description: 'Created date of external service',
    })
    createdAt: Date

    @ApiProperty({
        description: 'Updated date of external service',
    })
    updatedAt: Date

    @ApiProperty({
        description: 'Name of external service',
    })
    name: string

    @ApiProperty({
        description: 'Description of external service',
    })
    description?: string

    @ApiProperty({
        description: 'Recognition key of external service',
    })
    recognitionKey?: string
}