const mongoose = require('mongoose');
const config = require('./config');

const User = require('./model/User');
const Category = require('./model/Category');
const Item = require('./model/Item');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const users = await User.create(
        {username: 'user1', password: '123', displayname: 'Vasya', phone: '+996 457 234', token: 'qwerty'},
        {username: 'user2', password: '321', displayname: 'frendVasya', phone: '+734 356 687', token: 'asdfg'}
    );

    const categories = await Category.create(
        {title: 'Cars'},
        {title: 'Mobile'},
        {title: 'notebook'}
    );

    await Item.create(
        {
            user: users[0]._id,
            category: categories[0]._id,
            title: 'Mercedes',
            description: 'Mercedes CLA-class was officially introduced in early January 2013 at the motor show in Detroit. The car is built on the front-wheel drive MFA platform, which implements the new Mercedes-Benz A and B-class models.',
            image: '3SoHFKHjbpsvw3uz3_SK6.jpg',
            price: 50000,
            datetime: '2019-04-27T07:13:37.098Z'
        },
        {
            user: users[1]._id,
            category: categories[1]._id,
            title: 'Nokia',
            description: 'rear camera: 8 MP, flash, autofocus front camera: 5 MP, no flash, no autofocus',
            image: '_V1SplA1yV3S-6eY-5McZ.jpg',
            price: 800,
            datetime: '2019-04-27T07:13:40.098Z'
        }
    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong');
});
