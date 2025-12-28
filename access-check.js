/**
 * MagicBank Frontend - Access Check
 * A20 - Redirección automática por backend
 */

(async function () {
  try {
    const token = localStorage.getItem("magicbank_token");

    if (!token) {
      console.warn("Sin token, acceso denegado");
      return;
    }

    const response = await fetch(
      "https://magic-bank-backend-production-713e.up.railway.app/api/access/check",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.warn("Acceso no válido");
      return;
    }

    const data = await response.json();

    if (data.ok && data.destino) {
      console.log("Redirigiendo a:", data.destino);
      window.location.href = data.destino;
    }

  } catch (error) {
    console.error("Error A20 access-check:", error);
  }
})();
