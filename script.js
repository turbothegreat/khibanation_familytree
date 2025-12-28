const familyData = {
  Khiba: "Khiba o tsholwa ka ngwaga ya 1950. He is the foundation of our family and raised four children.",
  Mokgwabone: "Mokgwabone o tsholwa ka 1975. O nyetse mme o nale matlo a le mararo.",
  Motshegetsi: "Motshegetsi o tsholwa ka 2000. Ke ngwana wa ga Mokgwabone wa ntlha."
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
