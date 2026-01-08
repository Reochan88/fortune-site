/**********************
 * 共通ユーティリティ
 **********************/

// ゾロ目判定
function isMaster(num) {
  return num === 11 || num === 22 || num === 33;
}

// 数字を1文字ずつ足す（途中ゾロ目即確定）
function addDigitsWithMasterCheck(str) {
  let total = 0;

  for (let ch of str) {
    total += Number(ch);

    // ★ 足している途中でゾロ目なら即確定
    if (isMaster(total)) {
      return total;
    }
  }

  return total;
}

// ゾロ目即リターン・足し算ベース
function reduceNumber(num) {

  // ① 最初からゾロ目
  if (isMaster(num)) {
    return num;
  }

  // ② 1回目の足し算
  let sum1 = addDigitsWithMasterCheck(num.toString());

  if (isMaster(sum1)) {
    return sum1;
  }

  // ③ まだ2桁ならもう1回足す
  if (sum1 >= 10) {
    let sum2 = addDigitsWithMasterCheck(sum1.toString());

    if (isMaster(sum2)) {
      return sum2;
    }

    return sum2;
  }

  // ④ 1桁なら終了
  return sum1;
}

/**********************
 * ライフパスナンバー
 **********************/

function lifePathNumber(year, month, day) {

  // 年・月・日を全
