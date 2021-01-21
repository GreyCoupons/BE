# backend-refresh
relearning node

Heroku Production Endpoint:
https://greycoupon-test.herokuapp.com


Routes:
GET: /api/loadcoupons

Loads coupons data from Google Sheets.
No need to post anything, once the endpoint is reached, it commences the uploading process from the Google Sheets Data to the database.

GET: /api/removeExpired

Removes coupons that have expired by looking at their expiration dates.
