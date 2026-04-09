// マスターナンバー対応の1桁化
function reduceNumber(num) {
  while (num > 9) {
    // マスターナンバーならそのまま返す
    if (num === 11 || num === 22 || num === 33) {
      return num
    }

    num = num
      .toString()
      .split('')
      .reduce((sum, n) => sum + Number(n), 0)
  }
  return num
}

// 生年月日 → 数字
function getBirthNumber(year, month, day) {
  const sum = `${year}${month}${day}`
    .split('')
    .reduce((sum, n) => sum + Number(n), 0)

  return reduceNumber(sum)
}


// タイプ判定（生年月日のみ）
function getType(birthNum) {
  const types = {
    1: "１:リーダータイプ",
    2: "２:サポートタイプ",
    3: "３:クリエイタータイプ",
    4: "４:努力家タイプ",
    5: "５:自由人タイプ",
    6: "６:愛されタイプ",
    7: "７:探求者タイプ",
    8: "８:成功者タイプ",
    9: "９:博愛タイプ",
    11: "１１:直感タイプ（マスターナンバー）",
    22: "２２:カリスマタイプ（マスターナンバー）",
    33: "３３:救世主タイプ（マスターナンバー）"
  }

  return types[birthNum]
}

// フォーム処理
const form = document.getElementById("numerology")

form.addEventListener("submit", function (e) {
  e.preventDefault()

  const year = document.getElementById("year").value
  const month = document.getElementById("month").value
  const day = document.getElementById("day").value

  // バリデーション
  if (!year || !month || !day) {
    alert("生年月日を入力してください")
    return
  }

  const birthNum = getBirthNumber(year, month, day)
  const result = getType(birthNum)

  const resultEl = document.getElementById("result")

  // ローディング風
  resultEl.innerHTML = "占い中..."

  setTimeout(() => {
    resultEl.innerHTML = `
      <h2>あなたの〇〇数は…</h2>
      <p>${result}</p>
    `
  }, 800)
})


// タイトル・文字を分解
//-  document.querySelectorAll(".js-wave").forEach(el => {
//-    const text = el.textContent
//-    el.innerHTML = text
//-      .split("")
//-      .map((char, i) => `<span style="--i:${i}">${char}</span>`)
//-      .join("")
//-  })

// タイトル・スクロールで発火
//-window.addEventListener("scroll", () => {
//-  document.querySelectorAll(".js-wave").forEach(el => {
//-    if (el.classList.contains("active")) return

//-    const rect = el.getBoundingClientRect()

//-    if (rect.top < window.innerHeight * 0.8) {
//-      el.classList.add("active")
//-    }
//-  })
//-})

const texts = document.querySelectorAll(".wave-text");
texts.forEach(text => {
  const chars = text.textContent.split("");

  text.innerHTML = chars
    .map(char => `<span class="char">${char}</span>`)
    .join("");

  gsap.from(text.querySelectorAll(".char"), {
    y: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    scrollTrigger: {
      trigger: text, // ←それぞれに紐づける
      start: "top 80%",
    }
  });
});
