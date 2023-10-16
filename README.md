# ecar-dealership 🚗

## What is the purpose of this repository? 🤔

 This repository contains a project that is constantly updated and/or maintained by the author ***Proposterious*** (Maddox H.) with the purpose of completing **Independent Study (CS)** coursework. THe project is a website that uses the Nextjs React framework with the new technologies and/or plugins: **Typescript, Tailwind CSS, Next-Auth (for Nextjs Backend)**, and *other dependencies*. 

## What is your project then? 📎

 This project is named "*eCar Dealership*" and is a website built on **HTML, CSS, and Javascript (Typescript)**. The website itself is meant to mock modern car dealership webpages with believable content and information so that could pass as a legitimate website (although I obviously do not plan to run an actual dealership). The project in total will have totaled around 80 hours by its deployment and an unknown # following its deployment. I hope to abandon this project once the website contains all the content of a car dealership and it is running with minimal or close to 0 bugs by the point I am willing to declare my project as "completed". In detail, this project contains:
 - A homepage with inticing details and somewhat clean design
 - An about page with minimal information but also a somewhat intuitive design
 - A service page with all the necessary functionality and information (the ability to save vehicles to one's dashboard and accessibility to all of the vehicles' information.
 - An employment page which should contain a filter-able list of positions and locations
 - A support page which contains different ways of contacting the business (as if it were running 24/7)

## What are some major (and minor) issues you encountered? 🪲

 Believe it or not, I did not have much experience with HTML and CSS, let alone Javascript or any libraries such as React. However, my early exposure to HTML and CSS helped me get the hang of at least building the layout of the page with few questions or problems. The most difficult parts of this project have definitely been creating a backend to handle server requests in addition to making macro and micro optimizations to my code using Nextjs' Server and Client components in tandem, although I feel that I have done well knowing only the basics of server actions versus client actions. The easiest and most enjoyable part of the project for me was designing and creating the homepage. I learned a lot throughout the process about using flex and grid to produce a specific result in addition to how each of the two properties behave on their own or when they're nested together. I also, surprisingly, had very few issues making my website as responsive and user-friendly when used on different devices.

 ### In detail, what did you learn or how did you solve major problems? 😠

 **1. Frontend**:
    - **Tailwind CSS** was completely new to me so I found it easiest to use pre-existing websites and then use Tailwind's classes to produce the same result. This greatly increased the speed at which I learned how to use Tailwind to create styled components within a short period of time and with minimal googling or doc searching.
    - **Nextjs Framework** has two different ways of routing: **1) Pages 2) App Router**. I went with App Router based on other people's opinions and recommendations in addition to simply testing them both out. I determined I would have a much better time creating localized components when using the App Router since the App router works by labeling a folder and then creating a file inside called `'page.ts'` (page.js for javascript) where the page that would ultimately be displayed would be any code imported or written in the page.ts file. This allowed me to create subfolders for each of the pages and helped organize my code when creating more complex pages such as the `'/dashboard'` page and the `'service'` page.
    
 **2. Backend**:
    - **Nextjs** does not actually provide an efficient way of handling server requests or API calls, but thankfully **NextAuth** resolves this issue. While many common ways I have seen others handle API calls is with axios, Node, express, and django, I myself found NextAuth to be perfect for my project since it was made specifically for Nextjs and there were plenty of tutorials that would assist in setting up a simple handler file for CRUD operations. However, it actually helped me most to create separate files to handle many different individualized tasks rather than using a handler file to deal with all of the requests in my application.
    - Although I just talked about how much I loved NextAuth's ease of use, when it came to making changes to what would be passed in the session or token cookies, I encountered more problems that I wished to have had to spend so much of my time on. For example, I wanted to use **MongoDB/Mongoose** to handle all my user information and its retrieval; however, since MongoDB did not have a dedicated NextAuth adapter, I would have to either switch databases entirely or use schemas provided by **Prisma**. On top of not having a dedicated adapter which forced me to add yet another abstraction to my project, I would spend much of my time defining Schema's, walking through how to not have multiple instances of Prisma connections running at the same time (since you have to tell Prisma to disconnect every time before you exit a function), having to determine whether `db push` or `migrate dev` would actually update my database, etc. While these were all definitely small bugs with easy fixes most of the time, the abundancy of these issues can definitely get into your head.
    
 ***3. .env Files (sort of unrelated)***:
    - I still have no clue how I am meant to deploy my website using secretive passwords and urls without having them be visible to anyone willing to snoop around in search for them.
    
*4. I'm addicted to coding send help*

## What are your plans for the future? 📆

 I hope finishing this project will offer myself an advantage when applying to Engineering Schools at colleges and universities in the near future. My goal is to obtain a degree in Computer Science, although which branch I shall go down is not yet known. I have genuinely enjoyed each part of this project no matter how many issues I might have encountered along the way and at no point did I feel incapable of achieving my goal. This was the first major project I have had since my days coding terminal-only Python jeopardy games, and this most certaintly won't be the last. 
 
 ***To the future! 🥂***
 
