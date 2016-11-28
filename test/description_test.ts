import mocha = require('mocha');
import {Description} from "../lib/description";
require('should');

describe('Description', () => {

  it('should allow a single key', () => {
    var description = new Description();

    description.allow('test');

    description._allowed_keys[0]['key'].should.be.eql('test');
    description._allowed_keys.should.be.Array().with.length(1);
    description._disallowed_keys.should.be.Array().with.length(0);
  });

  it('should allow multiple keys', () => {
    var description = new Description();

    description.allow(['test1', 'test2']);

    description._allowed_keys.should.be.Array().with.length(2);
    description._disallowed_keys.should.be.Array().with.length(0);
    description._allowed_keys[0]['key'].should.be.eql('test1');
    description._allowed_keys[1]['key'].should.be.eql('test2');
  });

  it('should allow all keys', () => {
    var description = new Description();

    description._allow_all.should.be.false;

    description.allowAll();

    description._allow_all.should.be.true;

  });

  it('should deny a single key', () => {
    var description = new Description();

    description.deny('test');

    description._disallowed_keys.should.be.Array().with.length(1);
    description._disallowed_keys[0].should.be.eql('test');
  });

  it('should deny multiple keys', () => {
    var description = new Description();

    description.deny(['test1', 'test2']);

    description._allowed_keys.should.be.Array().with.length(0);
    description._disallowed_keys.should.be.Array().with.length(2);
    description._disallowed_keys[0].should.be.eql('test1');
    description._disallowed_keys[1].should.be.eql('test2');
  });

  it('should reference another description', () => {
    var description = new Description();

    description.reference('test', 'test2');

    description._references['test']['descriptionName'].should.eql('test2');
  });

});
