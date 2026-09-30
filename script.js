// ========================================
// VELORA CURRENCY CONVERTER
// ========================================

// Kurslar USD ga nisbatan
const rates = {
    USD: 1,
    UZS: 11835,
    EUR: 0.853,
    GBP: 0.744,
    RUB: 81.6,
    JPY: 148.2
};


// HTML elementlari
const amount = document.getElementById("amount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const convertButton =
    document.getElementById("convertButton");

const swapButton =
    document.getElementById("swapButton");

const result =
    document.getElementById("result");

const rate =
    document.getElementById("rate");

const toast =
    document.getElementById("toast");


// ========================================
// SONNI CHIROYLI FORMATLASH
// ========================================

function formatNumber(number) {

    return new Intl.NumberFormat("uz-UZ", {
        maximumFractionDigits: 2
    }).format(number);

}


// ========================================
// VALYUTANI HISOBLASH
// ========================================

function convertCurrency() {

    const value =
        Number(amount.value);

    if (!value || value < 0) {

        result.textContent =
            "Summani kiriting";

        rate.textContent =
            "Musbat qiymat kiriting.";

        return;
    }


    const from =
        fromCurrency.value;

    const to =
        toCurrency.value;


    // USD orqali hisoblash
    const converted =
        value *
        rates[to] /
        rates[from];


    // 1 birlik kursi
    const oneUnit =
        rates[to] /
        rates[from];


    result.textContent =
        `${formatNumber(converted)} ${to}`;


    rate.textContent =
        `1 ${from} = ${formatNumber(oneUnit)} ${to}`;


    showToast();

}


// ========================================
// TOAST
// ========================================

function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1500);

}


// ========================================
// HISOBLASH BUTTON
// ========================================

convertButton.addEventListener(
    "click",
    convertCurrency
);


// ========================================
// VALYUTALARNI ALMASHTIRISH
// ========================================

swapButton.addEventListener(
    "click",
    () => {

        const oldFrom =
            fromCurrency.value;

        fromCurrency.value =
            toCurrency.value;

        toCurrency.value =
            oldFrom;

        convertCurrency();

    }
);


// ========================================
// SELECT O'ZGARSA
// ========================================

fromCurrency.addEventListener(
    "change",
    convertCurrency
);

toCurrency.addEventListener(
    "change",
    convertCurrency
);


// ========================================
// SUMMA O'ZGARSA
// ========================================

amount.addEventListener(
    "input",
    convertCurrency
);


// ========================================
// TEZKOR SUMMALAR
// ========================================

const quickButtons =
    document.querySelectorAll(
        ".quick-buttons button"
    );

quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            amount.value =
                button.dataset.value;

            convertCurrency();

        }
    );

});


// ========================================
// SAYT OCHILGANDA HISOBLASH
// ========================================

convertCurrency();