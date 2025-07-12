<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Preguntados Bíblico</title>
<style>
body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f4f8; }
#app { text-align: center; max-width: 400px; background: white; padding: 20px; border-radius: 16px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
button { display: block; width: 100%; margin: 5px 0; padding: 10px; border: none; border-radius: 8px; background: #3b82f6; color: white; font-size: 16px; cursor: pointer; }
button.correct { background: #22c55e; }
button.incorrect { background: #ef4444; }
.timer { font-size: 32px; background: #3b82f6; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 10px auto; }
</style>
</head>
<body>
<div id="app"></div>
<script>
const questions = [
  { question: "¿Cómo se llama la mama de Juan el Bautista?", options: ["Maria","Marta","Elisabeth"], correct: 2 },
  { question: "¿De qué color era el pelo de José?", options: ["Rubio","Castaño","Moreno"], extra: "d) Era pelado (mentira, no se sabe)" },
  { question: "¿Cuándo murió Dios?", options: ["500 d.C","33 d.C","5000 d.C"], extra: "d) Dios no murió" },
  { question: "¿Quién fue el rey que más tiempo duró en Israel?", options: ["Salomón","Saúl","David"], correct: 1 },
  { question: "¿Qué hizo Dios el 3er día en la creación?", options: ["Al hombre","Agua","Agua, tierra y vegetación"], correct: 2 },
  { question: "¿Cómo era el nombre de Pablo antes de conocer a Cristo?", options: ["Ananías","Saulo","Simón"], correct: 1 },
  { question: "¿Cuál era la profesión de Pedro antes de conocer a Cristo?", options: ["Pescador","Comerciante","Doctor"], correct: 0 },
  { question: "¿Qué fruta fue la que comió Eva en el principio?", options: ["Manzana","Pera","Durazno"], extra: "d) Dios nombra 'fruto' pero no uno en especial" },
  { question: "¿Cuántos días estuvo en ayuno Jesús en el desierto?", options: ["40 días","39 días","45 días"], correct: 0 },
  { question: "¿Cuántas fueron las plagas de Egipto?", options: ["15","10","9"], correct: 1 }
];

let current = 0;
let timer = 10;
let interval;
const app = document.getElementById('app');

function showQuestion() {
  app.innerHTML = '';
  const q = questions[current];
  const h = document.createElement('h2');
  h.textContent = q.question;
  const t = document.createElement('div');
  t.className = 'timer';
  t.textContent = timer;
  app.appendChild(h);
  app.appendChild(t);
  q.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.textContent = `${String.fromCharCode(97+i)}) ${opt}`;
    b.onclick = () => selectAnswer(i, b);
    app.appendChild(b);
  });
  if (q.extra) {
    const extra = document.createElement('div');
    extra.style.marginTop = '10px';
    extra.style.fontWeight = 'bold';
    extra.textContent = q.extra;
    extra.style.display = 'none';
    extra.id = 'extra';
    app.appendChild(extra);
  }
  interval = setInterval(() => {
    timer--;
    t.textContent = timer;
    if (timer === 0) {
      clearInterval(interval);
      revealCorrect();
    }
  }, 1000);
}

function selectAnswer(index, button) {
  clearInterval(interval);
  const q = questions[current];
  if (q.correct !== undefined) {
    if (index === q.correct) {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
      document.querySelectorAll('button')[q.correct+1].classList.add('correct');
    }
  }
  if (q.extra) document.getElementById('extra').style.display = 'block';
  const next = document.createElement('button');
  next.textContent = 'Siguiente';
  next.onclick = () => {
    current++;
    if (current < questions.length) {
      timer = 10;
      showQuestion();
    } else {
      app.innerHTML = '<h2>Juego terminado ✅</h2>';
    }
  };
  app.appendChild(next);
}

function revealCorrect() {
  const q = questions[current];
  if (q.correct !== undefined) {
    document.querySelectorAll('button')[q.correct+1].classList.add('correct');
  }
  if (q.extra) document.getElementById('extra').style.display = 'block';
  const next = document.createElement('button');
  next.textContent = 'Siguiente';
  next.onclick = () => {
    current++;
    if (current < questions.length) {
      timer = 10;
      showQuestion();
    } else {
      app.innerHTML = '<h2>Juego terminado ✅</h2>';
    }
  };
  app.appendChild(next);
}

showQuestion();
</script>
</body>
</html>
