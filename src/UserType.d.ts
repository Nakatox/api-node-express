interface User {
    gender: string;
    email: string;
    name: Name; 
    location: Location;
    login: Login;
    dob: Dob;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
}

interface Name {
    title :string;
    first: string;
    last:string;
}

interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

interface Dob {
    date: string;
    age: number;
}
interface Registered {
    date: string;
    age: number;
}
interface Id {
    name: string;
    value: string;
}
interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}
interface Location {
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
    street: Street;
}
interface Street {
    number: number;
    name: string;
}

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Timezone {
    offset: string;
    description: string;
}