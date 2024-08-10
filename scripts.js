let currentStep = 0; // Initialize the current step to the first step
showStep(currentStep); // Display the first step

function showStep(step) {
    const steps = document.getElementsByClassName("step");
    steps[step].style.display = "block"; // Show the current step

    // Update the button text based on the current step
    if (step == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (step == (steps.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function nextPrev(n) {
    const steps = document.getElementsByClassName("step");

    // Validate the form fields in the current step
    if (n === 1 && !validateForm()) return false;

    // Hide the current step
    steps[currentStep].style.display = "none";

    // Increment or decrement the step index
    currentStep = currentStep + n;

    // If the user clicks "Submit", stop the form from submitting if it's invalid
    if (currentStep >= steps.length) {
        document.getElementById("multiStepForm").submit();
        return false;
    }

    // Otherwise, display the correct step
    showStep(currentStep);
}

function validateForm() {
    const stepFields = document.getElementsByClassName("step")[currentStep].getElementsByTagName("input");
    let valid = true;

    for (let i = 0; i < stepFields.length; i++) {
        const field = stepFields[i];
        if (field.value === "") {
            field.className += " invalid";
            valid = false;
        } else {
            // Validasi untuk email
            if (field.type === "email") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    field.className += " invalid";
                    valid = false;
                    alert("Please enter a valid email address in the format @***.com.");
                }
            }

            // Validasi untuk nomor telepon
            if (field.type === "tel") {
                const phonePattern = /^0\d{6,}$/;
                if (!phonePattern.test(field.value)) {
                    field.className += " invalid";
                    valid = false;
                    alert("Phone number must start with '0' and be at least 7 digits long.");
                }
            }

            // Validasi untuk password
            if (field.type === "password") {
                const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
                if (!passwordPattern.test(field.value)) {
                    field.className += " invalid";
                    valid = false;
                    alert("Password must contain at least one uppercase letter and one number.");
                }
            }
        }
    }

    return valid;
}
