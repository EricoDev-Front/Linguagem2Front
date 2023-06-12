export interface ResponseModels {
  id: number;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    region: string;
    street: string;
    city: string;
    state: string;
    postcode: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  classificacao: string;
  dob: {
    date: string;
    age: any;
  };
  registered: {
    date: string;
    age: any;
  };
  telephoneNumbers: string[];
  mobileNumbers: string[];
  nationality: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
