import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateContributionDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsInt()
    value: number;

    @IsInt()
    @IsOptional()
    shelterID?: number;
}
