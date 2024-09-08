// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
//
//

async function usersArray(){
   const users= await fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json())

    let mainWrapper=document.createElement('div');
    mainWrapper.classList.add('mainWrapper');

    for (const user of users) {
        let wrapper=document.createElement('div');
        wrapper.classList.add('wrapper');

        let userWrap=document.createElement('div');
        userWrap.innerText=`${user.id} - ${user.name}`

        let user_details_button =document.createElement('button');
        user_details_button.innerText='User Details'

        wrapper.append(userWrap,user_details_button)
        mainWrapper.appendChild(wrapper)

        user_details_button.onclick=()=>{
         location.href=`../user-details/user-details.html?id=${user.id}`
            localStorage.setItem('user',JSON.stringify(user))
        }
    }
        document.body.appendChild(mainWrapper)
}
usersArray()