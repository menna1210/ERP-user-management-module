export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: { city: string; address: string; };
  company: { name: string; title: string; department: string; };
}