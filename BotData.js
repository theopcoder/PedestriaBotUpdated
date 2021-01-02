var BotData = [
    Version = "2.0.0",
    VN = "The 2.0.0 Update",//VN stands for Version Name
    Developer = "TheMLGDude#2177 | theopcoder",
    DeveloperDiscord = "TheMLGDude#2177",
    DeveloperGitHub = "theopcoder",
];

var DevPromt = [
    DevWarning = ":warning: You are attempting to access developer features that can cause damage! Proceed with caution!",
    DevAccess = "**:no_entry_sign:** Access Denied! :no_entry_sign:",
];

var Errors = [
    Error6 = "**:warning: Error 6:** ```Invalid description or argument detected! Try making sure the command is being performed right and try again!```",
    Error4 = "**:warning: Error 4:** ```This command/feature has not yet been implemented yet! Please check back in the next bot update! Thank you!```",
    Error2 = "**:shield: Error 2:** Outdated bot version! Please update to the new Bot Version for the latest features, commands and security fixes!",
    Error3 = "**:warning: Error 3:** ```Sorry, this command/feature hasn't been implemented yet! Check back in future updates!```",
    Error5 = "**:no_entry_sign: Error 5:** You do NOT have the permission to perform this command/feature! :no_entry_sign:",
    Error7 = "**:warning: Error 7:** ```There was no description given! Please give a description or argument!```",
    StaffUser = ":no_entry_sign: Sorry, you can't perform this command on a staff member!",
    PermissionError = ":no_entry_sign: You don't have the  correct permission!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted!",
    DMMessage = ":warning: You can't use this command in DM's!",
    UserAlreadyUnBanned = ":warning: That user isn't banned! ",
    UserAlreadyMuted = ":warning: That user is already muted!",
    NullUser = ":warning: Sorry, I couldn't find that user",
    Error1 = "**:warning: Error 1:** You have no xp!",
];

var BotConfiguration = [
    //--------------------------------------------------
    //Bot Configuration---------------------------------
    BotPrefix = "-",
    ActivityMessage = "play.pedestriamc.com",
    StaffApplicationsSetting = "0",
    AutoModerationSetting = "1",
    DeadChatPingSetting = "1",
    LevelUpsSetting = "1",
    //--------------------------------------------------
    //Channel Configuration-----------------------------
    WelcomeChannelID = "790133347044556800",
    NewMemberRoleID = "790134116765925387",
    //--------------------------------------------------
    //Admin Configuration-------------------------------
    DeletedMessageLogChannelID = "790133446730055680",
    PurgeLogChannelID = "790133463126769664",
    LogChannelID = "790133463126769664",
    MuteRoleID = "790134169412829204",
    //--------------------------------------------------
    //Auto Moderation Configuration---------------------
    MuteBypassProtectionSetting = "1",
    DeletedMessagesSetting = "1",
    DiscordInviteSetting = "1",
    ChatFilterSetting = "1",
    //--------------------------------------------------
    //Level Up Configuration----------------------------
    LevelUpChannelID = "790133196133629952",
    LevelUpMoney = "200",
    MaxRandomXP = "5",
    MaxXP = "200",
    //--------------------------------------------------
    //Dead Chat Ping Configuration----------------------
    DCPPingChannelID = "790133138058903552",
    DCPPingRoleID = "790134569222668300",
    DCPTime = "6",
    //--------------------------------------------------
    //Support Channel Configuration---------------------
    TicketStaffPingRoleID = "794463866369212427",
    SuggestionPingRoleID = "790134237579182081",
    SuggestionChannelID = "790133173542846544",
    TicketLogChannelID = "794467568899457054",
    BugReportChannelID = "790133154370551808",
    TicketCategoryID = "794459983470657536",
    PollChannelID = "794384675539255296",
];

//---------------Configuration Help---------------//
//--------------------------
//##Bot Configuration


//BotPrefix: This is the prefix for commmands. Example -settings or !settings
//ActivityMessage: This is the message displayed under the bots name on Discord
//StaffApplicationSetting: This is where you can change the default setting for Staff Applications. 0 = off | 1 = on | There are no staff application points at this time!
//AutoModerationSetting: This is where you can change the default setting for Auto Modertation. 0 = off | 1 = on
//DeadChatPingSetting: This is where you can change the default setting for Dead Chat Pings. 0 = off | 1 = on
//LevelUpsSetting: This is where you can change the default setting for Level Ups. 0 = off | 1 = on


//--------------------------
//##Channel Configuration


//WelcomeChannelID: Put the ID of the channel you want new member messages to be sent to
//NewMemberRoleID: Put the ID of the role you want new members to get


//--------------------------
//##Admin Configuration


//DeletedMessageLogChannelID: The channel ID to log deleted messages
//PurgeLogChannelID: The channel ID to log message purges
//LogChannelID: The channel ID to log admin commands like bans, kicks, mutes, etc
//MuteRoleID: The role ID to apply to mute a user


//--------------------------
//##Auto Moderation Configuration


//MuteBypassProtection: Turn the Mute Bypass Protection off/on. 0 = off | 1 = on
//DeletedMessageSetting: Turn the Deleted Messages off/on. 0 = off | 1 = on
//DiscordInviteSetting: Turn the Discord Invite Protection off/on. 0 = off | 1 = on
//ChatFilterSetting: Turn the chat filter off/on. 0 = off | 1 = on


//--------------------------
//##Level Up Configuration


//LevelUpChannelID: Channel ID to send level up messages
//LevelUpMoney: The amount of money a user gets for each level up
//MaxRandomXP: The maximum amount of xp a user can get per message
//MaxXP: The amount of xp a user needs to level up


//--------------------------
//##Dead Chat Ping Configuration


//DCPPingChannelID: The channel to send the Dead Chat Ping in
//DCPPingRoleID: The role to ping for the Dead Chat Ping
//DCPTime: The amount of time in hours between pings


//--------------------------
//##Support Channel Configuration


//TicketStaffPingRoleID: The role tickets should ping when created
//SuggestionPingRoleID: The role to ping when there is a new suggestion
//SuggestionChannelID: The channel ID suggestion messages should go
//TicketLogChannelID: The channel ID Ticket logs should go
//BugReportChannelID: The channel ID bug report message go
//TicketCategoryID: The category ID tickets should be made under
//PollChannelID: The channel ID poll messages should go


//--------------------------
//##IMPORTANT


//For the bot configuration settings for groups of commands, once the json.sqlite file is made, you need to do -settings to change them from on/off!
//To have these changes take effect, you must turn the bot off then back on!
//Not configuring some of these fields may break the bot!


//------------------------------------------------//
