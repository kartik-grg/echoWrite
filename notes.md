using env variables
    after changing the env variable always restart the server as env file is only loaded once

    in react app:
        name of env var: REACT_APP_name
        accessing: process.env.REACT_APP_NAME
    in vite:
        name of env var: VITE_name
        accessing: import.meta.env.REACT_APP_NAME
    
    we can access the env var in each file where we want but it may have some problems like not able to fetch or treating it as number but env var should always be string
    production grade approach: therefore always create a folder named config->config.js and create an object in it, fetch all the env var here and then export this object. now use this object in all files.

for backend services, create all the functions in an object of a class so that it can be used universally. if u want to change the backend service then you only need to change these functions and no change is reqd in the frontend application

packages reqd
    1. @reduxjs/toolkit
    2. react-redux
    3. react-router-dom
    4. appwrite
    5. @tinymce/tinymce-react   //for text editor
    6. html-react-parser        //to parse html to component
    7. react-hook-form

to validate in react hook form use regexr website for the format of validations