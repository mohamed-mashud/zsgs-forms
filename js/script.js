/**
 *
 * uncomment this in prod need for data security 
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable some common DevTools shortcuts
document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" || // DevTools
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || // Inspect/Console
        (e.ctrlKey && e.key === "U") // View Source
    ) {
        e.preventDefault();
    }
});
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log("running")
    // DOM elements
    const form = document.getElementById('registration-form');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const pageNumber = document.getElementById('page-number');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const educationContainer = document.getElementById('education-container');
    const addEducationBtn = document.getElementById('add-education');
    const phoneNumberCount = 10;
    const aadharNumberCount = 12;

    // phone number validation
    const phoneNumber = document.getElementById('phone-number');
    phoneNumber.addEventListener('input', () => {
        console.log(phoneNumber.value);
        if(phoneNumber.value != null)
            phoneNumber.value = phoneNumber.value.replace(/[^\d]/g, '');
        
        if(phoneNumber.value.length > phoneNumberCount) // maxLimit
            phoneNumber.value = phoneNumber.value.slice(0, phoneNumberCount);
    });
        
    // aadhar number validation
    const aadharNumber = document.getElementById('aadhar-number');
    aadharNumber.addEventListener('input', () => {
        if(aadharNumber.value != null)
            aadharNumber.value = aadharNumber.value.replace(/[^\d]/g, '');
        if(aadharNumber.value.length > aadharNumberCount) // maxLimit
            aadharNumber.value = aadharNumber.value.slice(0, aadharNumberCount);
    });

    // Pan number validation
    const panNumber = document.getElementById('pan');
    panNumber.addEventListener('input', () => {
        let value = panNumber.value.toUpperCase();
        console.log(value);
        
        value = value.replace(/[^A-Z0-9]/g, '');
        
        let part1 = value.slice(0, 5).replace(/[^A-Z]/g, '');
        let part2 = value.slice(5, 9).replace(/[^0-9]/g, '');
        let part3 = value.slice(9, 10).replace(/[^A-Z]/g, '');
        
        panNumber.value = part1 + part2 + part3;
    })

    let educationCount = 0;
    addEducationSection();

    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (validatePage1()) {
            page1.classList.remove('active');
            page2.classList.add('active');
            pageNumber.textContent = 'Page 2/2';
            progressBar.style.width = '100%';
            progressPercent.textContent = '100%';
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        page2.classList.remove('active');
        page1.classList.add('active');
        pageNumber.textContent = 'Page 1/2';
        progressBar.style.width = '50%';
        progressPercent.textContent = '50%';
    });

    // Add education section
    addEducationBtn.addEventListener('click', function() {
        if (educationCount < 5) {
            addEducationSection();
        } else {
            alert('Maximum 5 education sections allowed');
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePage1() && validatePage2()) {
            alert('Form submitted successfully!');
            // TODO: can send to serv if needed
        }
    });

    function addEducationSection() {
        educationCount++;
        const educationDiv = document.createElement('div');
        educationDiv.className = 'education-section mb-4 p-4 border rounded-lg';
        educationDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-gray-700">Education #${educationCount}</h4>
                ${educationCount > 1 ? '<button type="button" class="remove-education text-red-500 hover:text-red-700"><i class="fas fa-times"></i></button>' : ''}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                    <input type="text" name="institution[]" class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Level of Education</label>
                    <select name="education-level[]" class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                        <option value="">Select Level</option>
                        <option value="High School">High School</option>
                        <option value="Associate">Associate Degree</option>
                        <option value="Bachelor">Bachelor's Degree</option>
                        <option value="Master">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                    <input type="number" name="percentage[]" min="0" max="100" step="0.01" class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" name="start-date[]" class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                </div>
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" name="end-date[]" class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required>
            </div>
        `;
        educationContainer.appendChild(educationDiv);
        
        // Add event listener for remove button
        const removeBtn = educationDiv.querySelector('.remove-education');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                educationContainer.removeChild(educationDiv);
                educationCount--;
            });
        }
    }

    function validatePage1() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (!name.value.trim()) {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Country code validation
        const countryCode = document.getElementById('country-code');
        const countryCodeError = document.getElementById('country-code-error');
        if (!countryCode.value) {
            countryCodeError.textContent = 'Country code is required';
            isValid = false;
        } else {
            countryCodeError.textContent = '';
        }
        
        // Phone validation
        const phoneNumber = document.getElementById('phone-number');
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^[0-9]{10}$/; 
        if (!phoneNumber.value.trim()) {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(phoneNumber.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }
        
        // Address validation
        const address = document.getElementById('address');
        const addressError = document.getElementById('address-error');
        if (!address.value.trim()) {
            addressError.textContent = 'Address is required';
            isValid = false;
        } else {
            addressError.textContent = '';
        }
        
        // Aadhar validation
        const aadhar = document.getElementById('aadhar-number');
        const aadharError = document.getElementById('aadhar-error');
        const aadharRegex = /^[0-9]{12}$/;
        if (!aadhar || !aadhar.value.trim()) {
            aadharError.textContent = 'Aadhar number is required';
            isValid = false;
        } else if (!aadharRegex.test(aadhar.value)) {
            aadharError.textContent = 'Aadhar must be exactly 12 digits';
            isValid = false;
        } else {
            aadharError.textContent = '';
        }
        
        // PAN validation
        const pan = document.getElementById('pan');
        const panError = document.getElementById('pan-error');
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!pan.value.trim()) {
            panError.textContent = 'PAN number is required';
            isValid = false;
        } else if (!panRegex.test(pan.value)) {
            panError.textContent = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
            isValid = false;
        } else {
            panError.textContent = '';
        }
        
        return isValid;
    }

    function validatePage2() {
        let isValid = true;
        
        // Photo validation
        const photo = document.getElementById('photo');
        const photoError = document.getElementById('photo-error');
        const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!photo.files.length) {
            photoError.textContent = 'Photo is required';
            isValid = false;
        } else if (!allowedImageTypes.includes(photo.files[0].type)) {
            photoError.textContent = 'Please upload a JPG, JPEG, or PNG file';
            isValid = false;
        } else {
            photoError.textContent = '';
        }
        
        // Education validation
        const institutions = document.getElementsByName('institution[]');
        for (let i = 0; i < institutions.length; i++) {
            if (!institutions[i].value.trim()) {
                isValid = false;
                institutions[i].style.borderColor = '#e53e3e';
            } else {
                institutions[i].style.borderColor = '';
            }
        }
        
        // Resume validation
        const resume = document.getElementById('resume');
        const resumeError = document.getElementById('resume-error');
        const allowedResumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!resume.files.length) {
            resumeError.textContent = 'Resume is required';
            isValid = false;
        } else if (!allowedResumeTypes.includes(resume.files[0].type) && 
                    !resume.files[0].name.endsWith('.doc') && 
                    !resume.files[0].name.endsWith('.docx')) {
            resumeError.textContent = 'Please upload a PDF, DOC, or DOCX file';
            isValid = false;
        } else {
            resumeError.textContent = '';
        }
        
        return isValid;
    }

    // Input validation 
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type !== 'file') {
                if (!this.value.trim()) {
                    this.style.borderColor = '#e53e3e';
                } else {
                    this.style.borderColor = '';
                }
            }
        });
    });
});
