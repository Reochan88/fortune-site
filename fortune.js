/**********************
 * 共通
 **********************/

// ゾロ目判定
function isMasterNumber(num) {
  return num === 11 || num === 22 || num === 33;
}

// ループなし・単純に足す版
function reduceNumber(num) {
  // ① 最初にゾロ目なら即確定
  if (isMasterNumber(num)) {
    return num;
  }

  // ② 2桁以上なら1回目の足し算
  if (num >= 10) {
    const str1 = String(num);
    let sum1 = 0;

    sum1 += Number(str1[0]);
    if (str1[1]) sum1 += Number(str1[1]);
    if (str1[2]) sum1 += Number(str1[2]);
    if (str1[3]) sum1 += Number(str1[3]);

    // ★ 途中ゾロ目
    if (isMasterNumber(sum1)) {
      return sum1;
    }

    // ③ まだ2桁なら2回目の足し算
    if (sum1 >= 10) {
      const str2 = String(sum1);
      let sum2 = 0;

      sum2 += Number(str2[0]);
      if (str2[1]) sum2 += Number(str2[1]);

      // ★ 念のためゾロ目
      if (isMasterNumber(sum2)) {
        return sum2;
      }

      return sum2;
    }

    return sum1;
  }

  // ④ 1桁はそのまま
  return num;
}

/**********************
 * ライフパスナンバー
 **********************/

function lifePathNumber(year, month, day) {
  const y = String(year);
  const m = String(month);
  const d = String(day);

  let total = 0;

  // 年
  total += Number(y[0]) + Number(y[1]) + Number(y[2]) + Number(y[3]);
  // 月
  total += Number(m[0]);
  if (m[1]) total += Number(m[1]);
  // 日
  total += Number(d[0]);
  if (d[1]) total += Number(d[1]);

  return reduceNumber(total);
}

/**********************
 * 相性占い
 **********************/

function compatibilityNumber(num1, num2) {
  return reduceNumber(num1 + num2);
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

  document.getElementById("compatibilityResult").innerHTML = `
    <strong>相性数：${comp}</strong><br>
    ${message}
  `;
}
