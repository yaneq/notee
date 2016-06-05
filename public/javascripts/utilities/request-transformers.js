var requestTransformers = {
  pluckData: function(data) {
    return data['data'];
  },
  timestampsToDate: function(array) {
    return array.map(function(entry) {
      entry.createdAtDate = moment(entry.createdAt).format('YYYY/MM/DD');
      entry.updatedAtDate = moment(entry.updatedAt).format('YYYY/MM/DD');
      return entry;
    });
  },
  log: function(data) {
    return data;
  }
};
