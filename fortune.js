/**********************
 * ゾロ目判定（99まで対応）
 **********************/
function isMasterNumber(num) {
  // 11, 22, ..., 99 に対応
  if (num < 10 || num > 99) return false; // 2桁以外は対象外
  const s = String(num);
  return s[0] === s[1]; // 両方の数字が同じならゾロ目
}

/**********************
 * ライフパスナンバー計算
 * birthday: "YYYY-MM-DD" 形式
 **********************/
function lifePathNumber(birthday) {
  // 数字だけ抽出
  const str = birthday.replace(/[^0-9]/g, "");

  // 1桁ずつバラバラに取得（変更なし）
  const y1 = Number(str[0]);
  const y2 = Number(str[1]);
  const y3 = Number(str[2]);
  const y4 = Number(str[3]);
  const m1 = Number(str[4]);
  const m2 = Number(str[5]);
  const d1 = Number(str[6]);
  const d2 = Number(str[7]);

  // 全部足す
  let sum = y1 + y2 + y3 + y4 + m1 + m2 + d1 + d2;

  // 途中でゾロ目なら即 return
  if (isMasterNumber(sum)) return sum;

  // 2桁ならもう一度足す
  if (sum >= 10) {
    const s = String(sum);
    sum = Number(s[0]) + Number(s[1]);

    // ゾロ目チェック
    if (isMasterNumber(sum)) return sum;
  }

  return sum; // 1桁の場合
}

/**********************
 * 相性占い
 **********************/
function compatibilityNumber(num1, num2) {
  let total = num1 + num2;

  if (isMasterNumber(total)) return total;

  if (total >= 10) {
    const s = String(total);
    total = Number(s[0]) + Number(s[1]);

    if (isMasterNumber(total)) return total;
  }

  return total;
}

/**********************
 * 相性メッセージ
 **********************/
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
  33: "無償の愛で結ばれる究極の相性。",
  44: "強い信念で結ばれる縁。",
  55: "自由で刺激的な関係。",
  66: "家庭的で温かい関係。",
  77: "精神的に深く理解し合える関係。",
  88: "現実的でパワフルな相性。",
  99: "普遍的な愛と調和で結ばれる縁。"
};

/**********************
 * HTML用関数
 **********************/
function calcLifePath() {
  const value = document.getElementById("birthday").value;
  if (!value) return;

  const num = lifePathNumber(value);
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

  const lifeA = lifePathNumber(a);
  const lifeB = lifePathNumber(b);

  const comp = compatibilityNumber(lifeA, lifeB);
  const message = compatibilityMessage[comp] || "不思議なご縁で結ばれています。";

  document.getElementById("compatibilityResult").innerHTML = `
    <strong>相性数：${comp}</strong><br>
    ${message}
  `;
}
