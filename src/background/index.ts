import { MessageTypeEnum } from "../constants";
import { onMessage } from "../utils/message";
import { openPanel, queryBookMarks } from "./utils";

console.log("background-8");

// debug -> reload extension
chrome.action.onClicked.addListener(() => {
  chrome.runtime.reload();
});

chrome.commands.onCommand.addListener((command, tabs) => {
  console.log(`Command "${command}" triggered: `, tabs);
  if (command === "open-panel") {
    openPanel(tabs?.id);
  }
  if (command === "debug-reload") {
    chrome.runtime.reload();
  }
});

onMessage([MessageTypeEnum.queryBookMarks], (message, sender) => {
  console.log("onMessage: ", message);

  if (
    message.type === MessageTypeEnum.queryBookMarks &&
    message.data &&
    typeof message.data === "string"
  ) {
    queryBookMarks(sender.tab.id, message.data);
  }
});
