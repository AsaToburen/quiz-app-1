'use strict';

const questions = [
  {
    img:
      'http://assets.nydailynews.com/polopoly_fs/1.2512483.1453998448!/img/httpImage/image.jpg_gen/derivatives/article_750/lvtony29n-2-web.jpg',
    alt: 'cat',
    options: { a: 'Tim the Tiger', b: 'Mike the Lion', c: 'Tony the Tiger', d: 'James the Jaguar' },
    ans: 'c'
  },
  {
    img:
      'https://vignette.wikia.nocookie.net/p__/images/b/bf/P-toucan.jpg/revision/latest?cb=20120625033911&path-prefix=protagonist',
    alt: 'bird',
    options: { a: 'Parrot Bob', b: 'Tucan Sam', c: 'Pete the Parakeet', d: 'Happy Bird' },
    ans: 'b'
  },
  {
    img:
      'http://www.flavorcraverejuice.com/image/cache/catalog/products/juice/flavorcraver-lucky-leprechaun/lucky-charms-leprechaun-1024x768.jpg',
    alt: 'leprechaun',
    options: { a: 'Louis the Leprechaun', b: 'Lucky Charm', c: 'Leprechaun Bob', d: 'Lucky the Leprechaun' },
    ans: 'd'
  },
  {
    img:
      'https://vignette2.wikia.nocookie.net/uncyclopedia/images/e/ec/Cap%27n_Crunch.gif/revision/latest?cb=20130422120854',
    alt: 'captain',
    options: { a: "Cap'n Fantastic", b: 'Pirate Booty', c: "Cap'n Crunch", d: 'Colonel Crunch' },
    ans: 'c'
  },
  {
    img: 'https://static.comicvine.com/uploads/original/11/111746/4345823-trix-rabbit.jpg',
    alt: 'bunny',
    options: { a: 'Bugs Bunny', b: 'Peter Rabbit', c: 'Trix Rabbit', d: 'Harvey Rabbit' },
    ans: 'c'
  },
  {
    img: 'https://s-media-cache-ak0.pinimg.com/originals/ae/0d/9e/ae0d9e5cda126f7b84b49dd16800719f.jpg',
    alt: 'character',
    options: { a: 'Snap', b: 'Crackle', c: 'Pop', d: 'Crash' },
    ans: 'c'
  },
  {
    img: 'https://haphazardmiscellany.files.wordpress.com/2013/05/crackle_kelloggs.jpg',
    alt: 'character',
    options: { a: 'Snap', b: 'Crackle', c: 'Pop', d: 'Crash' },
    ans: 'b'
  },
  {
    img: 'http://cfdavinki.com/wp-content/uploads/2013/05/count.jpg',
    alt: 'dracula',
    options: { a: 'Spike', b: 'Boo Berry', c: 'Count Chocula', d: 'Franken Berry' },
    ans: 'c'
  },
  {
    img: 'http://ellwoodcity.org/wp-content/uploads/2017/03/buzz.jpeg',
    alt: 'bee',
    options: { a: 'Honey Bee', b: 'Buzzy', c: 'Barry B. Benson', d: 'Buzz' },
    ans: 'd'
  },
  {
    img:
      'https://vignette.wikia.nocookie.net/cartooncharacters/images/d/d8/2ij1z5w.jpg/revision/latest?cb=20110124221859',
    alt: 'bear',
    options: { a: 'Happy Bear', b: 'Honey Bear', c: 'Chocolate Bear', d: 'Sugar Bear' },
    ans: 'd'
  }
];

let score = [];

function scoreQuiz() {
  let finalScore = 0;
  score.forEach(ans => (ans ? finalScore++ : ''));
  return finalScore;
}

function showAnswerModal(val) {
  let gif = val
    ? `<div style="width:100%;height:0;padding-bottom:80%;position:relative;"><iframe title="correct-gif" src="https://giphy.com/embed/6yKquSnGwI5Ak" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`
    : `<div style="width:100%;height:0;padding-bottom:80%;position:relative;"><iframe title="incorrect-gif" src="https://giphy.com/embed/HgrgVb5paX768" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`;

  let modalHTML = `<div class="feedback">
        ${gif}
        <div class="message">
          <h2>${val ? 'Correct!' : 'Incorrect'}</h2>
          ${!val ? `<p>The correct answer is ${questions[score.length - 1].ans}</p>` : ``}
          <button class="continue-btn">Continue</button>
        </div>
      </div>`;

  $('.content').html(modalHTML);
}

function handleQuestionSubmit(e) {
  let answerVal = $('form')
    .find('input[name="question"]:checked')
    .val();
  answerVal === questions[score.length].ans ? score.push(true) : score.push(false);
  showAnswerModal(score[score.length - 1]);
}

function loadNextQuestion() {
  if (score.length < 10) {
    let question = questions[score.length];
    let options = question.options;
    let questionHTML = `<div class="content">
      <span class="progress">Question <span class="count">${score.length + 1}</span> of 10</span>
      <span class="score">Current Score: ${score.filter(a => a).length} / ${score.length}</span>
      <div class="icon">
        <img src="${question.img}" alt="${question.alt}" />
      </div>
      <form>
        <fieldset>
              <legend>Options:</legend>
              <label for="a"><input id="a" name="question" value="a" type="radio" required />${options.a}</label>
              <label for="b"><input id="b" name="question" value="b" type="radio" />${options.b}</label>
              <label for="c"><input id="c" name="question" value="c" type="radio" />${options.c}</label>
              <label for="d"><input id="d" name="question" value="d" type="radio" />${options.d}</label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>`;

    $('.content').replaceWith(questionHTML);
  } else {
    let resultCount = scoreQuiz();
    let resultsHTML = `<div class="content">
        <h2>You answered ${resultCount} of 10 questions correctly!</h2>
        <button class="restart-btn">Restart</button>
      </div>`;
    $('.content').replaceWith(resultsHTML);

    // handle 'Continue' button click on results page
    $('.quiz-container').on('click', '.restart-btn', event => {
      initQuiz();
    });
  }

  //handle click events to submit answers
  $('form').on('submit', event => {
    event.preventDefault();
    handleQuestionSubmit(event);
  });
}

function initQuiz() {
  score = [];

  let startHTML = `<div class="content">
          <div class="icon">
            <img src="https://vignette2.wikia.nocookie.net/uncyclopedia/images/e/ec/Cap%27n_Crunch.gif/revision/latest?cb=20130422120854" alt="Captain" />
          </div>
          <h2>Click the start button to begin</h2>
          <button class="start-btn">Start</button>
        </div>`;
  $('.content').replaceWith(startHTML);

  // handle click events to start quiz
  $('.quiz-container').on('click', '.start-btn', event => {
    loadNextQuestion();
  });

  $('body').on('click', '.continue-btn', function(e) {
    loadNextQuestion();
    // remove modal
    $(this)
      .parent()
      .remove();
  });
}

$(initQuiz);
