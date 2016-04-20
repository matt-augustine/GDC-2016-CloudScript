handlers.levelUpPlayer = function (args, context) {
	var playerStatResult = server.UpdateUserStatistics (
		{
			PlayFabId: currentPlayerId,
			UserStatistics: {Level:2}
		}
	);
}

handlers.unlockHighSkillContent = function(args, context)
{
    log.debug('context.playerProfile: ' + JSON.stringify(context.playerProfile));
    log.debug('currentPlayerId: ' + currentPlayerId);
    var playerInternalData = server.UpdateUserInternalData(
	{
		PlayFabId: currentPlayerId,
		"Data": {
		    "HighSkillContent": true,
		    "XPAtHighSkillUnlock": context.playStreamEvent.StatisticValue
		  }
	});

    log.info('Unlocked HighSkillContent for ' + context.playerProfile.DisplayName);
    log.debug('hi there');
    return { profile: context.playerProfile };
}

handlers.processPlayerSentChatMessage = function (args, context) {
	
	
    //var languageFilterUrl = "https://plavx7r2.pottymouthfilter.com/v1/chat";
    var languageFilterUrl = "http://httpbin.org/status/200";
    
    var headers = {
    	"Authorization": "Basic ReplaceMe"
    };
    
    var body = {
    	rule: 1,
    	player: context.playerProfile.EntityId,
    	player_display_name: context.playerProfile.DisplayName,
    	room: context.playStreamEvent.room,
    	server: context.playStreamEvent.server,
    	language: context.playStreamEvent.language,
    	text: context.playStreamEvent.text
    };

    var content = JSON.stringify(body);
    
    var response = http.request(languageFilterUrl, "post", content, "application/json", headers, true);
    log.debug('received: ' + response);
}

handlers.playerSentMessage = function (args, context) {

    //var languageFilterUrl = "https://plavx7r2.pottymouthfilter.com/v1/chat";
    var languageFilterUrl = "http://httpbin.org/status/200";
    
    var headers = {
    	"Authorization": "replaceme"
    };
    
    var body = {
    	rule: 1,
    	player: context.playerProfile.EntityId,
    	player_display_name: context.playerProfile.DisplayName,
    	room: "Lobby",
    	server: "Gamma",
    	language: "en",
    	text: context.playStreamEvent.text
    };

    var content = JSON.stringify(body);
    
    var response = http.request(languageFilterUrl, "post", content, "application/json", headers, true);
    log.debug('received: ' + response);
}
