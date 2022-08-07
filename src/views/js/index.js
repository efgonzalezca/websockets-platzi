const user = prompt('Write your username');

const teachers = ['RetaxMaster', 'juandc', 'GNDX'];

let socketNameSpace, group;

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if(teachers.includes(user)) {
  socketNameSpace = io('/teachers');
  group = 'teachers';
} else {
  socketNameSpace = io('/students');
  group = 'students';
}

socketNameSpace.on('connect', () => {
  namespace.textContent = group;
});