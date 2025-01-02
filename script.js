// ENVIO DE DADOS PARA O EXCEL, ENSINADO PELO CANAL YT "MANUAL DO DEV"
// LINK DO VIDEO: https://youtu.be/w7SUjrKCdwE?si=VmDgah1gnEm2epvt



function tratamentoDeEnvio(e) {
    e.preventDefault();

    const x = document.getElementById("demo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

        // Enviar dados para o SheetDB
        fetch('https://sheetdb.io/api/v1/u2yqk7tp4mryw', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                NOME: "Recebido", // Substitua pelo valor correto
                MENSAGEM: `Latitude: ${latitude}, Longitude: ${longitude}` // Incluindo as coordenadas no campo mensagem
            })
        }).then(() => {
            alert('Sucesso!');
        }).catch((error) => {
            alert('Erro ao enviar os dados: ' + error.message);
        });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "Usuário negou a solicitação de Geolocalização.";
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Informações de localização indisponíveis.";
                break;
            case error.TIMEOUT:
                x.innerHTML = "A solicitação para obter a localização expirou.";
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "Ocorreu um erro desconhecido.";
                break;
        }
    }
}

// Adicionar evento de envio ao formulário
document.querySelector('form').addEventListener('submit', tratamentoDeEnvio);
