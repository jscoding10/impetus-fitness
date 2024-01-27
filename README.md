## Impetus Fitness
<img width="60%" src="https://github.com/jscoding10/impetus-fitness/assets/147340427/0e5373e5-bb65-48f3-b81a-9a2c4e52c153" />

**Deployed version:** https://impetus-fitness.onrender.com/
<br> 
<br>
Impetus Fitness is a full-stack web application with authentication that allows users to create and store a workout. When creating a workout, the user includes information like exercise category, name, load, reps, sets, and duration. The application then displays this information to the user on the Workout page. The user can also edit or delete a specific exercise in the workout by clicking the edit or delete icon. 

## Instructions
If you wish to use Impetus Fitness, please visit the <a href="https://impetus-fitness.onrender.com/">deployed version</a>. Next, sign up for an account or use the sign in information provided below for the demo account:
<br>
<div><b>Username:</b> impetusdemouser1@mail.com</div>
<br>
<div><b>Password:</b> impetusdemouser1@mail.com</div>
<br>
To create a workout, please navigate to the Create Workout page and add your exercises. To view your workout, please navigate to the Workout page. 
<br>
<br>

**To set up a local copy, follow these simple steps:**  
```
1. cd impetus-fitness-main
2. npm install  
3. npm run dev
4. cd client
5. npm install
6. npm run dev
```
Steps one through three set up the server. The server runs on localhost:3000.
<br>
<br>
Steps four through six set up the client. The client runs on localhost:5173.
<br>
<br>
For the local copy to work, you will need a MongoDB connection string and JWT Secret key in an .env file in the api folder.

## Technology Used
<img align="left" alt="HTML" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
<img align="left" alt="CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" />
<img align="left" alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
<img align="left" alt="Tailwind CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />
<img align="left" alt="Node" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
<img align="left" alt="Express" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
<img align="left" alt="MongoDB" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
<img align="left" alt="Redux" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
<br>
<br>
<br>

**Client:** HTML, CSS, JavaScript, React and Tailwind
<br>
**Server:** Node, Express
<br>
**Database:** MongoDB
<br>
**Global State Management:** Redux
<br>
**Images:** Corcel on Bittensor network
<br>
<br>
Once the user is authenticated, the user can create a new workout by adding exercises on the Create Workout page. The user inputs information, such as exercise category, name, load, reps, sets, and duration, and clicks the Create Workout button when complete. The exercise information will then render on the Workout page so the user can view it. From the Workout page, the user can edit or delete the exercise if desired by clicking the appropriate icon. Further, the user has the option to add another exercise to their routine if desired. From the Profile page, the user can update their account information, delete their account, or sign out.  

## Optimizations
Originally, I had two different states and event handlers for the exercise category and the form data on the Create Workout page. However, I found that I could make my code more efficient by using one state and one event handler for everything on the Create Workout page. After this, I updated the Update Workout page with the corresponding state and event handler used on the Create Workout page. 

## Lessons Learned
While completing Impetus Fitness, I improved my ability to integrate user authentication and responsive design into a full-stack application. Further, I honed my ability to design an aesthetic user interface in React that fetches data from a database and displays it to the user. Moreover, I learned how to use conditionals to render data in the user interface from a database based upon what the user enters. Finally, I improved my ability to create a responsive Header component and implement conditionals to display different Nav links based upon if a user is authenticated. 

## Improvements
One improvement to the application would be to add more features to the Welcome page. One feature might be a fitness goals input where users could create fitness goals for themselves. The fitness goals could be displayed on the Welcome page or a Goals page where users could track their goals and delete them once they are met.
<br>
<br>
Another improvement might be to integrate an artificial intelligence into the application where users could ask questions about diet, workout plans, fitness goals, and so on. The artificial intelligence would then respond based upon what the user entered and display its response. This would be an additional feature of the application. 
