function EliminateAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}
EliminateAssistant.prototype.dialStart = function (event) {
	//lets find out where we are
	this.startMouse = event.clientY;
	this.buttonAudio.load();
	if(this.buttonClicks == 1){
		this.buttonAudio.play();
		this.buttonClicksPlaying = 1;
	}
	if(this.newLine !=7){
		this.effectsAudio.pause();
	}
	Mojo.Event.listen(this.dialRoll, "mousemove", this.dialPositionHandler);
 };

EliminateAssistant.prototype.dialStop = function () {
	//stop everything that might have started on mouse down
	this.buttonAudio.pause();	
	this.buttonClicksPlaying = 0;
	if(this.currentLine != this.newLine){
		this.effectsAudio.src = Mojo.appPath + "/audio/phaser/"+this.newLine+".mp3";
		this.effectsAudio.load();
		this.currentLine = this.newLine;
		this.effectsAudio.play();
	}
	this.dialNumberPosition = this.finalPosition;
	Mojo.Event.stopListening(this.dialRoll, "mousemove", this.dialPositionHandler);
	if( this.webosModelName == "Pixi" ){
		this.phaserNumber.style.backgroundPositionY = (this.dialNumberPosition) + "px";		
	}

};

EliminateAssistant.prototype.dialPosition = function (event) {
	this.mouseDiff = Math.floor((this.startMouse - event.clientY) / 2);
	var movePosition = this.dialNumberPosition + this.mouseDiff;
	if(movePosition < -500){
		this.newLine =1;
	} else if((movePosition > -500) && (movePosition < -401)){
		this.newLine =2;
	} else if((movePosition >= -401) && (movePosition < -286)){
		this.newLine =3;
	} else if((movePosition >= -286) && (movePosition < -167)){
		this.newLine =4;
	} else if((movePosition >= -167) && (movePosition < -108)){
		this.newLine =5;
	} else if((movePosition >= -108) && (movePosition < -49)){
		this.newLine =6;
	} else if(movePosition >= -49) {
		this.newLine =7;
	} else {}
	if ((movePosition >= -570) && (movePosition <= 0)) {
		this.finalPosition = this.dialNumberPosition + this.mouseDiff;
		if( this.webosModelName != "Pixi" ){
			this.phaserNumber.style.backgroundPositionY = (this.dialNumberPosition + this.mouseDiff) + "px";		
			this.backDial.style.backgroundPositionY = (this.dialNumberPosition - this.mouseDiff) + "px";
		}
		this.buttonClicks = 1;
		if(this.buttonClicksPlaying == 0){
			this.buttonClicksPlaying = 1;
			this.buttonAudio.load();
			this.buttonAudio.play();
		}
	} else {
		this.buttonClicksPlaying = 0;
		this.buttonClicks = 0;	
		this.buttonAudio.pause();
	}
};

EliminateAssistant.prototype.stopShooting = function () {
	if(this.newLine !=7){
		this.effectsAudio.pause();
	}
};

EliminateAssistant.prototype.startShooting = function () {
	if(this.newLine !=7){
		this.effectsAudio.src = Mojo.appPath + "/audio/phaser/phaser_loop.mp3";
		this.effectsAudio.load();
		this.effectsAudio.play();	
	}
};

EliminateAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.enableFullScreenMode(true);
	this.titleScreen = this.controller.stageController.assistant;
	this.webosModelName = Mojo.Environment.DeviceInfo.modelName;
	this.controller.document.body.style.backgroundColor = "#000000";

	//variables
	this.startMouse = 0;
	this.mouseDiff = 0;
	this.dialNumberPosition = -570;
	this.finalPosition = -570;
	this.currentLine = 0;
	this.newLine = 1;
	this.buttonClicks = 1;
	this.buttonClicksPlaying = 0;

	//audio
	this.buttonAudio = this.titleScreen.controller.get("buttonAudio");
	this.effectsAudio = this.titleScreen.controller.get("effectsAudio");
	this.buttonAudio.src = Mojo.appPath + "/audio/phaser/tick.mp3";
	this.effectsAudio.src = Mojo.appPath + "/audio/phaser/phaser_loop.mp3";
	this.buttonAudio.load();
	this.effectsAudio.load();
	
	//function references
	this.startShootingHandler = this.startShooting.bind(this);
	this.stopShootingHandler = this.stopShooting.bind(this);
	this.dialStartHandler = this.dialStart.bind(this);
	this.dialStopHandler = this.dialStop.bind(this);
	this.dialPositionHandler = this.dialPosition.bind(this);
	
	//button references
	this.phaserButton = this.controller.get("phaserButton");
	this.dialRoll = this.controller.get("dialRoll");
	this.phaserNumber = this.controller.get("phaserNumber");
	this.backDial = this.controller.get("backDial");

	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */

};

EliminateAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	Mojo.Event.listen(this.phaserButton, "mousedown", this.startShootingHandler);
	Mojo.Event.listen(this.phaserButton, "mouseup", this.stopShootingHandler);
	Mojo.Event.listen(this.phaserButton, "mouseout", this.stopShootingHandler);
	Mojo.Event.listen(this.dialRoll, "mousedown", this.dialStartHandler);
	Mojo.Event.listen(this.dialRoll, "mouseup", this.dialStopHandler);
	Mojo.Event.listen(this.dialRoll, "mouseout", this.dialStopHandler);
};

EliminateAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.phaserButton, "mousedown", this.startShootingHandler);
	Mojo.Event.stopListening(this.phaserButton, "mouseup", this.stopShootingHandler);
	Mojo.Event.stopListening(this.phaserButton, "mouseout", this.stopShootingHandler);
	Mojo.Event.stopListening(this.dialRoll, "mousedown", this.dialStartHandler);
	Mojo.Event.stopListening(this.dialRoll, "mouseup", this.dialStopHandler);
	Mojo.Event.stopListening(this.dialRoll, "mouseout", this.dialStopHandler);
	this.effectsAudio.pause();
};

EliminateAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
