# Automation Testing at Ebay.com

Hallo Reviewer..
The automation testing script utilizes Selenium WebDriver, Cucumber, and Node.js to automate testing procedures. Upon executing npm test, the script will navigate to eBay.com, perform predefined actions, and validate expected behaviors as defined in the test scenario.

## Tech

Automation Testing uses a number of open source projects to work properly:

- [selenium_WebDriver]
- [Chromedriver]
- [Cucumbar]
- [node.js]


## Installation
> [!NOTE]  
> Please skip this installation if node module already exists
Automation Testing requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd Automation-Testing
npm i selenium-webdriver
npm i chromedriver
npm i --save-dev @cucumber/cucumber
npm test
```

## Usage
-npm test
-wait and done
-report being display in the console

## explaination
--Why am i used the cucumber?
because it is a highly useful tool for behavior-driven development (BDD) software testing. Cucumber allows you to write test scenarios in a human-readable language that can be understood by all stakeholders involved, including developers, testers, and other non-technical stakeholders. By using Cucumber, you can write test scenarios in the "Gherkin" format, which is easy to read and understand.

--why am i separate files into separate entities?
i am separate files into separate entities to be called anywhere, much like in Object-Oriented Programming (OOP), because this approach allows for a more organized and modular structure in software development. By separating functions or classes into separate files, you can easily understand and manage different parts of your code. This aids in managing complexity and allows for easier updates or fixes to specific parts of your application without disrupting other parts.

--Why is the report being displayed in the console?
actually I want to use extentReports because of time constraints to call and connect to the runner, Utilizing ExtentReports would enhance efficiency in this scenario.


