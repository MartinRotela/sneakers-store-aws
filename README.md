Sneakers store backend.

Sneakers Catalogue backend, built using Node.js, Express.js,
Images are hosted by Cloudinary.
MySql database created using Sequelize and hosted by AWS RDS.
Passwords encrypted using Bcryptjs.
Credentials verification using Jsonwebtoken.

This app allows the user to see all available products and brands. it has two authentication levels:
-Admin Role: This level allows to create new products and brands, and modify them. Admins can create new users also.
-Sales Role: This level only allows to modify products and brands.

The whole app is hosted by AWS Beanstalk

Link: http://sneakers-store-aws.us-east-1.elasticbeanstalk.com/

Docs: https://documenter.getpostman.com/view/20307164/UzkV1bm

To run this app locally you should download this repo, install all packages using 'npm install' script. then you should use 'npm start'.
