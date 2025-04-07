function processLinRoom() {
  let roomnum = parseInt(document.getElementById("linroom").value);
  let roundsWithBye = [];

  // 🛡️ 若輸入無效或為負數 → 清空結果並返回
  if (isNaN(roomnum) || roomnum <= 0) {
    document.getElementById("linroomans").textContent = "-";
    document.getElementById("linroompass").textContent = "-";
    return;
  }

  let finalRoomCount = roomnum; // 記錄最後剩下的房間數

  // 循環最多 5 輪 (可視需求調整)
  for (let i = 1; i <= 5; i++) {
    if (roomnum <= 1) break; // 若剩 1 間則提前結束

    if (roomnum % 2 !== 0) {
      // 🧮 奇數房間 → +1 後除以 2 並記錄輪空輪次
      roomnum = Math.ceil(roomnum / 2);
      roundsWithBye.push(i); // 第 i 輪有機會輪空
    } else {
      // ⚖️ 偶數房間 → 直接除以 2
      roomnum = roomnum / 2;
    }
    finalRoomCount = roomnum; // 更新最終房間數
  }

  // ✅ 更新計算結果
  document.getElementById("linroomans").textContent = finalRoomCount;
  document.getElementById("linroompass").textContent =
    roundsWithBye.length > 0 ? roundsWithBye.join("、") : "無";
}

// 修練時間計算
function processTrainingTime() {
  const nowlv = parseInt(document.getElementById("now-lv").value);
  const nowexp = parseInt(document.getElementById("now-exp").value);
  const cspeed = parseInt(document.getElementById("c-speed").value);
  const energypill = parseInt(document.getElementById("energy-pill").value);
  const resultDiv = document.getElementById("trainingTime");
  const expectedDiv = document.getElementById("expectedTime");
  const nextSlotDiv = document.getElementById("nextPromotionSlot");

  // 驗證輸入
  if (isNaN(nowlv) || isNaN(nowexp) || isNaN(cspeed) || cspeed <= 0) {
    resultDiv.textContent = "-";
    return;
  }

  const remainingExp = nowlv - nowexp - (isNaN(energypill) ? 0 : energypill);
  if (remainingExp <= 0) {
    resultDiv.textContent = "已達滿修為";

    // 🕰️ 計算預計晉升時間
    const now = new Date();
    now.setMinutes(now.getMinutes()); // 將計算分鐘加到當前時間
    expectedDiv.textContent = ``;

    // 📅 晉升場次 (每日固定場次)
    const promotionSlots = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
      "00:00",
    ];

    // 🔎 計算最近可晉升場次
    const promotionTime = findNextPromotionSlot(now, promotionSlots);
    nextSlotDiv.textContent = `(${promotionTime}秘境)`;
    return;
  }

  // 🕒 計算所需時間 (分鐘)
  const totalMinutes = Math.round(remainingExp / cspeed / 60);

  // ⏳ 換算成 小時 + 分鐘
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // 📄 顯示結果
  resultDiv.textContent = `${hours} 小時 ${minutes} 分鐘`;

  // 🕰️ 計算預計晉升時間
  const now = new Date();
  now.setMinutes(now.getMinutes() + totalMinutes); // 將計算分鐘加到當前時間

  const expectedHours = now.getHours().toString().padStart(2, "0"); // 補零格式
  const expectedMinutes = now.getMinutes().toString().padStart(2, "0");

  expectedDiv.textContent = `${expectedHours}:${expectedMinutes} 修為可滿`;

  // 📅 晉升場次 (每日固定場次)
  const promotionSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ];

  // 🔎 計算最近可晉升場次
  const promotionTime = findNextPromotionSlot(now, promotionSlots);
  nextSlotDiv.textContent = `(${promotionTime}秘境)`;

  // 🧮 根據 nowlv 計算對應 pkpluse 與 pkpluse2
  let pkpluse = 0;
  let pkpluse2 = 0;

  const pkConfig = [
    { levels: [42550, 37150, 24150], pk: 800, pk2: 1000 },
    { levels: [95625, 70625, 44625], pk: 1000, pk2: 1500 },
    { levels: [154980, 106155, 54915], pk: 1500, pk2: 2000 },
    { levels: [177765, 121275, 61950], pk: 2000, pk2: 3000 },
    { levels: [206220, 140805, 72135], pk: 3000, pk2: 4000 },
    { levels: [322140, 246435, 166950], pk: 4000, pk2: 5000 },
    { levels: [552320, 376970, 193220], pk: 5000, pk2: 6000 },
    { levels: [639765, 436800, 223650], pk: 6000, pk2: 8000 },
    { levels: [861000, 598500, 315000], pk: 8000, pk2: 20000 },
    { levels: [2841000, 1764000, 903000], pk: 20000, pk2: 25000 },
    { levels: [2818895, 1895985, 950985], pk: 25000, pk2: 28000 },
    { levels: [2956905, 1988805, 1003275], pk: 28000, pk2: 30000 },
    { levels: [3117942, 2097922, 1058422], pk: 30000, pk2: 45000 },
    { levels: [6352500, 3832500, 1942500], pk: 45000, pk2: 60000 },
    { levels: [6777750, 4730250, 2478000], pk: 60000, pk2: 100000 },
  ];

  for (const config of pkConfig) {
    if (config.levels.includes(nowlv)) {
      pkpluse = config.pk;
      pkpluse2 = config.pk2;
      break;
    }
  }

  // 📦 計算挑戰帖數量（若資料無對應就不顯示）
  if (pkpluse > 0 && pkpluse2 > 0) {
    const pktime = Math.ceil(remainingExp / pkpluse);
    const pktime2 = Math.ceil(remainingExp / pkpluse2);

    const pkDiv = document.getElementById("pkTime");
    pkDiv.innerHTML = `
    PK同等還需：<span style="color:#f00;">${pktime}</span> 張挑戰帖 | PK越級還需：<span style="color:#f00;">${pktime2}</span> 張挑戰帖`;
  }
}

