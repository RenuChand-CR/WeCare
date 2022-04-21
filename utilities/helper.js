const model = require('../model/schema');

const getCurrentId = async (model, defaultId, idName) => {
    try {
        const count = model.count();
        if (count == 0) {
            return defaultId;
        } else {
            const documents = await model.aggregate([{ $project: { '_id': 0, [idName]: 1 } }, { $sort: { [idName]: -1 } }, { $limit: 1 }]);
            return documents[0][idName];
        }
    } catch (err) {
        let error = new Error(err.message);
        error.status = 400;
        throw error;
    }
}

exports.generateId = async field => {
    let id, currentId, currentNumber, prefix;
    switch (field) {
        case 'user': {
            currentId = await getCurrentId(model.usersModel, 'UI-0001', 'userId');
            prefix = "UI-";
            break;
        }
        case 'coach': {
            currentId = await getCurrentId(model.coachesModel, 'CI-0001', 'coachId');
            prefix = "CI-";
            break;
        }
        case 'booking': {
            currentId = await getCurrentId(model.bookingsModel, 'B-0001', 'bookingId');
            prefix = "B-";
            break;
        }
    }
    currentNumber = Number(currentId.split("-")[1]);
    id = prefix + (currentNumber + 1).toString().padStart(4, '0');
    return id;
}

//It converts the time to 24-hour format
exports.convertHour = slotArray => {
    for (let i = 0; i < slotArray.length; i++) {
        if (slotArray[i].includes('PM') && !slotArray[i].includes('12')) {
            slotArray[i] = Number(slotArray[i].replace("PM", "")) + 12;
        } else {
            slotArray[i] = Number(slotArray[i].replace(/(AM|PM)/, ""))
        }
    }
    return {
        startHour: slotArray[0],
        endHour: slotArray[1]
    };
}
