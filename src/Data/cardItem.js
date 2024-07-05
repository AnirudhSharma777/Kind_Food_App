export const products = [
    {
        id:1,
        tag: 'Healthy',
        dishes : [
            {
                heading : "Fruits",
                description : "Fresh organic fruits directly from the farmers to you.",
                image:'https://media.istockphoto.com/id/1609529234/photo/assorted-colorful-fruits-in-basket-apple-banana-grapes-pineapple-oranges-etc-food-photography.webp?b=1&s=170667a&w=0&k=20&c=s_hN1YcJyi1Zhx10srj04rwuOgqWhtQBAzEIJ4Xq128= ',
                price:' $15',
                rating:'4.6 ☆',
                time :'1 hr ago',
                genres: 'Healty, Fresh, Seasoning, Nutritious',
                ingredients:[
                    ['Apples','Bananas','Grapes','Pomegranates','Pineapple','Cherries','Oranges','Guavas','Kiwi']
                ]
            },
            {
                heading : "Green Veggies",
                description : "Fresh organic vegetables directly from the farmers to you.",
                image:'https://meowmeix.com/wp-content/uploads/2020/04/green-vegetables-min.jpg',
                price:' $10',
                rating:'4.5 ☆',
                time :'4 hr ago',
                genres:'Fresh, Nutritious, Healthy',
                ingredients:[
                    ['Spinach','Broccoli','Green beans','Sprout','Zucchini','Asparagus']
                ]
            },
            {
                heading : "Salad",
                description : " A fresh and nutritious dish made from a variety of raw vegetables, fruits, nuts, seeds.",
                image:'https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGFkfGVufDB8fDB8fHww ',
                price:'$8',
                rating:'4.4 ☆',
                time :'30 min ago',
                genres:'Seasoning, Sprouts, Corn',
                ingredients:[
                    ['Tomatoes','Cucumber','Bell peppers','Red onion','Olives','Feta cheese']
                ]
            },
            {
                heading:'Thali',
                description : "A traditional Indian meal, consisting of a variety of dishes.",
                image:'https://media.istockphoto.com/id/2148388208/photo/prawns-thali-non-vegeterian-dish-pune-maharashtra-india-arw.webp?b=1&s=170667a&w=0&k=20&c=YseV5iJVlwq_adASQOU8G0v8JxCAvBNn3MauIM3glOs=',
                price:'$12',
                rating:' 4.7 ☆',
                time :'3 min ago',
                genres:'Indian, South Indian, Gujrati',
                ingredients:[
                    ['Roti','Rice','Salad','More than two veggies(Paneer,Aloo,Dal)','Yogurt','Desert(Kheer)','Pickle']
                ]
            }
        ]
    },
    {
        id:2,
        tag: 'Desserts',
        dishes : [
            {
                heading : "Kheer",
                description : "A refreshing dessert made with sweet, ripe pineapples.",
                image:'https://media.istockphoto.com/id/978380954/photo/shrikhand-or-srikhand-is-an-indian-dessert-made-of-strained-yogurt-garnished-with-dry-fruits.webp?b=1&s=170667a&w=0&k=20&c=vZ_wqIX0gyQ0kFGioM4YOl5Eb6zfJfkIhhBcwz4K5Xs=',
                price:' $8',
                rating:'4.5 ☆',
                time :'4 hr ago',
                genres:'Smooth Cayenne, Red Spanish, Abacaxi Pineapple',
                ingredients:[
                    ['Pineapple','Sugar','Lime juice','Mint leaves','Coconut flakes','Honey']
                ]
            },
            {
                heading : "Ras Malai",
                description : " A rich and creamy Indian dessert made from soft paneer balls soaked in sweetened, thickened milk.",
                image:'https://media.istockphoto.com/id/1411786526/photo/rasmalai.webp?b=1&s=170667a&w=0&k=20&c=bmwy603z44JTyznMMUdC1gRVUuE89gyMhCJL8NSXpUs=',
                price:' $10',
                rating:'4.7 ☆',
                time :'3 min ago',
                genres:'Indian, Sweet, Delicious',
                ingredients:[
                    ['Paneer (cottage cheese)','Milk','Sugar','Cardamom','Saffron','Pistachios']
                ]
            },
            {
                heading : "Ice-Cream ",
                description : "A creamy, frozen dessert available in various flavors.",
                image:'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3dlZXR8ZW58MHx8MHx8fDA%3D',
                price:' $5',
                rating:'4.8 ☆',
                time :'2 hr ago',
                genres:'Butter Scotch, Chocolate, Matka Kulfi, Vanilla',
                ingredients:[
                    ['Milk','Cream','Sugar','Flavoring (e.g., chocolate, strawberry)']
                ]
            },
            {
                heading:'Pastry',
                description : "A sweet baked good filled or topped with cream, fruit, or chocolate.",
                image:'https://media.istockphoto.com/id/179640507/photo/strawberry-cheesecake.webp?b=1&s=170667a&w=0&k=20&c=8wV7Cb9nd0OTGw7GG9SsJiphZog-pccMqmjN3lf4KBU=',
                price:' $4',
                rating:'4.6 ☆',
                time :'45 min ago',
                genres:'Chocolate, Black forest, Red velvet, Fruit',
                ingredients:[
                    ['Sugar','Milk','Butter','Eggs']
                ]
            }
        ]
    },
    {
        id:3,
        tag: 'Spicy Food',
        dishes : [
            {
                heading : "Pizza",
                description : "A savory dish made with a flatbread base, cheese, and various toppings, baked to perfection.",
                image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D',
                price:' $12',
                rating:'4.7 ☆',
                time :'7 min ago',
                genres:'Cheese, Sicillian, Neapolitan, Margherita',
                ingredients:[
                    ['Mozzarella cheese','Olive oil','Garlic','Oregano','Basil']
                ]
            },
            {
                heading : "Burger",
                description : "Consisting of a cooked patty, placed inside a sliced bun, with various toppings and condiments.",
                image:'https://plus.unsplash.com/premium_photo-1675864534274-3652b78bfff1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww',
                price:' $8',
                rating:'4.5 ☆',
                time :'30 min ago',
                genres:'Cheese, Vegan, Mushroom swiss, Pastrami, Steak',
                ingredients:[
                    ['Lettuce','Cheese','Pickles','Ground patty','Vegetables']
                ]
            },
            {
                heading : "Noodles",
                description : "A dish served in a savory broth or with various sauces and toppings.",
                image:'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D',
                price:' $7',
                rating:'4.4 ☆',
                time :'3 min ago',
                genres:'Chauwmin, Spaghetti, Ravioli',
                ingredients:[
                    ['Noodles','Soy sauce','Garlic','Ginger','Vegetables','Green onions']
                ]
            },
            {
                heading : "Dumplings",
                description : "Small pockets of dough filled with a savory or sweet filling, typically steamed, boiled, or fried.",
                image:'https://media.istockphoto.com/id/1227591852/photo/image-of-steamed-momos-white-flour-and-water-dough-filled-with-chicken-and-mixed-vegetables.webp?b=1&s=170667a&w=0&k=20&c=cvTxMSY3Bar74udDYjcFK4gba65-pWrR7os1Qs4PTH8=',
                price:' $9',
                rating:'4.6 ☆',
                time :'2 days ago',
                genres:'Korean, Manti, Madombi, Marillenknodel',
                ingredients:[
                    ['Soy sauce','Vegetables','Cabbage','Garlic','Green onions']
                ]
            }
        ]
    },
    {
        id:4,
        tag: 'Sea-Food',
        dishes : [
            {
                heading : "Sea Curry",
                description : "A flavorful curry made with a variety of seafood simmered in a spiced coconut milk base.",
                image:'https://plus.unsplash.com/premium_photo-1668143365324-37cae1de4e56?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D',
                price:' $15',
                rating:'4.7 ☆',
                time :'6 days ago',
                genres:'Fish, Chili, Bangoli',
                ingredients:[
                    ['Mixed seafood (shrimp, fish, squid)','Curry paste','Lemongrass','Coconut milk']
                ]
            },
            {
                heading : "Shrimps",
                description : "Juicy and succulent shellfish with a sweet and delicate flavor, grilled, boiled,and sautéed.",
                image:'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D',
                price:' $20 per pound',
                rating:'4.6 ☆',
                time :'2 hr ago',
                genres:'Argentine stiletto shrimp, California shrimp, Common shrimp',
                ingredients:[
                    ['Shrimp','Olive oil','Garlic','Lemon','Parsley','Pepper']
                ]
            },
            {
                heading : "Grilled Fish",
                description : "Tender and flaky fish cooked over an open flame, seasoned with herbs and spices.",
                image:'https://media.istockphoto.com/id/980462262/photo/tasty-grilled-fish.webp?b=1&s=170667a&w=0&k=20&c=aZa46HjK0B65iExwZIcGnZ-SJ9r1eg4a90ttn5SWp7E=',
                price:' $18',
                rating:'4.7 ☆',
                time :'4 hr ago',
                genres: 'Steake, Marinade, Salmon',
                ingredients:[
                    ['Fresh fish fillet (salmon, tilapia)','Olive oil','Lemon','Fresh herbs (parsley, thyme)']
                ]
            },
            {
                heading: "Crabs",
                description : "Delicate and sweet shellfish with tender meat, steamed and served with butter or sauce.",
                image:"https://images.unsplash.com/photo-1503414382497-bfd17f3c2e41?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VhZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
                price:' $25 per pound',
                rating:'4.5 ☆',
                time :'4 days ago',
                genres: 'Coconut crab, Hermit crab, Blue Crabs.',
                ingredients:[
                    ['Fresh crabs','Butter','Old Bay seasoning','Parsley','Garlic']
                ]
            }
        ]
    },
    {
        id:5,
        tag: 'Soups',
        dishes: [
            {
                heading : "Green Peas Cream Soup",
                description : "A smooth and creamy soup made from pureed green peas, enriched with cream for a luxurious texture.",
                image:'https://media.istockphoto.com/id/1249204744/photo/green-peas-cream-soup.webp?b=1&s=170667a&w=0&k=20&c=0rIvdBHdb8rv1kncibs2BIryDAqQMuMs-ABurTp1Sj8=',
                price:' $6',
                rating:'4.3 ☆',
                time :'3 days ago',
                genres: 'Indian, Vegiterian, Non-vegiterian, Healthy',
                ingredients:[
                    ['Green peas','Chicken or vegetable broth','Cream','Butter']
                ]
            },
            {
                heading : "Corn Soup",
                description : "A comforting soup made from canned corn kernels, creamy and flavored with herbs or spices.",
                image:'https://media.istockphoto.com/id/505442817/photo/chinese-corn-soup-closeup.webp?b=1&s=170667a&w=0&k=20&c=1D4WGyIF9m3rlh2uiAbT3BONfszWVnrouC_ZIZ8yew4=',
                price:' $5',
                rating:'4.4 ☆',
                time :'4 hr ago',
                genres: 'Healthy, Vegeterian, Italian',
                ingredients:[
                    ['Corn kernels','Cream','Onion','Garlic']
                ]
            },
            {
                heading : "Vegetable Soup",
                description : "A hearty soup made with a variety of fresh vegetables, a nutritious and flavorful meal.",
                image:'https://media.istockphoto.com/id/1291170755/photo/hot-vegetable-soup-in-a-bowl.webp?b=1&s=170667a&w=0&k=20&c=uhGNJBjDvsPRDP-pt6ON-dROek-UzFO2LJ0x8AY99-E=',
                price:' $6',
                rating:'4.5 ☆',
                time :'9 hr ago',
                genres: 'Carrot, cabbage,Season veggies ,Healthy, Nutritious',
                ingredients:[
                    ['Carrots','Celery','Potatoes','Tomatoes','Green beans']
                ]
            },
            {
                heading:'Tamoto Soup',
                description : " A classic soup made primarily from tomatoes, smooth and creamy, with a tangy and savory flavor.",
                image:'https://media.istockphoto.com/id/1337466397/photo/a-bowl-of-traditional-spain-tomato-soup-with-cream-and-basil-on-the-table-vertical-photo.webp?b=1&s=170667a&w=0&k=20&c=YNkpq4Y6ldqu-TUnWQR-QCTU4uI4DzFRs5SI9T7x4G8=',
                price:' $5',
                rating:'4.6 ☆',
                time :'3 min ago',
                genres: 'healthy, Nutritious, Vegiterian, Seasoned',
                ingredients:[
                    ['Tomatoes','Vegetable broth','Basil','Garlic','Cream']
                ]
            }
        ]
    },
]