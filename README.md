## Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Running Tests Coverage](#running-tests-coverage)
- [Repository](#repository)
- [Deployed Application](#deployed-application)

## Getting Started

Follow these instructions to get your application up and running.

### Requirements

List any software or dependencies that need to be installed before running the application. Include links to their official websites for more information.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/MrLuis-WebMaster/checkout-payment-fake.git.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

Explain how to run the application locally. Provide specific commands or scripts needed to start the application.

```bash
npm run dev
```

Your application should now be accessible at [http://localhost:5173/]( http://localhost:5173/).

## Running Tests

```bash
npm test
```

## Running Tests coverage

```bash
## Running Tests Coverage

npm test --coverage
```

This command will run the tests and provide information on test coverage, displaying the percentage of coverage for each file. You can then copy and paste the coverage results into your README:

```markdown
## Test Coverage Results


File                        | % Stmts | % Branch | % Funcs | % Lines | 
----------------------------|---------|----------|---------|---------|
All files                   |   81.53 |    38.51 |   56.09 |   81.81 |                   
 src                        |     100 |      100 |     100 |     100 |                   
  App.tsx                   |     100 |      100 |     100 |     100 |                   
  router.tsx                |     100 |      100 |     100 |     100 |                   
 src/components             |   73.14 |    29.82 |   46.15 |   74.03 | 
  Backdrop.tsx              |     100 |      100 |     100 |     100 | 
  CustomerFeedback.tsx      |   95.23 |      100 |      75 |   95.23 | 
  Details.tsx               |     100 |      100 |     100 |     100 | 
  FlowPayment.tsx           |   91.66 |    66.66 |      50 |   91.66 | 
  FormCard.tsx              |   36.36 |        0 |       0 |    38.7 | 
  FormCustomer.tsx          |   68.75 |    44.44 |      40 |   66.66 |   
  LoadingProcessPayment.tsx |   66.66 |      100 |       0 |   66.66 | 
  Steps.tsx                 |     100 |      100 |     100 |     100 | 
 src/redux                  |     100 |      100 |     100 |     100 | 
  store.ts                  |     100 |      100 |     100 |     100 | 
 src/redux/slices           |     100 |      100 |     100 |     100 | 
  paymentSlice.ts           |     100 |      100 |     100 |     100 | 
 src/services               |      25 |        0 |       0 |   14.28 | 
  simulateApi.service.ts    |      25 |        0 |       0 |   14.28 | 
 src/utils                  |     100 |     92.3 |     100 |     100 | 
  identifyCardType.ts       |     100 |      100 |     100 |     100 | 
  isExpirationDateValid.ts  |     100 |    85.71 |     100 |     100 | 
  logos.ts                  |     100 |      100 |     100 |     100 | 
 src/views                  |   94.11 |      100 |      75 |   93.75 |                   
  Product.tsx               |   94.11 |      100 |      75 |   93.75 |
```

## Repository

Link to [GitHub Repository](https://github.com/MrLuis-WebMaster/checkout-payment-fake.git).

## Deployed Application

Link to deployed [Link App](https://main.d2x3dzsxcso3zl.amplifyapp.com/).