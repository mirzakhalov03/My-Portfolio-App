const form = document.querySelector(".footer__form");
const URL_API =
  "https://api.telegram.org/bot" +
  "7471269650:AAFVBLldsnwDLmaaNBvT1Ta1yKd8qLxqhh8" +
  "/sendMessage";
const CHAT_ID = 762049305;

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000); 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const first_name = form.children[0].value;
  const user_message = form.children[1].value

  let message = `<b> Ism: ${first_name.charAt(0).toUpperCase() + first_name.slice(1)}</b>\n\n<b> Xabar: ${user_message.charAt(0).toUpperCase() + user_message.slice(1)} \n</b> `;
  
  if(first_name === "" && user_message === "") {
    showToast("Iltimos, ism va xabaringizni kiriting!", "error");
  }
  else{
    fetch(URL_API, {
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
        showToast("Xabar yuborildi! 😊", "success");
      })
      .catch(() => {
        showToast("Xabar yuborilmadi. Xatolik yuz berdi", "error");
      });
  }
});


