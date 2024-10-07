declare const html2pdf: any;

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeAddress = document.getElementById("resumeAddress") as HTMLParagraphElement;
const resumeLinkedin = document.getElementById("resumeLinkedin") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const shareButton = document.getElementById("shareButton") as HTMLButtonElement;
const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;





form.addEventListener("submit", async(event:Event)=>{
    event.preventDefault()


    const educationGroups = document.querySelectorAll('.education-group');
    let educationHTML = '';

    educationGroups.forEach((group, index) => {
        const degree = (group.querySelector(`#degree-${index + 1}`) as HTMLInputElement).value;
        const institute = (group.querySelector(`#institute-${index + 1}`) as HTMLInputElement).value;
        const year = (group.querySelector(`#year-${index + 1}`) as HTMLInputElement).value;

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
        const company = (group.querySelector(`#company-${index + 1}`) as HTMLInputElement).value;
        const position = (group.querySelector(`#position-${index + 1}`) as HTMLInputElement).value;
        const duration = (group.querySelector(`#duration-${index + 1}`) as HTMLInputElement).value;
        const responsibility = (group.querySelector(`#responsibility-${index + 1}`) as HTMLInputElement).value;


        workExperienceHTML += `
            <div class="work-experience-entry">
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p><strong>Responsibilities:</strong> ${responsibility}</p><br>
                
            </div>`;
    });
    resumeWorkExperience.innerHTML = workExperienceHTML;
   


    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const linkedin_id = (document.getElementById("linkedin-id") as HTMLInputElement).value;
    const skill1 = (document.getElementById("skill1") as HTMLInputElement).value;
    const skill2 = (document.getElementById("skill2") as HTMLInputElement).value;
    const skill3 = (document.getElementById("skill3") as HTMLInputElement).value;
    const skill4 = (document.getElementById("skill4") as HTMLInputElement).value;
    const photoInput = (document.getElementById("photo") as HTMLInputElement);

   

    const photofile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';

    if (photofile){
        photoBase64 = await filetoBase64(photofile);
        
        localStorage.setItem("resumePhoto" , photoBase64)
        resumePhoto.src = photoBase64
    }

    

    resumeName.textContent= name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.innerHTML = `Phone#:  ${phone}`;
    resumeAddress.textContent = `Address: ${address}`;
    resumeLinkedin.textContent= `Linkedin-ID: ${linkedin_id}`;
    if (linkedin_id) {
        resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
        resumeLinkedin.style.display = "block"; 
    } else {
        resumeLinkedin.style.display = "none"; 
    }
    



    resumeSkills.innerHTML = `${skill1}<br>${skill2}<br>${skill3}<br>${skill4}`;

   // Generate URL and make it shareable
   const queryParams = new URLSearchParams
   ({
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
        const degree = (group.querySelector(`#degree-${index + 1}`) as HTMLInputElement).value;
        const institute = (group.querySelector(`#institute-${index + 1}`) as HTMLInputElement).value;
        const year = (group.querySelector(`#year-${index + 1}`) as HTMLInputElement).value;

        queryParams.append(`degree${index + 1}`, degree);
        queryParams.append(`institute${index + 1}`, institute);
        queryParams.append(`year${index + 1}`, year);
    });

    // Add multiple work experience fields to query parameters
    experienceGroups.forEach((group, index) => {
        const company = (group.querySelector(`#company-${index + 1}`) as HTMLInputElement).value;
        const position = (group.querySelector(`#position-${index + 1}`) as HTMLInputElement).value;
        const duration = (group.querySelector(`#duration-${index + 1}`) as HTMLInputElement).value;
        const responsibility = (group.querySelector(`#responsibility-${index + 1}`) as HTMLInputElement).value;

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
    document.querySelector(".container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");



    
});
    

function filetoBase64(file:File):Promise<string>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.onloadend=()=>resolve(
            reader.result as string
        )
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
};
document.getElementById("addExperienceButton")?.addEventListener("click", () => {
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

    experienceSection?.appendChild(newExperienceDiv);
    newExperienceDiv.querySelector('.closeExperienceButton')?.addEventListener("click", function () {
        newExperienceDiv.remove();
    });
});

document.getElementById("addEducationButton")?.addEventListener("click", () => {
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

    educationSection?.appendChild(newEducationDiv);
    newEducationDiv.querySelector('.closeEducationButton')?.addEventListener("click", function () {
        newEducationDiv.remove();
    });
});

editButton.addEventListener("click", () => {
    

    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");


    populateFormForEdit();
});



function populateFormForEdit() {

   
    const name = (document.getElementById("resumeName") as HTMLElement).textContent || "";
    const email = (document.getElementById("resumeEmail") as HTMLElement).textContent || "";
    const phone = (document.getElementById("resumePhone") as HTMLElement).textContent || "";
    const address = (document.getElementById("resumeAddress") as HTMLElement).textContent || "";
    const linkedin = (document.getElementById("resumeLinkedin") as HTMLElement).textContent || "";
    const skills = (document.getElementById("resumeSkills") as HTMLElement).innerHTML.split("<br>") || [];

    (document.getElementById("name") as HTMLInputElement).value = name;
    (document.getElementById("email") as HTMLInputElement).value = email.replace("Email: ", "");
    (document.getElementById("phone") as HTMLInputElement).value = phone.replace("Phone#: ", "");
    (document.getElementById("address") as HTMLInputElement).value = address.replace("Address: ", "");
    (document.getElementById("linkedin-id") as HTMLInputElement).value = linkedin.replace("Linkedin-ID: ", "");
  
    (document.getElementById("skill1") as HTMLInputElement).value = skills[0] || "";
    (document.getElementById("skill2") as HTMLInputElement).value = skills[1] || "";
    (document.getElementById("skill3") as HTMLInputElement).value = skills[2] || "";
    (document.getElementById("skill4") as HTMLInputElement).value = skills[3] || "";

    const educationGroups = document.querySelectorAll('.education-entry');
    educationGroups.forEach((group, index) => {
        const degreeText = group.querySelector('strong:contains("Degree:") + p')?.textContent || '';
        const instituteText = group.querySelector('strong:contains("Institute:") + p')?.textContent || '';
        const yearText = group.querySelector('strong:contains("Year:") + p')?.textContent || '';

        const degreeInput = document.getElementById(`degree-${index + 1}`) as HTMLInputElement;
        const instituteInput = document.getElementById(`institute-${index + 1}`) as HTMLInputElement;
        const yearInput = document.getElementById(`year-${index + 1}`) as HTMLInputElement;

        if (degreeInput) degreeInput.value = degreeText.replace('Degree: ', '').trim();
        if (instituteInput) instituteInput.value = instituteText.replace('Institute: ', '').trim();
        if (yearInput) yearInput.value = yearText.replace('Year: ', '').trim();
    });

    // Pre-fill Work Experience
    const workExperienceGroups = document.querySelectorAll('.work-experience-entry');
    workExperienceGroups.forEach((group, index) => {
        const companyText = group.querySelector('strong:contains("Company:") + p')?.textContent || '';
        const positionText = group.querySelector('strong:contains("Position:") + p')?.textContent || '';
        const durationText = group.querySelector('strong:contains("Duration:") + p')?.textContent || '';
        const responsibilityText = group.querySelector('strong:contains("Responsibilities:") + p')?.textContent || '';

        const companyInput = document.getElementById(`company-${index + 1}`) as HTMLInputElement;
        const positionInput = document.getElementById(`position-${index + 1}`) as HTMLInputElement;
        const durationInput = document.getElementById(`duration-${index + 1}`) as HTMLInputElement;
        const responsibilityInput = document.getElementById(`responsibility-${index + 1}`) as HTMLInputElement;

        if (companyInput) companyInput.value = companyText.replace('Company: ', '').trim();
        if (positionInput) positionInput.value = positionText.replace('Position: ', '').trim();
        if (durationInput) durationInput.value = durationText.replace('Duration: ', '').trim();
        if (responsibilityInput) responsibilityInput.value = responsibilityText.replace('Responsibilities: ', '').trim();
    });

}

downloadButton.addEventListener("click", ()=>{
    if(typeof html2pdf === "undefined"){
        alert("Error: html2pdf library is not loaded")
    return;
    }

    const resumeOptoins = {
        margin: 0.5,
        filename: "resume.pdf",
        image: {type: "jpeg", quality: 1.0},
        html2canvas: {scale:2},
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf()
        .from(resumeContent)
        .set(resumeOptoins)
        .save()
        .catch((error:Error)=>{
            console.error("PDF Error", error)
        })
});


window.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const address = params.get("address") ||"";
    const linkedin_id = params.get("linkedin_id") ||"";
    const skills1 = params.get("skills1") ||"";
    const skills2 = params.get("skills2") ||"";
    const skills3 = params.get("skills3") ||"";
    const skills4 = params.get("skills4") ||"";

    if(name || email || phone ||address|| linkedin_id|| skills1|| skills2|| skills3||skills4 ){
        resumeName.textContent= name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent= `Phone#: ${phone}`;
        resumeAddress.textContent = `Address: ${address}`;
        resumeLinkedin.textContent= `Linkedin-ID: ${linkedin_id}`;
        if (linkedin_id) {
            resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
            resumeLinkedin.style.display = "block";
        } else {
            resumeLinkedin.style.display = "none"; 
        }

        resumeSkills.innerHTML = `${skills1}<br>${skills2}<br>${skills3}<br>${skills4}`;

        const savePhoto = localStorage.getItem("resumePhoto");
        if(savePhoto){
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
        document.querySelector(".container")?.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
    
        

});

