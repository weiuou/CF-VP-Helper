import '../scss/styles.scss'
import {getContestList} from './api.js'
import * as bootstrap from 'bootstrap'
let users = [
];

let contests = await getContestList();
let activeContests = contests;
const userList = document.getElementById('user-list');
const contestList = document.getElementById('contest-list');
const pageNavigation = document.getElementById('page-navigation');
let page = 1;
let len = 24;
setActiveContests('All');
function setPage(_page,_len){
  page = _page;
  len = _len;
  if(page < 1)page = 1;
  let maxPage =(activeContests.length%len > 0) ? activeContests.length    /len+1 : activeContests.length/len;
  if(page > maxPage)page = maxPage;
  renderContests();
  renderPageNavigation();
}

function renderPageNavigation(){
  pageNavigation.innerHTML = '';
  let maxPage =(activeContests.length%len > 0) ? activeContests.length/len+1 : activeContests.length/len;
  console.log(maxPage);
  const previous = document.createElement('li');
  previous.classList.add('page-item');
  const link = document.createElement('a');
  link.classList.add('page-link');
  link.innerText = "<<";
  link.addEventListener('click',()=> setPage(page-1,len));
  previous.appendChild(link);
  pageNavigation.appendChild(previous);
  for(let i = 1; i <= maxPage; i++){
    if(i!==1&&i!==parseInt(maxPage)&&Math.abs(i-page)>5)
    {
      if(i==2||i==parseInt(maxPage)-1){
	const row = document.createElement('li');
        row.classList.add('page-link');
        const link = document.createElement('a');
        link.innerHTML = `...`;
        row.appendChild(link);
        pageNavigation.appendChild(row);
      }
        continue;
    }
    const row = document.createElement('li');
    if(i==page)row.classList.add('active');
    row.classList.add('page-item');
    const link = document.createElement('a');
    link.innerHTML = `${i}`;
    link.classList.add('page-link');
    link.addEventListener('click',()=> setPage(i,len));
    row.appendChild(link);
    pageNavigation.appendChild(row);
  }
  const next = document.createElement('li');
  next.classList.add('page-item');
  const link2 = document.createElement('a');
  link2.classList.add('page-link');
  link2.innerText = ">>";
  link2.addEventListener('click',()=> setPage(page + 1,len));
  next.appendChild(link2);
  pageNavigation.appendChild(next);
}

function renderContests(){
  contestList.innerHTML = '';
  const begin = len * (page - 1);
  const end = begin + len;
  for(let i = begin;i < end && i < activeContests.length;i++){
    let id = activeContests[i].id;
    let name = activeContests[i].name;
    let startTime = TimeSecondToTime(activeContests[i].startTimeSeconds);
    let duration = TimeSecondToDuration(activeContests[i].durationSeconds);
    let link = "https://codeforces.com/contests/"+ activeContests[i].id;
    let phase = activeContests[i].phase;
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${id}</th>
      <th>${name}</th>
      <th>${startTime}</th>
      <th>${duration}</th>
      <th><a href="${link}">跳转到cf</a></th>
      <th>${phase}</th>`;
    contestList.appendChild(row);
  }
}
function initButton(){
  const d1button = document.getElementById('div1');
  const d12button = document.getElementById('div1+2');
  const d2button = document.getElementById('div2');
  const edubutton = document.getElementById('edu');
  const d3button = document.getElementById('div3');
  const d4button = document.getElementById('div4');
  const allbutton = document.getElementById('All');
  d1button.addEventListener('click',()=> setActiveContests('(Div. 1)'));
  d12button.addEventListener('click',()=> setActiveContests('(Div. 1 + Div. 2)'));
  edubutton.addEventListener('click',()=> setActiveContests('Educational'));
  d2button.addEventListener('click',()=> setActiveContests('(Div. 2)'));
  d3button.addEventListener('click',()=> setActiveContests('(Div. 3)'));
  d4button.addEventListener('click',()=> setActiveContests('(Div. 4)'));
  allbutton.addEventListener('click',()=> setActiveContests('All'));


}
initButton();

function renderUsers(){
  userList.innerHTML = '';
  users.forEach(user =>{
    const row = document.createElement('li');
    row.classList.add('list-group-item');
    row.innerHTML = `${user.name}`;
    const removeButton = document.createElement('button');
    removeButton.type = "button";
    removeButton.classList.add('btn','btn-light');
    removeButton.innerText = '移除';
    removeButton.addEventListener('click',()=> removeUser(user.name));
    row.appendChild(removeButton)
    userList.appendChild(row);
  });
}
function removeUser(name){
  users = users.filter(user => user.name !== name);
  renderUsers();
}

function AddUser(name){
  users.push({name:name});
  renderUsers();
}

renderUsers();

const pageSizeInputField = document.getElementById('pageSize-input');
const inputField = document.getElementById('id-input');
const addButton = document.getElementById('AddButton');
const pageButton = document.getElementById('PageButton');
addButton.addEventListener('click', () => {
  const username = inputField.value.trim();
  inputField.value = '';
  if(username){
    AddUser(username);
  }else{
    alert('请输入一个用户名')
  }
});

pageButton.addEventListener('click',()=>{
  let _pageSize = parseInt(pageSizeInputField.value.trim());
  pageSizeInputField.value = '';
  if(_pageSize <= 0)_pageSize = 24;
  setPage(1,_pageSize);
});


setPage(page,len);
function TimeSecondToTime(second){
  const date = new Date(second * 1000);
	const utc8Offset = 8*60;
	const localDate = new Date(date.getTime() + utc8Offset * 60000);
	const year = localDate.getUTCFullYear();
	const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
	const day = String(localDate.getUTCDate()).padStart(2, '0');
	const hours = String(localDate.getUTCHours()).padStart(2, '0');
	const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function TimeSecondToDuration(second){
	const localDate = new Date(second * 1000);
	const hours = parseInt(second/60/60);
	const minutes = String(localDate.getUTCMinutes()).padStart(2,'0');
	return `${hours}:${minutes}`;
}

function setActiveContests(name){
	console.log(name);
  if(name!=='All')activeContests = contests.filter(item => item.name.includes(name));
  else activeContests = contests;
  setPage(1,len);
}



