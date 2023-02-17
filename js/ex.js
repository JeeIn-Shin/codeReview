function postData() {
  const customer = {
    name: "홍길동",
    company: "한국",
    email: "hong.gmail.com",
    phone: "010-1234-5678",
    address: "서울시 강남구",
  };
  fetch("http://localhost:3000/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => response.json())
    //그러면 얼럿창이 뜨는데 그걸 확인하면 된다.
    .then((json) => alert("등록되었습니다."));
  //.then((json) => console.log(json));
}

function getData() {
  fetch("http://localhost:3000/customers")
    .then((respnse) => respnse.json())
    .then((json) => {
      const h = [];
      for (const customer of json) {
        h.push(`<tr>`);
        h.push(`<td>${customer.name}</td>`);
        h.push(`<td>${customer.company}</td>`);
        h.push(`<td>${customer.email}</td>`);
        h.push(`<td>${customer.phone}</td>`);
        h.push(`<td>${customer.address}</td>`);
        h.push(`</tr>`);
      }
      document.getElementById("tbBody").innerHTML = h.join("");
    });
}

function putData() {
  const customer = {
    name: "여길동",
    company: "한국",
    email: "yeo.gmail.com",
    phone: "010-3421-1734",
    address: "서울시 강남구",
  };
  fetch("http://localhost:3000/customers")
    .then((response) => response.json())
    .then((customers) => {
      const lastCustomer = customers[customers.length - 1];
      return fetch(`http://localhost:3000/customers/${lastCustomer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(customer),
      });
    })
    .then((response) => response.json())
    .then((json) => alert("수정되었습니다."))
    .then((json) => console.log(json));
}

function deleteData() {
  fetch("http://localhost:3000/customers")
    .then((response) => response.json())
    .then((customers) => {
      const lastCustomer = customers[customers.length - 1];
      return fetch(`http://localhost:3000/customers/${lastCustomer.id}`, {
        method: "DELETE",
      });
    })
    .then((response) => response.json())
    .then((json) => alert("삭제되었습니다."))
    .then((json) => console.log(json));
}

// EX.HTML 실행 시 GETDATA()를 실행하게 한다.
getData();
