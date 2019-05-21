import './clock.html';

import { ReactiveDict } from 'meteor/reactive-dict';

// Reactive dictionaries automagically update everything related to them
// when they change themselfes, so there's no point in detecting "onChanged" events

Template.Clock.onCreated(function() {
	this.state = new ReactiveDict({
		hours: null,
		minutes: null,
		seconds: null,
	});
	
	
	const self = this;
	Meteor.setInterval(function() {
		const time = new Date();
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		self.state.set('hours', (hours > 9) ? hours : '0'+hours );
		self.state.set('minutes', (minutes > 9) ? minutes : '0'+minutes );
		self.state.set('seconds', (seconds > 9) ? seconds : '0'+seconds );
	},100);
	// Add a "0" if hours is less than 10
	// Run 10 times per second to minimise lag between "real" seconds and displayed seconds
});

Template.Clock.helpers({
	hours() {
		const hours = Template.instance().state.get('hours');
		$("#wrapper").attr("class","");
		
		if (hours >= "21") {
			$("#wrapper").attr("class","nighttime");
			console.log("NightPicture"); 
		} else if (hours >= "00" && hours < "06") {
			$("#wrapper").attr("class","nighttime");
			console.log("NightPicture"); 
		} else if (hours >= "06" && hours < "09") {
			$("#wrapper").attr("class","morning");
			console.log("MorningPicture"); 
		} else if (hours >= "09" && hours < "16") {
			$("#wrapper").attr("class","daytime");
			console.log("DayPicture"); 
		} else if (hours >= "16" && hours < "21") {
			$("#wrapper").attr("class","evening");
			console.log("EveningPicture");
		} else {
			console.log("Error. Could not determine what time of day it is. Try thinking for yourself.");
			return "Er";
		}
		
		return hours;
	},
	minutes() {
		return Template.instance().state.get('minutes');
	},
	seconds() {
		return Template.instance().state.get('seconds');
	},
	
});

Template.Clock.events({

});
