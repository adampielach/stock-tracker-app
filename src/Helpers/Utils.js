import API from "./Api";

export const searchCompany = async function(query) {
  let search = await API.stocks.getCompanyData(
    "SYMBOL_SEARCH",
    `keywords=${query}`
  );
  let daily = await API.stocks.getCompanyData(
    "TIME_SERIES_DAILY",
    `symbol=${query}`
  );
  let globalQuote = await API.stocks.getCompanyData(
    "GLOBAL_QUOTE",
    `symbol=${query}&outputsize=compact`
  );

  let mergedResponses = {
    ...search.bestMatches[0],
    ...daily["Time Series (Daily)"][
      Object.keys(daily["Time Series (Daily)"])[0]
    ],
    ...globalQuote["Global Quote"]
  };
  return mergedResponses;
};

export const processCompany = function(data) {
  let companies = JSON.parse(localStorage.getItem("companies"))
    ? JSON.parse(localStorage.getItem("companies"))
    : [];
  let updatedCompanies = [...companies];
  let index = companies.findIndex(el => el.symbol === data.symbol);

  if (index > -1) {
    updatedCompanies[index] = { ...updatedCompanies[index], ...data };
  } else {
    updatedCompanies.push(data);
  }

  localStorage.setItem("companies", JSON.stringify(updatedCompanies));
};

export const stripResponse = function(data) {
  let response = { ...data };
  let newObject = {};
  Object.entries(response).forEach(entry => {
    newObject[entry[0].substring(entry[0].indexOf(" ") + 1)] = entry[1];
    return newObject;
  });

  return newObject;
};
