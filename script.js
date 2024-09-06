document.getElementById('addItem').addEventListener('click', function() {
  const itemCount = document.querySelectorAll('.item').length + 1;
  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.innerHTML = `
      <br>
      <label for="weight${itemCount}">Peso Item ${itemCount}:</label>
      <input type="number" id="weight${itemCount}" name="weight${itemCount}" required>
      <label for="value${itemCount}">Valor Item ${itemCount}:</label>
      <input type="number" id="value${itemCount}" name="value${itemCount}" required>
  `;
  document.getElementById('items').appendChild(itemDiv);
});

document.getElementById('knapsack-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const maxWeight = parseInt(document.getElementById('maxWeight').value);
  const weights = [];
  const values = [];
  document.querySelectorAll('.item').forEach(function(item, index) {
      weights.push(parseInt(document.getElementById(`weight${index + 1}`).value));
      values.push(parseInt(document.getElementById(`value${index + 1}`).value));
  });

  const result = knapsack(maxWeight, weights, values);
  document.getElementById('result').innerText = `Valor máximo: ${result}`;
});

function knapsack(maxWeight, weights, values) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(maxWeight + 1).fill(0));

  for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= maxWeight; w++) {
          if (weights[i - 1] <= w) {
              dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
          } else {
              dp[i][w] = dp[i - 1][w];
          }
      }
  }

  return dp[n][maxWeight];
}
