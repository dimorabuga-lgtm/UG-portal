(() => {
  'use strict';
  const button = document.querySelector('#daily-wish-button');
  const message = document.querySelector('#daily-wish-message');
  if (!button || !message) return;
  const wishes = [
    'Нехай сьогодні буде більше приємних розмов і приводів усміхнутися!',
    'Бажаємо спокійної зміни, ясних думок і гарного настрою.',
    'Нехай кожна розмова додає впевненості у власних силах!',
    'Бажаємо знайти спільну мову навіть у непростій розмові.',
    'Нехай сьогодні знайдеться час і для успіхів, і для маленької перерви.',
    'Бажаємо вдячних клієнтів і підтримки колег поруч.',
    'Нехай твоя уважність допоможе комусь зробити вдалий вибір!',
    'Бажаємо енергії на важливе та спокою в дрібницях.',
    'Нехай робочий день мине легко, а вечір подарує відпочинок.',
    'Бажаємо маленької перемоги, якою захочеться поділитися!',
    'Нехай сьогодні вдасться те, що вчора здавалося складним.',
    'Бажаємо теплих слів, вдалих рішень і приємних несподіванок.',
    'Нехай кожен крок сьогодні наближає до твоєї мети.',
    'Бажаємо впевненого голосу та легкості у спілкуванні!',
    'Нехай у цьому дні буде щось добре саме для тебе.',
    'Бажаємо терпіння до складного й радості від простого.',
    'Нехай команда буде поруч, а хороші ідеї приходять вчасно.',
    'Бажаємо помічати свої успіхи — навіть найменші.',
    'Нехай день почнеться з усмішки й завершиться задоволенням від зробленого.',
    'Бажаємо натхнення, добрих новин і затишного вечора!'
  ];
  let previous = -1;
  button.addEventListener('click', () => {
    let index = Math.floor(Math.random() * (wishes.length - (previous >= 0 ? 1 : 0)));
    if (previous >= 0 && index >= previous) index += 1;
    previous = index;
    message.textContent = wishes[index];
    message.closest('.daily-wish').classList.add('is-revealed');
    // Restart the reveal without timers; repeated clicks always show the latest wish.
    message.classList.remove('wish-reveal');
    void message.offsetWidth;
    message.classList.add('wish-reveal');
    button.querySelector('span').textContent = 'Ще одне побажання';
  });
})();