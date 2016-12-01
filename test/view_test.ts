import should = require('should');
import mocha = require('mocha');
import views = require('../index');
import glob = require('glob');

describe('Serializers', () => {

  var user = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email@domain.com",
    address: {
      street: "12345 Oak St",
      city: "Indianapolis",
      state: "IN",
      zip: "55555"
    }
  };

  before(() => {
    return views.loadPath(__dirname + '/views/**/*.js');
  });

  it('should serialize an object with all attributes except in address', () => {
    var serialized: { [key: string]: any; } = views.view('userAll', user);

    serialized.should.have.property('firstName');
    serialized.should.have.property('lastName');
    serialized.should.have.property('address');
    serialized.should.have.property('email');
    serialized['address'].should.not.have.property('street');
    serialized['address'].should.have.property('city');
    serialized['address'].should.have.property('state');
    serialized['address'].should.have.property('zip');
  });

  it('should serialize an object with minimal attributes', () => {
    var serialized: { [key: string]: any; } = views.view('userMinimal', user);

    serialized.should.have.property('email');
    serialized.should.have.property('firstName');
    serialized.should.not.have.property('lastName');
    serialized.should.not.have.property('address');
  });

  it('should serialize an object with all allowed except for one', () => {
    var serialized: { [key: string]: any; } = views.view('userAllowAllDenyOne', user);

    serialized.should.have.property('firstName');
    serialized.should.have.property('lastName');
    serialized.should.have.property('email');
    serialized.should.not.have.property('address');
  });

  it('should serialize an object with a renamed key', () => {
    var serialized: { [key: string]: any; } = views.view('userRename', user);

    serialized.should.not.have.property('lastName');
    serialized.should.not.have.property('address');
    serialized.should.have.property('renamedLastName');
    serialized.should.have.property('renamedAddress');
  });

  it('should throw an error on a non-existent description', () => {

    (function() {
      views.view('doesNotExist', {});
    }).should.throw();

  });

  it('should serialize an object with transformed keys', () => {
    var serialized: { [key: string]: any; } = views.view('userTransform', user);

    serialized.should.have.property('fullName');

    serialized['fullName'].should.eql(user.firstName + ' ' + user.lastName);
    serialized['fullNameAs'].should.eql(user.firstName + ' ' + user.lastName);
  });

});