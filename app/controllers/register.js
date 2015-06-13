import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		register: function(){
			var self = this,
				data = self.getProperties('username', 'email', 'firstName', 'lastName', 'password');

			var user = self.store.createRecord('user', {
				username: data.username,
				email: data.email,
				first_name: data.firstName,
				last_name: data.lastName,
				password: data.password
			});

			user.save().then(transitionTo('login')).catch(failure);

			function transitionTo(route){
				self.flashMessage({
				  content: 'Thank you for registering', 
				  duration: 2000, 
				  type: 'success', 
				});
				self.transitionToRoute(route);
			}	

			function failure(reason){

			}
			
		}
	}
});


