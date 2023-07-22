export class AddressEntity {
  id: string = '';
  street: string = '';
  houseNumber: string = '';
  postal: string = '';
  location: string = '';
  country: string = '';
  createdAt?: Date;
  userId?: string;
}
