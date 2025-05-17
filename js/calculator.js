function processLinRoom() {
  let roomnum = parseInt(document.getElementById("linroom").value);
  let roundsWithBye = [];
  if (isNaN(roomnum) || roomnum <= 0) {
    document.getElementById("linroomans").textContent = "-";
    document.getElementById("linroompass").textContent = "-";
    return;
  }

  let finalRoomCount = roomnum; 

  for (let i = 1; i <= 5; i++) {
    if (roomnum <= 1) break;

    if (roomnum % 2 !== 0) {
      roomnum = Math.ceil(roomnum / 2);
      roundsWithBye.push(i); 
    } else {
      roomnum = roomnum / 2;
    }
    finalRoomCount = roomnum;
  }

  document.getElementById("linroomans").textContent = finalRoomCount;
  document.getElementById("linroompass").textContent =
    roundsWithBye.length > 0 ? roundsWithBye.join("、") : "無";
}

function processTrainingTime() {
  const nowlv = parseInt(document.getElementById("now-lv").value);
  const nowexp = parseInt(document.getElementById("now-exp").value);
  const cspeed = parseInt(document.getElementById("c-speed").value);
  const energypill = parseInt(document.getElementById("energy-pill").value);
  const resultDiv = document.getElementById("trainingTime");
  const expectedDiv = document.getElementById("expectedTime");
  const nextSlotDiv = document.getElementById("nextPromotionSlot");

  if (isNaN(nowlv) || isNaN(nowexp) || isNaN(cspeed) || cspeed <= 0) {
    resultDiv.textContent = "-";
    return;
  }

  const remainingExp = nowlv - nowexp - (isNaN(energypill) ? 0 : energypill);
  if (remainingExp <= 0) {
    resultDiv.textContent = "已達滿修為";
    const now = new Date();
    now.setMinutes(now.getMinutes()); 
    expectedDiv.textContent = ``;
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

    const promotionTime = findNextPromotionSlot(now, promotionSlots);
    nextSlotDiv.textContent = `(${promotionTime}秘境)`;
    return;
  }
  const totalMinutes = Math.round(remainingExp / cspeed / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  resultDiv.textContent = `${hours} 小時 ${minutes} 分鐘`;
  const now = new Date();
  now.setMinutes(now.getMinutes() + totalMinutes); 

  const expectedHours = now.getHours().toString().padStart(2, "0"); 
  const expectedMinutes = now.getMinutes().toString().padStart(2, "0");

  expectedDiv.textContent = `${expectedHours}:${expectedMinutes} 修為可滿`;

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

  const promotionTime = findNextPromotionSlot(now, promotionSlots);
  nextSlotDiv.textContent = `(${promotionTime}秘境)`;

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

  if (pkpluse > 0 && pkpluse2 > 0) {
    const pktime = Math.ceil(remainingExp / pkpluse);
    const pktime2 = Math.ceil(remainingExp / pkpluse2);

    const pkDiv = document.getElementById("pkTime");
    pkDiv.innerHTML = `
    PK同等還需：<span style="color:#f00;">${pktime}</span> 張挑戰帖 | PK越級還需：<span style="color:#f00;">${pktime2}</span> 張挑戰帖`;
  }
}

function findNextPromotionSlot(targetTime, slots) {
  const targetMinutes = targetTime.getHours() * 60 + targetTime.getMinutes();

  for (const slot of slots) {
    const [slotHour, slotMinute] = slot.split(":").map(Number);
    const slotMinutes = slotHour * 60 + slotMinute;
    if (
      targetMinutes < slotMinutes ||
      (slot === "00:00" && targetMinutes < 60)
    ) {
      return `${slot}`;
    }
  }

  const nextDay = new Date(targetTime);
  nextDay.setDate(nextDay.getDate() + 1);
  return `00:00`;
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}
function processStorageTime() {
  const selectedLevel = document.getElementById("S-now-lv").value;
  const crystalAmount = parseFloat(selectedLevel);
  const speedInput = document.getElementById("S-c-speed").value;
  const cultivationSpeed = parseFloat(speedInput);
  if (
    isNaN(crystalAmount) ||
    isNaN(cultivationSpeed) ||
    cultivationSpeed <= 0
  ) {
    document.getElementById("StorageTime").innerText = "請輸入有效的修練速度";
    return;
  }
  const totalMinutes = (crystalAmount * 0.4) / (cultivationSpeed * 60);
  const totalSeconds = Math.floor(totalMinutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, "0");
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
  SR秘笈: { 
    天罡陣: [1.02, 1.05, 1.07, 1.1, 1.15],
    靈泉心法: [1.02, 1.05, 1.07, 1.1, 1.15],
  },
};

const images = {
  天書: "wp_image1.jpg",
  天罡陣: "wp_image2.jpg",
  大象心法: "wp_image3.jpg",
  水卷: "wp_image4.jpg",
  火卷: "wp_image5.jpg",
  木卷: "wp_image6.jpg",
  靈泉心法: "wp_image7.jpg",
};

function populateSelectOptions() {
  let selects = document.querySelectorAll(".skill-select");
  selects.forEach((select) => {
    select.innerHTML = `<option value="">請選擇本命心法</option>`;
    for (let category in skills) {
      let bigOptgroup = document.createElement("optgroup");
      bigOptgroup.label = `-${category}-`;

      for (let skill in skills[category]) {
        let skillTitle = document.createElement("option");
        skillTitle.textContent = `- ${skill} -`;
        skillTitle.disabled = true;
        bigOptgroup.appendChild(skillTitle);
        for (let i = 0; i < skills[category][skill].length; i++) {
          let option = document.createElement("option");
          option.value = `${skill}-${i + 1}`;
          option.textContent = `Lv${i + 1}`;
          bigOptgroup.appendChild(option);
        }
      }

      select.appendChild(bigOptgroup);
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

  const restrainBonus = 0.05;

  let finalWater =
    ((basePower + basePower * (restrainBonus + multiplier["水"]) + bonusPower["水"]) *
      srSsrMultiplier) /
    0.95;

  let finalFire =
    ((basePower + basePower * (restrainBonus + multiplier["火"]) + bonusPower["火"]) *
      srSsrMultiplier) /
    0.95;

  let finalWood =
    ((basePower + basePower * (restrainBonus + multiplier["木"]) + bonusPower["木"]) *
      srSsrMultiplier) /
    0.95;

  document.getElementById("waterResult").textContent = finalWater.toFixed(2);
  document.getElementById("fireResult").textContent = finalFire.toFixed(2);
  document.getElementById("woodResult").textContent = finalWood.toFixed(2);
}


function calculateRequiredPower() {
  let opponentPower = parseFloat(document.getElementById("opponentPower").value) || 0;
  let {
    bonusPower: oppBonus,
    multiplier: oppMultiplier,
    srSsrMultiplier: oppSrSsrMultiplier,
  } = getBuffValues(
    ["opponentConfig1", "opponentConfig2", "opponentConfig3", "opponentConfig4"],
    true
  );
  let {
    bonusPower,
    multiplier,
    srSsrMultiplier,
  } = getBuffValues(
    ["config1", "config2", "config3", "config4"],
    false
  );

  const restrainBonus = 0.05;
  let opponentWaterPower = ((opponentPower + oppBonus["水"]) * (1 + oppMultiplier["水"]) * oppSrSsrMultiplier);
  let opponentFirePower = ((opponentPower + oppBonus["火"]) * (1 + oppMultiplier["火"]) * oppSrSsrMultiplier);
  let opponentWoodPower = ((opponentPower + oppBonus["木"]) * (1 + oppMultiplier["木"]) * oppSrSsrMultiplier);

  function reverseRequired(oppoPower, selfMult, selfBonus, srMul) {
    const totalPercent = restrainBonus + selfMult;
    return Math.max(
      0,
      ((oppoPower * 0.95) / (srMul * (1 + totalPercent)) - selfBonus).toFixed(2)
    );
  }

  let requiredWaterPower = reverseRequired(opponentWaterPower, multiplier["水"], bonusPower["水"], srSsrMultiplier);
  let requiredFirePower = reverseRequired(opponentFirePower, multiplier["火"], bonusPower["火"], srSsrMultiplier);
  let requiredWoodPower = reverseRequired(opponentWoodPower, multiplier["木"], bonusPower["木"], srSsrMultiplier);

  document.getElementById("requiredWaterPower").textContent = requiredWaterPower;
  document.getElementById("requiredFirePower").textContent = requiredFirePower;
  document.getElementById("requiredWoodPower").textContent = requiredWoodPower;
}


function getBuffValues(selectIDs, isOpponent = false) {
  let bonusPower = { 水: 0, 火: 0, 木: 0 };
  let multiplier = { 水: 0, 火: 0, 木: 0 };
  let srSsrMultiplier = 1;           

  selectIDs.forEach((id) => {
    let value = document.getElementById(id).value;
    if (!value) return;
    let [skill, level] = value.split("-");
    level = parseInt(level) - 1;

    if (skills["N秘笈"][skill]) {
      if (skill === "水卷") bonusPower["水"] += skills["N秘笈"][skill][level];
      else if (skill === "火卷") bonusPower["火"] += skills["N秘笈"][skill][level];
      else if (skill === "木卷") bonusPower["木"] += skills["N秘笈"][skill][level];
    }

    if (skills["SR秘笈"]?.[skill]) {
      srSsrMultiplier *= skills["SR秘笈"][skill][level];
    }
    if (skills["SSR秘笈"]?.[skill]) {
      srSsrMultiplier *= skills["SSR秘笈"][skill][level];
    }
  });

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
    multiplier[type] += parseInt(percent) / 100;
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

  document.querySelectorAll(".gongfa").forEach((cb) => {
    cb.addEventListener("change", updateCalculations);
  });

  document.querySelectorAll(".opponent-gongfa").forEach((cb) => {
    cb.addEventListener("change", calculateRequiredPower);
  });

  ["now-lv", "now-exp", "c-speed", "energy-pill"].forEach((id) => {
    document.getElementById(id).addEventListener("input", processTrainingTime);
  });
};

window.onload = populateSelectOptions;

let modal = document.getElementById("infoModal");
let btn = document.getElementById("infoButton");
let modal2 = document.getElementById("infoModal2");
let btn2 = document.getElementById("infoButton2");
let closeBtn = document.querySelector(".close");
let closeBtn2 = document.querySelector(".close2");

btn.onclick = function () {
  modal.style.display = "block";
};
btn2.onclick = function () {
  modal2.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};
closeBtn2.onclick = function () {
  modal2.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => (c.style.display = "none"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).style.display = "block";
  });
});

document.getElementById("floatingBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("feedbackModal").style.display = "block";
});

