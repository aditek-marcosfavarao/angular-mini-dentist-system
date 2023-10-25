export interface Profile {
  id: string;
  appointment: {
    lastApointment: Date;
    nextApointment: Date;
  };
  treatment: {
    treatmentType: string;
    treatmentStart: Date;
    treatmentEnd: Date;
  };
  user: {
    name: string;
    id: string;
    document: string;
    birthdate: Date;
    age: number;
    phone: string;
    celphone: string;
    email: string;
    address: {
      address: string;
      number: number;
      complement: string;
      city: string;
      uf: string;
      cep: string;
    };
  };
  medicineObservations: string;
  observations: string;
}
