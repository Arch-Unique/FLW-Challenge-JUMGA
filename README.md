# Jumga Demo Site

A quick online demo can be found here :
[jumga-arch.herokuapp.com](https://jumga-arch.herokuapp.com)

This is a simple demo site showing the usage of the flutterwave payment integration for an acclaimed company by the name JUMGA. Made By Idigo Ikenna. Check [jumga-arch.herokuapp.com/about.html](https://jumga-arch.herokuapp.com/about.html) for more info about me

## Requirements

---

- npm
- heroku
- mongodb url (Using mongodb atlas or any other database package)

## Procedures (On Online Server)

---

- Make sure to set this env vars when deploying to heroku

  ```env
  PORT=3000 {or any number you choose}
  FLWPUBLICKEY={your flutterwave public key}
  FLWSECRETKEY={your flutterwave secret key}
  FLWENCKEY={your flutterwave encryption key}
  ```

- Make sure your mongodb is set up correctly. The project makes use of an online database situated on the cloud. You can use the online edition and change the **dbUrl** constant in **config/constants**.

- You can also change the hardcoded hostname in **flwpay/initFlw.js** to suit your own needs

- Open [jumga-arch.herokuapp.com](https://jumga-arch.herokuapp.com) on your browser

## Brief Rundown

---

- When the site is opened , you would choose a country for simulation . In real life cases , this would be automatically retrieved but for the purpose of this challenge , you have to just choose.

- The server will then set up a mini demo account for testing purposes automatically.

- Then for the MVP requirements ,

  - SHOP APPROVAL FEE <br>
    Go to Profile -> Create Shop . Then choose the currency you want to simulate the payment in. The server automatically retrieves the **Fx rate** and serves you the **flutterwave standard payment modal** <br>
    After Payment , if successful , a success page is shown and if you navigate back to Profile Page , you'd automatically see your shop created and the dispatch rider already assigned to the shop.

  - PRODUCT SALES DISTRIBUTION <br>
    From the challenge problem, it is obtained that we use the following percentages for sharing the sale of any product.

    - 2.5% of the product cost goes to JUMGA for a successful sale while the rest 97.5% goes to the seller
    - 20% of the delivery fee which I fixed at $10 goes to JUMGA while the remaining 80% goes to the dispatch rider.

    Using this percentages , whenever you navigate to buy any product on the site , based on the country that was simulated early on , the prices for those product are automatically converted to their respective currencies. If the purchase is successful , a success page is shown to the user as confirmation.  
     <br>

    Finally, to check the that each of the parties got their money we used the **bulk transfer option** provided by flutterwave to send their profits. To visualize there is a page _[jumga-arch.herokuapp.com/salesdb.html](https://jumga-arch.herokuapp.com/salesdb.html)_ that shows the amount each party got for the sale.

## Notes

---

To restart the database for you to be able to choose another country for simulation. Go to the about page [jumga-arch.herokuapp.com/about.html](https://jumga-arch.herokuapp.com/about.html) and click on the **restart** button.

All the links on this readme will only work when you've successfully followed the procedures.
