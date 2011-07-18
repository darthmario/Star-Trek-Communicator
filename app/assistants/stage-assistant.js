function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the stage is first created */

	if(Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.loadStylesheet(['./stylesheets/320x400.css']);
	} else {
		this.controller.loadStylesheet(['./stylesheets/320x480.css']);
	}
	
	this.controller.pushScene("Preferences");
};
