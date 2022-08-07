const mileElement = document.getElementById("mile");
const priceElement = document.getElementById("price");
const submitElement = document.getElementById("submitButton");

submitElement.addEventListener("click", calculate);

function calculate(event) {
  // console.log("t");
  event.preventDefault();
  const mile = parseInt(mileElement.value);
  const price = parseInt(priceElement.value);
  const contentElement = document.getElementById("content");

  let count = 1;
  let flag = 1;

  while (flag) {
    count++;

    for (const usedMile of Array(mile).keys()) {
      const usedMoney = price - usedMile;
      const gotMile = usedMoney * (5 / 100);
      const resultMile = mile - usedMile + gotMile;

      const usedMoneyZeroCnt = usedMoney.toString().length - 1;

      const precision = 10 ** usedMoneyZeroCnt / 10 ** count;
      if (precision < 10) {
        flag = 0;
        contentElement.innerHTML = `
                <p>1원 단위가 나옵니다. 차라리 전액 현금 결제하십시오.</p>
            `;
        break;
      }

      const isDivisable = resultMile % precision === 0;
      const isGTzero = resultMile >= 0;

      if (isDivisable && isGTzero) {
        contentElement.innerHTML = `
                <p id="usedMile">사용할 캐시백 : ${usedMile} </p>
                <p>사용할 현금 :${usedMoney}</p>
                <p>최종 캐시백 : ${resultMile}</p>
            `;
        flag = 0;
        break;
      }
    }
  }
}
