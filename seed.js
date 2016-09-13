/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have products
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var Product = db.model('product');
var Promise = require('sequelize').Promise;

var seedProducts = function () {

    var products = [{
        name: 'Unknown Paparazzi',
        price: 300,
        description: 'Recall with a feeling of unsettledness the time when you were at the farmer\'s market and an unknown woman started taking pictures of you. No matter how you tried to elude her, she stayed on your tail. You ran and ran, but she caught you in the end...',
        category: 'fear, anxiety, uneasiness',
        photo: 'https://static.pexels.com/photos/139829/pexels-photo-139829-large.jpeg',
        featured: false
    },
    {
        name: 'Man With Fancy Coat And Geometric Jawline Asks You If You\'ve Ever Been To Mongolia',
        price: 100,
        description: 'This short memory allows you to experience a man in a peacoat asking you, with an air of superiority, whether you\'ve been to Mongolia. Experience his life story while his friend stands behind him.',
        category: 'everyday experiences, sexual tension',
        photo: 'https://static.pexels.com/photos/117431/pexels-photo-117431-large.jpeg',
        featured: false
    },
    {
        name: 'Southwest Vision Quest',
        price: 3000,
        description: 'Remember the journey of a life time. Explore the American southwest on a solitarity quest for knowledge and inner peace. Experience the hardships of true wilderness survival in some of the most unforgiving terrain. With only what you carry on your back and what the land provides, you will survive for five trecherous days. Be pushed to your limit and come out as a stronger person from the experience.',
        category: ['Adventurous', 'Solitary'],
        photo: 'https://static.pexels.com/photos/119650/pexels-photo-119650-large.jpeg',
        featured: false
    },
    {
        name: 'Rural Childhood',
        price: 8000,
        description: 'Get two years of an idylic rural childhood experience. Enjoy carefree days in a quaint colonial farmhouse. Spend hours playing on your tire swing in the front yard. Frolick through pastures with your best friend, who was a pig.',
        category: ['Happy', 'Nostalgia'],
        photo: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/NKQVF3AM4K.jpg',
        featured: false
    },
    {
        name: 'Barbecue Birthday',
        price: 300,
        description: 'A beautiful lakeside cabin, hundreds of people, and they are all there to celebrate you! Have the best birthday ever with delicious food, tasty drinks, and lawn games. You are sure to get a kiss from that special someone by the end of the night!',
        category: ['Happy', 'Social', 'Romantic'],
        photo: 'https://hd.unsplash.com/photo-1470753937643-efeb931202a9',
        featured: true
    },
    {
        name: 'Pull an all-nighter!',
        price: 5,
        description: 'You are a student during the week of final exams. As per customary, you’ve procrastinated a little bit too much for a term paper you’ve been dreading. It is finally the day before the paper is due, and you’ve written a title and an introductory paragraph. The clock strikes 9pm and you are painfully reminded of how the next morning is the due date. Join us to re-live this is crucial rite of passage.',
        category: ['sad', 'nostalgia'],
        photo: 'https://hd.unsplash.com/photo-1444384851176-6e23071c6127',
        featured: true
    }];

    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);

};

db.sync({ force: true })
    .then(function () {
        return seedProducts();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
