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
