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
var Review = db.model('reviews');
var User = db.model('user');
var Promise = require('sequelize').Promise;

var seedProducts = function () {

    var products = [{
        name: 'Unknown Paparazzi',
        price: 300,
        description: 'Recall with a feeling of unsettledness the time when you were at the farmer\'s market and an unknown woman started taking pictures of you. No matter how you tried to elude her, she stayed on your tail. You ran and ran, but she caught you in the end...',
        category: ['fear', 'anxiety'],
        photo: 'https://static.pexels.com/photos/139829/pexels-photo-139829-large.jpeg',
        featured: false
    },
    {
        name: 'Man With Fancy Coat And Geometric Jawline Asks You If You\'ve Ever Been To Mongolia',
        price: 100,
        description: 'This short memory allows you to experience a man in a peacoat asking you, with an air of superiority, whether you\'ve been to Mongolia. Experience his life story while his friend stands behind him.',
        category: ['everyday experiences', 'sexual tension', 'social'],
        photo: 'https://static.pexels.com/photos/117431/pexels-photo-117431-large.jpeg',
        featured: false
    },
    {
        name: 'Southwest Vision Quest',
        price: 3000,
        description: 'Remember the journey of a life time. Explore the American southwest on a solitarity quest for knowledge and inner peace. Experience the hardships of true wilderness survival in some of the most unforgiving terrain. With only what you carry on your back and what the land provides, you will survive for five treacherous days. Be pushed to your limit and come out as a stronger person from the experience.',
        category: ['adventurous', 'happy'],
        photo: 'https://static.pexels.com/photos/119650/pexels-photo-119650-large.jpeg',
        featured: false
    },
    {
        name: 'Rural Childhood',
        price: 8000,
        description: 'Get two years of an idylic rural childhood experience. Enjoy carefree days in a quaint colonial farmhouse. Spend hours playing on your tire swing in the front yard. Frolick through pastures with your best friend, who was a pig.',
        category: ['happy', 'nostalgia'],
        photo: 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/NKQVF3AM4K.jpg',
        featured: false
    },
    {
        name: 'Barbecue Birthday',
        price: 300,
        description: 'A beautiful lakeside cabin, hundreds of people, and they are all there to celebrate you! Have the best birthday ever with delicious food, tasty drinks, and lawn games. You are sure to get a kiss from that special someone by the end of the night!',
        category: ['happy', 'social', 'romance'],
        photo: 'https://hd.unsplash.com/photo-1470753937643-efeb931202a9',
        featured: true
    },
    {
        name: 'Pull an all-nighter!',
        price: 5,
        description: 'You are a student during the week of final exams. As per customary, you’ve procrastinated a little bit too much for a term paper you’ve been dreading. It is finally the day before the paper is due, and you’ve written a title and an introductory paragraph. The clock strikes 9pm and you are painfully reminded of how the next morning is the due date. Join us to re-live this is crucial rite of passage.',
        category: ['sadness', 'nostalgia'],
        photo: 'https://hd.unsplash.com/photo-1444384851176-6e23071c6127',
        featured: true
    },
    {
        name: 'Your Old Chameleon, Weatherfield',
        price: 500,
        description: 'Remember with fondness your deceased best friend, Weatherfield. Many long nights were spent out of bed, sitting on your bedroom with Weatherfield\'s cage unlatched, your hand extended inward to caress his scaly ridges. Weatherfield gave you a feeling of love and peace that no romantic partner has since been able to replicate. There was something special about Weatherfield, and he will remain in your heart forever.',
        category: ['romance', 'sadness', 'happy', 'nostalgia', 'sexual tension'],
        photo: 'https://static.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289-large.jpeg',
        featured: true
    },
    {
        name: 'Near-Death Experience: Too Many Teabags',
        price: 1000,
        description: 'Gain a deeper appreciation of life through this memory of a near-death experience. All those teabags, closing in...',
        category: ['fear', 'anxiety'],
        photo: 'https://static.pexels.com/photos/32266/pexels-photo-large.jpg',
        featured: true
    },
    {
        name: 'Day in Life of an Astronaut',
        price: 10000,
        description: 'Ever dreamed of being an astronaut? Mesmerized by movies like Gravity or Interstellar? This is the memory for you. Be a NASA-affiliated astronaut working on the International Space Station.',
        category: ['adventurous'],
        photo: 'https://static.pexels.com/photos/2156/sky-earth-space-working-large.jpg',
        featured: true
    },
    {
       name: 'Breaking up with a girl',
       price: 450,
       description: 'This is the day. This may be the armageddon you’ve been wanting to avoid, the day of the doom that you’ve known to be coming all along. Today you are breaking up with your girlfriend. We hope that this memory doesn\'t destroy you.',
       category: ['fear'],
       photo: 'https://static.pexels.com/photos/27411/pexels-photo-27411-large.jpg',
       featured: true
    }];

    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
};

var seedUsers = function () {

    var users = [{
        name: 'Melissa Jones',
        email: 'mlsong@gmail.com',
        password: '1234',
        isAdmin: true
    }];

    var creatingUsers = users.map(function(userObj){
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
}

var seedReviews = function (productIds, userIds) {
    var reviews = [{
       title: 'Great Memory for space travel',
       text: 'This space travel memeory was great! I highly recommend it.',
       stars: 4,
       productId: 1,
       userId: 1   /// To do: need to consider how to link userId with reviews
        
    },{
       name: 'Love the Memory of Childhood',
       title: 'Great Memory for space travel',
       text: 'This memeory of childhood was awesome! I highly recommend it.',
       stars: 5,
       productId: 1,
       userId: 1

    }];

    var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);

};
db.sync({ force: true })
    .then(function () {
        return seedProducts();
    })
    .then(function(products){
       var users = seedUsers();
       return [products,users];
    })
    .spread(function(products, users){
       
        return seedReviews(products, users);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
