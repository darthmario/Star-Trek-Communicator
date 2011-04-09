function MedicateAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MedicateAssistant.prototype.startMedicating = function() {
	this.buttonAudio.load();
	this.buttonAudio.play();
  	this.spinMedical();
  	this.spinMedicalTimer = setInterval(this.spinMedical, 30);
}

MedicateAssistant.prototype.stopMedicating = function() {
	this.buttonAudio.pause();
	this.medicalSpinnerFront.style.backgroundPositionY = "0px";
	this.medicalSpinnerBack.style.backgroundPositionY = "0px";
	clearInterval(this.spinMedicalTimer);
}

MedicateAssistant.prototype.spinMedical = function() {
	var medicalSpinX = this.medicalSpinnerFront.style.backgroundPositionX;
	medicalSpinXnum = (medicalSpinX.length - 2);
	medicalSpinX = medicalSpinX.substring(0,medicalSpinXnum)/1;
	medicalSpinX +=51;
	this.medicalSpinnerFront.style.backgroundPositionX = medicalSpinX+"px";
	this.medicalSpinnerBack.style.backgroundPositionX = "-"+medicalSpinX+"px";
	this.medicalSpinnerFront.style.backgroundPositionY = "-210px";
	this.medicalSpinnerBack.style.backgroundPositionY = "-190px";
}

MedicateAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.enableFullScreenMode(true);
	
	//audio item setup
	this.titleScreen = this.controller.stageController.assistant;
	this.buttonAudio = this.titleScreen.controller.get("buttonAudio");
	this.buttonAudio.src = Mojo.appPath + "/audio/sickbay/scanner.mp3";
	this.buttonAudio.load();
		
	//button setup
	this.medicalButton = this.controller.get("medicalButton");
	this.medicalSpinnerFront = this.controller.get("medicalSpinnerFront");
	this.medicalSpinnerBack = this.controller.get("medicalSpinnerBack");
	this.startMedicatingHandler = this.startMedicating.bind(this);
	this.stopMedicatingHandler = this.stopMedicating.bind(this);

	//setup some styles
	this.medicalSpinnerFront.style.backgroundPositionX = "0px";
	this.medicalSpinnerBack.style.backgroundPositionX = "0px";
	this.medicalSpinnerFront.style.backgroundPositionY = "0px";
	this.medicalSpinnerBack.style.backgroundPositionY = "0px";
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
};

MedicateAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	Mojo.Event.listen(this.medicalButton, "mousedown", this.startMedicatingHandler);
	Mojo.Event.listen(this.medicalButton, "mouseup", this.stopMedicatingHandler);
	Mojo.Event.listen(this.medicalButton, "mouseout", this.stopMedicatingHandler);
};

MedicateAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.medicalButton, "mousedown", this.startMedicatingHandler);
	Mojo.Event.stopListening(this.medicalButton, "mouseup", this.stopMedicatingHandler);
	Mojo.Event.stopListening(this.medicalButton, "mouseout", this.stopMedicatingHandler);
};

MedicateAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
