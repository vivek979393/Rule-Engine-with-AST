# Application 1: Rule Engine using AST by Vivek Shukla

Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
user eligibility based on attributes like age, department, income, spend etc.The system can use
Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification of these rules.

# Tech Stack:

1. Backend: Built with Node.js and Express.js
2. Database: Utilizes MongoDB
3. frontend: React.js

# Prerequisites
Ensure Node.js and npm are installed.

Installation Steps
1. Clone the Repository
- `git clone "https://github.com/vivek979393/Rule-Engine-with-AST.git"`
2. Install the Backend Dependencies
- `npm install`
3. Create a .env file and add ur Mongo_url
- `MONGO_URL=""`
4. Launch the Server
 - `npm start`
## Run Project
### Frontend
- ` cd frontend`
- `npm start`
### Backend
- `cd backend`
- `npm start`
# API ENDPOINT
1. ## CREATE RULE
   - ### Navigate to the "Create Rule" section on the homepage.
   - ### Enter a rule string in the input field. Example:
   - `((age > 30 AND department = 'Marketing')) AND (salary >
20000 OR experience > 5)"`
3. ## EVALUATE RULE
   - ### Navigate to the "Evaluate Rule" section on the homepage.
   - ### Enter the rule ID you received when creating the rule.
   - `{"age": 35,
"department": "Sales", "salary": 60000, "experience": 3}`

