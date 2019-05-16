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
	
	/*Meteor.setInterval(function() {
		switch(hours) {
			//Night
			case (hours >= 21 || hours < 06):
				break;
			//Morning
			case (hours >= 06 && hours < 09):
				break;
			//Daytime
			case (hours >= 09 && hours < 16):
				break;
			//Evening
			case (hours >= 16 && hours < 21):
				break;
			default:
		}
	},100);*/
});

Template.Clock.helpers({
	hours() {
		return Template.instance().state.get('hours');
	},
	minutes() {
		const minutes = Template.instance().state.get('minutes');
		$("#wrapper").attr("class","");
		console.log(minutes);
		
		//BYT UT TILL IF-SATS!!!!!!!!!!!!!!!!!!!!!!!!!!!
		switch(minutes) {
			//Night
			case "07":
				console.log(minutes);
				$("#wrapper").addClass("night");
				break;
			//Morning
			case (minutes >= "15" && minutes < "30"):
				console.log(minutes);
				$("#wrapper").addClass("morning");
				break;
			//Daytime
			case (minutes >= "30" && minutes < "45"):
				console.log(minutes);
				$("#wrapper").addClass("daytime");
				break;
			//Evening
			case (minutes >= "45" && minutes < "00"):
				console.log(minutes);
				$("#wrapper").addClass("evening");
				break;
			default:
				console.log("Default: "+minutes);
		}
		return minutes;
	},
	seconds() {
		return Template.instance().state.get('seconds');
	},
	
});

Template.Clock.events({

});
