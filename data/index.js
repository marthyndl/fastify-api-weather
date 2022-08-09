import faker from 'faker';

export let weatherUrl = 'http://api.openweathermap.org'

export let weathers = [
    {
        id: faker.datatype.number(),
        name: faker.name.firstName(),
        country: faker.name.lastName(),
    },
];

export const weathersHandler = {
    get: id => {
        const weatherl = weathers.find(weather => weather.id === id);

        return weatherl;
    },
};
