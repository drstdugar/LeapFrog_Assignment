const data = [
  {
    title: "GitHub Assignment 2",
    code: "https://github.com/drstdugar/LeapFrog_Assignment",
    demo: "index.html",
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
  {
    title: "Design Final Project: Responsive",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/tree/master/Design/Funiro_Final_Project_Design",
    demo: "Design/Funiro_Final_Project_Design/index.html",
  },
  {
    title: "JavaScript Exercise",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/tree/master/JavaScript/Exercises",
    demo: "JavaScript/Exercises/index.html",
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
