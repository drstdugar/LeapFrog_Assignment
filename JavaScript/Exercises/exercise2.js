console.log("Exercise 2: Iterating List in Object");

const info = {
  name: "Dristi Dugar",
  address: "Sanogaucharan",
  email: "dugar.d1998@gmail.com",
  interest: "Books",
  education: [
    { name: "ABC", date: "2013" },
    { name: "DEF", date: "2015" },
    { name: "GHI", date: "2019" },
  ],
};

function printEducation() {
  let education_detail = info.education;
  education_detail.forEach((value) => {
    console.log("Name: " + value.name + ", Date: " + value.date);
  });
}

printEducation();

console.log("----------------------------------------------------------------");
