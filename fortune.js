/**********************
 * ゾロ目判定
 **********************/
function isMasterNumber(num) {
  return num === 11 || num === 22 || num === 33;
}

/**********************
 * ライフパスナンバー計算
 * birthday: "YYYY-MM-DD" 形式
 **********************/
function lifePathNumber(birthday) {
  // 数字だけ取り出す
  const numbers = birthday.replace(/[^0-9]/g, "").split("");

  let sum = 0;

  // 1桁ずつ足す
  for (let i = 0; i < numbers.length; i++) {
    sum += Number(numbers[i]);

    // ★ 途中でゾロ目なら即 return
    if (isMasterNumber(sum)) {
      return sum;
    }
  }

  // 2桁以上ならもう一度足す
  if (sum >= 10 && !isMasterNumber(sum)) {
    const s = String(sum);
    sum = Number(s[0]) + Number(s[1]);

    // 念のためゾロ目チェック
    if (isMasterNumber(sum)) {
      return sum;
    }
  }

  return sum;
}

/**********************
 * 相性占い
 **********************/
function compatibilityNumber(num1, num2) {
  const total = num1 + num2;

  // ゾロ目即 return
  if (isMasterNumber(total)) return total;

  // 2桁以上ならもう一度足す
  if (total >= 10) {
    const s = String(total);
    const sum = Number(s[0]) + Number(s[1]);
    if (isMasterNumber(sum)) return sum;
    return sum;
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
  33: "無償の愛で結ばれる究極の相性。"
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
