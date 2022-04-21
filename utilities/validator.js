const { convertHour } = require("./helper");

exports.validateUserDetails = (consumer) => {
    
    const { name , password, dateOfBirth, gender, mobileNumber } = consumer;
    console.log(consumer);
    if (!name || !password || !dateOfBirth || !gender || !mobileNumber) {
        return { result: "failure", error: "Please provide all mandatory fields"}
    } else if (!validateName(name)) {
        return { result: "failure", error: "Name should have minimum 3 and maximum 50 characters"};
    } else if (!validatePassword(password)) {
        return { result: "failure", error: "Password should have minimum 5 and maximum 10 characters"};
    } else if (!validateAge(dateOfBirth)) {
        return { result: "failure", error: "Age should be greater than 20 and less than 100"};
    } else if (!validateGender(gender)) {
        return { result: "failure", error: "Gender should be either M or F"};
    } else if (!validatePhoneNumber(mobileNumber)) {
        return { result: "failure", error: "Mobile Number should have 10 digits"};
    } else {
        return { result: "success" };
    }
};

exports.validateAddressDetails = consumer => {

    const { pincode , city, state, country } = consumer;

    if (!pincode || !city || !state || !country) {
        return { result: "failure", error: "Please provide all mandatory fields"}
    } else if (!validatePincode(pincode)) {
        return { result: "failure", error: "Pincode should have 6 digits"};
    } else if (!validateAddress(city)) {
        return { result: "failure", error: "City should have minimum 3 and maximum 20 characters"};
    } else if (!validateAddress(state)) {
        return { result: "failure", error: "State should have minimum 3 and maximum 20 characters"};
    } else if (!validateAddress(country)) {
        return { result: "failure", error: "Country should have minimum 3 and maximum 20 characters"};
    } else {
        return { result: "success" };
    }
};

const validateName = name => {
    if (name.trim().length >= 3 && name.trim().length <= 50) {
        return true;
    }
    return false;
}

const validatePassword = pass => {
    if (pass.length >= 5 && pass.length <= 10) {
        return true;
    }
    return false;
}

const validateAge = dob => {
    const today = new Date();
    const birthDay = new Date(dob);

    let age = today.getFullYear() - birthDay.getFullYear();

    const birthMonth = birthDay.getMonth();
    const birthDate = birthDay.getDate();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate < birthDate)) {
        age -= 1;
    }

    if (age > 20 && age < 100) {
        return true;
    }
    return false;
}

const validateGender = gender => {
    if(['F', 'M'].includes(gender)) {
        return true;
    }
    return false;
}

const validatePhoneNumber = ph => {
    if(ph.toString().length === 10) {
        return true;
    }
    return false;
}

exports.validateEmail = mailId => {
    if(mailId.match(/^[a-z][a-z0-9]*@[a-z]+(.com|.in)$/i)) {
        return true;
    }
    return false;
}

const validatePincode = pin => {
    if(pin.toString().length === 6){
        return true;
    }
    return false;
}

const validateAddress = (value) => {
    if(value.length >= 3 && value.length <= 20) {
        return true;
    }
    return false;
}

exports.validateSpeciality = speciality => {
    if (speciality.trim().length >= 10 && speciality.trim().length <= 50) {
        return true;
    }
    return false;
}

exports.validateSlot = slot => {
    const trimmedSlot = slot.split(" ").join("");
    if(trimmedSlot.match(/^(0?[1-9]|1[0-2])(AM|PM)to(0?[1-9]|1[0-2])(AM|PM)/)) {
        const timing = trimmedSlot.split("to");
        const startTime = Number(timing[0].replace(/(AM|PM)/, ""));
        const endTime = Number(timing[1].replace(/(AM|PM)/, ""));
        
        if((timing[0].includes('AM') && startTime >= 9 && startTime < 12)
            || (timing[0].includes('PM') && (startTime <= 7 || startTime == 12) && startTime > 1)
                || (timing[1].includes('AM') && [10, 11].includes(endTime))
                    || (timing[1].includes('PM') && (endTime <= 8 || endTime == 12) && endTime > 1 )) {
            const appointment = convertHour(timing);
            if(appointment.endHour > appointment.startHour) {
                const difference = appointment.endHour - appointment.startHour;
                return (difference == 1) ? true : false;
            }
            return false;
        } else {
            return false;
        }
    }
    return false;
}

exports.validateAppointment = appointmentDate => {
    const today = new Date();
    const appDate = new Date(appointmentDate);

    const diffTime = Math.abs(appDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(appDate > today && (diffDays <= 7)) {
        return true;
    }
    return false;
}
