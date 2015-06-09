var requestTransformers = {
  pluckData: function(data) {
    return data['data'];
  },
  log: function(data) {
    return data;
  }
};
