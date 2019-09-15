import axios from "axios";

class Net {
  constructor() {
    this.alphaVantageUrl = "https://www.alphavantage.co/query?";
    this.autocompleteUrl =
      "https://autocomplete.clearbit.com/v1/companies/suggest?query=";

    this.alphaVantageAPIKey = "apikey=NDU8IARVNC0WYVFG";
  }

  get({ api, query = "" }) {
    return new Promise((resolve, reject) => {
      let baseURL =
        api === "alpha"
          ? this.alphaVantageUrl + this.alphaVantageAPIKey + "&"
          : this.autocompleteUrl;

      axios
        .get(baseURL + query)
        .then(response => {
          resolve(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          reject(error);
        });
    });
  }
}

export default new Net();
