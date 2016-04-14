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
    var playerInternalData = server.UpdateUserInternalData(
	{
		PlayFabId: currentPlayerId,
		"Data": {
		    "HighSkillContent": true,
		    "XPAtHighSkillUnlock": context.playStreamEvent.StatisticValue
		  }
	});

    log.info('Unlocked HighSkillContent for ' + context.playerProfile.DisplayName);
}
