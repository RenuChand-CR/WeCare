const { convertHour } = require("./helper");

exports.validateName = name => {
    if (name.trim().length >= 3 && name.trim().length <= 50) {
        return true;
    }
    return false;
}

exports.validatePassword = pass => {
    if (pass.length >= 5 && pass.length <= 10) {
        return true;
    }
    return false;
}

exports.validateAge = dob => {
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

exports.validateGender = gender => {
    if(['F', 'M'].includes(gender)) {
        return true;
    }
    return false;
}

exports.validatePhoneNumber = ph => {
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

exports.validatePincode = pin => {
    if(pin.toString().length === 6){
        return true;
    }
    return false;
}

exports.validateAddress = (value) => {
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
