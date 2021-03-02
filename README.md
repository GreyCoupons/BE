# Grey Coupons Back End
App that provides discounts to various amazon products.

## Table of Contents

- [Links](#Links)
- [Table](#Table)
- [Routes](#Routes)

### Links

Heroku Production Endpoint:
https://greycoupon-test.herokuapp.com

Live Site:
https://grey.coupons/ 

Front End Repo:
https://github.com/GreyCoupons/FE 

### Table
| Column        |     Type      |    Required   |   Unique      |     Key       | 
| ------------- | ------------- | ------------- | ------------- | ------------- |
|     id        |  int          |    yes        | unique        | primary key   |
|  title         |  str          |            |                |               |
|   code   |       str       |             |               |             |
|      link     | str           |             |          |               |
|  price         |   int           |    yes        |               |               |
|      discount     | int           |              |         |               |
|  expirationDate         | date           |            |               |               |
|      category     | str           |            |         |               |
|  imageAddress         | str           |            |               |               |
|  featured         | str           |            |               |               |
|  rating         | int           |            |               |               |


### Routes:

GET: /api/loadcoupons

Loads coupons data from [Google Sheets](https://docs.google.com/spreadsheets/d/1x_PgDjeZ0UMk6wYGASQcnOFEMYXfRzWU22pnqNz-nP8/edit?usp=sharing).
No need to post anything, once the endpoint is reached, it commences the uploading process from the Google Sheets Data to the database.

GET: /get/featured
Retrieves all featured coupons so they can be loaded to the Featured section on Front End.

GET: /api/removeExpired

Removes coupons that have expired by looking at their expiration dates.

POST: /remove/coupon
Removes coupons by posting coupon ID.
