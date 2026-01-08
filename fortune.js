function fortune() {
  const list = [
    "🌟 大吉：最高の1日になる",
    "😊 中吉：良い流れ",
    "🙂 小吉：平穏",
    "😐 末吉：様子見",
    "⚠️ 凶：無理しないで"
  ];

  const r = Math.floor(Math.random() * list.length);
  document.getElementById("result").textContent = list[r];
}
