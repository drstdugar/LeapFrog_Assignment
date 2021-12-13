const data = [
  {
    title: "GitHub Assignment 2",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/blob/master/index.html",
    demo: "https://drstdugar.github.io/LeapFrog_Assignment/",
  },
  {
    title: "Tutangle",
    code: "https://github.com/drstdugar/LeapFrog_Assignment/blob/master/index.html",
    demo: "Design/Tutangle_Design/index.html",
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
