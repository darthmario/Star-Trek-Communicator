function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
		additional parameters (after the scene name) that were passed to pushScene. The reference
		to the scene controller (this.controller) has not be established yet, so any initialization
		that needs the scene controller should be done in the setup function below. */
}

PreferencesAssistant.prototype.drawer1PressHandler = function(event){
	this.department1Drawer.mojo.toggleState();
}

PreferencesAssistant.prototype.drawer2PressHandler = function(event){
	this.department2Drawer.mojo.toggleState();
}
PreferencesAssistant.prototype.drawer3PressHandler = function(event){
	this.department3Drawer.mojo.toggleState();
}
PreferencesAssistant.prototype.uhuraPressHandler = function(event){
	this.uhuraAudioDrawer.mojo.toggleState();
}


PreferencesAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.department1 = this.controller.get("department1");
	this.department2 = this.controller.get("department2");
	this.department3 = this.controller.get("department3");
	this.department1Drawer = this.controller.get('department1Drawer');
	this.department2Drawer = this.controller.get('department2Drawer');
	this.department3Drawer = this.controller.get('department3Drawer');
	this.drawer1PressHandler = this.drawer1PressHandler.bind(this);
	this.drawer2PressHandler = this.drawer2PressHandler.bind(this);
	this.drawer3PressHandler = this.drawer3PressHandler.bind(this);

	//character drawers
	this.uhura = this.controller.get('uhura');
	this.uhuraPressHandler = this.uhuraPressHandler.bind(this);
	this.uhuraAudioDrawer = this.controller.get('uhuraAudioDrawer');

	/* use Mojo.View.render to render view templates and add them to the scene, if needed */

	/* setup widgets here */
	this.controller.setupWidget("titleAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("uhuraAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("chekovAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("pikeAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("guardianAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("suluAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("scottyAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("nomadAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("zephramAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("bonesAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("spockAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("computerAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("sarekAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("chapelAudioToggle", this.attributes = {trueLabel: "On", falseLabel: "Off"}, this.model = {value: true}); 
	this.controller.setupWidget("department1Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("department2Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("department3Drawer",this.attributes = {unstyled: false}, this.model = {open: false}); 
	this.controller.setupWidget("uhuraAudioDrawer",this.attributes = {unstyled: false}, this.model = {open: false}); 

	
	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.department1, Mojo.Event.tap, this.drawer1PressHandler);
	Mojo.Event.listen(this.department2, Mojo.Event.tap, this.drawer2PressHandler);
	Mojo.Event.listen(this.department3, Mojo.Event.tap, this.drawer3PressHandler);
	Mojo.Event.listen(this.uhura, Mojo.Event.tap, this.uhuraPressHandler);
};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
		example, key handlers that are observing the document */
};

PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
		this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.department1, Mojo.Event.tap, this.drawer1PressHandler);
	Mojo.Event.stopListening(this.department2, Mojo.Event.tap, this.drawer2PressHandler);
	Mojo.Event.stopListening(this.department3, Mojo.Event.tap, this.drawer3PressHandler);
};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
		a result of being popped off the scene stack */
};
