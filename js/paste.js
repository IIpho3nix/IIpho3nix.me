var matches;
var lzma = LZMA;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("plaintext").focus();

  const base64 = location.hash.substr(1);
  if (base64.length == 0) return;

  if (!fetch) {
    return;
  }

  fetch("data:application/octet-stream;base64," + base64)
    .then((r) => r.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        const compressed_data = Array.from(new Uint8Array(reader.result));
        lzma.decompress(compressed_data, (plaintext, error) => {
          if (error) {
            alert("Failed to decompress data: " + error);
            return;
          }
          document.getElementById("plaintext").value = plaintext;
        });
      };
      reader.readAsArrayBuffer(blob);
    });
});

const url_generate = (format) => {
  const plaintext = document.getElementById("plaintext").value;
  lzma.compress(plaintext, 1, (compressed, error) => {
    if (error) {
      alert("Failed to compress data: " + error);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.substr(reader.result.indexOf(",") + 1);
      const url = "https://" + location.host + location.pathname + "#" + base64;
      let result;
      if (format === "markdown") {
        result = "[paste](" + url + ")";
      } else {
        result = url;
      }
      text_offer(result);
    };
    reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
  });
};

const text_offer = (text) => {
  document.getElementById("text-offer-value").value = text;
  document.getElementById("nav").classList.add("text-offer");
};

const text_offer_copy = () => {
  const input = document.getElementById("text-offer-value");
  input.select();
  document.execCommand("copy");
  text_offer_cancel();
};

const text_offer_cancel = () => {
  document.getElementById("text-offer-value").value = "";
  document.getElementById("nav").classList.remove("text-offer");
};
