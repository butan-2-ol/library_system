//script to use for the staff page in checking out students

//staff details 

const staffDetails = [

    {
        name: "gray",
        staffID: "001"
    }, 

    {
        name: "champ",
        staffID: "002"
    }
]


//dom
const fetchBtn = document.getElementById('fetchBtn');
const tokenInput = document.getElementById('tokenInput');
const displayItem = document.getElementById('itemDisplay');
const confirm = document.getElementById('confirmBtn');
const staffForm =  document.getElementById('staff-Form');
const alarmSound = document.getElementById('alarmSound');
const staffid = document.getElementById('staff-id');
const staffname = document.getElementById('staff-name');




fetchBtn.addEventListener('click', function() {
    const inputToken = tokenInput.value;

    const studentArray = JSON.parse(localStorage.getItem('allStudents')) || [];


    console.log("searching", inputToken);
    console.log("current student in database", studentArray);

    let foundStudent = studentArray.find(s => s.token == inputToken);

    if (!foundStudent) {

        //play sound when wron info is entered
        alarmSound.play();

        window.alert("INVALID TOKEN ENTERED");

        displayItem.textContent= "";

        
    } else {
        displayItem.innerHTML = `
        <strong>Name: </strong> ${foundStudent.name} <br>
        <strong>id: </strong> ${foundStudent.id} <br>
        <strong>Phone: </strong> ${foundStudent.phone} <br>
        <strong>Items: </strong> ${foundStudent.details} <br>
        <strong>Entered At: </strong> ${foundStudent.time} <br>
        `

        alarmSound.pause();
        alarmSoundcurrentTime = 0;

        displayItem.style.lineHneight = "1.6";
        displayItem.style.padding = "10px";
        
    }

});


confirmBtn.addEventListener('click' , function(e) {
    e.preventDefault();

    const tokenToRemove = tokenInput.value;


    let studentArray = JSON.parse(localStorage.getItem('allStudents')) || [];

    const typedName = staffname.value;
    const typedID = staffid.value;

    const validStaff = staffDetails.find(staff => staff.name === typedName && staff.staffID === typedID);


    //check staff credentials
    if(!validStaff) {
        window.alert("ACCESS DENIED. Invalid staff credentials");
        return;
    }

    if (studentArray.length === 0) {
        window.alert("The database is already empty!");
    }

    //update array to new one after rempving or clearing
    const updatedArray = studentArray.filter(s => s.token != tokenToRemove);

    if(studentArray.length === updatedArray.length) {
        window.alert("No active record found to check out.");
    }

    else {
        
        localStorage.setItem('allStudents', JSON.stringify(updatedArray));

        window.alert("Checkout successful! Student record cleared.");


        //reset form after clearing student
        displayItem.textContent = "";
        tokenInput.value = "";
        staffForm.reset();
    }
})
