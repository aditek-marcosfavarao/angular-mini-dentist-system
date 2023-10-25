export type Profile = {
  id: string;
  lastAppointment: Date;
  nextAppointment: Date;
  treatmentType: string;
  treatmentStartedAt: Date;
  treatmentFinishedAt: Date;
  name: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  age: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    adjunct: string;
    city: string;
    state: string;
    cep: string;
  };
  pharmacy: string;
  observations: string;
};
