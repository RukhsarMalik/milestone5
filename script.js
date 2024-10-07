"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumeContent = document.getElementById("resumeContent");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeAddress = document.getElementById("resumeAddress");
const resumeLinkedin = document.getElementById("resumeLinkedin");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const editButton = document.getElementById("editButton");
const shareButton = document.getElementById("shareButton");
const downloadButton = document.getElementById("downloadButton");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    event.preventDefault();
    const educationGroups = document.querySelectorAll('.education-group');
    let educationHTML = '';
    educationGroups.forEach((group, index) => {
        const degree = group.querySelector(`#degree-${index + 1}`).value;
        const institute = group.querySelector(`#institute-${index + 1}`).value;
        const year = group.querySelector(`#year-${index + 1}`).value;
        educationHTML += `
            <div class="education-entry">
                <p><strong>Degree:</strong> ${degree}</p>
                <p><strong>Institute:</strong> ${institute}</p>
                <p><strong>Year:</strong> ${year}</p><br>
            </div>`;
    });
    resumeEducation.innerHTML = educationHTML;
    const experienceGroups = document.querySelectorAll('.experience-group');
    let workExperienceHTML = '';
    experienceGroups.forEach((group, index) => {
        const company = group.querySelector(`#company-${index + 1}`).value;
        const position = group.querySelector(`#position-${index + 1}`).value;
        const duration = group.querySelector(`#duration-${index + 1}`).value;
        const responsibility = group.querySelector(`#responsibility-${index + 1}`).value;
        workExperienceHTML += `
            <div class="work-experience-entry">
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p><strong>Responsibilities:</strong> ${responsibility}</p><br>
                
            </div>`;
    });
    resumeWorkExperience.innerHTML = workExperienceHTML;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const linkedin_id = document.getElementById("linkedin-id").value;
    const skill1 = document.getElementById("skill1").value;
    const skill2 = document.getElementById("skill2").value;
    const skill3 = document.getElementById("skill3").value;
    const skill4 = document.getElementById("skill4").value;
    const photoInput = document.getElementById("photo");
    const photofile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';
    if (photofile) {
        photoBase64 = yield filetoBase64(photofile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.innerHTML = `Phone#:  ${phone}`;
    resumeAddress.textContent = `Address: ${address}`;
    resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
    if (linkedin_id) {
        resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
        resumeLinkedin.style.display = "block";
    }
    else {
        resumeLinkedin.style.display = "none";
    }
    resumeSkills.innerHTML = `${skill1}<br>${skill2}<br>${skill3}<br>${skill4}`;
    // Generate URL and make it shareable
    const queryParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        address: address,
        linkedin_id: linkedin_id,
        skills1: skill1,
        skills2: skill2,
        skills3: skill3,
        skills4: skill4,
    });
    // Add multiple education fields to query parameters
    educationGroups.forEach((group, index) => {
        const degree = group.querySelector(`#degree-${index + 1}`).value;
        const institute = group.querySelector(`#institute-${index + 1}`).value;
        const year = group.querySelector(`#year-${index + 1}`).value;
        queryParams.append(`degree${index + 1}`, degree);
        queryParams.append(`institute${index + 1}`, institute);
        queryParams.append(`year${index + 1}`, year);
    });
    // Add multiple work experience fields to query parameters
    experienceGroups.forEach((group, index) => {
        const company = group.querySelector(`#company-${index + 1}`).value;
        const position = group.querySelector(`#position-${index + 1}`).value;
        const duration = group.querySelector(`#duration-${index + 1}`).value;
        const responsibility = group.querySelector(`#responsibility-${index + 1}`).value;
        queryParams.append(`company${index + 1}`, company);
        queryParams.append(`position${index + 1}`, position);
        queryParams.append(`duration${index + 1}`, duration);
        queryParams.append(`responsibility${index + 1}`, responsibility);
    });
    // Generate the unique shareable URL
    const uniqueURL = `${window.location.origin}?${queryParams.toString()}`;
    // Handle share button click
    shareButton.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(uniqueURL)
            .then(() => alert("The link has been copied to the clipboard!"))
            .catch(err => console.error("Error copying URL:", err));
    });
    // Update URL in the address bar without reloading
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
    // Hide the form and show the resume page
    (_c = document.querySelector(".container")) === null || _c === void 0 ? void 0 : _c.classList.add("hidden");
    resumePage.classList.remove("hidden");
}));
function filetoBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
;
(_a = document.getElementById("addExperienceButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    const experienceSection = document.getElementById("experience-group");
    const newIndex = document.querySelectorAll(".experience-group").length + 1;
    const newExperienceHTML = `
        <div class="items">
            <label for="company-${newIndex}">Company: </label>
            <input type="text" name="company" id="company-${newIndex}" placeholder="XYZ company">
        </div>
    
        <div class="items">
            <label for="position-${newIndex}">Position:</label>
            <input type="text" name="position" id="position-${newIndex}" placeholder="Software Engineer">
        </div>
    
        <div class="items">
            <label for="duration-${newIndex}">Duration:</label>
            <input type="text" name="duration" id="duration-${newIndex}" placeholder="2015-2019">
        </div>
    
        <div class="items">
            <label for="responsibility-${newIndex}">Responsibilities:</label>
            <input type="text" name="responsibility" id="responsibility-${newIndex}" placeholder="Developed Software">

        </div>
        <button type="button" class="closeExperienceButton" data-index="${newIndex}">Close</button>
    `;
    const newExperienceDiv = document.createElement('div');
    newExperienceDiv.classList.add('experience-group');
    newExperienceDiv.innerHTML = newExperienceHTML;
    experienceSection === null || experienceSection === void 0 ? void 0 : experienceSection.appendChild(newExperienceDiv);
    (_a = newExperienceDiv.querySelector('.closeExperienceButton')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        newExperienceDiv.remove();
    });
});
(_b = document.getElementById("addEducationButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    var _a;
    const educationSection = document.getElementById("education-group");
    const newIndex = document.querySelectorAll(".education-group").length + 1;
    const newEducationHTML = `
        <div class="items">
            <label for="degree-${newIndex}">Degree:</label>
            <input type="text" name="degree" id="degree-${newIndex}" placeholder="BSCS">
        </div>

        <div class="items">
            <label for="institute-${newIndex}">Institute:</label>
            <input type="text" name="institute" id="institute-${newIndex}" placeholder="ABC University">
        </div>

        <div class="items">
            <label for="year-${newIndex}">Passing Year:</label>
            <input type="text" name="year" id="year-${newIndex}" placeholder="2015-2018">
        </div>
        <button type="button" class="closeEducationButton" data-index="${newIndex}">Close</button>
        
    `;
    const newEducationDiv = document.createElement('div');
    newEducationDiv.classList.add('education-group');
    newEducationDiv.innerHTML = newEducationHTML;
    educationSection === null || educationSection === void 0 ? void 0 : educationSection.appendChild(newEducationDiv);
    (_a = newEducationDiv.querySelector('.closeEducationButton')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        newEducationDiv.remove();
    });
});
editButton.addEventListener("click", () => {
    var _a;
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
    populateFormForEdit();
});
function populateFormForEdit() {
    const name = document.getElementById("resumeName").textContent || "";
    const email = document.getElementById("resumeEmail").textContent || "";
    const phone = document.getElementById("resumePhone").textContent || "";
    const address = document.getElementById("resumeAddress").textContent || "";
    const linkedin = document.getElementById("resumeLinkedin").textContent || "";
    const skills = document.getElementById("resumeSkills").innerHTML.split("<br>") || [];
    document.getElementById("name").value = name;
    document.getElementById("email").value = email.replace("Email: ", "");
    document.getElementById("phone").value = phone.replace("Phone#: ", "");
    document.getElementById("address").value = address.replace("Address: ", "");
    document.getElementById("linkedin-id").value = linkedin.replace("Linkedin-ID: ", "");
    document.getElementById("skill1").value = skills[0] || "";
    document.getElementById("skill2").value = skills[1] || "";
    document.getElementById("skill3").value = skills[2] || "";
    document.getElementById("skill4").value = skills[3] || "";
    const educationGroups = document.querySelectorAll('.education-entry');
    educationGroups.forEach((group, index) => {
        var _a, _b, _c;
        const degreeText = ((_a = group.querySelector('strong:contains("Degree:") + p')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        const instituteText = ((_b = group.querySelector('strong:contains("Institute:") + p')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        const yearText = ((_c = group.querySelector('strong:contains("Year:") + p')) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        const degreeInput = document.getElementById(`degree-${index + 1}`);
        const instituteInput = document.getElementById(`institute-${index + 1}`);
        const yearInput = document.getElementById(`year-${index + 1}`);
        if (degreeInput)
            degreeInput.value = degreeText.replace('Degree: ', '').trim();
        if (instituteInput)
            instituteInput.value = instituteText.replace('Institute: ', '').trim();
        if (yearInput)
            yearInput.value = yearText.replace('Year: ', '').trim();
    });
    // Pre-fill Work Experience
    const workExperienceGroups = document.querySelectorAll('.work-experience-entry');
    workExperienceGroups.forEach((group, index) => {
        var _a, _b, _c, _d;
        const companyText = ((_a = group.querySelector('strong:contains("Company:") + p')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        const positionText = ((_b = group.querySelector('strong:contains("Position:") + p')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
        const durationText = ((_c = group.querySelector('strong:contains("Duration:") + p')) === null || _c === void 0 ? void 0 : _c.textContent) || '';
        const responsibilityText = ((_d = group.querySelector('strong:contains("Responsibilities:") + p')) === null || _d === void 0 ? void 0 : _d.textContent) || '';
        const companyInput = document.getElementById(`company-${index + 1}`);
        const positionInput = document.getElementById(`position-${index + 1}`);
        const durationInput = document.getElementById(`duration-${index + 1}`);
        const responsibilityInput = document.getElementById(`responsibility-${index + 1}`);
        if (companyInput)
            companyInput.value = companyText.replace('Company: ', '').trim();
        if (positionInput)
            positionInput.value = positionText.replace('Position: ', '').trim();
        if (durationInput)
            durationInput.value = durationText.replace('Duration: ', '').trim();
        if (responsibilityInput)
            responsibilityInput.value = responsibilityText.replace('Responsibilities: ', '').trim();
    });
}
downloadButton.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
        alert("Error: html2pdf library is not loaded");
        return;
    }
    const resumeOptoins = {
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
        .from(resumeContent)
        .set(resumeOptoins)
        .save()
        .catch((error) => {
        console.error("PDF Error", error);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const address = params.get("address") || "";
    const linkedin_id = params.get("linkedin_id") || "";
    const skills1 = params.get("skills1") || "";
    const skills2 = params.get("skills2") || "";
    const skills3 = params.get("skills3") || "";
    const skills4 = params.get("skills4") || "";
    if (name || email || phone || address || linkedin_id || skills1 || skills2 || skills3 || skills4) {
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone#: ${phone}`;
        resumeAddress.textContent = `Address: ${address}`;
        resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
        if (linkedin_id) {
            resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
            resumeLinkedin.style.display = "block";
        }
        else {
            resumeLinkedin.style.display = "none";
        }
        resumeSkills.innerHTML = `${skills1}<br>${skills2}<br>${skills3}<br>${skills4}`;
        const savePhoto = localStorage.getItem("resumePhoto");
        if (savePhoto) {
            resumePhoto.src = savePhoto;
        }
        // Populate education entries
        let educationHTML = '';
        let educationIndex = 1;
        while (params.get(`degree${educationIndex}`) || params.get(`institute${educationIndex}`) || params.get(`year${educationIndex}`)) {
            const degree = params.get(`degree${educationIndex}`) || '';
            const institute = params.get(`institute${educationIndex}`) || '';
            const year = params.get(`year${educationIndex}`) || '';
            educationHTML += `
                <div class="education-entry">
                    <p><strong>Degree:</strong> ${degree}</p>
                    <p><strong>Institute:</strong> ${institute}</p>
                    <p><strong>Year:</strong> ${year}</p><br>
                </div>
            `;
            educationIndex++;
        }
        resumeEducation.innerHTML = educationHTML;
        // Populate work experience entries
        let workExperienceHTML = '';
        let experienceIndex = 1;
        while (params.get(`company${experienceIndex}`) || params.get(`position${experienceIndex}`) || params.get(`duration${experienceIndex}`)) {
            const company = params.get(`company${experienceIndex}`) || '';
            const position = params.get(`position${experienceIndex}`) || '';
            const duration = params.get(`duration${experienceIndex}`) || '';
            const responsibility = params.get(`responsibility${experienceIndex}`) || '';
            workExperienceHTML += `
                <div class="work-experience-entry">
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Position:</strong> ${position}</p>
                    <p><strong>Duration:</strong> ${duration}</p>
                    <p><strong>Responsibilities:</strong> ${responsibility}</p><br>
                </div>
            `;
            experienceIndex++;
        }
        resumeWorkExperience.innerHTML = workExperienceHTML;
        // Hide the form and show the resume page
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
