/**********************
 * 数秘術 共通関数
 **********************/

function reduceNumber(num) {
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  while (num > 9) {
    num = num
      .toString()
      .split("")
      .map(n => Number(n))
      .reduce((a, b) => a + b, 0);

    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }
  return num;
}

function lifePathNumber(year, month, day) {
  const sum =
    reduceNumber(year) +
    reduceNumber(month) +
    reduceNumber(day);

  return reduceNumber(sum);
}

/**********************
 * 相性占い
 **********************/

function compatibilityNumber(num1, num2) {
  return reduceNumber(num1 + num2);
}

const compatibilityMessage = {
  1: "刺激的で成長し合える関係。お互いを高め合えます。",
  2: "優しく支え合う関係。安心感があり長続きします。",
  3: "楽しく会話が弾む関係。友達のような恋人関係。",
  4: "現実的で安定した関係。信頼を積み重ねるタイプ。",
  5: "変化と刺激に満ちた関係。マンネリ知らず。",
  6: "愛情深く家庭的な関係。結婚向き。",
  7: "精神的に深くつながる関係。静かな相性。",
  8: "目標を共有できるパワフルな関係。",
  9: "無条件の愛で結ばれる関係。",
  11: "魂レベルで強く引き合う特別な縁。",
  22: "現実世界で大きなことを成し遂げる運命的な縁。",
  33: "無償の愛と奉仕で結ばれる究極の相性。"
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
