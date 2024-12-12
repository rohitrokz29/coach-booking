let seats = Array.from({ length: 80 }, (item, index) => {
    return {
        seat_no: index + 1,
        name: "",
        booked: false
    }
})
let unbookedPerRow = Array.from({ length: 12 }, (item, index) => {
    if (index === 11) return 3;
    return 7;
});

const BookSeats = async (req, res) => {
    try {
        const { name, number } = req.body;
        console.log(typeof number);
        let currentBooking = 0;
        let bookedSeats = [];
        if (number <= 3 && unbookedPerRow[11] >= number) {
            for (var i = 77; i < 80 && currentBooking < number; i++) {
                console.log({booked:seats[i].booked});
                if (!seats[i].booked) {
                    seats[i].name = name;
                    seats[i].booked = true;
                    currentBooking++;
                    bookedSeats.push(seats[i].seat_no);
                    unbookedPerRow[11]--;
                }
            }
        }
        else {
            let demandVacant = -1;
            for (let i = 0; i < 12; i++) {
                if (unbookedPerRow[i] >= number) {
                    demandVacant = i;
                    break;
                }
            }
            if (demandVacant !== -1) {
                for (let i = demandVacant * 7; i < demandVacant * 7 + 7 && currentBooking < number; i++) {
                    console.log({booked:seats[i].booked});
                    if (!seats[i].booked) {
                        seats[i].name = name;
                        seats[i].booked = true;
                        currentBooking++;
                        bookedSeats.push(seats[i].seat_no);
                        unbookedPerRow[demandVacant]--;
                    }
                }
            }
            else {
                for (let i = 0; i < 12 && currentBooking < number; i++) {
                    console.log({booked:seats[i].booked});
                    if (unbookedPerRow[i] !== 0) {
                        for (let s = 7 * i; s < 7 * i + 7 && currentBooking < number; s++) {
                            if (!seats[s].booked) {

                                seats[s].name = name;
                                seats[s].booked = true;
                                bookedSeats.push(seats[s].seat_no);
                                currentBooking++;
                                unbookedPerRow[i]--;
                            }
                        }
                    }
                }
            }
        }
        res.status(200).json({ bookedSeats });

    } catch (error) {
        console.log(error);
        res.status(400);
    }
}
const GetBookedData = async (req, res) => {
    try {
        let bookedSeats = [];
        for (let i = 0; i < 80; i++) {
            if (seats[i].booked) {
                bookedSeats.push(seats[i].seat_no);
            }
        }
        res.status(200).json({bookedSeats});
    } catch (error) {
        res.status(400);
    }
}

module.exports = {
    GetBookedData,
    BookSeats
}