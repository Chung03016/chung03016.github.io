<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>戰力計算器</title>
    <link rel="stylesheet" href="css/styles.css">
    
</head>
<body>
    <div class="container">
        <!-- 右上角按鈕 -->
        <button id="infoButton" class="info-btn">問答題</button>
        <!-- <button id="infoButton2" class="info-btn2">ℹ️ 靈泉房計算</button> -->
        <!-- 小工具按鈕 -->
        <button id="infoButton2" class="info-btn2">小工具</button>
       <!-- Modal 框 -->
        <div id="infoModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 style="color:#666;">問答題選擇與獎勵對應表</h2>
                <div class="modal-body">
                    <table class="modal-table">
                        <tbody>
                            <tr><td>幫助鸞鳥</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>幫助金鼠</td><td  style="color:rgb(255, 149, 0);">元氣丹</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>贈藥</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>救治</td><td  style="color:rgb(255, 149, 0);">元氣丹</td></tr>
                            <tr><td>與其戰鬥</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>好言相勸</td><td style="color:rgb(218, 2, 2);">扣修為</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>救治</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>離去</td><td style="color:rgb(218, 2, 2);">扣修為</td></tr>
                            <tr><td>乘船前往</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>御劍前往</td><td style="color:rgb(182, 70, 0);">挑戰帖</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>黑水湖</td><td style="color:rgb(218, 2, 2);">扣修為</td><td>花蓮村</td><td style="color:rgb(17, 144, 66);">聚靈丹</td></tr>
                            <tr><td>澆灌藥園</td><td>加修為</td><td>煉丹</td><td style="color:rgb(17, 144, 66);">聚靈丹</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>仙草</td><td>加修為</td><td>丹藥</td><td style="color:rgb(17, 144, 66);">聚靈丹</td></tr>
                            <tr><td>夜晚前往</td><td  style="color:rgb(255, 149, 0);">元氣丹</td><td>白天前往</td><td>無</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>一同探索</td><td style="color:rgb(218, 2, 2);">扣修為</td><td>分開探索</td><td  style="color:rgb(255, 149, 0);">元氣丹</td></tr>
                            <tr><td>向左走</td><td style="color:rgb(218, 2, 2);">扣修為</td><td>向右走</td><td style="color:rgb(182, 70, 0);">挑戰帖</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>暗中調查</td><td style="color:rgb(182, 70, 0);">挑戰帖</td><td>正面出擊</td><td>無</td></tr>
                            <tr><td>與其戰鬥</td><td style="color:rgb(182, 70, 0);">挑戰帖</td><td>表達敬仰</td><td>加修為</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>善良</td><td style="color:rgb(218, 2, 2);">扣修為</td><td>強大</td><td style="color:rgb(182, 70, 0);">挑戰帖</td></tr>
                            <tr><td>勇敢靠近</td><td style="color:rgb(218, 2, 2);">扣修為</td><td>迅速躲避</td><td>無</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>上前切磋</td><td>加修為(較多)</td><td>謙虛回絕</td><td>無</td></tr>
                            <tr><td>淺處挖掘</td><td>加修為</td><td>深處挖掘</td><td>無</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>普通的靈石</td><td>加修為</td><td>古怪的靈石</td><td>加修為(較多)</td></tr>
                            <tr><td>食用果實</td><td>加修為(較多)</td><td>飲用溪水</td><td>加修為</td></tr>
                            <tr style="background-color: rgba(213, 213, 213, 0.33);"><td>過去</td><td style="color:rgb(17, 144, 66);">聚靈丹</td><td>未來</td><td style="color:rgb(218, 2, 2);">扣修為</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div id="infoModal2" class="modal">
            <div class="modal-content">
                <span class="close2">&times;</span>

                <!-- 🔖 Tabs 導航 -->
                <div class="tabs">
                    <button class="tab-btn active" data-target="tab-linroom">靈泉房計算</button>
                    <button class="tab-btn" data-target="tab-training">修練時間計算</button>
                </div>

                <!-- 📄 Tab 內容區域 -->
                <div class="tab-content" id="tab-linroom" style="display: block;">
                    <h3 style="color:#444;">靈泉房計算</h3>
                    <input type="number" id="linroom" placeholder="請輸入報名房間數" oninput="processLinRoom()"><br><br>
                    <p style="color:#333;">最終靈泉房數量</p>
                    <div class="result" style="color:#f00;" id="linroomans">-</div>
                    <p style="color:#333;">有機會輪空的輪次</p>
                    <div class="result" style="color:#f00; margin-bottom:20px;" id="linroompass">-</div>
                </div>

                <!-- 📄 修練時間計算工具 -->
                <div class="tab-content" id="tab-training" style="display: none;">
                    <h3 style="color:#444;">修練時間計算</h3>
                    <label>現在等級：</label>
                    <select id="now-lv" onchange="processTrainingTime()">
                        <option value="42550">Lv.3 築基前期</option>
                        <option value="37150">Lv.3 築基中期</option>
                        <option value="24150">Lv.3 築基後期</option>
                        <option value="95625">Lv.4 結丹前期</option>
                        <option value="70625">Lv.4 結丹中期</option>
                        <option value="44625">Lv.4 結丹後期</option>
                        <option value="154980">Lv.5 元嬰前期</option>
                        <option value="106155">Lv.5 元嬰中期</option>
                        <option value="54915">Lv.5 元嬰後期</option>
                        <option value="177765">Lv.6 出竅前期</option>
                        <option value="121275">Lv.6 出竅中期</option>
                        <option value="61950">Lv.6 出竅後期</option>
                        <option value="206220">Lv.7 化神前期</option>
                        <option value="140805">Lv.7 化神中期</option>
                        <option value="72135">Lv.7 化神後期</option>
                        <option value="322140">Lv.8 合體前期</option>
                        <option value="246435">Lv.8 合體中期</option>
                        <option value="166950">Lv.8 合體後期</option>
                        <option value="552320">Lv.9 洞虛前期</option>
                        <option value="376970">Lv.9 洞虛中期</option>
                        <option value="193220">Lv.9 洞虛後期</option>
                        <option value="639765">Lv.10 大乘前期</option>
                        <option value="436800">Lv.10 大乘中期</option>
                        <option value="223650">Lv.10 大乘後期</option>
                        <option value="861000">Lv.11 渡劫前期</option>
                        <option value="598500">Lv.11 渡劫中期</option>
                        <option value="315000">Lv.11 渡劫後期</option>
                        <option value="2814000">Lv.12 人仙前期</option>
                        <option value="1764000">Lv.12 人仙中期</option>
                        <option value="903000">Lv.12 人仙後期</option>
                        <option value="2819985">Lv.13 真仙前期</option>
                        <option value="1895985">Lv.13 真仙中期</option>
                        <option value="950985">Lv.13 真仙後期</option>
                        <option value="2955785">Lv.14 金仙前期</option>
                        <option value="1988805">Lv.14 金仙中期</option>
                        <option value="1003275">Lv.14 金仙後期</option>
                        <option value="3117922">Lv.15 上仙前期</option>
                        <option value="2097922">Lv.15 上仙中期</option>
                        <option value="1058422">Lv.15 上仙後期</option>
                        <option value="6352500">Lv.16 仙君前期</option>
                        <option value="3832500">Lv.16 仙君中期</option>
                        <option value="1942500">Lv.16 仙君後期</option>
                        <option value="6777750">Lv.17 仙尊前期</option>
                        <option value="2047500">Lv.17 仙尊中期</option>
                        <option value="2252250">Lv.17 仙尊後期</option>
                    </select><br><br>

                    <input type="number" id="now-exp" placeholder="請輸入當前修為" oninput="processTrainingTime()"><br><br>

                    <input type="number" id="c-speed" placeholder="目前修練速度" oninput="processTrainingTime()"><br><br>

                    <input type="number" id="energy-pill" placeholder="吃元氣丹可補回經驗" oninput="processTrainingTime()"><br><br>

                    <p style="color:#333;">離晉升還需要的時間</p>
                    <div class="result" style="color:#f00; " id="trainingTime">-</div>

                    <p style="color:#333;">預計晉升時間</p>
                    <div>
                        <span class="result" style="color:#f00; margin-bottom:20px;" id="expectedTime">-</span>
                        <span class="result" style="color:#f00;" id="nextPromotionSlot">-</span>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>



        <h1>戰力計算器</h1>

        <div class="section">
            <h2>您的戰力</h2>
            <input type="number" id="inputValue" placeholder="請輸入您的戰力" oninput="updateCalculations()">
            <div class="section-2">
                <h3>功法</h3>
                <div class="gongfa-grid">
                    <label><input type="checkbox" class="gongfa" value="火-3">天元神火訣(Lv6)</label>
                    <label><input type="checkbox" class="gongfa" value="水-3">潤下之水法(Lv7)</label>
                    <label><input type="checkbox" class="gongfa" value="木-3">木日曲直卷(Lv8)</label>
                    <label><input type="checkbox" class="gongfa" value="木-5">春木衍光符(Lv13)</label>
                    <label><input type="checkbox" class="gongfa" value="火-5">火燚聖火功(Lv14)</label>
                    <label><input type="checkbox" class="gongfa" value="水-5">萬世橫江典(Lv15)</label>
                </div>
            </div>
        
            <h3>您的心法配置</h3>
            <select class="skill-select" id="config1" onchange="updateConfig(0, this.value)"></select>
            <select class="skill-select" id="config2" onchange="updateConfig(1, this.value)"></select>
            <select class="skill-select" id="config3" onchange="updateConfig(2, this.value)"></select>
            <select class="skill-select" id="config4" onchange="updateConfig(3, this.value)"></select>
            <div class="config-grid">
                <div class="config-box" id="box1"></div>
                <div class="config-box" id="box2"></div>
                <div class="config-box" id="box3"></div>
                <div class="config-box" id="box4"></div>
            </div>
            <p>💧可攻擊的最大戰力</p>
            <div class="result" id="waterResult">-</div>

            <p>🔥可攻擊的最大戰力</p>
            <div class="result" id="fireResult">-</div>

            <p>🪵可攻擊的最大戰力</p>
            <div class="result" id="woodResult">-</div>

        </div>

        <div class="section">
            <h2>對手戰力</h2>
            <input type="number" id="opponentPower" placeholder="請輸入對手戰力" oninput="updateCalculations()">
            <div class="section-2">
                <h3>對手的功法</h3>
                <div class="gongfa-grid">
                    <label><input type="checkbox" class="opponent-gongfa" value="火-3">天元神火訣(Lv6)</label>
                    <label><input type="checkbox" class="opponent-gongfa" value="水-3">潤下之水法(Lv7)</label>
                    <label><input type="checkbox" class="opponent-gongfa" value="木-3">木日曲直卷(Lv8)</label>
                    <label><input type="checkbox" class="opponent-gongfa" value="木-5">春木衍光符(Lv13)</label>
                    <label><input type="checkbox" class="opponent-gongfa" value="火-5">火燚聖火功(Lv14)</label>
                    <label><input type="checkbox" class="opponent-gongfa" value="水-5">萬世橫江典(Lv15)</label>
                </div>
            </div>
            <h3>對手的心法配置</h3>
            <select class="skill-select" id="opponentConfig1" onchange="updateConfig(4, this.value)"></select>
            <select class="skill-select" id="opponentConfig2" onchange="updateConfig(5, this.value)"></select>
            <select class="skill-select" id="opponentConfig3" onchange="updateConfig(6, this.value)"></select>
            <select class="skill-select" id="opponentConfig4" onchange="updateConfig(7, this.value)"></select>
            <div class="config-grid">
                <div class="config-box" id="box5"></div>
                <div class="config-box" id="box6"></div>
                <div class="config-box" id="box7"></div>
                <div class="config-box" id="box8"></div>
            </div>
            <p>💧至少需要的戰力</p>
            <div class="result" id="requiredWaterPower">-</div>

            <p>🔥至少需要的戰力</p>
            <div class="result" id="requiredFirePower">-</div>

            <p>🪵至少需要的戰力</p>
            <div class="result" id="requiredWoodPower">-</div>

        </div>
        
        <footer>© 2025 ᴍᴀʀᴄᴏ ෆ⃛. All rights reserved.</footer>
    </div>

    <script src="js/calculator.js"></script>
</body>
</html>
