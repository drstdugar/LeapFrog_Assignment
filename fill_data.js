const data = [
  {
    title: "GitHub Assignment 2",
    code: "https://github.com/drstdugar/LeapFrog_Assignment",
    demo: "https://drstdugar.github.io/LeapFrog_Assignment/",
  },
  {
    title: "Design Assignment 1: 1A-home-search",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/tree/master/Design/Tutangle_Design",
    demo: "Design/Tutangle_Design/index.html",
  },
  {
    title: "Design Assignment 1: 1A-home-search-responsive",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/tree/master/Design/Tutangle_Design_Responsive",
    demo: "Design/Tutangle_Design_Responsive/index.html",
  },
];

loadData(data);

function loadData(data) {
  const table = document.getElementById("table_data");
  data.forEach((item) => {
    let row = table.insertRow();
    let title = row.insertCell(0);
    title.innerHTML = item.title;
    let code = row.insertCell(1);
    code.innerHTML = `<a href=${item.code}>Click here for Code</a>`;
    let demo = row.insertCell(2);
    demo.innerHTML = `<a href="${item.demo}">Click here for Demo</a>`;
  });
}
