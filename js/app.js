const form = document.querySelector(".footer__form");
const URI_API =
  "https://api.telegram.org/bot" +
  "7471269650:AAFVBLldsnwDLmaaNBvT1Ta1yKd8qLxqhh8" +
  "/sendMessage";
const CHAT_ID = 762049305;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let message = `<b>
        Xabar: ${form.children[0].value} \n
        
      </b> 
      `;
  fetch(URI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    }),
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("Xabar yuborilmadi. Xatolik yuz berdi");
      }
      form.reset();
      alert("Xabar yuborildi");
    })
    .catch(() => {
      alert("Xabar yuborilmadi. Xatolik yuz berdi");
    });
});


