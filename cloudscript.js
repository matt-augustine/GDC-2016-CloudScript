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
