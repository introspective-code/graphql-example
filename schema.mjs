import { buildSchema } from 'graphql';
const THREE_HUNDRED_MS = 300;

const USERS = [
  {
    "id": "0",
    "name": "Brandon",
    "cityId": "a"
  },
  {
    "id": "1",
    "name": "Nafeu",
    "cityId": "b"
  },
  {
    "id": "2",
    "name": "Saba",
    "cityId": "c"
  }
];

const CITIES = [
  {
    "id": "a",
    "name": "Smith's Falls",
    "population": 8780
  },
  {
    "id": "b",
    "name": "Toronto",
    "population": 2930000
  },
  {
    "id": "c",
    "name": "Chicago",
    "population": 2710000
  }
]

const fetchUsers = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(USERS)
  }, THREE_HUNDRED_MS)
});

const fetchCities = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(CITIES)
  }, THREE_HUNDRED_MS)
});

export const schema = buildSchema(`
  type Query {
    getUsers: [User]
  }

  type User {
    id: String
    name: String
    city: City
  }

  type City {
    id: String
    name: String
    population: Int
  }
`);

export const rootValue = {
  getUsers: async () => {
    const users = await fetchUsers();
    const cities = await fetchCities();

    const getCityById = cityId => {
      for (const city of cities) {
        if (city.id === cityId) {
          return city;
        }
      }
    }

    let output = [...users];

    output = output.map(user => {
      return {
        ...user,
        city: getCityById(user.cityId)
      }
    });

    return output;
  }
}
