import { ApiProperty } from '@nestjs/swagger';
import { Contribution } from 'generated/prisma';


export class ContributionEntity implements Contribution {
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    value: number;

    @ApiProperty({required: false})
    shelterId: number;
}