document.querySelector(".closeFeedbackModal").onclick = () => {
  document.getElementById("feedbackModal").style.display = "none";
};

window.onclick = (e) => {
  if (e.target === document.getElementById("feedbackModal")) {
    document.getElementById("feedbackModal").style.display = "none";
  }
};

document.getElementById("submitFeedback").addEventListener("click", () => {
  const nickname = document.getElementById("fb-nickname").value.trim();
  const id = document.getElementById("fb-id").value.trim();
  const message = document.getElementById("fb-message").value.trim();

  if (!nickname || !id || !message) {
    alert("請完整填寫所有欄位！");
    return;
  }

  fetch("https://fanshopping.com.tw/wp/feedback_save.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, id, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "感謝您的反饋！",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "my-toast",
          },
        });

        document.getElementById("feedbackModal").style.display = "none";
        document.getElementById("feedbackForm").reset();
      } else {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          title: data.error || "送出失敗，請稍後再試",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          customClass: {
            popup: "my-toast",
          },
        });
      }
    })
    .catch(() => {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "伺服器錯誤，請稍後再試",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: {
          popup: "my-toast",
        },
      });
    });
});

const stageList = [
  { stage: "Lv.1 凡人前期", need: 15, speed: 1 },
  { stage: "Lv.1 凡人中期", need: 25, speed: 1 },
  { stage: "Lv.1 凡人後期", need: 50, speed: 1 },
  { stage: "Lv.2 煉氣前期", need: 100, speed: 1 },
  { stage: "Lv.2 煉氣中期", need: 440, speed: 1 },
  { stage: "Lv.2 煉氣後期", need: 900, speed: 1 },
  { stage: "Lv.3 築基前期", need: 5400, speed: 3 },
  { stage: "Lv.3 築基中期", need: 13000, speed: 3 },
  { stage: "Lv.3 築基後期", need: 24150, speed: 3 },
  { stage: "Lv.4 結丹前期", need: 25000, speed: 5 },
  { stage: "Lv.4 結丹中期", need: 26000, speed: 5 },
  { stage: "Lv.4 結丹後期", need: 44625, speed: 5 },
  { stage: "Lv.5 元嬰前期", need: 48825, speed: 5 },
  { stage: "Lv.5 元嬰中期", need: 51240, speed: 5 },
  { stage: "Lv.5 元嬰後期", need: 54915, speed: 5 },
  { stage: "Lv.6 出竅前期", need: 56490, speed: 5 },
  { stage: "Lv.6 出竅中期", need: 59325, speed: 5 },
  { stage: "Lv.6 出竅後期", need: 61950, speed: 5 },
  { stage: "Lv.7 化神前期", need: 65415, speed: 5 },
  { stage: "Lv.7 化神中期", need: 68670, speed: 5 },
  { stage: "Lv.7 化神後期", need: 72135, speed: 5 },
  { stage: "Lv.8 合體前期", need: 75705, speed: 10 },
  { stage: "Lv.8 合體中期", need: 79485, speed: 10 },
  { stage: "Lv.8 合體後期", need: 166950, speed: 10 },
  { stage: "Lv.9 洞虛前期", need: 175350, speed: 10 },
  { stage: "Lv.9 洞虛中期", need: 183750, speed: 10 },
  { stage: "Lv.9 洞虛後期", need: 193220, speed: 10 },
  { stage: "Lv.10 大承前期", need: 202965, speed: 10 },
  { stage: "Lv.10 大承中期", need: 213150, speed: 10 },
  { stage: "Lv.10 大承後期", need: 223650, speed: 10 },
  { stage: "Lv.11 渡劫前期", need: 262500, speed: 10 },
  { stage: "Lv.11 渡劫中期", need: 283500, speed: 10 },
  { stage: "Lv.11 渡劫後期", need: 315000, speed: 10 },
  { stage: "Lv.12 人仙前期", need: 1050000, speed: 30 },
  { stage: "Lv.12 人仙中期", need: 861000, speed: 30 },
  { stage: "Lv.12 人仙後期", need: 903000, speed: 30 },
  { stage: "Lv.13 真仙前期", need: 924000, speed: 30 },
  { stage: "Lv.13 真仙中期", need: 945000, speed: 30 },
  { stage: "Lv.13 真仙後期", need: 950985, speed: 30 },
  { stage: "Lv.14 金仙前期", need: 966980, speed: 30 },
  { stage: "Lv.14 金仙中期", need: 985530, speed: 30 },
  { stage: "Lv.14 金仙後期", need: 1003275, speed: 30 },
  { stage: "Lv.15 上仙前期", need: 1020000, speed: 30 },
  { stage: "Lv.15 上仙中期", need: 1039500, speed: 30 },
  { stage: "Lv.15 上仙後期", need: 1058422, speed: 30 },
  { stage: "Lv.16 仙君前期", need: 2520000, speed: 50 },
  { stage: "Lv.16 仙君中期", need: 1890000, speed: 50 },
  { stage: "Lv.16 仙君後期", need: 1942500, speed: 50 },
  { stage: "Lv.17 仙尊前期", need: 2047500, speed: 50 },
  { stage: "Lv.17 仙尊中期", need: 2252250, speed: 50 },
  { stage: "Lv.17 仙尊後期", need: 2478000, speed: 50 },
  { stage: "Lv.18 仙帝前期", need: 6300000, speed: 100 },
  { stage: "Lv.18 仙帝中期", need: 7035000, speed: 100 },
  { stage: "Lv.18 仙帝後期", need: 7035000, speed: 100 },
];