// 🔍 找到下一個可晉升場次
function findNextPromotionSlot(targetTime, slots) {
  const targetMinutes = targetTime.getHours() * 60 + targetTime.getMinutes();

  for (const slot of slots) {
    const [slotHour, slotMinute] = slot.split(":").map(Number);
    const slotMinutes = slotHour * 60 + slotMinute;

    // 若 targetTime <= 當前場次時間 → 該場次即為可晉升場次
    if (targetMinutes <= slotMinutes) return slot;
  }

  // 若超過當日最後場次 → 返回隔日 10:00
  return "隔日 10:00";
}
function processStorageTime() {
  // 取得目前選取等級的 value（結晶總量）
  const selectedLevel = document.getElementById("S-now-lv").value;
  const crystalAmount = parseFloat(selectedLevel);

  // 取得目前修練速度
  const speedInput = document.getElementById("S-c-speed").value;
  const cultivationSpeed = parseFloat(speedInput);

  // 驗證數值是否合法
  if (
    isNaN(crystalAmount) ||
    isNaN(cultivationSpeed) ||
    cultivationSpeed <= 0
  ) {
    document.getElementById("StorageTime").innerText = "請輸入有效的修練速度";
    return;
  }

  // 計算總分鐘數
  const totalMinutes = (crystalAmount * 0.4) / (cultivationSpeed * 60);

  // 換算為秒 → 小時、分鐘、秒
  const totalSeconds = Math.floor(totalMinutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // 補零的格式化函數
  const pad = (num) => String(num).padStart(2, "0");

  // 組合顯示內容：黑色文字 + 紅色時間
  document.getElementById("StorageTime").innerHTML =
    `<span style="color:#6d6d6d; font-size:16px;">請每隔 </span>` +
    `<span style="color:#f00; font-size:16px;">${pad(hours)}時${pad(
      minutes
    )}分${pad(seconds)}秒</span>` +
    `<span style="color:#6d6d6d; font-size:16px;"> 收取一次</span>`;
}
const skills = {
  N秘笈: {
    水卷: [3000, 10000, 15000, 20000, 30000],
    火卷: [3000, 10000, 15000, 20000, 30000],
    木卷: [3000, 10000, 15000, 20000, 30000],
  },
  SR秘笈: { 天罡陣: [1.02, 1.05, 1.07, 1.1, 1.12] },
};

const images = {
  天書: "wp_image1.jpg",
  天罡陣: "wp_image2.jpg",
  大象心法: "wp_image3.jpg",
  水卷: "wp_image4.jpg",
  火卷: "wp_image5.jpg",
  木卷: "wp_image6.jpg",
};

function populateSelectOptions() {
  let selects = document.querySelectorAll(".skill-select");
  selects.forEach((select) => {
    select.innerHTML = `<option value="">請選擇本命心法</option>`;
    for (let category in skills) {
      let optgroup = document.createElement("optgroup");
      optgroup.label = `-${category}-`;
      for (let skill in skills[category]) {
        for (let i = 0; i < skills[category][skill].length; i++) {
          let option = document.createElement("option");
          option.value = `${skill}-${i + 1}`;
          option.textContent = `${skill} - LV${i + 1}`;
          optgroup.appendChild(option);
        }
      }
      select.appendChild(optgroup);
    }
  });
}

function updateConfig(index, value) {
  let box = document.getElementById(`box${index + 1}`);
  if (value) {
    let [skill] = value.split("-");
    box.innerHTML = `<img src="../img/${images[skill]}" alt="${skill}">`;
  } else {
    box.innerHTML = "";
  }
  updateCalculations();
}

function updateCalculations() {
  calculatePower();
  calculateRequiredPower();
}

function calculatePower() {
  let basePower = parseFloat(document.getElementById("inputValue").value) || 0;
  let { bonusPower, multiplier, srSsrMultiplier } = getBuffValues(
    ["config1", "config2", "config3", "config4"],
    false
  );

  // 計算不同屬性的戰力
  let waterPower =
    (basePower + bonusPower["水"]) * (1 + multiplier["水"]) * srSsrMultiplier;
  let firePower =
    (basePower + bonusPower["火"]) * (1 + multiplier["火"]) * srSsrMultiplier;
  let woodPower =
    (basePower + bonusPower["木"]) * (1 + multiplier["木"]) * srSsrMultiplier;

  // 計算最大 / 最小總戰力
  let maxTotalPower = Math.max(waterPower, firePower, woodPower);
  let minTotalPower = Math.min(waterPower, firePower, woodPower);

  // 即時更新顯示結果
  document.getElementById("waterResult").textContent = (
    (waterPower * 1.05) /
    0.95
  ).toFixed(2);
  document.getElementById("fireResult").textContent = (
    (firePower * 1.05) /
    0.95
  ).toFixed(2);
  document.getElementById("woodResult").textContent = (
    (woodPower * 1.05) /
    0.95
  ).toFixed(2);
}

function calculateRequiredPower() {
  let opponentPower =
    parseFloat(document.getElementById("opponentPower").value) || 0;
  let {
    bonusPower: oppBonus,
    multiplier: oppMulti,
    srSsrMultiplier: oppSrSsrMultiplier,
  } = getBuffValues(
    [
      "opponentConfig1",
      "opponentConfig2",
      "opponentConfig3",
      "opponentConfig4",
    ],
    true
  );

  let opponentWaterPower =
    (opponentPower + oppBonus["水"]) *
    (1 + oppMulti["水"]) *
    oppSrSsrMultiplier;
  let opponentFirePower =
    (opponentPower + oppBonus["火"]) *
    (1 + oppMulti["火"]) *
    oppSrSsrMultiplier;
  let opponentWoodPower =
    (opponentPower + oppBonus["木"]) *
    (1 + oppMulti["木"]) *
    oppSrSsrMultiplier;

  let { bonusPower, multiplier, srSsrMultiplier } = getBuffValues(
    ["config1", "config2", "config3", "config4"],
    false
  );

  let requiredWaterPower =
    (opponentWaterPower * 0.95) /
      (1.05 * srSsrMultiplier * (1 + multiplier["水"])) -
    bonusPower["水"];
  let requiredFirePower =
    (opponentFirePower * 0.95) /
      (1.05 * srSsrMultiplier * (1 + multiplier["火"])) -
    bonusPower["火"];
  let requiredWoodPower =
    (opponentWoodPower * 0.95) /
      (1.05 * srSsrMultiplier * (1 + multiplier["木"])) -
    bonusPower["木"];

  requiredWaterPower = Math.max(0, requiredWaterPower.toFixed(2));
  requiredFirePower = Math.max(0, requiredFirePower.toFixed(2));
  requiredWoodPower = Math.max(0, requiredWoodPower.toFixed(2));

  let maxRequiredPower = Math.max(
    requiredWaterPower,
    requiredFirePower,
    requiredWoodPower
  );
  let minRequiredPower = Math.min(
    requiredWaterPower,
    requiredFirePower,
    requiredWoodPower
  );

  document.getElementById("requiredWaterPower").textContent =
    requiredWaterPower;
  document.getElementById("requiredFirePower").textContent = requiredFirePower;
  document.getElementById("requiredWoodPower").textContent = requiredWoodPower;
}

function getBuffValues(selectIDs, isOpponent = false) {
  let bonusPower = { 水: 0, 火: 0, 木: 0 }; // 固定戰力加成 (來自 N秘笈)
  let multiplier = { 水: 0, 火: 0, 木: 0 }; // 百分比加成 (來自功法)
  let srSsrMultiplier = 1; // SR/SSR心法的倍率加成 (連乘)

  // 讀取心法影響 (N秘笈加固定戰力 & SR/SSR加倍率)
  selectIDs.forEach((id) => {
    let value = document.getElementById(id).value;
    if (!value) return;
    let [skill, level] = value.split("-");
    level = parseInt(level) - 1;

    // N秘笈：增加固定戰力
    if (skills["N秘笈"][skill]) {
      if (skill === "水卷") bonusPower["水"] += skills["N秘笈"][skill][level];
      else if (skill === "火卷")
        bonusPower["火"] += skills["N秘笈"][skill][level];
      else if (skill === "木卷")
        bonusPower["木"] += skills["N秘笈"][skill][level];
    }
    // SR/SSR秘笈 (這些秘笈是倍率加成，影響所有屬性)
    else if (skills["SR秘笈"][skill] || skills["SSR秘笈"][skill]) {
      let multiplierValue =
        skills["SR秘笈"][skill]?.[level] || skills["SSR秘笈"][skill]?.[level];
      srSsrMultiplier *= multiplierValue;
    }
  });

  // 取得對應的功法加成
  let gongfaMultiplier = getGongfaMultiplier(isOpponent);
  multiplier["水"] += gongfaMultiplier["水"];
  multiplier["火"] += gongfaMultiplier["火"];
  multiplier["木"] += gongfaMultiplier["木"];

  return { bonusPower, multiplier, srSsrMultiplier };
}

function getGongfaMultiplier(isOpponent = false) {
  let multiplier = { 水: 0, 火: 0, 木: 0 };
  let checkboxSelector = isOpponent
    ? ".opponent-gongfa:checked"
    : ".gongfa:checked";

  document.querySelectorAll(checkboxSelector).forEach((cb) => {
    let [type, percent] = cb.value.split("-");
    multiplier[type] += parseInt(percent) / 100; // 直接加總百分比
  });

  return multiplier;
}

document.querySelectorAll(".gongfa").forEach((cb) => {
  cb.addEventListener("change", updateCalculations);
});

document.querySelectorAll(".opponent-gongfa").forEach((cb) => {
  cb.addEventListener("change", calculateRequiredPower);
});

window.onload = function () {
  populateSelectOptions();

  // ✅ 自己的功法 - 綁定即時計算
  document.querySelectorAll(".gongfa").forEach((cb) => {
    cb.addEventListener("change", updateCalculations);
  });

  // ✅ 對手的功法 - 新增這段代碼以即時計算
  document.querySelectorAll(".opponent-gongfa").forEach((cb) => {
    cb.addEventListener("change", calculateRequiredPower);
  });
};

window.onload = populateSelectOptions;

// 取得按鈕與 Modal 元素
let modal = document.getElementById("infoModal");
let btn = document.getElementById("infoButton");
let modal2 = document.getElementById("infoModal2");
let btn2 = document.getElementById("infoButton2");
let closeBtn = document.querySelector(".close");
let closeBtn2 = document.querySelector(".close2");

// 點擊按鈕，顯示 Modal
btn.onclick = function () {
  modal.style.display = "block";
};
btn2.onclick = function () {
  modal2.style.display = "block";
};

// 點擊關閉按鈕，隱藏 Modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};
closeBtn2.onclick = function () {
  modal2.style.display = "none";
};

// 點擊 Modal 外部時，關閉 Modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

// 🗂️ Tabs 切換功能
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 移除所有 active 樣式
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => (c.style.display = "none"));

    // 新增 active 並顯示對應內容
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).style.display = "block";
  });
});
