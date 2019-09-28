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
    ...search.data.bestMatches[0],
    ...daily.data["Time Series (Daily)"][
      Object.keys(daily.data["Time Series (Daily)"])[0]
    ],
    ...globalQuote.data["Global Quote"]
  };
  return mergedResponses;
};
