
//インストーラブルトリガで定期実行とする としても良い
/**
 * スプレッドシートに二次元配列として受け取ったデータをセットする。
 * @param {xxxx} xxx - xxxx
 * @param {xxxx} xxx - xxxx
 */

function setSlackChannnelsForSheet() {

  const arrayChannelsInfo = objectToArray();
  // 現在日時を取得
  const currentDate = new Date();

  //書き込む前にスプレッドシートの情報をクリアする 未実装

  // スプレッドシート取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('list');

  //getRange(行番号, 列番号, 行数, 列数)
  //スプレッドーシートにSlack Channel情報を書き込む 
  //最終的には現在日時とか差分どうにかする
  sheet.getRange(2, 1, arrayChannelsInfo.length, arrayChannelsInfo[0].length).setValues(arrayChannelsInfo);
}

/**
 * SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列にする、スプレッドシートに書き込むために
 * return {array} arrayChannelsInfo - SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列に格納
 * 
 * 参考
 * https://moripro.net/gas-object-to-array/
 */
function objectToArray() {
  const objectOfSlackConversationsListResponse = getResponseAsObject();
  const arrayHasChannelObjects = objectOfSlackConversationsListResponse.channels;//OK;true取り除く
  const arrayChannelsInfo = arrayHasChannelObjects.map(channel => [channel.name, channel.id]);
  // console.log(arrayChannelsInfo);
  // console.log(arrayChannelsInfo.length);
  // console.log(arrayChannelsInfo[0].length);
  return　arrayChannelsInfo;
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
 * NOTE:プロジェクトの設定＞スクリプト プロパティ　でslackBotUserOAuthToken　設定しておく。
 * 
 * 参考
 * https://qiita.com/seratch/items/2158cb0abed5b8e12809
 * https://api.slack.com/methods/conversations.list
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