function getTimeRemaining() {
  const now = new Date();
  const day = now.getDay();
  const end = new Date();
  const offset = (6 - day + (day === 0 ? -1 : 0)) % 7;
  end.setDate(now.getDate() + offset);
  end.setHours(23, 59, 59, 999);
  return Math.floor((end - now) / 1000);
}

function canBreakthroughNow(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return (hour === 0 || (hour >= 10 && hour <= 23)) && minute === 0;
}
function getNextBreakthroughTime(from) {
  const next = new Date(from);
  next.setMinutes(0, 0, 0);
  if (from.getMinutes() > 0 || from.getSeconds() > 0) {
    next.setHours(next.getHours() + 1);
  }

  // 確保在 10–23 小時內的整點
  while (true) {
    const h = next.getHours();
    if (h === 0 || (h >= 10 && h <= 23)) break;
    next.setHours(h + 1);
    next.setMinutes(0);
  }

  return next;
}

function formatDateTime24(date) {
  return date.toLocaleString("zh-TW", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function predictStage() {
  const btn = document.getElementById("predictBtn");
  const logEl = document.getElementById("simulationLog");
  btn.disabled = true;
  btn.classList.add("loading");
  btn.textContent = "預測中...";
  logEl.innerHTML = "";

  setTimeout(() => {
    // --- 1) 本週結束時間（禮拜六 23:59:59.999） ---
    const nowDate = new Date();
    const today = nowDate.getDay(); // 0=日 … 6=六
    const endDate = new Date(nowDate);
    const offset = (6 - today + (today === 0 ? -1 : 0)) % 7;
    endDate.setDate(nowDate.getDate() + offset);
    endDate.setHours(23, 59, 59, 999);
    const weekEndTime = endDate.getTime();

    // --- 2) 讀取使用者輸入 ---
    const stageName = document.getElementById("currentStage").value;
    const baseExp = parseInt(document.getElementById("currentExp").value) || 0;
    const recoverExp =
      parseInt(document.getElementById("potionExp").value) || 0;
    let exp = baseExp + recoverExp;
    const startIndex = stageList.findIndex((s) => s.stage === stageName);
    if (startIndex === -1) return;

    const initialBattle =
      parseInt(document.getElementById("battle").value) || 0;
    const maintainBattle = document.getElementById("battleMaintain").checked;
    let battleVal = maintainBattle ? 2000 : initialBattle;

    // 下一個整點該扣戰役的時間戳
    let nextBattleReduction = new Date(Date.now());
    nextBattleReduction.setMinutes(0, 0, 0);
    if (nowDate.getMinutes() > 0 || nowDate.getSeconds() > 0) {
      nextBattleReduction.setHours(nextBattleReduction.getHours() + 1);
    }

    // 每當模擬進度到達或超過下一個整點，就扣 200；若維持勾選則鎖 2000 不變
    function updateBattle(simTimeMs) {
      if (maintainBattle) {
        battleVal = 2000;
        return;
      }
      while (simTimeMs >= nextBattleReduction.getTime()) {
        battleVal = Math.max(0, battleVal - 200);
        // 推到下一整點
        nextBattleReduction = new Date(
          nextBattleReduction.getTime() + 3600 * 1000
        );
      }
    }

    // --- 3) 加成計算函式（使用 battleVal） ---
    function getPercentAdd(simDate, currentLevel) {
      const h = simDate.getHours();
      // 心法 dropdown + 戰役 + 密友 + 靈泉
      const base =
        [
          { id: "youxuangong", rate: [0, 0.01, 0.02, 0.03, 0.04, 0.06] },
          { id: "xuanminggong", rate: [0, 0.01, 0.02, 0.03, 0.04, 0.05] },
          { id: "tianminglu", rate: [0, 0.01, 0.02, 0.03, 0.04, 0.05] },
        ].reduce(
          (sum, cur) =>
            sum + cur.rate[document.getElementById(cur.id).selectedIndex],
          0
        ) +
        (battleVal >= 1501
          ? 0.15
          : battleVal >= 1001
          ? 0.07
          : battleVal >= 501
          ? 0.05
          : battleVal >= 200
          ? 0.03
          : 0) +
        (h >= 9 && h <= 23
          ? +document.getElementById("friends").value * 0.05
          : 0) +
        (h >= 11 && h <= 22
          ? parseFloat(document.getElementById("springBoost").value || 0)
          : 0);

      // 功法
      const gf =
        [...document.querySelectorAll(".gongfa:checked")].reduce((sum, el) => {
          const req = +el.dataset.level;
          return sum + (currentLevel >= req ? +el.value : 0);
        }, 0) / 100;

      return base + gf;
    }

    const getFixedAdd = () =>
      [0, 1, 1, 2, 2, 3][+document.getElementById("bingxinjue").selectedIndex];

    // --- 4) 開始整週模擬 ---
    let time = getTimeRemaining();
    let maxReach = stageList[startIndex].stage;
    let finalSpeed = 0;
    let currentTime = Date.now();
    const logs = [];
    let lastTrueSpeed = 0;
    let lastIndex = startIndex;
    for (let i = startIndex; i < stageList.length && time > 0; i++) {
      const { need, speed, stage } = stageList[i];
      const lvl = parseInt(stage.match(/\d+/)[0], 10);
      lastIndex = i;
      // 更新戰役到當前時間
      updateBattle(currentTime);

      // 4.1) 開始這個子階段
      const sim0 = new Date(currentTime);
      const pct0 = getPercentAdd(sim0, lvl);
      const fx0 = getFixedAdd();
      const initSpeed = speed * (1 + pct0) + fx0;
      if (i === startIndex) {
        // 第一階段多顯示「baseExp + recoverExp」
        logs.push(
          `<span style="font-weight: 600;">[${formatDateTime24(sim0)}]</span>  <br/>開始模擬 ${stage}` +
            `； ${initSpeed.toFixed(2)} 修為/秒`
        );
      } else {
        // 其餘階段只顯示 exp/need
        // logs.push(
        //   `[${formatDateTime24(sim0)}] 開始模擬 ${stage}` +
        //     `；[${exp.toFixed(0)}/${need}]` +
        //     `；速度 ${initSpeed.toFixed(2)}；戰役 ${battleVal}`
        // );
      }

      let toNext = need - exp;
      if (i === startIndex && toNext <= 0) toNext = 1;

      let accumulated = 0;

      // 每秒累積直至該子階段完成或時間耗盡
      while (accumulated < toNext && time > 0) {
        const simDate = new Date(currentTime);
        updateBattle(currentTime);

        const pctAdd = getPercentAdd(simDate, lvl);
        const fxAdd = getFixedAdd();
        const trueSpeed = speed * (1 + pctAdd) + fxAdd;

        lastTrueSpeed = trueSpeed;
        if (!finalSpeed) finalSpeed = trueSpeed;

        accumulated += trueSpeed;
        exp += trueSpeed;
        time--;
        currentTime += 1000;
      }
      if (accumulated < toNext) break;

      // 4.2) 準備下一階段
      const nextStage = stageList[i + 1];
      if (!nextStage) break;
      const nextLvl = parseInt(nextStage.stage.match(/\d+/)[0], 10);
      const isMajor = nextLvl > lvl;

      // 大階段突破要等待+突破（也要分段 updateBattle）
      if (isMajor && lvl >= 4) {
        const brkDate = getNextBreakthroughTime(new Date(currentTime));
        const brkMs = brkDate.getTime();
        if (brkMs > weekEndTime) {
          logs.push(
            `[${formatDateTime24(
              new Date(currentTime)
            )}] 本週最後一場秘境已過，模擬結束`
          );
          break;
        }

        // 拆段等待進秘境
        const totalWaitSec = Math.floor((brkMs - currentTime) / 1000);

        // 段 1：到午夜或突破時間
        const midnight = new Date(currentTime);
        midnight.setHours(24, 0, 0, 0);
        const seg1End = Math.min(brkMs, midnight.getTime());
        const seg1Sec = Math.floor((seg1End - currentTime) / 1000);
        exp += lastTrueSpeed * seg1Sec;
        logs.push(
          `<span style="font-weight: 600;">[${formatDateTime24(
            new Date(currentTime)
          )}]</span>  <br/>等待 ${seg1Sec} 秒進入秘境`
        );
        time -= seg1Sec;
        currentTime = seg1End;

        // 段 2：午夜後至突破
        const seg2Sec = totalWaitSec - seg1Sec;
        if (seg2Sec > 0) {
          updateBattle(currentTime);
          const simMid = new Date(currentTime);
          const pctMid = getPercentAdd(simMid, lvl);
          const fxMid = getFixedAdd();
          lastTrueSpeed = speed * (1 + pctMid) + fxMid;
          exp += lastTrueSpeed * seg2Sec;
          logs.push(
            `[${formatDateTime24(
              new Date(currentTime)
            )}]  <br/>等待 ${seg2Sec} 秒進入秘境（無密友）`
          );
          time -= seg2Sec;
          currentTime += seg2Sec * 1000;
        }

        // 突破 240 秒（同樣可能跨午夜）
        const brkConsume = 4 * 60;
        // 段 3：有密友加成的前半
        const seg3EndMs = Math.min(
          currentTime + brkConsume * 1000,
          midnight.getTime()
        );
        const seg3Sec = Math.floor((seg3EndMs - currentTime) / 1000);
        exp += lastTrueSpeed * seg3Sec;
        time -= seg3Sec;
        currentTime = seg3EndMs;
        // 段 4：午夜後的後半
        const seg4Sec = brkConsume - seg3Sec;
        if (seg4Sec > 0) {
          updateBattle(currentTime);
          const simPost = new Date(currentTime);
          const pctPost = getPercentAdd(simPost, lvl);
          const fxPost = getFixedAdd();
          lastTrueSpeed = speed * (1 + pctPost) + fxPost;
          exp += lastTrueSpeed * seg4Sec;
          time -= seg4Sec;
          currentTime += seg4Sec * 1000;
        }
      }

      // 4.3) 進入新階段，保留溢出 exp
      if (isMajor) {
        const carry = exp - need;
        exp = carry > 0 ? carry : 0;
      } else {
        exp = 0;
      }
      maxReach = nextStage.stage;

      // 4.4) 成功晉升 log
      updateBattle(currentTime);
      const sim2 = new Date(currentTime);
      const pct2 = getPercentAdd(sim2, nextLvl);
      const fx2 = getFixedAdd();
      const sp2 = nextStage.speed * (1 + pct2) + fx2;
      logs.push(
        `<span style="font-weight: 600;">[${formatDateTime24(sim2)}]</span> <br/>成功晉升到：${nextStage.stage}` +
          `；${sp2.toFixed(2)} 修為/秒`
      );
    }

    const finalStageObj = stageList[lastIndex];
    const finalLevel = parseInt(finalStageObj.stage.match(/\d+/)[0], 10);
    const baseSpeed = finalStageObj.speed;

    // 一直跑到结算前一秒
    while (currentTime < weekEndTime - 1) {
      // 扣战役
      updateBattle(currentTime);

      // 累积这个秒的修为
      const simDate = new Date(currentTime);
      const pct = getPercentAdd(simDate, finalLevel);
      const fx = getFixedAdd();
      const trueSpeed = baseSpeed * (1 + pct) + fx;
      lastTrueSpeed = trueSpeed;
      exp += trueSpeed;

      // 推进一秒
      currentTime += 1000;
      time--;
    }

    // 最后状态 log
    const finalDate = new Date(currentTime);
    logs.push(
      `<span style="font-weight: 600;">[${formatDateTime24(finalDate)}]</span>  <br/>${finalStageObj.stage}` +
        `[${exp.toFixed(0)}/${finalStageObj.need}]` +
        `；${lastTrueSpeed.toFixed(2)} 修為/秒`
    );
    // 最後顯示
    Swal.fire({
      title: "預測結果",
      html: `
        <div style="font-size:14px;text-align:left;max-height:70vh;overflow-y:hidden;">
          <div style="text-align:center;margin-bottom:12px;">
            <p style="color:#333;font-size:16px;line-height:12px;">
              當前修練速度為
              <span style="color:#00BFFF;font-size:16px;font-weight:bold;">
                ${finalSpeed.toFixed(2)} 修為/秒
              </span>
            </p>
            <p style="color:#333;font-size:16px;">本週可能達到</p>
            <p style="color:#EA0000;font-size:16px;font-weight:bold;">
              『 ${maxReach} 』
            </p>
          </div>
          <hr style="margin:0 0 8px;">
          <div style="font-size:16px;"><strong>📊 模擬過程：</strong></div>
          <div style="max-height:50vh;overflow-y:auto;margin-top:8px;padding-right:4px;">
            ${logs
              .map(
                (line) => `
              <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;">
                <div style="
                  width:12px;height:12px;border-radius:50%;
                  background:${line.includes("成功") ? "#4CAF50" : "#999"};
                  margin-top:3px;
                "></div>
                <div style="flex:1;line-height:1.4; background:#e6f4ea;">${line}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `,
      width: 550,
      heightAuto: false,
      icon: "info",
      confirmButtonText: "確定",
      customClass: { icon: "small-icon", title: "swal-title-small" },
    }).then(() => {
      btn.disabled = false;
      btn.classList.remove("loading");
      btn.textContent = "開始預測";
    });
  }, 30);
}
