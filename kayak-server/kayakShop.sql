DROP SCHEMA IF EXISTS `kayaks`;
CREATE SCHEMA `kayaks`;

CREATE TABLE `kayaks`.`products` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `category` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `style` VARCHAR(255) NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `rating` FLOAT DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `kayaks`.`users` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `address1` VARCHAR(255),
    `address2` VARCHAR(255),
    `city` VARCHAR(255),
    `state` VARCHAR(2),
    `zip_code` INT,

    PRIMARY KEY (`id`)
);

CREATE TABLE `kayaks`.`transactions` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `customer_id` VARCHAR(50),
    `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `total` FLOAT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`customer_id`) 
        REFERENCES `users`(`id`) ON DELETE
        SET
            NULL
);

CREATE TABLE `kayaks`.`purchased_items` (
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `product_id` VARCHAR(50) NOT NULL,
    `quantity` INT NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `total` FLOAT NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) 
        REFERENCES `products`(`id`),
    FOREIGN KEY (`transaction_id`) 
        REFERENCES `transactions`(`id`)
);

INSERT INTO `kayaks`.`products` 
    (`id`, `name`, `price`, `description`, `category`, `brand`, `style`, `size`, `color`, `image`, `rating`)
VALUES

    (uuid(), 'Mustang 100X', 399.99,  '1 person sit-in kayak', 'kayaks', 'Pelican', 'sit-in', "10'", 'green', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/18PELUMSTNG100XKYPSK_Borealis?qlt=70&wid=1100&fmt=webp', 4.5 ),
    (uuid(), 'Teton 100 Angler', 479.99,  '1-person sit-on-top fishing kayak', 'kayaks', 'Lifetime', 'sit-on-top', "10'", 'blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/19LIFUTTNNGLRXXXXPSK_Azure_Fusion-1?qlt=70&wid=1100&fmt=webp', 4.2 ),
    (uuid(), 'Rambler 13.5', 699.00,  '2 person sit-on-top kayak', 'kayaks', 'Perception', 'sit-on-top', "13'", 'blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/15PTNURMBLR135TNDPSK_Dapper?qlt=70&wid=1100&fmt=webp', 4.7 ),
    (uuid(), 'Yellowfin 100', 799.99,  '1 person sit-in kayak', 'kayaks', 'Vibe', 'sit-on-top', "10'", 'blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/20TLRAYLLWFN100XXPSK_Caribbean_Blue?qlt=70&wid=1100&fmt=webp', 4.6 ),
    (uuid(), 'Getaway 110 Pedal Drive', 1054.99,  '1 person sit-on-top pedal kayak', 'kayaks', 'Pelican', 'sit-on-top', "10'", 'blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/22PEPAGTWY110HDXXPSK_Vapor_Blue?qlt=70&wid=1100&fmt=webp', 0.0 ),
    (uuid(), 'Lono Aero', 1749.00,  '1 person sit-on-top pedaling inflatable kayak and stand-up paddleboard', 'kayaks', 'Bote', 'sit-on-top', "12'", 'seafoam', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21CQMALNKYKXXXXXXPSK_Seafoam_Gray?qlt=70&wid=1100&fmt=webp', 0 ),
    (uuid(), 'Haven TT', 1999.99,  '2 person fold-up tandem Haven TT sit-in kayak', 'kayaks', 'Oru', 'sit-in', "16'", 'white', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21ANZAHVNTTKYKXXXPSK_White?qlt=70&wid=1100&fmt=webp', 0.0 ),
    (uuid(), 'PK14 Angler', 2337.30,  '2 person 14-foot sit on top tandem pedal fishing kayak w/ instant reverse pedal drive, hand control rudder, paddle, and upright seat', 'kayaks', 'BKC', 'sit-on-top', "14'", 'blue', 'https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Blue_Format.png?v=1649093514', 4.2 ),
    (uuid(), 'PK11 Angler', 1437.30,  '1 person 10.5-foot sit on top solo fishing kayak w/ trolling motor, paddle, and upright aluminum seat', 'kayaks', 'BKC', 'sit-on-top', "10'", 'brown', 'https://cdn.shopify.com/s/files/1/0086/9128/6076/products/pk11_5_edited.jpg?v=1649430919', 4.3 ),
    (uuid(), 'Access 9.5', 489.00,  '1 person sit-on-top kayak', 'kayaks', 'Pelican', 'sit-on-top', "9'", 'sunset', 'https://newcontent.westmarine.com/content/images/catalog/large/19381284_LRG.26112018103026.jpg', 4.5 ),

    (uuid(), 'Recruit Neo', 59.99,  'JetPilot Recruit Neo PFD', 'PFDs', 'JetPilot', 'vest', 'adults', 'black', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP15238_RECRUIT_PFD_BLACK_F_720x.jpg?v=1651560295', 4.5 ),
    (uuid(), 'A-10 Comp', 99.99,  'JetPilot A-10 Comp Vest', 'PFDs', 'JetPilot', 'vest', 'adults', 'green', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP16227_A10_GREEN_720x.jpg?v=1643940528', 4.0 ),
    (uuid(), 'L.R.E. Helmsman Neo', 119.95,  "JetPilot men's L.R.E. Helmsman Neo USCG approved vest", 'PFDs', 'JetPilot', 'vest', 'adults', 'black', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/NEW_JP20101_REVISED_Helmsman_Neo_PFD_Radio_Strap_720x.jpg?v=1648521451', 4.8 ),
    (uuid(), 'Bonifay Baller Neo', 149.95,  "JetPilot Men's Bonifay Baller Neo Comp Vest", 'PFDs', 'JetPilot', 'vest', 'adults', 'purple', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP21145BONIFAYBALLERREDUX_LA_IN_F_720x.jpg?v=1630655557', 4.9 ),
    (uuid(), 'Type I Commercial', 59.99,  'KENT-Type I commercial life jacket, adult over 90lb', 'PFDs', 'KENT', 'vest', 'adults', 'orange', 'https://newcontent.westmarine.com/content/images/catalog/large/103723_LRG.14012020103004.jpg', 4.0 ),
    (uuid(), 'Type I Comfort Deluxe', 99.99,  'WEST MARINE-Type I comfort deluxe life jacket', 'PFDs', 'WEST MARINE', 'vest', 'adults', 'orange', 'https://newcontent.westmarine.com/content/images/catalog/large/15911373_LRG.jpeg', 4.0 ),
    (uuid(), 'Type III/V Work', 69.99,  'MUSTANG SURVIVAL-Type III/V Work life jacket', 'PFDs', 'MUSTANG SURVIVAL', 'vest', 'adults', 'orange', 'https://newcontent.westmarine.com/content/images/catalog/large/10929511_LRG.jpg', 4.4 ),
    (uuid(), 'HeySplash Kids Jacket', 25.99,  'Comes with durable heavy-duty gear zipper, double safety protection to guard your kids safety.', 'PFDs', 'HeySplash', 'vest', 'youth', 'blue', 'https://m.media-amazon.com/images/I/81cl560qAPS._AC_SX679_.jpg', 5.4),
    (uuid(), 'ONeill Child Reactor', 39.97,  'Comfortable enough to wear all day. Closed-cell PVC foam. Anatomical flex points increase mobility. USCG approved', 'PFDs', 'ONeill', 'vest', 'youth', 'green', 'https://www.overtons.com/dw/image/v2/BCJK_PRD/on/demandware.static/-/Sites-global-master-catalog/default/dw58c40222/images/large/300054_BKYW_1.jpg?sw=800&sh=800', 5.5),

    (uuid(), 'Distance Paddle', 29.83,  'Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Riot', 'paddle', 'adult', 'orange', 'https://www.rei.com/media/2ba78159-0a17-44a7-a533-70ee13a00f9b?size=784x588', 5.0 ),
    (uuid(), 'Marathon Paddle', 44.83,  'Wrapped fiberglass shaft with ovalized grip is lightweight yet strong. Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Riot', 'paddle', 'adult', 'black', 'https://www.rei.com/media/c6f4a325-4d5a-4088-9074-33360f093dff?size=784x588', 0.0 ),
    (uuid(), 'Sting Ray Paddle', 129.95,  'Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Aqua-Bound', 'paddle', 'adult', 'yellow', 'https://www.rei.com/media/bd17145e-3b7e-4e2b-a9d7-9238a91935f8?size=784x588', 4.6 ),
    (uuid(), 'Magic Plus Paddle', 114.95,  'Fiberglass-reinforced polypropylene blades are both lightweight and durable. Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Carlisle', 'paddle', 'adult', 'blue', 'https://www.rei.com/media/9b92b227-2780-47b1-934b-8df81e737074?size=784x588', 5.0 ),

    (uuid(), 'Direct Mens Knit', 24.99,  'Stretchy knit upper for breathability and comfort', 'watershoes', 'DSG', 'mens', 'adult', 'grey', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFMMNSKNTWTRSHFOT_Grey_Light_Grey?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Mens 3T Cinch', 39.99,  'IDS (integrated drainage system) cools the foot out of the water with air circulation. Adjustable shocklace. Three-toe design', 'watershoes', 'Body Glove', 'mens', 'adult', 'black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/17BGLM3TBRFTCNCHBFOT_Black_Black?wid=1000&fmt=pjpeg', 4.0 ),
    (uuid(), 'Mens Vortex', 59.99,  'Phylon midsole. Open design to promote water drainage. Integrated Drainage System (IDS) disperses water and increases breathability. Slip-on design for easy on and off', 'watershoes', 'Body Glove', 'mens', 'adult', 'black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21BGLMMVRTXBLKRDXFOT_Black_Yellow?qlt=70&wid=600&fmt=webp', 4.0 ),
    (uuid(), 'Womens Core', 11.99,  'Mesh and neoprene upper for breathability and comfort.', 'watershoes', 'DSG', 'womens', 'adult', 'black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFWWMNSCRWTRSHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 4.0 ),
    (uuid(), 'Womens Knit', 24.99,  'Stretch Knit Upper for breathability and comfort.', 'watershoes', 'DSG', 'womens', 'adult', 'black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFWWMNSCRWTRSHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Womens 3T Cinch', 34.99,  'Adjustable shocklace. Easy entry with the 3-toe design. Ultra-grip rubber outsole', 'watershoes', 'Body Glove', 'womens', 'adult', 'black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/17BGLWW3TBRFTCNCHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Kids Newport H2SHO', 64.99,  'Machine washable. Lace-lock bungee system with adjustable hook-and-loop strap. Breathable mesh lining', 'watershoes', 'KEEN', 'kids', 'kids', 'blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/22KEEYYNWPRTH2SHBFOT_Cobalt?qlt=70&wid=600&fmt=webp', 4.3 ),
    (uuid(), 'Direct Youth Knit', 19.99,  'Stretch knit upper for breathability and comfort.', 'watershoes', 'DSG', 'kids', 'kids', 'yellow/black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFYYTHKNTWTRSHFOT_Black_Volt?qlt=70&wid=600&fmt=webp', 5.0 );
