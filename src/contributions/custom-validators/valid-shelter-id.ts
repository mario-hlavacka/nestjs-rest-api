import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { SheltersService } from "src/shelters/shelters.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class ValidShelterIdConstraint implements ValidatorConstraintInterface {
  constructor(private readonly sheltersService: SheltersService) {}

  async validate(shelterId: number, args: ValidationArguments):Promise<boolean>  {
    const shelter = await this.sheltersService.findOne(shelterId);
    return !!shelter;
  }

  defaultMessage(args: ValidationArguments) {
    return `Shelter with ID ${args.value} does not exist!`;
  }
}

export function ValidShelterId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidShelterId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidShelterIdConstraint,
    });
  };
}