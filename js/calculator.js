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
  SR秘笈: { 天罡陣: [1.02, 1.05, 1.07, 1.1, 1.15] },
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
