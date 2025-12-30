document.addEventListener("DOMContentLoaded", () => {

  const familyData = [
  {
    house: "Maele House",
    members: [
      {
        name: "Bana ba ga Maele",
        children: [
          { name: "Phadima", children: [] },
          { name: "Khidi", children: [] },
          { name: "Lotlhare", children: [] },
          { name: "Tokwana", children: [] }
        ]
      }
    ]
  },
  {
    house: "Lotlhare House",
    members: [
      {
        name: "Bana ba ga Lotlhare",
        children: [
          { name: "Mosimane", children: [] },
          { name: "Mosimanyane", children: [] },
          { name: "Keakopa", children: [] }
        ]
      }
    ]
  },
  {
    house: "Keakopa 1 House",
    members: [
      {
        name: "Bana ba ga Keakopa (morwa Lotlhare)",
        children: [
          { name: "Khiba", children: [] }
        ]
      }
    ]
  },
  {
    house: "Khiba House",
    members: [
      {
        name: "Bana ba ga Khiba",
        children: [
          { name: "Keakopa 1", children: [] },
          { name: "Mokomele", children: [] },
          { name: "Mosetlhatsela", children: [] }
        ]
      }
    ]
  },
  {
    house: "Bana ba ga Keakopa 2",
    members: [
      {
        name: "Bana ba ga Keakopa 2",
        children: [
          { name: "Seameco", children: [] },
          { name: "Mokgwabone", children: [] },
          { name: "Botlape", children: [] }
        ]
      }
    ]
  },

  {
    house: "Mme Keehang House",
    members: [
      {
        name: "Bana ba ga Mme Keehang",
        children: [
          { name: "Keehang", children: [] },
          { name: "Itumeleng", children: [] },
          { name: "Lorekang", children: [] },
          { name: "Gaedingwe", children: [] },
          { name: "Golelwang", children: [] }
        ]
      }
    ]
  }
];


  const treeContainer = document.getElementById("tree");
  const searchInput = document.getElementById("searchInput");

  function createMember(member) {
    const memberDiv = document.createElement("div");
    memberDiv.className = "member";

    const nameDiv = document.createElement("div");
    nameDiv.className = "member-name";
    nameDiv.textContent = member.name;

    memberDiv.appendChild(nameDiv);

    if (member.children && member.children.length > 0) {
      const childrenDiv = document.createElement("div");
      childrenDiv.className = "children";
      childrenDiv.style.display = "none";

      member.children.forEach(child => {
        childrenDiv.appendChild(createMember(child));
      });

      nameDiv.addEventListener("click", () => {
        childrenDiv.style.display =
          childrenDiv.style.display === "none" ? "block" : "none";
      });

      memberDiv.appendChild(childrenDiv);
    }

    return memberDiv;
  }

  function renderTree(data) {
    treeContainer.innerHTML = "";

    data.forEach(house => {
      const houseDiv = document.createElement("div");
      houseDiv.className = "house";

      const title = document.createElement("div");
      title.className = "house-title";
      title.textContent = house.house;

      houseDiv.appendChild(title);

      house.members.forEach(member => {
        houseDiv.appendChild(createMember(member));
      });

      treeContainer.appendChild(houseDiv);
    });
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = familyData.map(house => ({
      ...house,
      members: house.members.filter(member =>
        JSON.stringify(member).toLowerCase().includes(query)
      )
    }));

    renderTree(filtered);
  });

  renderTree(familyData);

});
