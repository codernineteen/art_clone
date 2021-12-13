## Arrt`emis project
* * *
All the back-end instructions will be removed later

### Page outline

- Home
- product overview
- product detail page
- product size pop-up
- community (notice, Q&A)
- archive (lookbook, video)

### Main function outline

- search
- video
- pop-up

### Design feature

- grid, flex ( Arrangement of product and lookbood )
- Same nav-bar whole page
- background shadow when user search and clikc pop-up
- slide

### Back-end model list
- User (admin only)
      * name
      * email
      * password - pre hook (password hashing)
      * role

- Product
      * name
      * material
      * category(enum - top, hats, others) 
      * color (array - hex code)
      * sub sizeSchema (length, chest, arm, shoulder as to S, M , L , XL, FREE. if Free, there is no size detail)
      * quantity
      * price
      * detail image(cloudinary)
      * overview image(cloudinary)

- Notice
      * index
      * subject
      * name - user model reference
      * date - timestamps
      * read - total number of click

- Lookbook
      * date
      * title
      * subtitle
      * thumbnail - from first to four image
      * lookbook images

### Back-end controller list
- auth controller
      * login
            - compare password
            - token generate (payload, jwt secret, expire date)
                  + how to operate with refresh token?
            - attach token to cookie or session

      * logout
            - session or cookie remove

- user controller
      * get admin
      * create admin
      * update admin
      * delete admin

- product controller
      * get all products
      * get single product
      * create product
      * update product
      * delete product

- notice
      * get all notifications
      * get single notification
      * create
      * update
      * delete

- lookbook
      * get all lookbook
      * get single lookbook
      * create
      * update
      * delete


### Back-end util
- jwt
      * jwt token generate
      * attach token
      * jwt token validation

- check admin role

### Back-end route list
- home
- about

- products (all items)
      * top
      * hats
      * others(accesories?)

- community
      * notice
            + single notice
      * Q&A

- contact
- shipping returns
- privacy policy

### external link
- stores link
- portal link
- instagram link

#### Setup basic server
- [x] dotenv
- [x] import express
- [x] create an app
- [x] connect db
- [x] async server start function
- [x] import morgan (for logging response)

#### User model - admin only
- [x] name, email, password, rolde / pre hook, instance methods

#### Auth Routes Structure

#### Handle Password

#### JWT

#### Login Route

#### Logout Route

#### User Routes Structure

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup

#### Authorize Permissions Complete

#### createTokenUser in Utils

#### Setup and Apply checkPermissions()
