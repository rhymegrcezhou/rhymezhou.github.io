//MAKE THE HIGHLIGHTER COLOR FLEXIBLE 
// VARIABLES
      
const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));

const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';
      
// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
const mergeArrays = (arrOne, arrTwo) => arrOne
    .map((item, i) => `${item} ${arrTwo[i]}`)
    .join(', ');

// 3. Curried function to add a background to array of elms
const addBackground = (elms) => (color) => {
    elms.forEach(el => {
    el.style.backgroundImage = color;
    });
}
// 4. Function to get data from API
    const getData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS
// 1. Build CSS formatted linear-gradient from API data
const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
const applyGradient = async(url, callback) => {
const data = await getData(url);
const gradient = buildGradient(data[randNumInRange(data.length)]);
callback(gradient);
}

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);


//FAQ SECTION
const container = document.querySelector(".faq-container");
const questions =[
    {
        title: "Where do you go to school?",
        text: "Hamilton College, a liberal arts college with an open curriculum in Clinton, NY. I'm double majoring in Computer Science and Economics."
    },
    {
        title: "Why Computer Science?",
        text: "Prior to my college career, software engineering seemed like a foreign subject to me, and if I am being honest, it still feels that way on some days. However, what changed is my attitude towards the challenge. Like a complex origami model, a coding project requires hard work, applying knowledge, being resourceful, an and a humble spirit."
    },
    {
        title: "Fun facts?",
        text: "1) I played badminton competitively for 11 years. 2) I was a research assistant for Prof. Wael Hallaq from Columbia University in summer 2021. The <a href='https://drive.google.com/file/d/1z6GWqZj5v3a5XRITKDdeIPe3XIKJXEP_/view?usp=sharing' target='_blank'>research project</a> was about French laïcité and Islam."
    }
];
function createTemplate(){
    let template = "";
    questions.forEach(q => {
        template += `
        <div class="faq">
            <h5 class="faq-title">${q.title}</h3>
            <p class="faq-text">${q.text}</p>
            <i class="faq-icon"></i>
        </div>
        `;
    });
    container.innerHTML = template;
    const faqs = document.querySelectorAll('.faq-container > .faq');
    container.addEventListener('click', (e) =>{
        if (e.target.className.indexOf('faq-icon') > -1){
            faqs[[].indexOf.call(faqs, e.target.parentElement)].classList.toggle("active");
        }
    })
}
window.onload = () => createTemplate();