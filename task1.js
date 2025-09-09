// DOM Elements
const form = document.getElementById('ageForm');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const dobInput = document.getElementById('dob').value;
  if (!dobInput) {
    result.textContent = "❌ Please select a valid date.";
    return;
  }

  const birthDate = new Date(dobInput);
  const today = new Date();

  if (birthDate > today) {
    result.textContent = "❌ Date of birth cannot be in the future.";
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays += daysInPrevMonth;
  }

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears -= 1;
  }

  result.textContent = ` You are ${ageYears} ${pluralize(ageYears, 'year')}, `
                     + `${ageMonths} ${pluralize(ageMonths, 'month')}, and `
                     + `${ageDays} ${pluralize(ageDays, 'day')} old.`;
});

function pluralize(value, word) {
  return value === 1 ? word : word + 's';
}
