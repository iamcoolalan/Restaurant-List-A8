# Restaurant List
A simple web application for restaurant fanatic

![JavaScript Style Guide](./public/pictures/homepage.png)

## Features

- listing restaurant from MongoDB
- create new restaurant
- showing restaurant detail 
- edit exist restaurant
- delete restaurant
- searching restaurant by name
- searching restaurant by category
- sort restaurants by chosen condition

## How to use 

1. please confirm you have already installed node.js and npm first
2. clone this repository to your computer
3. use the terminal to access the folder , and then type the command below

   ```bash
   npm install
   ```

4. after the installation complete,set env params to connect your MongoDB

   ```bash
   MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
   ```

5. create test data

   ```bash
   npm run seed
   ```   

6. after you created test data , keep typing

   ```bash
   npm run start
   ```

7. if you see this message means the server is on, you can use that URL to go into the website

   ```bash
   App is running on http://localhost:3000
   ```  

8. if you want to stop it, use command below

   ```bash
   ctrl + c
   ```

## Code style
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Tech/framework used

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

![NodeJs](https://img.shields.io/badge/Node.js-v14.16.0-339933?style=for-the-badge&logo=Node.js)

![mongoose](https://img.shields.io/badge/mongoose-v5.9.7-880000?style=for-the-badge&logo=mongoose)

![bootstrap](https://img.shields.io/badge/bootstrap-v5.3.1-7952B3?style=for-the-badge&logo=bootstrap)

![Express.js](https://img.shields.io/badge/express.js-v4.17.1-000000?style=for-the-badge&logo=express.js)

![express_handlebars](https://img.shields.io/badge/express_handlebars-v4.0.2-f28500?style=for-the-badge&logo=express_handlebars)

![body-parser](https://img.shields.io/badge/body_parser-v1.20.2-fffd7e?style=for-the-badge&logo=body_parser)
