//taking inputs from student, using event listeners

const form = document.getElementById('check-in');
const submit = document.getElementById('submit');
const message = document.getElementById('message');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('name').value;
    const  id = document.getElementById('id-number').value;
    const phone = document.getElementById('phone').value;
    const details = document.getElementById('details').value;

    if ((username === '' ) ||  (id === '')  ||  (phone === '' ) ) {
        message.textContent = 'Please fill out the required fields';
    }

    else {
        message.textContent = 'Success filling out the fields!';
        message.style.color = 'green';

        const generatedToken = Math.floor(1000 + Math.random() * 9000) ;
        const value = document.getElementById('tokenValue').textContent = generatedToken;



        // data about student after filling form

        let newStudent =  {
            name: username,
            id : id,
            phone : phone,
            details : details,
            token : generatedToken,
            time : new Date().toLocaleString(),
            status : 'active'
        }

        //get existing data from storage

        let students = JSON.parse(localStorage.getItem(('allStudents'))) || [];

        //add new students to newstudent object, 

        students.push(newStudent);

        //save updated array to storage as a string

        localStorage.setItem('allStudents', JSON.stringify(students));        

        setTimeout(function() {
            message.textContent= '';

            form.reset();

            submit.disabled = true;
            submit.textContent = 'Token Generated';
            submit.style.backgroundColor = '';
            submit.style.color = 'green';
            submit.style.padding = '1rem';
            submit.style.borderRadius = '1rem';
        }, 3000);
    }

    console.log(JSON.parse(localStorage.getItem('allStudents')));
});


