(async function () {
  const token = localStorage.getItem("magicbank_token");

  if (!token) {
    window.location.href = "https://login.magicbank.org";
    return;
  }

  try {
    const res = await fetch(
      "https://magic-bank-backend-production-713e.up.railway.app/api/access/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          destino: window.location.hostname
        })
      }
    );

    if (!res.ok) {
      throw new Error("Acceso denegado");
    }

    const data = await res.json();

    if (!data.allowed) {
      window.location.href = "https://login.magicbank.org";
    }

  } catch (err) {
    window.location.href = "https://login.magicbank.org";
  }
})();
