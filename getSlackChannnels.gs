
//インストーラブルトリガで定期実行とする としても良い
// 参考
// https://note.com/digiholic_life/n/nd44d9d0e113a
// https://so.sha-box.com/2022/05/gas/

/**
 * スプレッドシートに二次元配列として受け取ったデータをセットする。
 */

function setSlackChannnelsForSheet() {

  const arrayChannelsInfo = objectToArray();
  console.log(arrayChannelsInfo);

  // 配列に現在日時を加える
  const formattedDate = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss");
  const addArray = arrayChannelsInfo.map(value => {
    const addFormattedDate = value.push(formattedDate)
    return addFormattedDate
  }
  );
  console.log(addArray);
  console.log(arrayChannelsInfo);

  const ss = SpreadsheetApp.getActiveSpreadsheet();  // スプレッドシート取得
  const sheet = ss.getSheetByName('list');  // シートを指定
  const range = sheet.getRange(2, 1, arrayChannelsInfo.length, arrayChannelsInfo[0].length);// Rangeを指定

  range.clear();  //書き込む前にスプレッドシートの情報をクリアする
  SpreadsheetApp.flush();//クリアした状態をスプレッドシートに即時適用する
  range.setValues(arrayChannelsInfo);  //スプレッドーシートにSlack Channel情報を書き込む 
}

/**
 * SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列にする、スプレッドシートに書き込むために
 * @return {array} arrayChannelsInfo - SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにしたものを配列に格納
 * 
 * 参考
 * https://moripro.net/gas-object-to-array/
 */
function objectToArray() {
  const objectOfSlackConversationsListResponse = getResponseAsObject();
  // console.log(objectOfSlackConversationsListResponse);
  // return;
  const arrayHasChannelObjects = objectOfSlackConversationsListResponse.channels;//OK;true取り除く
  const arrayChannelsInfo = arrayHasChannelObjects.map(channel => [channel.name, channel.id, channel.is_channel, channel.is_archived]);
  // console.log(arrayChannelsInfo);
  // console.log(arrayChannelsInfo.length);
  // console.log(arrayChannelsInfo[0].length);
  return arrayChannelsInfo;
}

/**
 * SlackApiからconversations.listで得たレスポンスをJSONからオブジェクトにする関数
 * @return {object} objectOfSlackConversationsListResponse - conversations.listのレスポンスをオブジェクトにしたもの
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
 * @return {object} conversationsListResponse - conversations.listを叩いたレスポンス
 * 
 * NOTE:プロジェクトの設定＞スクリプト プロパティ　でslackBotUserOAuthToken　設定しておく。
 * 
 * 参考
 * https://qiita.com/seratch/items/2158cb0abed5b8e12809
 * https://api.slack.com/methods/conversations.list
 */
function getSlackConversationsList() {
  const token = PropertiesService.getScriptProperties().getProperty('slackBotUserOAuthToken');
  const url = `https://www.slack.com/api/conversations.list`;
 
  const options = 
    {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    headers: { "Authorization": `Bearer ${token}` },
    "payload" : {
      "token": token,
      "limit": 1000,
      "exclude_archived": false,
      "types": "public_channel,private_channel",
      // "cursor": cursor
    }
  }
  
  // console.log(url);
  // console.log(options);

  const slackConversationsListResponse = UrlFetchApp.fetch(url, options);
  // return console.log(`response: ${slackConversationsListResponse}`);
  return slackConversationsListResponse;
}
