// Sample Data Structure containing your solved answers
const questionBank = [
    {
        id: 1,
        unit: 1,
        marks: "2",
        q: "Define E-Commerce in your own words.",
        a: "Electronic Commerce (E-Commerce) refers to the buying, selling, and exchanging of goods, services, and information digitally over computer networks, primarily the internet."
    },
    {
        id: 2,
        unit: 1,
        marks: "2",
        q: "What is the primary purpose of Electronic Data Interchange (EDI)?",
        a: "The primary purpose of EDI is to enable the structured, automated, and computer-to-computer exchange of standard business documents (like purchase orders and invoices) between trading partners without human intervention."
    },
    {
        id: 3,
        unit: 1,
        marks: "5",
        q: "Describe the various benefits of E-Commerce to society and organizations.",
        a: "<b>To Organizations:</b> Global market presence, lower operational overhead costs, and data-driven mass customization.<br><br><b>To Society:</b> Reduced environmental footprint (less commuting), access to remote services for rural populations, and optimized market pricing transparency."
    },
    {
        id: 4,
        unit: 4,
        marks: "2",
        q: "What is the primary goal of Encryption?",
        a: "The primary goal of encryption is to ensure data confidentiality by encoding sensitive information into ciphertext so that it can only be read by authorized parties possessing the correct cryptographic decryption key."
    }
    // You can paste additional questions from the solved set right here following this exact format!
];

let currentUnit = 1;
let currentMarks = 'all';

function displayQuestions() {
    const space = document.getElementById('questionSpace');
    space.innerHTML = '';

    const filtered = questionBank.filter(item => {
        const matchesUnit = item.unit === currentUnit;
        const matchesMarks = currentMarks === 'all' || item.marks === currentMarks;
        return matchesUnit && matchesMarks;
    });

    if(filtered.length === 0) {
        space.innerHTML = '<p style="text-align:center; color:gray;">No questions match the active filters.</p>';
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-string', (item.q + ' ' + item.a).toLowerCase());
        
        card.innerHTML = `
            <span class="badge">${item.marks} Marks / Unit ${item.unit}</span>
            <p class="question-text">Q: ${item.q}</p>
            <button class="ans-btn" onclick="toggleAnswer(${item.id})">💡 Reveal Answer</button>
            <div class="answer-content" id="ans-${item.id}">${item.a}</div>
        `;
        space.appendChild(card);
    });
}

function toggleAnswer(id) {
    const ansDiv = document.getElementById(`ans-${id}`);
    ansDiv.classList.toggle('show');
}

function switchUnit(unitNum) {
    currentUnit = unitNum;
    document.querySelectorAll('.unit-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === unitNum);
    });
    displayQuestions();
}

function filterByMarks(markType) {
    currentMarks = markType;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(markType) || (markType === 'all' && btn.innerText.includes('All')));
    });
    displayQuestions();
}

function filterQuestions() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const content = card.getAttribute('data-string');
        if(content.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Initial Run on Load
window.onload = displayQuestions;
