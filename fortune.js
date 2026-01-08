/**********************
 * 共通ユーティリティ
 **********************/

// 数字を足す（例: 29 → 11）
function digitSum(num) {
  return num
    .toString()
    .split("")
    .map(Number)
    .reduce((a, b) => a + b, 0);
}

// ゾロ目即リターン・ループなし
function reduceNumber(num) {
  // ① 最初からゾロ目なら確定
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  // ② 2桁以上なら1回足す
  if (num >= 10) {
    const sum1 = digitSum(num);

    // ★ 途中でゾロ目が出たら即確定
    if (sum1 === 11 || sum1 === 22 || sum1 === 33) {
      return sum1;
    }

    // ③ まだ2桁ならもう1回だけ足す
    if (sum1 >= 10) {
      const sum2 = digitSum(sum1);

      // ★ 念のためゾロ目チェック
      if (sum2 === 11 || sum2 === 22 || sum2 === 33) {
        return sum2;
      }

      return sum2;
    }

    return sum1;
  }

  // ④ 1桁ならそのまま
  return num;
}

/**********************
 * ライフパスナンバー
 **********************/

function lifePathNumber(year, month, day) {
  const total =
    digitSum(year) +
    digitSum(month) +
    digitSum(day);

  return reduceNumber(total);
}

/**********************
 * 相性占い
 **********************/

function compatibilityNumber(num1, num2) {
  const total = num1 + num2;
  return reduceNumber(total);
}

const compatibilityMessage = {
  1: "刺激的で成長し合える関係。",
  2: "優しく支え合う関係。",
  3: "楽しく会話が弾む関係。",
  4: "安定感があり信頼できる関係。",
  5: "変化と刺激に満ちた関係。",
  6: "愛情深く家庭的な関係。",
  7: "精神的に深くつながる関係。",
  8: "現実的でパワフルな関係。",
  9: "無条件の愛で結ばれる関係。",
  11: "魂レベルで強く引き合う特別な縁。",
  22: "現実を共に築く使命的な縁。",
  33: "無償の愛で結ばれる究極の相性。"
};

/**********************
 * HTML から呼ばれる関数
 **********************/

function calcLifePath() {
  const value = document.getElementById("birthday").value;
  if (!value) return;

  const [y, m, d] = value.split("-").map(Number);
  const num = lifePathNumber(y, m, d);

  document.getElementById("result").textContent =
    `あなたのライフパスナンバーは ${num} です`;
}

function calcCompatibility() {
  const a = document.getElementById("birthdayA").value;
  const b = document.getElementById("birthdayB").value;

  if (!a || !b) {
    alert("2人分入力してください");
    return;
  }

  const [y1, m1, d1] = a.split("-").map(Number);
  const [y2, m2, d2] = b.split("-").map(Number);

  const lifeA = lifePathNumber(y1, m1, d1);
  const lifeB = lifePathNumber(y2, m2, d2);

  const comp = compatibilityNumber(lifeA, lifeB);
  const message =
    compatibilityMessage[comp] || "不思議なご縁で結ばれています。";

  document.getElementById("compatibi
