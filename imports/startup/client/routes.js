import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Import needed layouts
import '../../ui/layouts/basic/basic.js';

// Import needed templates
import '../../ui/pages/clock/clock.js';

const publicRoutes = FlowRouter.group({
	name: 'public',
	triggersEnter: [() => {
		window.scroll(0,0);
	}],
});

// Set up routes in app
publicRoutes.route('/', {
	name: 'Home',
	action() {
		BlazeLayout.render('Basic', {main:'Clock'});
	},
});
