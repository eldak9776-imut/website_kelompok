const symptomsDatabase = [
    {
        id: "kram",
        keywords: ["kram", "sakit perut", "nyeri perut", "mules", "dismenore"],
        title: "Kram Perut (Dismenore)",
        cause: "Peningkatan hormon prostaglandin yang membuat otot rahim berkontraksi untuk meluruhkan lapisan dinding rahim.",
        solution: "Kompres hangat area perut bawah, minumlah air hangat, mandi air hangat, hindari kafein berlebih, dan lakukan olahraga ringan."
    },
    {
        id: "payudara",
        keywords: ["payudara", "dada", "nyeri dada", "kencang"],
        title: "Nyeri / Sensitivitas Payudara",
        cause: "Fluktuasi hormon estrogen dan progesteron menjelang haid yang menyebabkan retensi cairan pada jaringan payudara.",
        solution: "Gunakan bra tanpa kawat yang nyaman, kurangi asupan garam untuk mengurangi pembengkakan cairan, dan kompres dingin jika terasa nyeri."
    },
    {
        id: "mood",
        keywords: ["mood", "emosi", "sedih", "marah", "sensitif", "gelisah", "pms"],
        title: "Perubahan Suasana Hati (Mood Swings)",
        cause: "Penurunan tajam hormon estrogen dan progesteron setelah masa subur yang memengaruhi zat kimia otak (serotonin).",
        solution: "Lakukan teknik relaksasi napas, tidur cukup 7-8 jam, jalan santai di tempat terbuka, dan konsumsi makanan bergizi kaya magnesium."
    },
    {
        id: "kembung",
        keywords: ["kembung", "begah", "gas", "perut membesar"],
        title: "Perut Kembung & Begah",
        cause: "Perubahan hormon progesteron yang memperlambat sistem pencernaan dan menyebabkan penumpukan gas serta cairan.",
        solution: "Makan dalam porsi kecil namun sering, batasi makanan tinggi garam dan soda, serta konsumsi teh herbal seperti jahe atau peppermint."
    },
    {
        id: "pusing",
        keywords: ["pusing", "sakit kepala", "migrain", "kepala"],
        title: "Sakit Kepala / Pusing Hormonal",
        cause: "Penurunan kadar estrogen secara mendadak menjelang mulainya perdarahan haid.",
        solution: "Minum air putih yang cukup (minimal 2 liter/hari), istirahat di ruangan yang tenang dan gelap, serta pijat lembut area pelipis."
    },
    {
        id: "lelah",
        keywords: ["lelah", "pegal", "capek", "lemas", "lesu"],
        title: "Tubuh Lelah & Pegal-Pegal",
        cause: "Perubahan metabolisme tubuh dan penurunan kadar hormon serta kehilangan zat besi saat perdarahan haid.",
        solution: "Pastikan jam tidur tercukupi, tingkatkan makanan kaya zat besi (seperti bayam atau daging tanpa lemak), serta hindari aktivitas terlalu berat."
    },
    {
        id: "jerawat",
        keywords: ["jerawat", "kulit", "muka", "wajah", "bruntusan"],
        title: "Jerawat Hormonal",
        cause: "Peningkatan produksi kelenjar minyak (sebum) akibat perubahan keseimbangan hormon menjelang haid.",
        solution: "Bersihkan wajah teratur dua kali sehari, hindari memecahkan jerawat, dan gunakan pembersih wajah berbahan lembut (non-comedogenic)."
    },
    {
        id: "flek",
        keywords: ["flek", "cokelat", "bercak", "spotting"],
        title: "Flek Cokelat Sebelum/Sesudah Haid",
        cause: "Sisa darah lama yang membutuhkan waktu lebih lambat untuk keluar dari rahim atau akibat variasi hormon ringan.",
        solution: "Hal ini normal jika terjadi 1-2 hari sebelum atau sesudah haid. Cukup jaga kebersihan area kewanitaan dan gunakan pantyliner jika diperlukan."
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('lastPeriodDate');
    const cycleRange = document.getElementById('cycleLength');
    const cycleVal = document.getElementById('cycleValue');
    const durationRange = document.getElementById('periodDuration');
    const durationVal = document.getElementById('durationValue');
    const btnCalculate = document.getElementById('btnCalculate');

    const savedDate = localStorage.getItem('yada_last_date') || today;
    const savedCycle = localStorage.getItem('yada_cycle_len') || "28";
    const savedDuration = localStorage.getItem('yada_period_len') || "5";

    dateInput.value = savedDate;
    cycleRange.value = savedCycle;
    cycleVal.textContent = savedCycle + " Hari";
    durationRange.value = savedDuration;
    durationVal.textContent = savedDuration + " Hari";

    cycleRange.addEventListener('input', function () {
        cycleVal.textContent = this.value + " Hari";
    });

    durationRange.addEventListener('input', function () {
        durationVal.textContent = this.value + " Hari";
    });

    function formatDateIndo(dateObj) {
        return dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    function calculateCycle() {
        const lastDateVal = dateInput.value;
        if (!lastDateVal) return;

        const cycleLength = parseInt(cycleRange.value);
        const periodDuration = parseInt(durationRange.value);

        localStorage.setItem('yada_last_date', lastDateVal);
        localStorage.setItem('yada_cycle_len', cycleLength);
        localStorage.setItem('yada_period_len', periodDuration);

        const startDate = new Date(lastDateVal);
        const nextPeriod = new Date(startDate);
        nextPeriod.setDate(startDate.getDate() + cycleLength);

        const todayObj = new Date();
        todayObj.setHours(0, 0, 0, 0);
        const timeDiff = nextPeriod - todayObj;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const ovulationDate = new Date(nextPeriod);
        ovulationDate.setDate(nextPeriod.getDate() - 14);

        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 4);

        const fertileEnd = new Date(ovulationDate);
        fertileEnd.setDate(ovulationDate.getDate() + 1);

        document.getElementById('nextPeriodText').textContent = formatDateIndo(nextPeriod);
        document.getElementById('ovulationText').textContent = formatDateIndo(ovulationDate);
        document.getElementById('fertileWindowText').textContent = `${formatDateIndo(fertileStart)} - ${formatDateIndo(fertileEnd)}`;

        if (daysLeft > 0) {
            document.getElementById('countdownText').textContent = `${daysLeft} Hari Lagi`;
        } else if (daysLeft === 0) {
            document.getElementById('countdownText').textContent = "Hari Ini!";
        } else {
            document.getElementById('countdownText').textContent = `${Math.abs(daysLeft)} Hari Lalu`;
        }

        const tableBody = document.getElementById('futureCyclesBody');
        tableBody.innerHTML = '';

        let currentBaseDate = new Date(startDate);
        for (let i = 1; i <= 3; i++) {
            const cycleStart = new Date(currentBaseDate);
            cycleStart.setDate(currentBaseDate.getDate() + (cycleLength * i));

            const cycleEnd = new Date(cycleStart);
            cycleEnd.setDate(cycleStart.getDate() + periodDuration - 1);

            const cycleOvu = new Date(cycleStart);
            cycleOvu.setDate(cycleStart.getDate() - 14);

            const cycleFertileStart = new Date(cycleOvu);
            cycleFertileStart.setDate(cycleOvu.getDate() - 4);

            const cycleFertileEnd = new Date(cycleOvu);
            cycleFertileEnd.setDate(cycleOvu.getDate() + 1);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="fw-bold">Siklus ${i}</td>
                <td>${formatDateIndo(cycleStart)} - ${formatDateIndo(cycleEnd)}</td>
                <td>${formatDateIndo(cycleFertileStart)} - ${formatDateIndo(cycleFertileEnd)}</td>
            `;
            tableBody.appendChild(row);
        }
    }

    btnCalculate.addEventListener('click', calculateCycle);
    calculateCycle();

    const searchInput = document.getElementById('symptomSearch');
    const chipBtns = document.querySelectorAll('.chip-btn');
    const titleEl = document.getElementById('resultSymptomTitle');
    const causeEl = document.getElementById('resultSymptomCause');
    const solutionEl = document.getElementById('resultSymptomSolution');

    function displaySymptomInfo(symptomData) {
        if (!symptomData) {
            titleEl.textContent = "Gejala Tidak Ditemukan";
            causeEl.textContent = "Maaf, informasi untuk gejala ini belum tersedia dalam basis data kami.";
            solutionEl.textContent = "Jika Anda mengalami keluhan yang tidak biasa atau sangat mengganggu, disarankan untuk berkonsultasi langsung dengan dokter.";
            return;
        }

        titleEl.textContent = symptomData.title;
        causeEl.textContent = symptomData.cause;
        solutionEl.textContent = symptomData.solution;
    }

    chipBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            chipBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const symId = this.getAttribute('data-symptom');
            const match = symptomsDatabase.find(s => s.id === symId);
            displaySymptomInfo(match);
            searchInput.value = '';
        });
    });

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        if (!query) return;

        chipBtns.forEach(b => b.classList.remove('active'));

        const match = symptomsDatabase.find(item =>
            item.title.toLowerCase().includes(query) ||
            item.keywords.some(k => k.toLowerCase().includes(query))
        );

        displaySymptomInfo(match);
    });
});