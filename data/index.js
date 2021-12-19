import faker from 'faker';

export let authors = [
    {
        id: faker.datatype.number(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
    {
        id: faker.datatype.number(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },
];

export let posts = [
    {
        id: faker.datatype.number(),
        title: faker.lorem.words(5),
        content: faker.lorem.text(250),
        date: faker.date.recent(),
        author: authors[0].firstName + ' ' + authors[0].lastName,
    },
    {
        id: faker.datatype.number(),
        title: faker.lorem.words(5),
        content: faker.lorem.text(250),
        date: faker.date.recent(),
        author: authors[1].firstName + ' ' + authors[1].lastName,
    },
];

export const postsHandler = {
    get: id => {
        const post = posts.find(post => post.id === id);

        return post;
    },
    add: (title, content) => {
        const post = {
            id: faker.datatype.number(),
            title,
            content,
            date: faker.date.soon(0),
            author: authors[1].firstName + ' ' + authors[1].lastName,
        };

        posts = [...posts, post];

        return post;
    },
    update: (id, title, content) => {
        posts = posts.map(post => (post.id === id ? { ...post, title, content } : post));

        return postsHandler.get(id);
    },
    delete: id => {
        posts = posts.filter(post => post.id !== id);

        return true;
    },
};
