#! /usr/bin/env node

import inquirer from "inquirer";

let currencyRates = {
  PKR: {
    USD: 0.0034,
    GBP: 0.0029,
    EUR: 0.0031,
    JPY: 0.54,
    CHF: 0.0032,
    CAD: 0.0049,
    PKR: 1,
  },
};
let loop: boolean = true;

while (loop) {
  const answers: {
    amount: number;
    from: "PKR";
    to: "USD" | "GBP" | "EUR" | "JPY" | "CHF" | "CAD";
  } = await inquirer.prompt([
    {
      type: "input",
      name: "amount",
      message: "How much do you want to convert?",
    },
    {
      type: "list",
      name: "from",
      message: "Which currency do you want to convert?",
      choices: ["PKR"],
    },
    {
      type: "list",
      name: "to",
      message: "Which currency do you want to convert to?",
      choices: ["USD", "GBP", "EUR", "JPY", "CHF", "CAD"],
    },
  ]);
  const { amount, from, to } = answers;
  let result;
  if (amount && from && to) {
    result = amount * currencyRates[from][to];
    console.log(
      "You have successfuly converted:",
      result,
      "Exchange Currency:",
      currencyRates[from][to]
    );
  }
  const more = await inquirer.prompt([
    {
      type: "confirm",
      name: "moreConvert",
      message: "Do you want to convert another currency?",
      default: false,
    },
  ]);
  if (more.moreConvert === false) {
    loop = false;
  }
}
