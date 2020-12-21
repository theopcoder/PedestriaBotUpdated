const db = require("quick.db");

var BotData = [
    Version = "0.0.18",//TODO When finished, go 0.1.0 move to 0.1.0 then 0.1.1 for bug fixes
    VN = "Finishing Admin Commands",//VN stands for Version Name
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
    DMMessage = ":warning: You can't use this command in DM's!",
    NullUser = ":warning: Sorry, I couldn't find that user",
    Error1 = "**:warning: Error 1:** You have no xp!",
];

//TODO Update channel ID's before Official Update
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
    LogChannelID = "790133463126769664",
    MuteRoleID = "790134169412829204",
    //--------------------------------------------------
    //Level Up Configuration----------------------------
    LevelUpChannelID = "790133196133629952",
    LevelUpMoney = "200",
    MaxRandomXP = "4",
    MaxXP = "200",
    //--------------------------------------------------
    //Dead Chat Ping Configuration----------------------
    DCPPingChannelID = "790133138058903552",
    DCPPingRoleID = "790134569222668300",
    DCPTime = "6",
    //--------------------------------------------------
    //Support Channel Configuration---------------------
    SuggestionPingRoleID = "790134237579182081",
    SuggestionChannelID = "790133173542846544",
    BugReportChannelID = "790133154370551808",
];

//---------------Configuration Help---------------//
//##BotConfiguration
//BotPrefix: This is the prefix for commmands. Example -settings or !settings
//--------------------------
//##Channel Configuration
//Put the ID for the channel you want the message to go to
//--------------------------
//##Admin Configuration
// MuteRoleID: ID for the mute role
//--------------------------
//##Level Up Configuration
//LevelUpMoney: How much money you get for each level up
//MaxRandomXP: The random amount of xp a user can get
//MaxXP: How much XP you need to level up
//------------------------------------------------//
