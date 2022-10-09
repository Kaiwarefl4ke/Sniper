const autoSniper = new KeyBind("AutoSniper", Keyboard.KEY_L);
var sniper = false;

register("tick", (ticks) => {
  if (autoSniper.isPressed()) {
    sniper = true;
  }
});

register("command", (snipeTarget) => ChatLib.chat("The Target is set to" + snipeTarget + ".")).setName("sniperSetTarget");
register("command", (snipeMode) => {
  if (snipeMode === "help") {
  	ChatLib.chat("Usage: /sniperSetTarget <solos/doubles/3s/4s/help>");
  } else {
	  ChatLib.chat("The Mode is set to" + snipeMode +".");
  }
}).setName("sniperSetMode");


register("worldLoad", () => {
  if (sniper === true) {
    let playerList = getAllPlayers();
    new Thread(() => {
      if (playerList.toLowerCase().includes(snipeTarget)) {
        sniper = false;
        ChatLib.chat("Debug: Successfully sniped the target");
      } else {
        Thread.sleep(1000);
        if (snipeMode === "solos") {
        	ChatLib.chat("/play BEDWARS_EIGHT_ONE");
        } else if (snipeMode === "doubles") {
          ChatLib.chat("/play BEDWARS_EIGHT_TWO");
        } else if (snipeMode === "3s") {
          ChatLib.chat("/play BEDWARS_FOUR_THREE");
        } else if (snipeMode === "4s") {
          ChatLib.chat("/play BEDWARS_FOUR_FOUR");
        }
      }
    });
  }
});
