import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
	attrs: {
    },

  	extractArray: function(store, typeClass, payload) {
	    var root_key = Ember.Inflector.inflector.pluralize(typeClass.typeKey);

		payload[root_key] = payload.data;
		delete payload.data;

		return this._super(store, typeClass, payload);
	},

	normalize: function(typeClass, hash, prop){
		typeClass.eachRelationship(function(key, relationship){
				if( ! hash[key]){
					return hash;
				}

				var hashed = hash[key].data;

				hash[key] = hashed;

				return hashed;
			
		});

		return this._super(typeClass, hash, prop);
	},

	serializeIntoHash: function(hash, typeClass, snapshot, options) {
      Ember.merge(hash, this.serialize(snapshot, options));
  	},

	extractSingle: function(store, typeClass, payload, id){
		var root_key = typeClass.typeKey;

		payload[root_key] = payload.data;
		delete payload.data;

		return this._super(store, typeClass, payload, id);
	}
});
