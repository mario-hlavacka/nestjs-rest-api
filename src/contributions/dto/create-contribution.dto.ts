import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ValidShelterId } from '../custom-validators/valid-shelter-id';

export class CreateContributionDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsOptional()
  @IsInt()
  @ValidShelterId()
  shelterId?: number;
}
