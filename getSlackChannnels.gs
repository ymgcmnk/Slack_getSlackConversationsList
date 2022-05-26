
//インストーラブルトリガで定期実行とする
/**
 * xxxx
 * @param {xxxx} xxx - xxxx
 * @param {xxxx} xxx - xxxx
 */

function setSlackChannnelsForSheet() {
  // 現在日時を取得
  const currentDate = new Date();

  //書き込む前にスプレッドシートの情報をクリアする

  //書き込む情報を取得
  const channelsArray = objectToArray();

  // スプレッドシート取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('list');

  //スプレッドーシートにSlack Channel情報を書き込む 最終的には現在日時とか差分どうにかする
  sheet.appendRow(channelsArray);
}

/**
 * SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列にする
 * return {array} conversationsListResponse - SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列に格納
 * 
 * 参考
 * https://moripro.net/gas-object-to-array/
 */
function objectToArray() {
  const objectOfSlackConversationsListResponse = getResponseAsObject();
  // console.log(objectOfSlackConversationsListResponse);

  const arrayHasChannelObjects = objectOfSlackConversationsListResponse.channels;//OK;true取り除く
  // console.log(arrayHasChannelObjects);

  // const arrayChannelObjects = Object.entries(arrayChannelObjects);

  // console.log(Object.keys(arrayHasChannelObjects));
  // console.log(Object.values(arrayHasChannelObjects));
  // // console.log(Object.entries(arrayHasChannelObjects));
  // return;

  // const test = arrayHasChannelObjects[0];
  // console.log(test);

  // const test2 = Object.entries(test);
  // console.log(test2);

  const arrayChannelsName = arrayHasChannelObjects.map(channel => channel.name);
  console.log(arrayChannelsName);

  const arrayChannelsId = arrayHasChannelObjects.map(channel => channel.id);
  console.log(arrayChannelsId);

  let array = []
  array.push[arrayChannelsName, arrayChannelsId]
  console.log(array);

  let obj = {}


    // スプレッドシート取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('list');

  //スプレッドーシートにSlack Channel情報を書き込む 最終的には現在日時とか差分どうにかする
  sheet.appendRow(arrayChannelsName);
  sheet.appendRow(arrayChannelsId);

  return;
}

/**
 * SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにする関数
 * return {object} objectOfSlackConversationsListResponse - conversations.listのレスポンスをオブジェクトにしたもの
 * 
 * 参考
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 */
function getResponseAsObject() {
  const slackConversationsListResponse = getSlackConversationsList();
  const objectOfSlackConversationsListResponse = JSON.parse(slackConversationsListResponse);
  // console.log(objectOfSlackConversationsListResponse);
  return objectOfSlackConversationsListResponse;
}

/**
 * SlackApiからconversations.listを叩く関数
 * return {object} conversationsListResponse - conversations.listを叩いたレスポンス
 * 
 * NOTE:プロジェクトの設定＞スクリプト プロパティ　で設定しておく。
 * 
 * 参考
 * https://qiita.com/seratch/items/2158cb0abed5b8e12809
 * https://www.slack.com/api/conversations.list
 */
function getSlackConversationsList() {
  const token = PropertiesService.getScriptProperties().getProperty('slackBotUserOAuthToken');
  const slackConversationsListResponse = UrlFetchApp.fetch(
    `https://www.slack.com/api/conversations.list`,
    {
      method: "post",
      contentType: "application/x-www-form-urlencoded",
      headers: { "Authorization": `Bearer ${token}` },
      // payload: payload,
    }
  );
  // console.log(`response: ${slackConversationsListResponse}`);
  return slackConversationsListResponse;
}
