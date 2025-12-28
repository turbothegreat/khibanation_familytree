const familyData = {
  Khiba: "Khiba o tsholwa ka ngwaga ya 1950. He is the foundation of our family and raised four children.",
  father: "Father was born in 1975. He is married and has three children.",
  aunt: "Aunt was born in 1980. She is a businesswoman and mother of two."
};

function showDetails(person) {
  document.getElementById("details").innerText = familyData[person];
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function searchMember() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const people = document.querySelectorAll(".person");

  people.forEach(person => {
    const name = person.dataset.name.toLowerCase();
    person.style.display = name.includes(input) ? "block" : "none";
  });
}
