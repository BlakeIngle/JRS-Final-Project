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

    (uuid(), 'Mustang 100X', 399.99,  '1 person sit-in kayak', 'kayaks', 'Pelican', 'sit-in', "10FT", 'Green', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/18PELUMSTNG100XKYPSK_Borealis?qlt=70&wid=1100&fmt=webp', 4.5 ),
    (uuid(), 'Teton 100 Angler', 479.99,  '1-person sit-on-top fishing kayak', 'kayaks', 'Lifetime', 'sit-on-top', "10FT", 'Blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/19LIFUTTNNGLRXXXXPSK_Azure_Fusion-1?qlt=70&wid=1100&fmt=webp', 4.2 ),
    (uuid(), 'Rambler 13.5', 699.00,  '2 person sit-on-top kayak', 'kayaks', 'Perception', 'sit-on-top', "13FT", 'Blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/15PTNURMBLR135TNDPSK_Dapper?qlt=70&wid=1100&fmt=webp', 4.7 ),
    (uuid(), 'Yellowfin 100', 799.99,  '1 person sit-in kayak', 'kayaks', 'Vibe', 'sit-on-top', "10FT", 'Blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/20TLRAYLLWFN100XXPSK_Caribbean_Blue?qlt=70&wid=1100&fmt=webp', 4.6 ),
    (uuid(), 'Getaway 110 Pedal Drive', 1054.99,  '1 person sit-on-top pedal kayak', 'kayaks', 'Pelican', 'sit-on-top', "10FT", 'Blue', 'https://www.rei.com/media/1f7c6180-d6ce-42b9-a91d-e0cdab00dfbb?size=784x588', 0.0 ),
    (uuid(), 'Lono Aero', 1749.00,  '1 person sit-on-top pedaling inflatable kayak and stand-up paddleboard', 'kayaks', 'Bote', 'sit-on-top', "12FT", 'Blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21CQMALNKYKXXXXXXPSK_Seafoam_Gray?qlt=70&wid=1100&fmt=webp', 0 ),
    (uuid(), 'Haven TT', 1999.99,  '2 person fold-up tandem Haven TT sit-in kayak', 'kayaks', 'Oru', 'sit-in', "16FT", 'white', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21ANZAHVNTTKYKXXXPSK_White?qlt=70&wid=1100&fmt=webp', 0.0 ),
    (uuid(), 'PK14 Angler', 2337.30,  '2 person 14-foot sit on top tandem pedal fishing kayak w/ instant reverse pedal drive, hand control rudder, paddle, and upright seat', 'kayaks', 'BKC', 'sit-on-top', "14FT", 'Blue', 'https://cdn.shopify.com/s/files/1/0086/9128/6076/products/Blue_Format.png?v=1649093514', 4.2 ),
    (uuid(), 'PK11 Angler', 1437.30,  '1 person 10.5-foot sit on top solo fishing kayak w/ trolling motor, paddle, and upright aluminum seat', 'kayaks', 'BKC', 'sit-on-top', "10FT", 'Brown', 'https://cdn.shopify.com/s/files/1/0086/9128/6076/products/pk11_5_edited.jpg?v=1649430919', 4.3 ),
    (uuid(), 'Access 9.5', 489.00,  '1 person sit-on-top kayak', 'kayaks', 'Pelican', 'sit-on-top', "9FT", 'Red/Yellow', 'https://newcontent.westmarine.com/content/images/catalog/large/19381284_LRG.26112018103026.jpg', 4.5 ),
    (uuid(), 'Brume 100XP Kayak with Paddle', 329.89,  '1 person sit-in kayak', 'kayaks', 'Pelican', 'sit-in', "10FT", 'Blue', 'https://www.rei.com/media/369def2b-2b92-42bb-9890-451c28183d87?size=784x588', 5.0 ),
    (uuid(), 'Tundra 103 Kayak', 539.89,  '1 person sit-in kayak', 'kayaks', 'Lifetime', 'sit-in', "10FT", 'Blue', 'https://www.rei.com/media/f847b562-f71e-4f3e-8386-c08a4dce3d3d?size=784x588', 5.0 ),
    (uuid(), 'Mirage Passport 12 with pedal', 1869.00,  '1 person sit-on-top pedal kayak', 'kayaks', 'Hobie', 'sit-on-top', "10FT", 'Brown', 'https://www.rei.com/media/f847b562-f71e-4f3e-8386-c08a4dce3d3d?size=784x588', 4.7 ),
    (uuid(), 'Delta 15s Kayak', 2295.00,  '1 person sit-in kayak', 'kayaks', 'Delta', 'sit-in', "15FT", 'Blue', 'https://www.rei.com/media/cca4af6b-08e1-4112-883d-3d082a762fa7?size=784x588', 4.7 ),
    (uuid(), 'Pungo 120 Kayak', 1189.00,  '1 person sit-in kayak, easy-to-paddle, efficient, sit-inside design with long waterline offers excellent speed and tracking', 'kayaks', 'Wilderness Systems', 'sit-in', "12FT", 'Red/Yellow', 'https://www.rei.com/media/8e7c4438-f7f4-4c0a-b4c4-cc4b8b1bf3c8?size=784x588', 4.3 ),
    (uuid(), 'Pungo 125 Kayak', 1189.00,  '1 person sit-in kayak, easy-to-paddle, efficient, sit-inside design with long waterline offers excellent speed and tracking', 'kayaks', 'Wilderness Systems', 'sit-in', "12FT 16IN", 'Blue/Green', 'https://www.rei.com/media/623ff6bf-af9e-42b7-81a7-72e212ad7133?size=784x588', 4.6 ),
    (uuid(), 'AirVolution Inflatable Kayak', 1103.89,  '1 person sit-in kayak, extremely durable, drop-stitch construction inflates with high-pressure rigidity for high-performance paddling', 'kayaks', 'Advanced Elements', 'sit-in', "13FT", 'Blue/Gray', 'https://www.rei.com/media/623ff6bf-af9e-42b7-81a7-72e212ad7133?size=784x588', 4.5 ),
    (uuid(), 'Axis 10.5 Kayak', 1059.00,  '1 person sit-in kayak', 'kayaks', 'Dagger', 'sit-in', "10FT 6IN", 'Red/Black', 'https://www.rei.com/media/a5fbc78b-ecbe-4df8-82cf-09c74c737313?size=784x588', 5.0 ),

    (uuid(), 'Recruit Neo', 59.99,  'JetPilot Recruit Neo PFD', 'PFDs', 'JetPilot', 'life-vest/jacket', 'adults', 'Black', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP15238_RECRUIT_PFD_BLACK_F_720x.jpg?v=1651560295', 4.5 ),
    (uuid(), 'A-10 Comp', 99.99,  'JetPilot A-10 Comp Vest', 'PFDs', 'JetPilot', 'life-vest/jacket', 'adults', 'Green', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP16227_A10_GREEN_720x.jpg?v=1643940528', 4.0 ),
    (uuid(), 'L.R.E. Helmsman Neo', 119.95,  "JetPilot men's L.R.E. Helmsman Neo USCG approved life-vest/jacket", 'PFDs', 'JetPilot', 'life-vest/jacket', 'adults', 'Black', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/NEW_JP20101_REVISED_Helmsman_Neo_PFD_Radio_Strap_720x.jpg?v=1648521451', 4.8 ),
    (uuid(), 'Bonifay Baller Neo', 149.95,  "JetPilot Men's Bonifay Baller Neo Comp Vest", 'PFDs', 'JetPilot', 'life-vest/jacket', 'adults', 'Purple', 'https://cdn.shopify.com/s/files/1/0164/3964/0128/products/JP21145BONIFAYBALLERREDUX_LA_IN_F_720x.jpg?v=1630655557', 4.9 ),
    (uuid(), 'Type I Commercial', 59.99,  'KENT-Type I commercial life jacket, adult over 90lb', 'PFDs', 'KENT', 'life-vest/jacket', 'adults', 'Orange', 'https://newcontent.westmarine.com/content/images/catalog/large/103723_LRG.14012020103004.jpg', 4.0 ),
    (uuid(), 'Type I Comfort Deluxe', 99.99,  'WEST MARINE-Type I comfort deluxe life jacket', 'PFDs', 'WEST MARINE', 'life-vest/jacket', 'adults', 'Orange', 'https://newcontent.westmarine.com/content/images/catalog/large/15911373_LRG.jpeg', 4.0 ),
    (uuid(), 'Type III/V Work', 69.99,  'MUSTANG SURVIVAL-Type III/V Work life jacket', 'PFDs', 'Mustang Survival', 'life-vest/jacket', 'adults', 'Orange', 'https://newcontent.westmarine.com/content/images/catalog/large/10929511_LRG.jpg', 4.4 ),
    (uuid(), 'HeySplash Kids Jacket', 25.99,  'Comes with durable heavy-duty gear zipper, double safety protection to guard your kids safety.', 'PFDs', 'HeySplash', 'life-vest/jacket', 'youth', 'Blue', 'https://m.media-amazon.com/images/I/81cl560qAPS._AC_SX679_.jpg', 5.4),
    (uuid(), 'ONeill Child Reactor', 39.97,  'Comfortable enough to wear all day. Closed-cell PVC foam. Anatomical flex points increase mobility. USCG approved', 'PFDs', 'ONeill', 'life-vest/jacket', 'youth', 'Green', 'https://www.overtons.com/dw/image/v2/BCJK_PRD/on/demandware.static/-/Sites-global-master-catalog/default/dw58c40222/images/large/300054_BKYW_1.jpg?sw=800&sh=800', 5.5),
    (uuid(), 'Ninja PFD', 118.29, 'Soft, PVC-free foam panels are shaped for comfort; floating front panel follows your movements and doubles as a handwarmer on chilly days', 'PFDs', 'NRS', 'life-vest/life-jacket', 'youth', 'Red/Orange', 'https://www.rei.com/media/ebcfc92a-7db6-4e06-9029-3df8ab4fb5d8?size=784x588', 4.7),
    (uuid(), 'Youth Livery PFD', 19.83, 'For kids/youths 50 - 90 lbs. with some swimming ability', 'PFDs', 'MTI', 'life-vest/life-jacket', 'youth', 'Orange/Black', 'https://www.rei.com/media/34e73717-8f34-4d69-8db3-b7725e731474?size=784x588', 4.0),
    (uuid(), 'Float Coat Dog Life Jacket', 89.95, 'Strong, low-profile handle is optimally positioned to help lift dogs out of water', 'PFDs', 'Ruffwear', 'life-vest/life-jacket/Dogs', 'small/medium/large', 'Blue/Green', 'https://www.rei.com/media/e07bdb0c-844c-4dd6-9ac4-c9593b215f22?size=784x588', 4.8),
    (uuid(), 'Child PFD', 41.93, 'Type III PFD with sea-level buoyancy of 8 lbs. 6 oz. provide good support to kids with some swimming skills; not designed to turn kids face up', 'PFDs', 'Stohlquist', 'life-vest/life-jacket', 'youth', 'Red/Yellow/Blue', 'https://www.rei.com/media/a888ae07-9289-43e7-9913-bf999d52f6fc?size=784x588', 4.3),
    (uuid(), 'Rev Young Adult PFD', 63.69, 'Bright material stands out in the water, and its durable enough to stand up to nonstop use', 'PFDs', 'Mustang Survival', 'life-vest/life-jacket', 'youth', 'Gray/Yellow', 'https://www.rei.com/media/31d342ee-3ee6-46f3-9fde-e632889eff3b?size=784x588', 5.0),
    (uuid(), 'Escape Youth PFD', 76.39, 'Full adjustability at sides and shoulders for a secure, comfortable fit; waist belt has a front quick-release buckle for easy entry', 'PFDs', 'Stohlquist', 'life-vest/life-jacket', 'youth', 'Gray/Green', 'https://www.rei.com/media/c0ac310f-1ef3-4047-9640-7d345f780000?size=784x588', 5.0),
    (uuid(), 'Rev Youth PFD', 41.19, 'Bright material stands out in the water, and its durable enough to stand up to rough-and-tumble antics; its also ultrasoft and stain-resistant', 'PFDs', 'Mustang Survival', 'life-vest/life-jacket', 'youth', 'Red/Blue', 'https://www.rei.com/media/e833e76c-2bee-418a-800f-f61f595381b7?size=784x588', 5.0),

    (uuid(), 'Distance Paddle', 29.83,  'Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Riot', 'paddle', 'adult', 'Orange', 'https://www.rei.com/media/2ba78159-0a17-44a7-a533-70ee13a00f9b?size=784x588', 5.0 ),
    (uuid(), 'Marathon Paddle', 44.83,  'Wrapped fiberglass shaft with ovalized grip is lightweight yet strong. Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Riot', 'paddle', 'adult', 'Black', 'https://www.rei.com/media/c6f4a325-4d5a-4088-9074-33360f093dff?size=784x588', 0.0 ),
    (uuid(), 'Sting Ray Paddle', 129.95,  'Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Aqua-Bound', 'paddle', 'adult', 'Yellow', 'https://www.rei.com/media/bd17145e-3b7e-4e2b-a9d7-9238a91935f8?size=784x588', 4.6 ),
    (uuid(), 'Magic Plus Paddle', 114.95,  'Fiberglass-reinforced polypropylene blades are both lightweight and durable. Take-apart 2-piece design makes for easy storage and transport. Hand grips ensure comfort. Drip rings prevent excess water from running down the shaft', 'paddles', 'Carlisle', 'paddle', 'adult', 'Blue', 'https://www.rei.com/media/9b92b227-2780-47b1-934b-8df81e737074?size=784x588', 4.4 ),
    (uuid(), 'Whisper Paddle', 74.95,  'Nearly silent blade shape enters and exits water cleanly', 'paddles', 'Bending Branches', 'paddle', 'adult', 'Black', 'https://www.rei.com/media/7e50276a-7d50-4e61-94f9-876f25731496?size=784x588', 5.0 ),
    (uuid(), 'Sting Ray Posi-Lok Kayak Paddle', 174.95,  'Simple, intuitive and strong, the Posi-Lok® ferrule uses a 2-button release to detach and adjust feather angle', 'paddles', 'Aqua-Bound', 'paddle', 'adult', 'White', 'https://www.rei.com/media/965f0c4b-9e7b-472b-9cac-d77039f860e9?size=784x588', 5.0 ),
    (uuid(), 'Sting Ray Posi-Lok 2-Piece Kayak Paddle', 224.95,  'Simple, intuitive and strong, the Posi-Lok® ferrule uses a 2-button release to detach and adjust feather angle', 'paddles', 'Aqua-Bound', 'paddle', 'adult', 'Black', 'https://www.rei.com/media/409e6a2f-d1b7-4b4c-98ab-ded0d641e28d?size=784x588', 4.4 ),
    (uuid(), 'Magic Mystic Kayak Paddle', 62.93,  'Reinforced dihedral blade design provides an efficient stroke', 'paddles', 'Carlisle', 'paddle', 'adult', 'Red', 'https://www.rei.com/media/3db69822-51c3-4583-9b6e-51379ef7a8de?size=784x588', 4.3 ),
    (uuid(), 'Angler Classic Kayak Paddle', 159.95,  'Fiberglass shaft and fiberglass-reinforced nylon blades offer a warm feel in your hands and high durability', 'paddles', 'Bending Branches', 'paddle', 'adult', 'Green', 'https://www.rei.com/media/7f96a233-69d1-4d2d-9a5f-39e1f2b2eb9a?size=784x588', 4.4 ),
    (uuid(), 'Tango Fiberglass 2-Piece Kayak Paddle', 324.95,  'Fiberglass shaft and fiberglass-reinforced nylon blades offer a warm feel in your hands and high durability', 'paddles', 'Aqua-Bound', 'paddle', 'adult', 'Green', 'https://www.rei.com/media/367eb166-f542-4661-927f-123c5bc80bcc?size=784x588', 5.0 ),
    (uuid(), 'Explorer FX Slider Kayak Paddle', 82.39,  'Durable fiberglass shaft and fiberglass-reinforced nylon blades', 'paddles', 'Cannon', 'paddle', 'adult', 'Yellow', 'https://www.rei.com/media/42a3f5fd-6323-404e-b273-abc59d6e4c38?size=784x588', 5.0 ),
    (uuid(), 'Pack Tour M 4-Piece Kayak Paddle', 359.00,  'Adjustable shaft changes length from 210 - 225cm with a simple, tight-fitting system; adjust length for open water or tighter moving water rivers and streams', 'paddles', 'Werner', 'paddle', 'adult', 'Red', 'https://www.rei.com/media/fe348a2a-789e-4c7d-a9f3-6e7b1f720d8c?size=784x588', 2.7 ),

    (uuid(), 'Direct Mens Knit', 24.99,  'Stretchy knit upper for breathability and comfort', 'watershoes', 'DSG', 'mens', 'adult', 'gray', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFMMNSKNTWTRSHFOT_Grey_Light_Grey?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Mens 3T Cinch', 39.99,  'IDS (integrated drainage system) cools the foot out of the water with air circulation. Adjustable shocklace. Three-toe design', 'watershoes', 'Body Glove', 'mens', 'adult', 'Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/17BGLM3TBRFTCNCHBFOT_Black_Black?wid=1000&fmt=pjpeg', 4.0 ),
    (uuid(), 'Mens Vortex', 59.99,  'Phylon midsole. Open design to promote water drainage. Integrated Drainage System (IDS) disperses water and increases breathability. Slip-on design for easy on and off', 'watershoes', 'Body Glove', 'mens', 'adult', 'Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21BGLMMVRTXBLKRDXFOT_Black_Yellow?qlt=70&wid=600&fmt=webp', 4.0 ),
    (uuid(), 'Womens Core', 11.99,  'Mesh and neoprene upper for breathability and comfort.', 'watershoes', 'DSG', 'womens', 'adult', 'Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFWWMNSCRWTRSHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 4.0 ),
    (uuid(), 'Womens Knit', 24.99,  'Stretch Knit Upper for breathability and comfort.', 'watershoes', 'DSG', 'womens', 'adult', 'Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFWWMNSCRWTRSHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Womens 3T Cinch', 34.99,  'Adjustable shocklace. Easy entry with the 3-toe design. Ultra-grip rubber outsole', 'watershoes', 'Body Glove', 'womens', 'adult', 'Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/17BGLWW3TBRFTCNCHFOT_Black_Pink?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Newport H2SHO', 64.99,  'Machine washable. Lace-lock bungee system with adjustable hook-and-loop strap. Breathable mesh lining', 'watershoes', 'KEEN', 'mens', 'adult', 'Blue', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/22KEEYYNWPRTH2SHBFOT_Cobalt?qlt=70&wid=600&fmt=webp', 4.3 ),
    (uuid(), 'Direct Youth Knit', 19.99,  'Stretch knit upper for breathability and comfort.', 'watershoes', 'DSG', 'womens', 'adult', 'yellow/Black', 'https://images.dickssportinggoods.com/is/image/GolfGalaxy/21QYFYYTHKNTWTRSHFOT_Black_Volt?qlt=70&wid=600&fmt=webp', 5.0 ),
    (uuid(), 'Arroyo Wetshoes', 37.95,  'Flexible, sleek design is easy to tuck into tight kayaks or pack into stuffed gear bags', 'watershoes', 'NRS', 'womens', 'adult', 'Blue/Gray', 'https://www.rei.com/media/6864a862-92d7-41c7-aed2-668423c1a111?size=784x588', 5.0 ),
    (uuid(), 'Aqua X Sport Water Shoes', 129.95,  'Open mesh uppers are lightweight, shed water and dry super fast when wet', 'watershoes', 'Xero Shoes', 'mens', 'adult', 'Blue/Orange', 'https://www.rei.com/media/8c8d72d7-b7d1-412b-b612-bb9443cf0de3?size=784x588', 4.7),
    (uuid(), 'Newport H2 Sandals', 129.95,  'Polyester webbing uppers and quick-dry linings are happy on land and in water, so you can go right through streams and keep on hiking', 'watershoes', 'KEEN', 'womens', 'adult', 'Tie-Dye', 'https://www.rei.com/media/d05e6dd5-c309-467a-8ae6-4ff39e125d49?size=784x588', 4.6),
    (uuid(), 'Whisper Sandals', 119.95,  'Polyester webbing uppers are designed for a comfortable, secure fit and dry quickly; nylon mesh linings enhance comfort and moisture control', 'watershoes', 'KEEN', 'womens', 'adult', 'Blue', 'https://www.rei.com/media/e88cf6aa-2169-405e-b204-f75770a26603?size=784x588', 4.4),
    (uuid(), 'Targhee III Sandals', 139.95,  'Waterproof, premium leather uppers provide durable protection; static lace-lock system secures your fit', 'watershoes', 'KEEN', 'mens', 'adult', 'Brown', 'https://www.rei.com/media/5e0bccbf-36f4-4d8b-8dc7-aadf40443fde?size=784x588', 4.2),
    (uuid(), 'Sizzle Eco Vegan Shoes', 44.73,  'Bungee cording and airy cutouts offer a secure fit and breathability. Vegan construction with partially recycled materials', 'watershoes', 'JBU', 'womens', 'adult', 'Gray', 'https://www.rei.com/media/ba1f53c2-f1db-4e88-89b6-743227216441', 4.4),
    (uuid(), 'Loyak Water Shoes', 95.00,  'Rugged hydrophobic canvas uppers are securely held to your feet via stretch-mesh tongues and flat laces, providing a reliable fit', 'watershoes', 'Astral', 'mens', 'adult', 'Gray', 'https://www.rei.com/media/2451659d-0558-4d37-a660-08c00589a389?size=784x588', 4.3),
    (uuid(), 'Crossamphibian Swift 2 Water Shoes', 89.95,  'Sustainably built, every pair includes the equivalent of 1.75 plastic bottles, 2 ears of corn, and 10 grams of bamboo fibers, all post consumer', 'watershoes', 'Salomon', 'mens', 'adult', 'Gray/Yellow', 'https://www.rei.com/media/75476402-9e73-4759-9f94-4f508cd205a0?size=784x588', 4.3);
