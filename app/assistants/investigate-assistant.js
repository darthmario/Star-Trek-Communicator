function InvestigateAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}
InvestigateAssistant.prototype.appOpen = function() {
	//determine app to load
	var appCount = this.appCount%7;
	//Mojo.Controller.getAppController().showBanner("asd "+appCount,{source: 'notification'});	
	if(appCount !=0){
		if(appCount==1){
			appLink = "http://developer.palm.com/appredirect/?packageid=com.novacharter.lcars&applicationid=5944"
		} else if(appCount==2){
			appLink = "http://developer.palm.com/appredirect/?packageid=com.jasoncheeks.ferengirulesofacquisition&applicationid=5958"
		} else if(appCount==3){
			appLink = "http://developer.palm.com/appredirect/?packageid=tlh.roneyii.kag&applicationid=4307"
		} else if(appCount==4){
			appLink = "http://developer.palm.com/appredirect/?packageid=com.naggel.flag-tlh&applicationid=5284"
		} else if(appCount==5){
			appLink = "http://developer.palm.com/appredirect/?packageid=com.roalapps.klingonsoundboard&applicationid=3022"
		} else {
			appLink = "http://developer.palm.com/appredirect/?packageid=tlh.roneyii.sbi2010&applicationid=6014"
		}
		this.controller.serviceRequest('palm://com.palm.applicationManager', {
			method: 'launch',
			parameters: {
				id: 'com.palm.app.findapps',
				params: {
					scene : 'page',
					target: appLink
				}
			}
		});
	}
}
InvestigateAssistant.prototype.screenChanger = function() {
	//here we would change the screen
	//Mojo.Controller.getAppController().showBanner("asd ",{source: 'notification'});
	if(this.loopBinary == 0){
		this.screenFG.style.backgroundPositionY = "-"+(this.loopCount*226)+"px";
		this.screenFG.style.opacity = 1;
		this.loopBinary = 1;
		this.appCount++;
	} else {
		this.screenBG.style.backgroundPositionY = "-"+(this.loopCount*226)+"px";
		this.screenFG.style.opacity = 0;
		this.loopBinary = 0;		
		this.loopCount++;
	}
}

InvestigateAssistant.prototype.playAudio = function(event) {
	this.buttonAudio.src = Mojo.appPath + "/audio/tricorder/"+event.target.id+".mp3";
	this.buttonAudio.load();
	this.buttonAudio.play();
}

InvestigateAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	this.controller.enableFullScreenMode(true);
	this.investigateHolder = this.controller.window;
	this.loopBinary = 0;
	this.appCount = 0;
	this.loopCount = 1;

	this.titleScreen = this.controller.stageController.assistant;
	this.buttonAudio = this.titleScreen.controller.get("buttonAudio");
	this.buttonAudio.src = Mojo.appPath + "/audio/tricorder/1_music.mp3";
	this.buttonAudio.load();
	this.buttonAudio.play();

	this.button1 = this.controller.get("1_music");
	this.button2 = this.controller.get("2_music");
	this.button3 = this.controller.get("3_music");
	this.button4 = this.controller.get("4_music");
	this.button5 = this.controller.get("5_music");
	this.button6 = this.controller.get("6_music");
	this.screenButton = this.controller.get("screenButton");

	this.screenBG = this.controller.get("screenBG");
	this.screenFG = this.controller.get("screenFG");
	this.screenFG.style.backgroundPositionY = "-226px";
	this.screenChangerTimer = this.investigateHolder.setInterval(this.screenChanger.bind(this), 2500);
	
	this.playAudioHandler = this.playAudio.bind(this);
	this.appOpenHandler = this.appOpen.bind(this);

	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
};

InvestigateAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	Mojo.Event.listen(this.screenButton, "mousedown", this.appOpenHandler);
	Mojo.Event.listen(this.button1, "mousedown", this.playAudioHandler);
	Mojo.Event.listen(this.button2, "mousedown", this.playAudioHandler);
	Mojo.Event.listen(this.button3, "mousedown", this.playAudioHandler);
	Mojo.Event.listen(this.button4, "mousedown", this.playAudioHandler);
	Mojo.Event.listen(this.button5, "mousedown", this.playAudioHandler);
	Mojo.Event.listen(this.button6, "mousedown", this.playAudioHandler);
};

InvestigateAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	Mojo.Event.stopListening(this.screenButton, "mousedown", this.appOpenHandler);
	Mojo.Event.stopListening(this.button1, "mousedown", this.playAudioHandler);
	Mojo.Event.stopListening(this.button2, "mousedown", this.playAudioHandler);
	Mojo.Event.stopListening(this.button3, "mousedown", this.playAudioHandler);
	Mojo.Event.stopListening(this.button4, "mousedown", this.playAudioHandler);
	Mojo.Event.stopListening(this.button5, "mousedown", this.playAudioHandler);
	Mojo.Event.stopListening(this.button6, "mousedown", this.playAudioHandler);
	this.buttonAudio.pause();
	clearInterval(this.screenChangerTimer);

};

InvestigateAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
