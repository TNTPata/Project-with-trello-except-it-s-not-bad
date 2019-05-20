import './clock.html';

import { ReactiveDict } from 'meteor/reactive-dict';

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
});

Template.Clock.helpers({
	hours() {
		const hours = Template.instance().state.get('hours');
		$("#wrapper").attr("class","");
		
		if (hours >= "21" || hours > "06") {
			$("#wrapper").addClass("night");
			console.log("NightPicture"); 
		} else if (hours >= "06" && hours < "09") {
			$("#wrapper").addClass("morning");
			console.log("MorningPicture"); 
		} else if (hours >= "09" && hours < "16") {
			$("#wrapper").addClass("day");
			console.log("DayPicture"); 
		} else if (hours >= "16" && hours < "21") {
			$("#wrapper").addClass("evening");
			console.log("EveningPicture");
		} else {
			console.log("Error. ");
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
