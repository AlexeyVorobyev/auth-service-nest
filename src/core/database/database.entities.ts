import {RoleEntity} from "@modules/role/entity/role.entity";
import {UserEntity} from "@modules/user/entity/user.entity";
import { ExternalServiceEntity } from '@modules/external-service/entity/external-service.entity'
import { ExternalRoleEntity } from '@modules/role/entity/external-role.entity'

export const databaseEntities = [
    RoleEntity,
    UserEntity,
    ExternalServiceEntity,
    ExternalRoleEntity
]