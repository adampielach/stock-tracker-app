import NET from "./Net";

const API = {
  stocks: {
    getCompanyData: function(func, params) {
      let query = `function=${func}&${params}`;
      return NET.get({
        api: "alpha",
        query
      });
    },
    getCompanyLogo: function(query) {
      return NET.get({
        api: "autocomplete",
        query
      });
    }
  }
};

export default API;
