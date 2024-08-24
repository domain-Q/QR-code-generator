let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("QR-img");
let inputText = document.getElementById("inputText");
let generateBtn = document.getElementById("generateBtn");
let downloadBtn = document.getElementById("downloadBtn");

function GenerateQr() {
    if (inputText.value.trim().length > 0) {
        const qrCodeURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(inputText.value);
        qrImg.src = qrCodeURL;
        imgBox.classList.add("show-img");
        inputText.classList.remove("error");

        qrImg.onload = function() {
            generateBtn.style.display = 'none';  // Hide the Generate button
            downloadBtn.style.display = 'block';  // Show the Download button

            // Set up the download functionality
            downloadBtn.onclick = function() {
                downloadQRCode(qrCodeURL);
            };
        };
    } else {
        inputText.classList.add('error');
        setTimeout(() => {
            inputText.classList.remove('error');
        }, 1000);
    }
}

function downloadQRCode(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'qr-code.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Could not download the QR code'));
}
