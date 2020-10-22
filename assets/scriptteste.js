function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function expandirConteudo() {
    var altura = document.getElementById("expandir");
    altura.classList.toggle("expandido");

    var nomeBotao = document.getElementsByClassName("ver-todos");
    if (nomeBotao[0].innerHTML === "ver mais") {
        nomeBotao[0].innerHTML = "ver menos";
    } else {
        nomeBotao[0].innerHTML = "ver mais";
    }
}

function menuMobile() {
    var menu = document.getElementsByClassName("menu-desktop");
    menu[0].classList.toggle("active");
}

document.getElementById("btn_copy-vendedor").addEventListener("click", function() {
    copy("vendedor");
    document.getElementById("img-vendedor").src = "assets/imgs/copied.png";
});
document.getElementById("btn_copy-comprador").addEventListener("click", function() { copy("comprador"); });
document.getElementById("btn_copy-cartao").addEventListener("click", function() { copy("cartao"); });
document.getElementById("btn_copy-transacao").addEventListener("click", function() { copy("transacao"); });

function copy(name) {
    var copyText = document.getElementById("dataText-" + name);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.getElementById("contentText-" + name).appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function gerarCPF() {
    const n1 = aleatorio(),
        n2 = aleatorio(),
        n3 = aleatorio(),
        d1 = dig(n1, n2, n3);
    return `${n1}${n2}${n3}${d1}${dig(n1, n2, n3, d1)}`;
}

function dig(n1, n2, n3, n4) {
    let nums = n1.split("").concat(n2.split(""), n3.split("")),
        x = 0;
    if (n4) nums[9] = n4;
    for (let i = (n4 ? 11 : 10), j = 0; i >= 2; i--, j++) x += parseInt(nums[j]) * i;
    return (y = x % 11) < 2 ? 0 : 11 - (y = x % 11);
}

function aleatorio() {
    return ("" + Math.floor(Math.random() * 999)).padStart(3, '0');
}

var cpf = gerarCPF();

document.getElementById("cpf-vendedor").innerHTML = cpf;
document.getElementById("cpf-comprador").innerHTML = cpf;


function sendRequest(data, path, name) {
    var bgOrangeLoading = document.getElementsByClassName("container-loading-" + name);
    bgOrangeLoading[0].style.display = "block";

    var btnImg = document.getElementById("img-loading-" + name);
    btnImg.classList.add("loading-" + name);

    var text = document.getElementById("text-content-" + name);

    var data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            bgOrangeLoading[0].style.display = "none";

            response = JSON.parse(this.responseText);

            document.getElementById("resposta-" + name).innerHTML = prettyPrintJson.toHtml(response);

            text.classList.remove("centralizar-texto");
            btnImg.classList.remove("loading-" + name);
        }
    });

    xhr.open("POST", "https://try.readme.io/https://api.zoop.ws/v1/marketplaces/3249465a7753536b62545a6a684b0000/" + path);
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "Basic enBrX3Rlc3RfRXpDa3pGRktpYkdRVTZIRnE3RVlWdXhJOg==");

    xhr.send(data);
}


function cadastrarVendedor() {
    var cpf = gerarCPF();
    document.getElementById("cpf-vendedor").innerHTML = cpf;

    var dadosVendedor = {
        first_name: "João",
        last_name: "Silva",
        taxpayer_id: cpf
    }

    sendRequest(dadosVendedor, "sellers/individuals", "vendedor");

    var executar = document.getElementById("api-btn-img-vendedor");
    executar.style.display = "none";
    var carregar = document.getElementById("img-loading-vendedor");
    carregar.style.display = "block";
}


function cadastrarComprador() {
    var cpf = gerarCPF();
    document.getElementById("cpf-comprador").innerHTML = cpf;

    var dadosComprador = {
        first_name: "João",
        last_name: "Silva",
        taxpayer_id: cpf
    }

    sendRequest(dadosComprador, "buyers", "comprador");

    var executar = document.getElementById("api-btn-img-comprador");
    executar.style.display = "none";
    var carregar = document.getElementById("img-loading-comprador");
    carregar.style.display = "block";
}


function tokenizarCartao() {
    var dadosCartao = {
        holder_name: "João Silva",
        expiration_month: "03",
        expiration_year: "2026",
        card_number: "4539003370725497",
        security_code: "123"
    }

    sendRequest(dadosCartao, "cards/tokens", "cartao");

    var executar = document.getElementById("api-btn-img-cartao");
    executar.style.display = "none";
    var carregar = document.getElementById("img-loading-cartao");
    carregar.style.display = "block";
}


function criarTransacao() {
    var dadosTransacao = {
        amount: 10,
        currency: "BRL",
        description: "venda",
        payment_type: "credit",
        on_behalf_of: "f0fdd9b2931340f5937ad77d8ff6b09b",
        customer: "b0fe7c73b3334650ba053f209e8fa7c6"
    }

    sendRequest(dadosTransacao, "transactions", "transacao");

    var executar = document.getElementById("api-btn-img-transacao");
    executar.style.display = "none";
    var carregar = document.getElementById("img-loading-transacao");
    carregar.style.display = "block";
}