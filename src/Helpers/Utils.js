import API from "./Api";

const calculateChange = function(data) {
  let price = data.price;
  let close = data.close;
  let change = (price - close).toFixed(4);
  let changePercent = ((change / price) * 100).toFixed(4);
  let calculatedData = { ...data };

  calculatedData.change = change;
  calculatedData["change percent"] = changePercent + "%";
  return calculatedData;
};

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
  let companies = getCompanies();
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

export const refreshCompanies = function() {
  const trackedCompanies = getCompanies();

  let requestCollection = trackedCompanies.map(el =>
    API.stocks.getCompanyData(
      "TIME_SERIES_INTRADAY",
      `symbol=${el.symbol}&interval=5min`
    )
  );

  Promise.all(requestCollection).then(requests => {
    requests.forEach(request => {
      let symbol = request["Meta Data"]["2. Symbol"];
      let price = trackedCompanies.find(el => el.symbol === symbol).price;
      let response = {
        ...request["Time Series (5min)"][
          Object.keys(request["Time Series (5min)"])[0]
        ]
      };
      let processedResponse;

      response["6. symbol"] = symbol;
      response["7. price"] = price;
      processedResponse = calculateChange(stripResponse(response));
      processCompany(processedResponse);
    });
  });

  return trackedCompanies;
};

export const getCompanies = function() {
  const companies = JSON.parse(localStorage.getItem("companies"));
  return companies ? companies : [];
};
