const { URL } = require('../../../models/URL');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('URL Module', () => {
  it('should return a valid URL', () => {
    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString(), 
      shortUrlId: "qeqwdafasf",
      url: "https://www.google.com/"
    };
    const url = new URL(payload);
    console.log(payload);
    console.log('\n\n\n\n');
    console.log(url)
    console.log('\n\n\n\n');
    expect(url.url).toEqual(payload.url);
  });
});