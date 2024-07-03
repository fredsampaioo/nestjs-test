export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  password: string;
  readonly address: {
    readonly street: string;
    readonly neighborhood: string;
    readonly number: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
  };
}
