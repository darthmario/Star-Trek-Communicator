function TitleAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

TitleAssistant.prototype.startButtonPress = function(event){
	var eventTarget = event.target.id;
	this.buttonAudio.pause();
	if (eventTarget == "communicateButton") {
		this.controller.stageController.pushScene("communicate");
	}
	if (eventTarget == "eliminateButton") {
		this.controller.stageController.pushScene("eliminate");
	}
	if (eventTarget == "investigateButton") {
		this.controller.stageController.pushScene("investigate");
	}
	if (eventTarget == "medicateButton") {
		this.controller.stageController.pushScene("medicate");
	}
	if (eventTarget == "helpButton") {
		this.controller.stageController.pushScene("help");
	}
}

TitleAssistant.prototype.beamInOut = function(){
	Mojo.Event.stopListening(this.buttonAudio, "canplay", this.beamInOutHandler);
	this.buttonAudio.play();
	this.controller.get("appTitle").style.opacity = "1";
	this.controller.get("beamTextureHolder").style.opacity = "1";
	this.controller.get("beamTexture").style.backgroundPosition = " -150px -100px";
	this.controller.get("beamGlow").style.opacity = ".7";
	this.controller.get("beamGlowFade").style.opacity = "0";
}


TitleAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.enableFullScreenMode(true);
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	/* setup widgets here */
	this.buttonAudio = this.controller.get("buttonAudio");
	this.communicateButton = this.controller.get("communicateButton");
	this.eliminateButton = this.controller.get("eliminateButton");
	this.investigateButton = this.controller.get("investigateButton");
	this.medicateButton = this.controller.get("medicateButton");
	this.helpButton = this.controller.get("helpButton");

	this.beamInOutHandler = this.beamInOut.bind(this);
	this.startButtonPressHandler = this.startButtonPress.bind(this);

	this.buttonAudio.src = Mojo.appPath + "/audio/transporter/transporter.mp3";
	this.buttonAudio.load();

	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.buttonAudio, "canplay", this.beamInOutHandler);
};

TitleAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	Mojo.Event.listen(this.communicateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.listen(this.eliminateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.listen(this.investigateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.listen(this.medicateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.listen(this.helpButton, "mousedown", this.startButtonPressHandler);
};

TitleAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.communicateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.stopListening(this.eliminateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.stopListening(this.investigateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.stopListening(this.medicateButton, "mousedown", this.startButtonPressHandler);
	Mojo.Event.stopListening(this.helpButton, "mousedown", this.startButtonPressHandler);
};

TitleAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
