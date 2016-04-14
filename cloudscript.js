handlers.getUserInternalData = function(args)
{
    var playerInternalData = server.GetUserInternalData(
	{
		PlayFabId: currentPlayerId,
		Keys: ['test-key']
	});

    return { PlayerId: currentPlayerId, RandomString: args.RandomString, RandomNumber: args.RandomNumber, PlayerData: playerInternalData.Data['test-key']  };
}

// Call from CloudScript action
handlers.handlePlayStreamEvent = function (args, context) {
    var psEvent = context.playStreamEvent;
    var profile = context.playerProfile;
    return { eventName: psEvent.EventName, profileDispName: profile.DisplayName };
}

handlers.levelUpPlayer = function (args, context) {
	var playerStatResult = server.UpdateUserStatistics (
		{
			PlayFabId: currentPlayerId,
			UserStatistics: {Level:2}
		}
	);
}// hello GDC

handlers.onStatChange = function (args, context) {
  var psEvent = context.playStreamEvent;
  var profile = context.playerProfile;
  var gmCount = psEvent.StatisticValue;
  log.debug('psEvent.StatisticName: ' + psEvent.StatisticName);
  log.debug('psEvent.StatisticValue: ' + psEvent.StatisticValue);
  log.debug('psEvent.PreviousStatisticValue: ' + psEvent.PreviousStatisticValue);
  log.debug('profile.PlayerId: ' + profile.PlayerId);
  log.debug('currentPlayerId: ' + currentPlayerId);
  log.debug('playStreamEvent: ' + JSON.stringify(psEvent))
  //server.AddUserVirtualCurrency(profile.PlayerId,"Gm",gmCount);
  return { "foo ": "bar" };
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
