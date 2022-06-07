function date() {
  const currentDate = new Date();  // 現在日時を取得
  console.log(currentDate);
  const formattedDate = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss");
  console.log(formattedDate);
}


function myFunction() {
  const obj = {
    name: 'Bob',
    age: 25
  }

  const bob = obj.name;
  console.log(bob);

  const age = obj.age;
  console.log(age);

  const bob2 = obj['name'];
  console.log(bob2);

}

// [
//   ['bot-名言', 'C01V5TP143G', true, false],
//   ['random', 'C01V9JSQNCD', true, false],
//   ['general', 'C01VCM3AJGJ', true, false],
//   ['slackのtest', 'C0204RY94J0', true, true],
//   ['bot-天気予報', 'C020CHVV7HV', true, false],
//   ['bot-雑談', 'C020UG32T53', true, false],
//   ['memo', 'C03FRG5LGB0', true, false],
//   ['アーカイブ対象チャンネル', 'C03FZV4C1EK', true, false]
// ];

// // const formattedDate = [Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")];
// // addArrayChannelsInfo = arrayChannelsInfo.map(value => value +formattedDate);

// arrayChannelsInfo.forEach(value => value.push(Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")));
// console.log(arrayChannelsInfo);



function array0NG() {
  const array =
    [
      ['Bob', 'Apple', true, false],
      ['Tom', 'Banana', true, false],
      ['Ivy', 'Coke', true, false],
    ];
  console.log(array);

  const formattedDate = [Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")];
  addArray = array.map(value => value + formattedDate);

  console.log(addArray);
}


function array1forEach() {
  const array =
    [
      ['Bob', 'Apple', true, false],
      ['Tom', 'Banana', true, false],
      ['Ivy', 'Coke', true, false],
    ];
  console.log(array);

  array.forEach(value => value.push(Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")));
  console.log(array);
}

//formattedDate が文字列の場合
function array2concat() {
  const array =
    [
      ['Bob', 'Apple', true, false],
      ['Tom', 'Banana', true, false],
      ['Ivy', 'Coke', true, false],
    ];
  console.log(array);

  const formattedDate = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss");
  console.log(formattedDate);
  console.log(typeof formattedDate);

  addArray = array.map(value => {
    const addFormattedDate = value.concat(formattedDate)
    return addFormattedDate
  }
  );

  console.log(addArray);
}

//formattedDate が配列の場合
function array3concat() {
  const array =
    [
      ['Bob', 'Apple', true, false],
      ['Tom', 'Banana', true, false],
      ['Ivy', 'Coke', true, false],
    ];
  console.log(array);

  const formattedDate = [Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")];
  console.log(formattedDate);
  console.log(typeof formattedDate);

  addArray = array.map(value => {
    const addFormattedDate = value.concat(formattedDate)
    return addFormattedDate
  }
  );

  console.log(addArray);
}


function array4push() {
  const array =
    [
      ['Bob', 'Apple', true, false],
      ['Tom', 'Banana', true, false],
      ['Ivy', 'Coke', true, false],
    ];
  console.log(array);

  const formattedDate = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss");
  console.log(formattedDate);
  console.log(typeof formattedDate);

  addArray = array.map(value => {
    const addFormattedDate = value.push(formattedDate)
    return addFormattedDate
  }
  );

  console.log(addArray);
  console.log(array);
}

