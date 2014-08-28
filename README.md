sips-atos, SIPS/ATOS online payments API for node.js
===

Installation
---
```
npm install 'sips-atos'
```

Usage
---
1.Create a directory in your app directory and drop the files from your bank ('bin', 'param', ... folders)  :

```
/app
/atos-config
    /bin
      request
      ...
    /param
      certif.fr.011223344551111
      parmcom.011223344551111
      pathfile
      ...
/node_modules
```

2.Load 'sips-atos' and specify (at least) the path to your 'atos-config' folder.

````
var path = require('path'),
    AtosSIPS = require('../atos'),
    sips = new AtosSIPS({
        rootPath: path.join(__dirname, 'atos-config')
    });
```

3.Create the request and show the form in your view

```
app.get('/', function (req, res, next) {
    sips.request({
        merchant_id: '011223344551111', // Demo merchant id
        amount: '100',
        customer_id: '1',
        cancel_return_url: 'http://127.0.0.1:1337/return',
        normal_return_url: 'http://127.0.0.1:1337/return',
        automatic_response_url: 'http://127.0.0.1:1337/return'
    }, function (err, data) {
        if (err) {
            return next(new Error(err));
        }
        res.render('form', { data: data });
    });
});
```

----- The customer pay on the bank platform -----

3.Catch the DATA parameter in POST response by listening to the 'automatic\_response\_url'

```
app.post('/return', function (req, res, next) {
    sips.response(req.body.DATA, function (err, data) {
        // Your implementation
    });
});
```

4.You get an object in 'data', that follows the API specs :

```
{
  code,
  error,
  merchant_id,
  merchant_country,
  amount,
  transaction_id,
  payment_means,
  transmission_date,
  payment_time,
  payment_date,
  response_code,
  payment_certificate,
  authorisation_id,
  currency_code,
  card_number,
  cvv_flag,
  cvv_response_code,
  bank_response_code,
  complementary_code,
  complementary_info,
  return_context,
  caddie,
  receipt_complement,
  merchant_language,
  language,
  customer_id,
  order_id,
  customer_email,
  customer_ip_address,
  capture_day,
  capture_mode,
  data
}
```

Notes
---
* The following parameters are _required_ to perform a request :

	- merchant_id
	- customer_id
	- amount
	- automatic_response_url
	- normal_return_url 
	- cancel_return_url

Above those required parameters, you can specify other parameter that follows the API specs.

* Default language is set to 'fr' and currency to 'Euro', simply pass your own 'locale/currency' in
  the request to override, as shown above.
  
* Don't forget to check at the 'pathfile' Atos file, and fill requested paths according to your app _absolute_ location on the server

* Drop the credit card logos in a public dir, then fill this directory's _absolute_ location on the server
  in the 'atos/param/pathfile' file

* The '011223344551111' merchant\_id is the demo merchant\_id, edit it to use your own.

Run the example
---
* `cd` to the 'example' folder
* Create a folder 'config' and drop the files from your bank ('bin', 'param', ... folders)
* Run `npm install`, then `npm start`.
