# Grey Coupons Back End
App that provides discounts to various amazon products.

Heroku Production Endpoint:
https://greycoupon-test.herokuapp.com

### Coupons
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


Routes:
GET: /api/loadcoupons

Loads coupons data from [Google Sheets](https://docs.google.com/spreadsheets/d/1x_PgDjeZ0UMk6wYGASQcnOFEMYXfRzWU22pnqNz-nP8/edit?usp=sharing).
No need to post anything, once the endpoint is reached, it commences the uploading process from the Google Sheets Data to the database.

GET: /api/removeExpired

Removes coupons that have expired by looking at their expiration dates.

POST: /remove/coupon
Removes coupons by posting coupon ID.
