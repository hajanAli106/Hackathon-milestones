// Get refrences to the form and display area 
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save from data in localStorage with the username as the key 
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    // Generate the resume content dynamicaly 
    var resumeHTML = "\n    <h2> <b>Editable Resume </b> </h2>\n    <h3> Perrsonal Information</h3>\n    <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span><p>\n    <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span><p>\n    <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span><p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\"> ").concat(education, "</p>\n\n    \n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n\n    \n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n\n\n    ");
    // Display the Generated resume 
    resumeDisplayElement.innerHTML = resumeHTML;
    //generate a shareable url with the username only 
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //display the shareable link 
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//handle pdf download
downloadPdfButton.addEventListener('click', function () {
    window.print(); //this will open the print dialog and allow the user to save as [pdf]
});
//profill the form based on the username in the url
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
